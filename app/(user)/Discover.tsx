import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import React, { useEffect, useState } from 'react';
import { useAuthRedirect } from '@/hooks/useSignedInRedirect';
import useToast from '@/components/Toast';

import LoadingScreen from '@/components/ui/LoadingScreen';
import Colors from '@/constants/Colors';

import { FreelanceMarkerData } from '@/types/global';

import * as Location from 'expo-location';
import { Redirect } from 'expo-router';

import DiscoverMap from '@/components/ui/discover/DiscoverMap';
import fetchMarkerDataForProfessionalsByState from '@/lib/fetchMarkerDataForProfessionalsByState';

// Define type for location
type LocationType = { longitude: number; latitude: number } | null;
type FreelancersMarker = FreelanceMarkerData[] | null;

// Define Component for the Route Screen
const Discover = () => {
  const [loading, setLoading] = useState(true);
  const [userLocation, setUserLocation] = useState<LocationType>(null);
  const [freelancers, setFreelancers] = useState<FreelancersMarker>(null);

  // GET USER'S LOCATION.STATE FROM AUTH
  const { user } = useAuthRedirect();

  if (!user) {
    return <Redirect href={'/(auth)/Login'} />;
  }

  // Obtain Permission from user.
  useEffect(() => {
    setLoading(true);
    const requestLocationPermission = async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          useToast('Permission to access location was denied', 'red', 'white');
          return;
        }

        const location = await Location.getCurrentPositionAsync({});
        setUserLocation({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        });
      } catch (error) {
        useToast('Error requesting location:', 'red', 'white');
      }
    };

    requestLocationPermission().finally(() => setLoading(false));
  }, []);

  // Fetch all Other Freelancers in the User's State
  useEffect(() => {
    fetchMarkerDataForProfessionalsByState(user.location.state).then((data) => {
      setFreelancers(data);
    });
  }, []);

  // Return Loading Screen
  if (loading) {
    return <LoadingScreen text="Loading..." />;
  }

  // Return JSX To the View
  return (
    <SafeAreaView style={styles.container}>
      {/* Header and SubText */}
      <View style={styles.headerContainer}>
        <Text style={styles.heading}>Discover Talents Near You:</Text>
        <Text style={styles.subtext}>
          All professionals across different service types are rendered on the
          map (in green). Tap any of the markers to view their profile. Pan
          across the map to find them.
        </Text>
        <Text style={{ textAlign: 'center', marginTop: 3 }}>{`Found ${
          freelancers ? freelancers.length : 0
        } Registered Service Providers in ${user.location.state} State`}</Text>
      </View>

      {userLocation && (
        <DiscoverMap
          freelancers={freelancers}
          user={{
            latitude: userLocation.latitude,
            longitude: userLocation.longitude,
          }}
        />
      )}
    </SafeAreaView>
  );
};

export default Discover;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  headerContainer: {
    padding: 20,
    backgroundColor: Colors.primary,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    height: 120,
  },

  heading: {
    fontSize: 24,
    fontFamily: 'PoppinsBold',
    color: 'white',
    marginBottom: -6,
    textAlign: 'center',
  },
  subtext: {
    color: Colors.dark,
    textAlign: 'center',
    fontSize: 12,
    paddingRight: 15,
  },
});
