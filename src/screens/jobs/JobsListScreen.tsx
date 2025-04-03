import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/AppNavigator';
import globalStyles from '../../constants/globalStyles';

type Props = NativeStackScreenProps<RootStackParamList, 'JobsList'>;

const PAGE_SIZE = 10;

const JobsListScreen: React.FC<Props> = ({ route, navigation }) => {
  const { type } = route.params;
  const [jobs, setJobs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  const fetchJobs = async (pageNum = 0) => {
    try {
      setLoading(true);
      const token = await AsyncStorage.getItem('authToken');
      const res = await fetch(`http://10.0.2.2:5000/api/jobDb?type=${type}&limit=${PAGE_SIZE}&skip=${pageNum * PAGE_SIZE}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const text = await res.text();
      console.log('🌐 RAW RESPONSE FROM SERVER:', text);

      try {
        const data = JSON.parse(text);

        if (!res.ok) {
          console.error('❌ API returned error status:', data);
          Alert.alert('Error', data.message || 'Failed to fetch jobs');
          return;
        }

        if (data.length < PAGE_SIZE) setHasMore(false);
        else setHasMore(true);

        if (pageNum === 0) setJobs(data);
        else setJobs((prev) => [...prev, ...data]);

        setPage(pageNum);
      } catch (jsonErr) {
        console.error('❌ Failed to parse JSON:', jsonErr.message);
        Alert.alert('Error', 'Invalid response from server');
      }
    } catch (err) {
      console.error('❌ Network error fetching jobs:', err);
      Alert.alert('Error', 'Network error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs(0); // Load first page
  }, [type]);

  const handleLoadMore = () => {
    if (!loading && hasMore) {
      fetchJobs(page + 1);
    }
  };

  const renderItem = ({ item }: { item: any }) => (
    <TouchableOpacity
      style={[globalStyles.button, { marginVertical: 6 }]}
      onPress={() => navigation.navigate('IndividualJob', { orderId: item.orderNumber })}
    >
      <Text style={globalStyles.buttonText}>
        {item.orderNumber} - {item.status}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={globalStyles.container}>
      <Text style={globalStyles.title}>
        {type === 'upcoming' ? 'Upcoming Jobs' : 'Past Jobs'}
      </Text>

      {loading && page === 0 ? (
        <ActivityIndicator size="large" color="#000" style={{ marginTop: 20 }} />
      ) : jobs.length === 0 ? (
        <Text style={{ marginTop: 20 }}>No jobs found.</Text>
      ) : (
        <>
          <FlatList
            data={jobs}
            keyExtractor={(item, index) => item.id || item.orderNumber || index.toString()}
            renderItem={renderItem}
            contentContainerStyle={{ paddingVertical: 10 }}
          />
          {hasMore && (
            <TouchableOpacity style={globalStyles.button} onPress={handleLoadMore}>
              <Text style={globalStyles.buttonText}>View More Orders</Text>
            </TouchableOpacity>
          )}
        </>
      )}
    </View>
  );
};

export default JobsListScreen;
