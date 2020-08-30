import Reactotron from "reactotron-react-native";
import { reactotronRedux } from "reactotron-redux";

/* Configure Reactotron */
Reactotron.configure({
  name: "App",
  host: "localhost",
  port: 9090,
})
  .use(reactotronRedux())
  .useReactNative()
  .connect();

//@ts-ignore
Reactotron.clear();

console.tron = (...args: any) => {
  console.log(...args);
  Reactotron.display({
    name: "TRON",
    value: args,
    preview: args.length > 1 ? JSON.stringify(args) : args[0],
  });
};

declare global {
  interface Console {
    tron: any;
  }
}

export default Reactotron;
