import { run } from './crawler';

const startTime = Date.now();
console.log('crawler start');
run()
  .then(() => {
    const takeTime = Date.now() - startTime;
    console.log(`crawler finished. Takes ${takeTime}`);
  });

