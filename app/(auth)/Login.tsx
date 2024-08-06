import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
} from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import Colors from '@/constants/Colors';

import AuthHeader from '@/components/ui/auth/AuthHeader';
import CustomTextInput from '@/components/ui/forms/CustomTextInput';
import CustomPasswordInput from '@/components/ui/forms/CustomPasswordInput';
import Button from '@/components/ui/buttons/Button';
import SocialLogins from '@/components/ui/SocialLogins';
import { StatusBar } from 'expo-status-bar';
import HandleEmailSignIn from '@/lib/handleEmailSignIn';
import { LoginData } from '@/types/global';
import { useDispatch } from 'react-redux';
import useToast from '@/components/Toast';
import OTPAuthScreen from '@/components/ui/forms/OTPAuthScreen';
import { loginSuccess } from '@/providers/redux/authSlice';
import LoadingScreen from '@/components/ui/LoadingScreen';

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [showOTPModal, setShowOTPModal] = useState(false);

  // Define router and dispatcher
  const dispatch = useDispatch();
  const router = useRouter();

  const [formData, setFormData] = useState<LoginData>({
    email: '',
    password: '',
  });

  // Check fields are field
  const isValidForm =
    formData.email.includes('@') &&
    formData.email.length > 6 &&
    formData.password.length > 6;

  // Handle Login of User
  const handleLogin = async () => {
    setLoading(true);
    const response = await HandleEmailSignIn(formData);

    // Show OTP Modal if email is not yet verified.
    if (response.success === undefined) {
      setTimeout(() => setShowOTPModal(true), 1500);
      setLoading(false);
      return;
    }

    // Reset Loading state
    setLoading(false);

    // @ts-ignore
    if (response.success && response.user?.ROLE === 'FREELANCER') {
      setFormData({ email: '', password: '' });
      dispatch(loginSuccess({ user: response.user, auth: response.auth }));
      router.replace('/(freelancer)/Home');

      // @ts-ignore
    } else if (response.success && response.user?.ROLE === 'USER') {
      setFormData({ email: '', password: '' });
      dispatch(loginSuccess({ user: response.user, auth: response.auth }));
      router.replace('/(user)/Home');
    }
  };

  if (loading)
    return (
      <LoadingScreen
        text="Signing In..."
        bgColor={Colors.secondary}
        textColor={Colors.white}
      />
    );

  // Return JSX to view
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" animated />
      {/* Go Back Button and Joobz Logo  */}
      <AuthHeader onPress={() => router.push('/')} />

      <ScrollView>
        <Text style={styles.headingText}>Sign in to your Account.</Text>
        <Text style={styles.subheading}>Get access to all exciting offers</Text>

        {/* Define Form Inputs */}
        {/* Email Address  */}
        <View style={styles.inputBound}>
          <Text style={styles.inputLabel}>Email Address:</Text>
          <CustomTextInput
            value={formData.email}
            setValue={(text: string) =>
              setFormData((prev) => ({ ...prev, email: text }))
            }
            keyBoardType="email-address"
            children={
              <Ionicons name="mail-outline" size={24} color={Colors.gray} />
            }
          />
        </View>

        {/* Password Input  */}
        <View style={styles.inputBound}>
          <Text style={styles.inputLabel}>Password:</Text>
          <CustomPasswordInput
            value={formData.password}
            setValue={(text: string) =>
              setFormData((prev) => ({ ...prev, password: text }))
            }
            children={
              <Ionicons
                name="lock-closed-outline"
                size={24}
                color={Colors.gray}
              />
            }
          />
        </View>

        {/* Sign In Button */}
        <View>
          <Button
            onPress={() => handleLogin()}
            children={
              <Ionicons
                name="log-in"
                size={20}
                color="white"
                style={{ marginTop: -4 }}
              />
            }
            text={loading ? 'PLEASE WAIT...' : 'SIGN IN NOW'}
            disabled={loading || !isValidForm}
            bgColor={Colors.primary}
            textColor={Colors.white}
            extraStyles={{
              padding: 10,
              borderRadius: 25,
              marginTop: 15,
            }}
          />
        </View>

        {/* Social Logins  */}
        <SocialLogins />

        {/* Already Have an Account Text */}
        <TouchableOpacity
          style={styles.noAccountContainer}
          onPress={() => router.push('/')}
        >
          <Text style={styles.noAccountText}>
            Don't have an Account yet?{' '}
            <Text style={styles.noAccountAction}>Select Account Type</Text>
          </Text>
        </TouchableOpacity>

        {/* OTP Verification Screen */}
        {showOTPModal && (
          <OTPAuthScreen
            userEmail={formData.email}
            showOTPModal={showOTPModal}
            setShowOTPModal={setShowOTPModal}
            type="Freelancer"
          />
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

/**
 
 */

export default Login;

const styles = StyleSheet.create({
  container: {
    padding: 25,
  },

  headingText: {
    fontFamily: 'PoppinsBold',
    width: '80%',
    fontSize: 34,
    lineHeight: 40,
    marginTop: 20,
    color: Colors.dark,
  },
  subheading: {
    fontFamily: 'PoppinsSemiBold',
    color: Colors.gray,
  },
  inputBound: {
    marginTop: 10,
  },

  inputLabel: {
    fontFamily: 'PoppinsSemiBold',
    color: Colors.gray,
  },

  noAccountContainer: {
    marginTop: 10,
  },
  noAccountText: {
    textAlign: 'center',
    fontFamily: 'PoppinsRegular',
    fontSize: 13,
  },
  noAccountAction: {
    color: Colors.secondary,
    fontFamily: 'PoppinsSemiBold',
  },
});
