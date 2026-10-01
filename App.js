import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Provider } from 'react-redux';
import {store} from './src/store/store'; // Si en store.js dice: export default store
// Si en store.js dice: export const store = ..., usa: import { store } from './src/store';

import Appnavigator from './src/navigation/appnavigator';

export default function App() {
  return (
    <Provider store={store}>
        <View style={styles.container}>
          <Appnavigator />   
        </View>
    </Provider>
  );
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
    },
});