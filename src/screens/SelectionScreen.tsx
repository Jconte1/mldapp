import React from 'react';
import { View, Button, StyleSheet, Text } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';

type Props = NativeStackScreenProps<RootStackParamList, 'Selection'>;

const SelectionScreen: React.FC<Props> = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>What would you like to view?</Text>

      <Button
        title="Sales Orders"
        onPress={() => navigation.navigate('SalesOrderSelection')}
      />

      {/* Placeholder buttons for future features */}
      <View style={styles.spacer} />
      <Button title="Payments (Coming Soon)" onPress={() => {}} disabled />
      <View style={styles.spacer} />
      <Button title="Invoices (Coming Soon)" onPress={() => {}} disabled />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
  },
  header: {
    fontSize: 20,
    marginBottom: 32,
    textAlign: 'center',
  },
  spacer: {
    height: 16,
  },
});

export default SelectionScreen;
