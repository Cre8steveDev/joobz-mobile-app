import useToast from '@/components/Toast';
import { API } from '@/constants/BaseUrl';
import { FullFreelancer } from '@/types/global';

const fetchSingleProfessionalById = async (
  userId: string
): Promise<FullFreelancer | null> => {
  // Make request to fetch

  try {
    const response = await API.post('/get-single-professional', {
      userId,
    });

    const freelancer = response.data.freelancer as FullFreelancer;

    console.log('THE FOUND FREELANCER:\n', freelancer);

    return freelancer;

    // Return Null
  } catch (error: any) {
    if (error.message.includes('Network')) {
      useToast('Oops..Network Error Occured. ', 'red', 'white');
    } else {
      useToast(
        'An error occured while retrieving user information. Try again later..',
        'red',
        'white'
      );
    }

    return null;
  }
};

export default fetchSingleProfessionalById;
