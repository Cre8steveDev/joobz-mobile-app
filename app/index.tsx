import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { StatusBar } from 'expo-status-bar';
import Colors from '@/constants/Colors';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';
import { Redirect } from 'expo-router';

const Index = () => {
  // @ts-ignore
  const auth = useSelector((state) => state.auth as TAuthState);

  if (!auth.firstTimer) {
    <Redirect href={'/(tabs)/Home'} />;
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="light" backgroundColor={Colors.light.primaryDark} />
      <Text>Hello World!!!!!</Text>
    </SafeAreaView>
  );
};

export default Index;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    width: '100%',
  },
});
