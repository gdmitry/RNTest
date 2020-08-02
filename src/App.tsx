import 'react-native-gesture-handler';
import * as React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';
import HomeView from './containers/HomeContainer';
import DetailView from './containers/DetailViewContainer';
import { nameof } from './types/utils';
import { Picture } from './types/api';

export type RootStackParamList = {
  HomeView: undefined;
  DetailView: { pictureDetails: Picture | undefined };
};
export const HomeViewKey = nameof<RootStackParamList>('HomeView');
export const DetailViewKey = nameof<RootStackParamList>('DetailView');
export const appStore = configureStore();

const Stack = createStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <Provider store={appStore}>
      <SafeAreaProvider>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName={HomeViewKey}
            headerMode='screen'
            screenOptions={{
              headerTintColor: '#FFF',
            }}
          >
            <Stack.Screen
              name={HomeViewKey}
              component={HomeView}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name={DetailViewKey}
              component={DetailView}
              options={{
                headerTransparent: true,
                headerStyle: {
                  height: 50,
                  borderBottomWidth: 0,
                },
                headerTintColor: '#FFF',
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    </Provider>
  );
}
