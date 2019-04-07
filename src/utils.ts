export type ITask = () => Promise<any>;

export type ITaskList = Array<ITask>;

const iteratorPromise = (tasks: ITaskList) => {
  let res = Promise.resolve();
  tasks.forEach((task) => {
    res = res.then(() => task());
  });
  return res;
};

export {
  iteratorPromise,
}
