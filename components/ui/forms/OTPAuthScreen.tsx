import { Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import Colors from '@/constants/Colors';
import AuthHeader from '../auth/AuthHeader';
import OTPInput from './OTPInput';
import useToast from '@/components/Toast';
import Button from '../buttons/Button';
import { Ionicons } from '@expo/vector-icons';
import Congratulations from '@/components/Congratulations';

import hideEmail from '@/lib/hideEmailAddress';

import { useRouter } from 'expo-router';
import { API } from '@/constants/BaseUrl';

type OTPAuthType = {
  userEmail: string;
  setShowOTPModal: React.Dispatch<React.SetStateAction<boolean>>;
  showOTPModal: boolean;
  type: 'User' | 'Freelancer';
};

// OTP Screen Component
const OTPAuthScreen = ({
  userEmail,
  showOTPModal,
  setShowOTPModal,
  type,
}: OTPAuthType) => {
  const [loading, setLoading] = useState(false);
  const [OTPTimer, setOTPTimer] = useState(60);

  // Define state for the entered OTP Value
  const [OTPValue, setOTPVALUE] = useState('');
  const [OTPVerifySuccess, setOTPVerifySuccess] = useState(false);
  const [triggerResend, setTriggerResend] = useState(1);
  const [otpError, setOtpError] = useState(false);
  const [otpMessage, setOtpMessage] = useState('');

  //   Define router
  const router = useRouter();

  //   Set UP OTP Resent Timer
  useEffect(() => {
    setOTPTimer(60);

    const interval = setInterval(() => {
      setOTPTimer((prev) => prev - 1);
    }, 1000);

    // Prevent leaks
    return () => clearInterval(interval);
  }, [triggerResend]);

  //   Handle Verify OTP
  const handleVerifyOTP = async () => {
    setLoading(true);
    setOtpError(false);
    console.log('Verifying OTP');

    try {
      const response = await API.post('/api/auth/verify-otp', {
        userType: type,
        OTP: OTPValue,
        email: userEmail,
      });

      if (response.data.success) {
        useToast('OTP Verification Successful.', 'green', 'white');

        setOTPVerifySuccess(true);
      }
    } catch (error: any) {
      setOtpError(true);
      if (error?.message?.includes('401'))
        setOtpMessage('OTP has expired. Request a new one.');
      if (error?.message?.includes('403'))
        setOtpMessage('Invalid OTP. Please confirm the code sent.');
      if (error?.message?.includes('404'))
        setOtpMessage('An Unknown Error Occurred.');
    }

    return setLoading(false);
  };

  //   Re-request new OTP to mail
  const resendOTPCode = async () => {
    try {
      const response = await API.post('/api/auth/renew-otp', {
        userType: type,
        email: userEmail,
      });

      if (response.data.success) {
        useToast('New OTP Requested. Check your mail');
      }
    } catch (error) {
      console.log(error);
      useToast('Error Requesting New OTP. Try again later.');
    }

    setTriggerResend((prev) => ++prev);
  };

  //   Return JSX Element for the Modal
  return (
    <Modal
      visible={showOTPModal}
      animationType="slide"
      onRequestClose={() => setShowOTPModal(false)}
    >
      <StatusBar backgroundColor={Colors.gray} translucent />

      <View style={styles.modalContainer}>
        {!OTPVerifySuccess && (
          <>
            <AuthHeader onPress={() => setShowOTPModal(false)} />
            <View style={styles.modalContent}>
              <Text style={styles.headingText}>OTP Authentication</Text>
              <Text style={styles.subheading}>
                Please enter the short code sent to your email.{' '}
              </Text>
              <Text style={styles.subheadingBold}>{hideEmail(userEmail)}</Text>

              {/* Input Button */}
              <View style={{ width: '100%' }}>
                <OTPInput
                  length={5}
                  onOTPChange={(text: string) => setOTPVALUE(text)}
                  containerStyle={{ marginTop: 20 }}
                  inputStyle={{ borderRadius: 5 }}
                  filledInputStyle={{
                    backgroundColor: Colors.primary,
                  }}
                />
              </View>

              {/* Resend OTP Request */}
              <View style={styles.resendOTPContainer}>
                {OTPTimer > 0 && (
                  <Text style={styles.resendText}>
                    Resend OTP code in{' '}
                    <Text style={styles.resendTimer}>{OTPTimer}s</Text>{' '}
                  </Text>
                )}
                {OTPTimer <= 0 && (
                  <TouchableOpacity onPress={() => resendOTPCode()}>
                    <Text style={styles.resendLink}>Request New OTP</Text>
                  </TouchableOpacity>
                )}
              </View>

              {/* Complete Registration Button  */}
              <Button
                children={
                  <Ionicons name="checkmark-circle" color={'white'} size={24} />
                }
                text={loading ? 'Verifying...' : 'Complete Registration'}
                disabled={loading || OTPValue.length < 5}
                textColor="white"
                bgColor={Colors.secondary}
                onPress={handleVerifyOTP}
                extraStyles={{ padding: 12, borderRadius: 7, marginTop: 10 }}
              />

              {!loading && otpError && (
                <Text style={styles.otpErrorMessage}>{otpMessage}</Text>
              )}
            </View>
          </>
        )}

        {/* Show Congratulations on Successful OTP Verification */}
        {OTPVerifySuccess && (
          <Congratulations
            miniHeading="Welcome to the community!"
            heading="Congratulations!"
            triggerAction={() => {
              router.dismissAll();
              router.push('/(auth)/Login');
            }}
          />
        )}
      </View>
    </Modal>
  );
};

export default OTPAuthScreen;

// Define Style Sheet for the OTP View Component
const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    width: '100%',
    height: '100%',
    backgroundColor: Colors.white,
    zIndex: 15,
    padding: 25,
  },

  modalContent: {
    backgroundColor: Colors.white,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: '100%',
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
    fontSize: 14,
    color: Colors.gray,
  },

  subheadingBold: {
    color: Colors.secondary,
    fontFamily: 'PoppinsBold',
    fontSize: 18,
  },

  resendOTPContainer: {
    marginVertical: 15,
  },
  resendText: {
    fontFamily: 'PoppinsRegular',
  },
  resendTimer: { fontFamily: 'PoppinsSemiBold', color: Colors.secondary },
  resendLink: { fontFamily: 'PoppinsExtraBold', color: Colors.secondary },
  otpErrorMessage: {
    color: 'red',
    textAlign: 'center',
    marginHorizontal: 5,
  },
});
