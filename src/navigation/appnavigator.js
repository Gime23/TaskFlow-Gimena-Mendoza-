import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';

// Importa tus pantallas desde la carpeta screens
import LoginScreen from '../screens/loginscreen';
import RegisterScreen from '../screens/registerscreen';
import TaskListScreen from '../screens/tasklistscreen';
import TaskDetailScreen from '../screens/taskdetailscreen';
import ProfileScreen from '../screens/profilescreen';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen 
          name="Login" 
          component={LoginScreen} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="Register" 
          component={RegisterScreen} 
          options={{ title: 'Registro' }} 
        />
        <Stack.Screen 
          name="TaskList" 
          component={TaskListScreen} 
          options={{ title: 'Mis Tareas' }} 
        />
        <Stack.Screen 
          name="TaskDetail" 
          component={TaskDetailScreen} 
          options={{ title: 'Detalle de Tarea' }} 
        />
        <Stack.Screen 
          name="Profile" 
          component={ProfileScreen} 
          options={{ title: 'Perfil de Usuario' }} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}