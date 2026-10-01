import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';

// Importa tus pantallas desde la carpeta screens
import LoginScreen from '../screens/loginscreen';
import TaskListScreen from '../screens/tasklistscreen';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="TaskList" component={TaskListScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}