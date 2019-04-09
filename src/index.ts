import { run } from './crawler';

const startTime = Date.now();
console.info('crawler start');
run()
  .then(() => {
    const takeTime = Date.now() - startTime;
    console.info(`crawler finished. Takes ${takeTime}`);
  });
