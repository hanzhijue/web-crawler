import { IStore, ISorted, IRecord } from '../typing/store';

const store: IStore = {
  origin: {},
  sorted: [],
};

const list = (): ISorted => {
  const {
    origin,
    sorted,
  } = store;
  if (sorted.length === 0) {
    return Object.keys(origin).map((key): IRecord => ({
      ...origin[key],
      key,
    }));
  }
  return sorted;
};

const save = (key: string, value: object): void => {
  store.origin[key] = {
    ...value,
    key,
  };
};

export enum ISortType {
  ASC,
  DESC,
}

const sort = (key: string, order: ISortType = ISortType.DESC): void => {
  const arrayList = Object.values(store.origin);
  arrayList.sort((prev, next): number => {
    if (order === ISortType.ASC) {
      return prev[key] - next[key];
    }
    return next[key] - prev[key];
  });
  store.sorted = arrayList;
};

export default {
  list,
  save,
  sort,
};
