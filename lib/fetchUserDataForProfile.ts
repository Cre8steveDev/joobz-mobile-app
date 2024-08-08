import useToast from '@/components/Toast';
import { API } from '@/constants/BaseUrl';
import { FullUser } from '@/types/global';

/**
 * Fetch User Data for Profile
 * @param userId - Id of the user to Fetch
 * @returns FullUser Data Object or Null if an error occured
 */
const fetchUserDataForProfile = async (
  userId: string
): Promise<FullUser | null> => {
  // Make request to fetch

  try {
    const response = await API.post('/api/auth/get-user-profile-data', {
      userId,
    });

    const userData = response.data.user as FullUser;
    return userData;

    // Return Null
  } catch (error: any) {
    if (error.message.includes('Network')) {
      useToast('Oops..Network Error Occured. ', 'red', 'white');
    } else {
      useToast(
        'An error occured while retrieving data. Try again later..',
        'red',
        'white'
      );
    }
    return null;
  }
};

export default fetchUserDataForProfile;
