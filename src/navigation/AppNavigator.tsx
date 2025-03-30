import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';

import LoginScreen from '../screens/LoginScreen';
import SalesOrderSelectionScreen from '../screens/SalesOrderSelectionScreen';
import SalesOrderDetailScreen from '../screens/SalesOrderDetailScreen';
import SelectionScreen from '../screens/SelectionScreen';
export type RootStackParamList = {
  Login: undefined;
  Selection: undefined;
  SalesOrderSelection: undefined;
  SalesOrderDetail: { orderId: string };
};


const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Selection" component={SelectionScreen} />
        <Stack.Screen name="SalesOrderSelection" component={SalesOrderSelectionScreen} />
        <Stack.Screen name="SalesOrderDetail" component={SalesOrderDetailScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
