import { API } from '@/constants/BaseUrl';

/**
 * Handle Update User Location
 * @param userId - Id of the user to Fetch
 * @param longitude - user's location longitude
 * @param latitude - user's location latitude
 * @returns void
 */
const handleUpdateUserLocation = async (
  userId: string,
  longitude: number,
  latitude: number
) => {
  // Make request to fetch
  try {
    await API.post('/api/auth/update-location', {
      userId,
      longitude,
      latitude,
    });
  } catch (error: any) {}
};

export default handleUpdateUserLocation;
