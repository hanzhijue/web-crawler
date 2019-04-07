"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const store = {
    origin: {},
    sorted: [],
};
const list = () => {
    const { sorted, } = store;
    return sorted;
};
const save = (key, value) => {
    store.origin[key] = Object.assign({}, value, { key });
};
const sort = (key, order = 'DESC') => {
    const arrayList = Object.values(store.origin);
    arrayList.sort((prev, next) => {
        if (order === 'ASC') {
            return prev[key] - next[key];
        }
        return next[key] - prev[key];
    });
    store.sorted = arrayList;
};
exports.default = {
    list,
    save,
    sort,
};
//# sourceMappingURL=store.js.map