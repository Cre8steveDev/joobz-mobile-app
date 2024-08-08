import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';

import LoadingScreen from '@/components/ui/LoadingScreen';
import { SafeAreaView } from 'react-native-safe-area-context';
import useToast from '@/components/Toast';

// Import modules for map
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';

// Define type for location
type LocationType = { longitude: number; latitude: number } | null;

const GetDirectionToProfessional = () => {
  const [loading, setLoading] = useState(true);
  const [userLocation, setUserLocation] = useState<LocationType>(null);

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
        setUserLocation(null);
      }
    };

    requestLocationPermission().finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <LoadingScreen text="Loading..." />;
  }

  // Return JSX To the View
  return (
    <SafeAreaView>
      <Text>Discover Talents Near You:</Text>
      {userLocation && (
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: userLocation.latitude,
            longitude: userLocation.longitude,
            latitudeDelta: 0.0003,
            longitudeDelta: 0.0081,
          }}
        >
          <Marker
            coordinate={{
              latitude: userLocation.latitude,
              longitude: userLocation.longitude,
            }}
            title="Your Location"
          />
        </MapView>
      )}
    </SafeAreaView>
  );
};

export default GetDirectionToProfessional;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    flex: 1,
    width: '100%',
    height: '100%',
  },
  map: {
    width: '100%',
    height: '100%',
  },
});
