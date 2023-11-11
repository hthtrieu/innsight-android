import React from 'react';
import { Provider } from 'react-redux';
import { StyleSheet } from 'react-native';
import initStore from './src/redux/store';
import Home from './src/screens/home/Home';
const store = initStore();

export default function App() {
  return (
    <Provider store={store}>
      <Home />
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
