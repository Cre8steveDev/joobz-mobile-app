/**
 * Handle Email Registration
 * Utility function to handle User Sign Up
 * formData - Data from the sign up form
 * type: User or Freelance Registration
 */

import useToast from '@/components/Toast';
import { API } from '@/constants/BaseUrl';
import { RegisterData } from '@/types/global';

const HandleEmailRegistration = async (
  formData: RegisterData,
  type: 'User' | 'Freelancer'
) => {
  try {
    //

    console.log('Gotten into the reg function');
    if (type === 'User') {
      const res = await API.post('/api/auth/signup/user', formData);

      useToast(
        'User Account Created Successfully. Verify OTP.',
        'green',
        'white'
      );
    } else if (type === 'Freelancer') {
      const res = await API.post('/api/auth/signup/freelancer', formData);
      useToast(
        'Freelancer Account Created Successfully. Verify OTP',
        'green',
        'white'
      );
    }

    return {
      success: true,
      message: 'Account Created Successfully. Verify OTP.',
    };
  } catch (error: any) {
    console.log(error.message);
    console.log(error);
    if (error?.message?.includes('Network Error')) {
      useToast('Network Error Occurred.', 'red', 'white');
    } else if (error?.message?.includes('400')) {
      useToast('Invalid Form Data. Please check again.', 'red', 'white');
    } else {
      useToast('An Unknown Error Occured. Try Again.', 'red', 'white');
    }

    return {
      success: false,
      message: error.message,
    };
  }
};

export default HandleEmailRegistration;
