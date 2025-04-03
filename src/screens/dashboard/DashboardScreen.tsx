import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import jwtDecode from 'jwt-decode';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/AppNavigator';
import globalStyles from '../../constants/globalStyles';

type Props = NativeStackScreenProps<RootStackParamList, 'Dashboard'>;

type TokenPayload = {
  name: string;
  customerId: string;
  email: string;
};

const DashboardScreen: React.FC<Props> = ({ navigation }) => {
  const [user, setUser] = useState<TokenPayload | null>(null);

  useEffect(() => {
    const loadUser = async () => {
      const token = await AsyncStorage.getItem('authToken');
      if (token) {
        const decoded: TokenPayload = jwtDecode(token);
        setUser(decoded);
      }
    };
    loadUser();
  }, []);

  const handleLogout = async () => {
    await AsyncStorage.removeItem('authToken');
    Alert.alert('Logged out');
    navigation.reset({
      index: 0,
      routes: [{ name: 'Login' }],
    });
  };

  const handleGoToJobs = (type: 'upcoming' | 'past') => {
    navigation.navigate('JobsList', { type });
  };

  return (
    <View style={[globalStyles.container, { justifyContent: 'center', alignItems: 'center' }]}>
      <Text style={globalStyles.title}>
        Welcome{user?.name ? `, ${user.name}` : ''}!
      </Text>

      {user && (
        <Text style={{ marginBottom: 20, fontSize: 16 }}>
          Customer ID: {user.customerId}
        </Text>
      )}

      <TouchableOpacity style={globalStyles.button} onPress={() => handleGoToJobs('upcoming')}>
        <Text style={globalStyles.buttonText}>Upcoming Jobs</Text>
      </TouchableOpacity>

      <TouchableOpacity style={globalStyles.button} onPress={() => handleGoToJobs('past')}>
        <Text style={globalStyles.buttonText}>Past Jobs</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[globalStyles.button, { marginTop: 40, backgroundColor: '#232424' }]}
        onPress={handleLogout}
      >
        <Text style={globalStyles.buttonText}>Log Out</Text>
      </TouchableOpacity>
    </View>
  );
};

export default DashboardScreen;
