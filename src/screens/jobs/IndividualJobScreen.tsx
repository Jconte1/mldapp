import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/AppNavigator';
import globalStyles from '../../constants/globalStyles';

type Props = NativeStackScreenProps<RootStackParamList, 'IndividualJob'>;

const IndividualJobScreen: React.FC<Props> = ({ route }) => {
  const { orderId } = route.params;
  const [job, setJob] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const token = await AsyncStorage.getItem('authToken');
        const res = await fetch(`http://10.0.2.2:5000/api/jobDb/${orderId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();
        setJob(data);
      } catch (err) {
        console.error('❌ Error fetching job:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchJob();
  }, [orderId]);

  if (loading) {
    return <ActivityIndicator size="large" color="#000" style={{ marginTop: 20 }} />;
  }

  if (!job) {
    return <Text style={{ marginTop: 20 }}>Job not found.</Text>;
  }

  return (
    <View style={globalStyles.container}>
      <Text style={globalStyles.title}>Order #{job.orderNumber}</Text>
      <Text>Status: {job.status}</Text>
      <Text>Location: {job.locationId}</Text>
      <Text>Ship Via: {job.shipVia}</Text>
      <Text>Will Call: {job.willCall ? 'Yes' : 'No'}</Text>
      <Text>Requested On: {new Date(job.requestedOn).toLocaleDateString()}</Text>

      <Text style={[globalStyles.title, { marginTop: 20 }]}>Items:</Text>
      {job.items && job.items.map((item: any, idx: number) => (
        <View key={idx} style={styles.item}>
          <Text>Inventory ID: {item.inventoryID}</Text>
          <Text>ETA: {item.eta ? new Date(item.eta).toLocaleDateString() : 'N/A'}</Text>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
});

export default IndividualJobScreen;

