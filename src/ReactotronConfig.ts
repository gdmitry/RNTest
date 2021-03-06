import Reactotron from 'reactotron-react-native';
import { reactotronRedux } from 'reactotron-redux';

/* Configure Reactotron */
Reactotron.configure({
  name: 'App',
  host: 'localhost',
  port: 9090,
})
  .use(reactotronRedux())
  .useReactNative()
  .connect();

if (Reactotron.clear) {
  Reactotron.clear();
}

// @ts-ignore
console.tron = (...args: any) => {
  console.log(...args);
  Reactotron.display({
    name: 'TRON',
    value: args,
    preview: args.length > 1 ? JSON.stringify(args) : args[0],
  });
};

export default Reactotron;
