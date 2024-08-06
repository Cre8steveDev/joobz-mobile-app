import { Button, StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logOut } from '@/providers/redux/authSlice';
import LoadingScreen from '@/components/ui/LoadingScreen';
import { useAuthRedirect } from '@/hooks/useSignedInRedirect';
import { Redirect } from 'expo-router';

const Profile = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  //  Return to Login Page if user is not authenticated
  const { isAuthenticated } = useAuthRedirect();
  if (!isAuthenticated) return <Redirect href={'/(auth)/Login'} />;

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

export default Profile;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    flex: 1,
    width: '100%',
    height: '100%',
  },
});
