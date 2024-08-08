import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import MapView, { Circle, Marker } from 'react-native-maps';
import { useRouter } from 'expo-router';
import { FreelanceMarkerData } from '@/types/global';

type CompType = {
  user: { longitude: number; latitude: number };
  freelancers: FreelanceMarkerData[] | null;
};

const DiscoverMap = ({ user, freelancers }: CompType) => {
  const router = useRouter();

  //   Return Map and JSX
  return (
    <MapView
      style={styles.map}
      initialRegion={{
        latitude: user.latitude,
        longitude: user.longitude,
        latitudeDelta: 0.0011,
        longitudeDelta: 0.0091,
      }}
    >
      <Marker
        coordinate={{
          latitude: user.latitude,
          longitude: user.longitude,
        }}
        title="Your Location"
        image={require('@/assets/images/blue-marker.png')}
        style={{ width: 50, height: 50 }}
      />
      <Circle
        center={{
          latitude: user.latitude,
          longitude: user.longitude,
        }}
        radius={100}
        fillColor="rgba(0, 255, 0, 0.4)"
        // strokeColor="rgba(0, 0, 255, 0.5)"
        strokeWidth={0}
      />

      {/* Render Markers for Other Freelancers  */}
      {freelancers &&
        freelancers.map((professional, index) => (
          <Marker
            key={index}
            coordinate={{
              latitude: professional.latitude,
              longitude: professional.longitude,
            }}
            onPress={() => {
              router.push(
                `/(user)/ServiceProviderDetails?userId=${professional._id}`
              );
            }}
            image={require('@/assets/images/green-marker.png')}
            title={`${professional.fullName} | ${professional.category}`}
          />
        ))}
    </MapView>
  );
};

export default DiscoverMap;

const styles = StyleSheet.create({
  map: {
    width: '100%',
    height: '82%',
  },
});
