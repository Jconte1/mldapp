import React from 'react';
import { View, Text } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/AppNavigator';
import globalStyles from '../../constants/globalStyles';

type Props = NativeStackScreenProps<RootStackParamList, 'Payment'>;

const PaymentScreen: React.FC<Props> = ({ route }) => {
  const { orderId } = route.params;

  return (
    <View style={globalStyles.container}>
      <Text style={globalStyles.title}>Payment Info for {orderId}</Text>
      <Text style={globalStyles.text}>Status: Paid in Full</Text>
      <Text style={globalStyles.text}>Method: ACH</Text>
    </View>
  );
};

export default PaymentScreen;
