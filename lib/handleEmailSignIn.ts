/**
 * Handle Email Registration
 * Utility function to handle User Sign Up
 * formData - Data from the sign up form
 * type: User or Freelance Registration
 */

import useToast from '@/components/Toast';
import { API } from '@/constants/BaseUrl';
import { LoginData, TAuthState } from '@/types/global';

const HandleEmailSignIn = async (formData: LoginData) => {
  try {
    //
    const res = await API.post('/api/auth/signin', formData);
    const { auth, user } = res.data as TAuthState;

    if (!user?.emailVerified) {
      useToast('Email Not yet verified. Check email for OTP', 'black', 'white');

      return { success: undefined, user: null, auth: null };
    }

    useToast('User logged in successfully.', 'green', 'white');

    return {
      success: true,
      user,
      auth,
    };
  } catch (error: any) {
    console.log(error);

    if (error?.message?.includes('Network Error')) {
      useToast('Network Error Occurred.', 'red', 'white');
    } else if (error?.message?.includes('400')) {
      useToast('Invalid Login Credentials.', 'red', 'white');
    } else {
      useToast('An Unknown Error Occured. Try Again.', 'red', 'white');
    }

    return {
      success: false,
      user: null,
      auth: null,
    };
  }
};

export default HandleEmailSignIn;
