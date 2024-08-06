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
import DropdownSelect from '@/components/ui/DropDownSelect';

import nigerianStates from '@/constants/NigerianStates';
import serviceTypes from '@/constants/SkillsCategory';

import LoadingScreen from '@/components/ui/LoadingScreen';
import ValidateUserRegistrationForm from '@/lib/validateRegistrationForm';
import OTPAuthScreen from '@/components/ui/forms/OTPAuthScreen';

import { RegisterData } from '@/types/global';
import HandleEmailRegistration from '@/lib/handleEmailRegistration';

const FreelanceRegistration = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const [showOTPModal, setShowOTPModal] = useState(false);

  // Define Form State
  const [formData, setFormData] = useState<RegisterData>({
    fullName: '',
    email: '',
    password: '',
    phoneNumber: '',
    category: 'N/A',
    state: 'Nil',
    country: 'Nigeria',
    displayName: '',
  });

  // Handle Login of User
  const handleEmailAndPasswordRegistration = async () => {
    setLoading(true);
    setShowOTPModal(false);
    setRegistrationSuccess(false);

    // Mini Validation of user Field
    const isValid = ValidateUserRegistrationForm(formData, 'freelancer');

    if (!isValid) {
      setLoading(false);
      return;
    }
    console.log('The Form Data: ', formData);
    const registration = await HandleEmailRegistration(formData, 'Freelancer');
    console.log('After REgistration function.');

    if (registration.success) {
      setShowOTPModal(true);
      setRegistrationSuccess(true);
    }

    setLoading(false);
  };

  // Return JSX to view
  return (
    <>
      {loading && (
        <LoadingScreen
          text="Processing Registration..."
          bgColor="rgba(42, 155, 78, 0.8)"
        />
      )}

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
            <Text style={styles.subheadingBold}>Freelancer Account</Text>
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
              children={
                <Ionicons name="person" size={24} color={Colors.gray} />
              }
            />
          </View>

          {/* Display Name  */}
          <View style={styles.inputBound}>
            <Text style={styles.inputLabel}>Display Name:</Text>
            <CustomTextInput
              value={formData.displayName}
              setValue={(text: string) =>
                setFormData((prev) => ({ ...prev, displayName: text }))
              }
              keyBoardType="name-phone-pad"
              returnType="done"
              children={<Ionicons name="shirt" size={24} color={Colors.gray} />}
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
            <DropdownSelect
              options={nigerianStates}
              label="State of Residence"
              selectedValue={formData.state}
              icon={<Ionicons name="location" size={24} color={Colors.gray} />}
              onValueChange={(text) =>
                setFormData((prev) => ({ ...prev, state: text }))
              }
            />
          </View>

          {/* Services  Category  */}
          <View style={styles.inputBound}>
            <Text style={styles.inputLabel}>Service Category:</Text>
            <DropdownSelect
              options={serviceTypes}
              label="State of Residence"
              selectedValue={formData.category!}
              icon={<Ionicons name="briefcase" size={24} color={Colors.gray} />}
              onValueChange={(text) =>
                setFormData((prev) => ({ ...prev, category: text }))
              }
            />
          </View>

          {/* Phone Number */}
          <View style={styles.inputBound}>
            <Text style={styles.inputLabel}>Phone Number:</Text>
            <CustomTextInput
              value={formData.phoneNumber}
              placeholder="e.g. 08123456789"
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
              onPress={() => handleEmailAndPasswordRegistration()}
              children={
                <Ionicons
                  name="arrow-forward"
                  size={20}
                  color="white"
                  style={{ marginTop: -4 }}
                />
              }
              text={loading ? 'PLEASE WAIT...' : 'SIGN UP'}
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

          {/* OTP Verification Screen */}
          {registrationSuccess && (
            <OTPAuthScreen
              userEmail={formData.email}
              showOTPModal={showOTPModal}
              setShowOTPModal={setShowOTPModal}
              type="Freelancer"
            />
          )}
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

/**
 
 */

export default FreelanceRegistration;

const styles = StyleSheet.create({
  container: {
    padding: 25,
    position: 'relative',
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
