import axios from 'axios';
import { load } from 'cheerio';
import store from './store';
import { ISorted } from '../typing';
// import { iteratorPromise } from './utils';

const parseCount = (count: string): number => {
  if (count.includes('w')) {
    return Number(count.replace(/[w+]/g, '')) * 10000;
  }
  return Number(count);
};

const analysisPageDocument = (docText: string, pageKey: number) => {
  const $ = load(docText);
  $('.main').each((i, it) => {
    const name = $(it).find('.info h3').text();
    const downloadCount = parseCount($(it).find('.status_bar .download').text());
    const link = $($(it).children('a')[0]).attr('href');
    const category = $(it).find('.cates a').text();
    store.save(`${pageKey}-${i}`, {
      name,
      downloadCount,
      link,
      category,
    });
  });
};

const fetchData = async () => {
  const minPageNum = 1;
  const maxPageNum = 57;
  const eventQueue = [];

  for (let i = minPageNum; i <= maxPageNum; i += 1) {
    // eventQueue.push(() => {
    //   return axios.get(`https://xclient.info/s/${i}/`)
    //     .then(({ data }) => {
    //       return analysisPageDocument(data, i);
    //     }) as Promise<any>;
    // });
    eventQueue.push(axios.get(`https://xclient.info/s/${i}/`)
      .then(({ data }) => {
        return analysisPageDocument(data, i);
      }));
  }

  // iteratorPromise(eventQueue);
  return Promise.all(eventQueue);
};

const print = (list: ISorted) => {
  // console.log(JSON.stringify(list, undefined, 2));
  list.forEach((item) => {
    const {
      name,
      downloadCount,
      link,
      category,
      key,
    } = item;
    console.group(`${name} -- ${downloadCount}`);
    console.log(name);
    console.log(downloadCount);
    console.log(link);
    console.log(category);
    console.log(key);
    console.log('');
    console.groupEnd();
  });
};

const run = () => {
  fetchData()
    .then(() => {
      store.sort('downloadCount');
      print(store.list());
    });
};

export {
  run,
}
