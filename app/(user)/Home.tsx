import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const Home = () => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      <Text>Home: The User's Home and Layout</Text>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    flex: 1,
    width: '100%',
    height: '100%',
  },
});
