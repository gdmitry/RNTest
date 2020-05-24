# RNTest

*How to test on Android:*

* Install RN CLI: `npm install -g react-native-cli`
* Run `npm install` in root folder
* Make `react-native run-android`

## Issues with gestures
1. AndroidX package error: 
https://github.com/facebook/react-native-fbsdk/issues/600#issuecomment-524674288
https://enappd.com/blog/androidx-react-native/83/

Revert AndroidX packages to Support Libraries 

  `npx jetify -r`

2. Don't forget `react-native link react-native-gesture-handler`

3. Clear cache: `npm start -- --reset-cache`
4. Reinstall dependencies: `rm -rf node_modules && npm install`
5. `adb reverse tcp:9090 tcp:9090`
