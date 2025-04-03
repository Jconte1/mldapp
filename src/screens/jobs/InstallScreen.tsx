import React from 'react';
import { View, Text } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/AppNavigator';
import globalStyles from '../../constants/globalStyles';

type Props = NativeStackScreenProps<RootStackParamList, 'Install'>;

const InstallScreen: React.FC<Props> = ({ route }) => {
  const { orderId } = route.params;

  return (
    <View style={globalStyles.container}>
      <Text style={globalStyles.title}>Install Info for {orderId}</Text>
      <Text style={globalStyles.text}>Installer: John Doe</Text>
      <Text style={globalStyles.text}>Date: 2025-04-10</Text>
    </View>
  );
};

export default InstallScreen;
