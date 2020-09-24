# RNTest

*How to test on Android:*

* Install RN CLI: `npm install -g react-native-cli`
* Run             `npm install` in root folder
* Make            `react-native run-android`

## Issues with gestures
1. AndroidX package error: 
https://github.com/facebook/react-native-fbsdk/issues/600#issuecomment-524674288
https://enappd.com/blog/androidx-react-native/83/

2. Revert AndroidX packages to Support Libraries `npx jetify -r`
3. Don't forget `react-native link react-native-gesture-handler`
4. Clear cache: `npm start -- --reset-cache`
5. Reinstall dependencies: `rm -rf node_modules && npm install`

## Connect Reactotron
1. adb reverse tcp:9090 tcp:9090

## Enable hot reloading
1. adb devices
2. adb -s `<device name>` reverse tcp:8081 tcp:8081
3. adb shell input keyevent 82

## React Native - pod install issue “cannot load such file…node_modules/react-native/scripts/react_native_pods”
Fix: npm audit fix and it added react_native_pods file and pod install then worked

## Unable to resolve module `@babel/runtime/helpers/interopRequireDefault`
Fix: 
1. Clear watchman watches: watchman watch-del-all
2. Delete node_modules: rm -rf node_modules and run yarn install
3. Reset Metro's cache: yarn start --reset-cache
4. Remove the cache: rm -rf /tmp/metro-*

## unfortunately app has stopped react native
Had the same issue, in my case it was RN cache.
Fixed it by
`cd android`
`./gradlew clean`
