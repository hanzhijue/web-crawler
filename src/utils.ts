export type ITask = <T>() => Promise<T>;

const iteratorPromise = (tasks: ITask[]): void => {
  let res = Promise.resolve();
  tasks.forEach((task: ITask): void => {
    res = res.then(() => task());
  });
};

export {
  iteratorPromise,
};
