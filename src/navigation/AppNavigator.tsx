import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginScreen from '../screens/auth/LoginScreen';
import DashboardScreen from '../screens/dashboard/DashboardScreen';
import JobsListScreen from '../screens/jobs/JobsListScreen';
import IndividualJobScreen from '../screens/jobs/IndividualJobScreen';
import InstallScreen from '../screens/jobs/InstallScreen';
import PaymentScreen from '../screens/jobs/PaymentScreen';

export type RootStackParamList = {
  Login: undefined;
  Selection: undefined;
  JobsList: { type: 'upcoming' | 'past' };
  IndividualJob: { orderId: string };
  Install: { orderId: string };
  Payment: { orderId: string };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Selection" component={DashboardScreen} />
        <Stack.Screen name="JobsList" component={JobsListScreen} />
        <Stack.Screen name="IndividualJob" component={IndividualJobScreen} />
        <Stack.Screen name="Install" component={InstallScreen} />
        <Stack.Screen name="Payment" component={PaymentScreen} />

      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
