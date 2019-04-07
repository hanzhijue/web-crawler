export interface IRecord {
  name: string;
  downloadCount: number;
  link: string;
  category: string;
  key: string | number;
}

export interface IOrigin {
  [propKey: string]: any;
}

export type ISorted = Array<IRecord>;

export interface IStore {
  origin: IOrigin,
  sorted: ISorted,
}
