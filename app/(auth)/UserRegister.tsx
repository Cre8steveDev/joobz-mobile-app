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

type UserRegisterData = {
  fullName: string;
  email: string;
  password: string;
  phoneNumber: string;
  stateOfResidence: string;
};

const UserRegistration = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  // Define Form State
  const [formData, setFormData] = useState<UserRegisterData>({
    fullName: '',
    email: '',
    password: '',
    phoneNumber: '',
    stateOfResidence: '',
  });

  // Handle Login of User
  const handleLogin = () => {
    console.warn('User Sign In ');
  };

  // Return JSX to view
  return (
    <SafeAreaView style={styles.container}>
      {/* Go Back Button and Joobz Logo  */}
      <AuthHeader onPress={() => router.back()} />

      <ScrollView
        showsVerticalScrollIndicator={false}
        automaticallyAdjustKeyboardInsets
        keyboardDismissMode="interactive"
      >
        <Text style={styles.headingText}>
          Create an Account to Get Started.
        </Text>
        <Text style={styles.subheading}>
          You're creating a{' '}
          <Text style={styles.subheadingBold}>User Account</Text>
        </Text>

        {/* Define Form Inputs */}
        {/* Full Name  */}
        <View style={styles.inputBound}>
          <Text style={styles.inputLabel}>Full Legal Name:</Text>
          <CustomTextInput
            value={formData.fullName}
            setValue={(text: string) =>
              setFormData((prev) => ({ ...prev, fullName: text }))
            }
            keyBoardType="name-phone-pad"
            returnType="done"
            children={<Ionicons name="person" size={24} color={Colors.gray} />}
          />
        </View>

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

        {/* State of Residence  */}
        <View style={styles.inputBound}>
          <Text style={styles.inputLabel}>State of Residence:</Text>
          <CustomTextInput
            value={formData.stateOfResidence}
            setValue={(text: string) =>
              setFormData((prev) => ({ ...prev, stateOfResidence: text }))
            }
            keyBoardType="default"
            returnType="done"
            children={
              <Ionicons name="location" size={24} color={Colors.gray} />
            }
          />
        </View>

        {/* Phone Number */}
        <View style={styles.inputBound}>
          <Text style={styles.inputLabel}>Phone Number:</Text>
          <CustomTextInput
            value={formData.phoneNumber}
            setValue={(text: string) =>
              setFormData((prev) => ({ ...prev, phoneNumber: text }))
            }
            keyBoardType="default"
            returnType="done"
            children={
              <Ionicons name="phone-portrait" size={24} color={Colors.gray} />
            }
          />
        </View>

        {/* Sign In Button */}
        <View>
          <Button
            onPress={() => handleLogin()}
            children={
              <Ionicons
                name="arrow-forward"
                size={20}
                color="white"
                style={{ marginTop: -4 }}
              />
            }
            text={loading ? 'PLEASE WAIT...' : 'NEXT STEP'}
            disabled={loading}
            bgColor={Colors.dark}
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
          onPress={() => router.push('/(auth)/Login')}
        >
          <Text style={styles.noAccountText}>
            Already have an Account?{' '}
            <Text style={styles.noAccountAction}>Sign In Now</Text>
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

/**
 
 */

export default UserRegistration;

const styles = StyleSheet.create({
  container: {
    padding: 25,
  },

  headingText: {
    fontFamily: 'PoppinsBold',
    width: '100%',
    fontSize: 34,
    lineHeight: 40,
    marginTop: 20,
    color: Colors.dark,
  },
  subheading: {
    fontFamily: 'PoppinsSemiBold',
    fontSize: 18,
    color: Colors.gray,
  },
  subheadingBold: {
    color: Colors.secondary,
  },
  inputBound: {
    marginTop: 10,
  },

  inputLabel: {
    fontFamily: 'PoppinsSemiBold',
    color: Colors.gray,
  },

  noAccountContainer: {
    marginBottom: 80,
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
