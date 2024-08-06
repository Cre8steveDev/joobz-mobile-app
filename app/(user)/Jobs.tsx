import { Button, StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logOut } from '@/providers/redux/authSlice';
import LoadingScreen from '@/components/ui/LoadingScreen';

const Jobs = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  //@ts-ignore
  const { auth, user } = useSelector((state) => state.auth);

  if (loading) {
    return <LoadingScreen text="Loading..." />;
  }
  return (
    <View>
      <Text>User Profile</Text>
      <Button onPress={() => dispatch(logOut())} title="Log Out" />
    </View>
  );
};

export default Jobs;


const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    flex: 1,
    width: '100%',
    height: '100%',
  },
});

