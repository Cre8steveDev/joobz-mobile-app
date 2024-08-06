import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
} from 'react-native';
import React from 'react';
import { StatusBar } from 'expo-status-bar';
import Colors from '@/constants/Colors';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import Button from '@/components/ui/buttons/Button';

// Import Icons
import { Ionicons, FontAwesome6 } from '@expo/vector-icons';
import Onboarding from '@/components/Onboarding';

import { Redirect } from 'expo-router';
import { useAuthRedirect } from '@/hooks/useSignedInRedirect';

// Define Component
const Index = () => {
  // Instantiate router.
  const router = useRouter();

  // Check if user is already logged in and state is saved
  // if Yes, redirect to the appropriate home screen.
  const { isAuthenticated, redirect } = useAuthRedirect();
  if (isAuthenticated) return <Redirect href={redirect!} />;

  // Return JSX
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="dark" translucent />
      <ScrollView>
        {/* Welcome and Skip Button Component  */}
        <View style={styles.actionContainer}>
          <Text style={styles.actionText}>Welcome to Joobz</Text>
          <TouchableOpacity
            style={styles.actionBtnContainer}
            onPress={() => router.push('/(auth)/Login')}
          >
            <Text style={styles.actionBtnText}>Skip</Text>
          </TouchableOpacity>
        </View>

        {/* Carousel-ish Onboarding */}
        <Onboarding />

        {/* Login Components  */}
        <View style={styles.authContainer}>
          {/* User Registration */}
          <Button
            onPress={() => router.push('/(auth)/UserRegister')}
            children={
              <Ionicons
                name="briefcase-outline"
                size={20}
                color="white"
                style={{ marginTop: -4 }}
              />
            }
            text="Register To Find Help"
            bgColor={Colors.primary}
            textColor={Colors.white}
            extraStyles={{
              padding: 10,
              borderRadius: 25,
              marginVertical: 10,
            }}
          />

          {/* Freelancer Registration */}
          <Button
            onPress={() => router.push('/(auth)/FreelanceRegister')}
            children={
              <FontAwesome6
                name="person-skiing"
                size={20}
                color="white"
                style={{ marginTop: -4 }}
              />
            }
            text="Become a Freelancer"
            bgColor={Colors.secondary}
            textColor={Colors.white}
            extraStyles={{
              padding: 10,
              borderRadius: 25,
            }}
          />
        </View>

        {/* Already Have an Account Text */}
        <TouchableOpacity
          style={styles.existingAccountContainer}
          onPress={() => router.push('/(auth)/Login')}
        >
          <Text style={styles.existingAccountText}>
            Already have an Account?{' '}
            <Text style={styles.existingAccountAction}>Sign In</Text>
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Index;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    width: '100%',
    paddingHorizontal: 20,
  },
  actionContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 15,
  },
  actionText: {
    fontSize: 18,
    color: Colors.gray,
    fontFamily: 'PoppinsSemiBold',
  },
  actionBtnContainer: {
    padding: 5,
    backgroundColor: Colors.neutral,
    paddingHorizontal: 15,
    borderRadius: 6,
  },
  actionBtnText: {},
  authContainer: {},
  existingAccountContainer: {
    marginTop: 10,
  },
  existingAccountText: {
    textAlign: 'center',
    fontFamily: 'PoppinsRegular',
  },
  existingAccountAction: {
    fontFamily: 'PoppinsExtraBold',
    color: Colors.secondary,
  },
});
