import { StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import LoadingScreen from '@/components/ui/LoadingScreen';
import { useLocalSearchParams, usePathname } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import Colors from '@/constants/Colors';

const ServiceProviderDetails = () => {
  const [loading, setLoading] = useState(true);
  const pathname = usePathname();

  console.log('PathName: ', pathname);
  const param = useLocalSearchParams();
  console.log('Id of the selected Professional: ', param);

  if (loading) {
    return <LoadingScreen text="Loading..." />;
  }
  return (
    <View>
      <StatusBar style="light" backgroundColor={Colors.primary} animated />
      <Text>User ServiceProviderDetails</Text>
    </View>
  );
};

export default ServiceProviderDetails;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    flex: 1,
    width: '100%',
    height: '100%',
  },
});
