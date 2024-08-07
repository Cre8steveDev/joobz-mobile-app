import { StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import Colors from '@/constants/Colors';

const GoBackBtn = () => {
  const router = useRouter();
  return (
    <TouchableOpacity onPress={() => router.back()} style={styles.container}>
      <Ionicons name="arrow-back" color={'white'} size={20} />
    </TouchableOpacity>
  );
};

export default GoBackBtn;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    borderRadius: 100,
    backgroundColor: Colors.secondary,
    justifyContent: 'center',
    alignItems: 'center',
    top: 60,
    left: 20,
    width: 40,
    height: 40,
    zIndex: 5,
  },
});
