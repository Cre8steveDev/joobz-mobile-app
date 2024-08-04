/**
 * Handle Email Registration
 * Utility function to handle User Sign Up
 * formData - Data from the sign up form
 * type: User or Freelance Registration
 */

import { RegisterData } from '@/types/global';

const HandleEmailRegistration = async (
  formData: RegisterData,
  type: 'User' | 'Freelancer'
) => {
  console.log(formData);
  console.log(type);

  //   Destructure form fields
  const {
    fullName,
    displayName,
    email,
    password,
    phoneNumber,
    category,
    state,
    country,
  } = formData;

  let response: { success: boolean; message: string };

  try {
    //
    // Return Successful Check

    return {
      success: true,
      message: 'Account Created Successfully. Verify OTP.',
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message,
    };
  }
};

export default HandleEmailRegistration;
