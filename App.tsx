import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AuthProvider } from './src/Context/AuthProvider';
import AppNavigator from './src/Navigation/AppNavigator';
import { Provider } from 'react-redux'
import store from './src/Redux/Store'
const App = () => {
  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <AuthProvider>
          <AppNavigator />
        </AuthProvider>
      </Provider>
    </SafeAreaProvider>
  );
};
export default App;  