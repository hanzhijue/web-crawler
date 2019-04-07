"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = require("axios");
const cheerio_1 = require("cheerio");
const store_1 = require("./store");
const parseCount = (count) => {
    if (count.includes('w')) {
        return Number(count.replace(/[w+]/g, '')) * 10000;
    }
    return Number(count);
};
const analysisPageDocument = (docText, pageKey) => {
    const $ = cheerio_1.load(docText);
    $('.main').each((i, it) => {
        const name = $(it).find('.info h3').text();
        const downloadCount = parseCount($(it).find('.status_bar .download').text());
        const link = $($(it).children('a')[0]).attr('href');
        const category = $(it).find('.cates a').text();
        store_1.default.save(`${pageKey}-${i}`, {
            name,
            downloadCount,
            link,
            category,
        });
    });
};
const fetchData = () => __awaiter(this, void 0, void 0, function* () {
    const minPageNum = 1;
    const maxPageNum = 57;
    const eventQueue = [];
    for (let i = minPageNum; i <= maxPageNum; i += 1) {
        eventQueue.push(axios_1.default.get(`https://xclient.info/s/${i}/`)
            .then(({ data }) => {
            analysisPageDocument(data, i);
        }));
    }
    return Promise.all(eventQueue);
});
const print = (list) => {
    list.forEach((item) => {
        const { name, downloadCount, link, category, key, } = item;
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
        store_1.default.sort('downloadCount');
        print(store_1.default.list());
    });
};
exports.run = run;
//# sourceMappingURL=index.js.map