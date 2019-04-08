export type ITask = <T>() => Promise<T>;

export type ITaskList = Array<ITask>;

const iteratorPromise = (tasks: ITaskList) => {
  let res = Promise.resolve();
  tasks.forEach((task) => {
    res = res.then(() => task());
  });
};

export {
  iteratorPromise,
}
