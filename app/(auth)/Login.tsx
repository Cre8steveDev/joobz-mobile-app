import {
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  View,
  ScrollView,
} from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { AntDesign } from '@expo/vector-icons';
import Colors from '@/constants/Colors';

import Logo from '@/assets/images/logo-primary-subtext.png';
import AuthHeader from '@/components/ui/auth/AuthHeader';

const Login = () => {
  const router = useRouter();

  // Return JSX to view
  return (
    <SafeAreaView style={styles.container}>
      {/* Go Back Button and Joobz Logo  */}
      <AuthHeader onPress={() => router.back()} />

      <ScrollView>
        <Text></Text>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    padding: 25,
  },
});
