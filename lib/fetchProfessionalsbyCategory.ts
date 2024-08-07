import useToast from '@/components/Toast';
import { API } from '@/constants/BaseUrl';
import { ProfessionalCardType } from '@/types/global';

const fetchProfessionalsbyCategory = async (
  category: string,
  userLocation: string
): Promise<ProfessionalCardType[] | null> => {
  // Make request to fetch

  try {
    const response = await API.post('/get-professionals-by-category', {
      category,
      userLocation,
    });

    const allFreelancers = response.data
      .allFreelancers as ProfessionalCardType[];

    return allFreelancers;

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

export default fetchProfessionalsbyCategory;
