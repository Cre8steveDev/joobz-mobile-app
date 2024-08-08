import useToast from '@/components/Toast';
import { API } from '@/constants/BaseUrl';
import { FreelanceMarkerData } from '@/types/global';

const fetchMarkerDataForProfessionalsByState = async (
  userLocation: string
): Promise<FreelanceMarkerData[] | null> => {
  // Make request to fetch

  try {
    const response = await API.post('/get-professionals-markers', {
      userLocation,
    });

    const freelancers = response.data.allFreelancers as FreelanceMarkerData[];

    // console.log('FREELANCERS IN EDO STATE: ', freelancers);

    return freelancers;

    // Return Null
  } catch (error: any) {
    if (error.message.includes('Network')) {
      useToast('Oops..Network Error Occured. ', 'red', 'white');
    } else {
      useToast(
        'An error occured while retrieving markers data. Try again later..',
        'red',
        'white'
      );
    }

    return null;
  }
};

export default fetchMarkerDataForProfessionalsByState;
