import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';

type Props = NativeStackScreenProps<RootStackParamList, 'SalesOrderSelection'>;

const fakeSalesOrders = [
  { id: 'SO23304', title: 'Order #SO23304' },
  { id: 'SO23305', title: 'Order #SO23305' },
  { id: 'SO23306', title: 'Order #SO23306' },
];

const SalesOrderSelectionScreen: React.FC<Props> = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <FlatList
        data={fakeSalesOrders}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.orderButton}
            onPress={() =>
              navigation.navigate('SalesOrderDetail', { orderId: item.id })
            }
          >
            <Text style={styles.orderText}>{item.title}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#fff',
  },
  orderButton: {
    backgroundColor: '#007bff',
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
  },
  orderText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default SalesOrderSelectionScreen;

