import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';

type Props = NativeStackScreenProps<RootStackParamList, 'SalesOrderDetail'>;

const SalesOrderDetailScreen: React.FC<Props> = ({ route }) => {
  const { orderId } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Sales Order Detail</Text>
      <Text>Order ID: {orderId}</Text>
      {/* We’ll show real order data here later */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    fontSize: 24,
    marginBottom: 12,
  },
});

export default SalesOrderDetailScreen;
