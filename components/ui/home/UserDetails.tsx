import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import Colors from '@/constants/Colors';

type UserDetailsType = {
  profilePicture: string;
  fullName: string;
  state: string;
  country: string;
};

const UserDetails = ({
  profilePicture,
  fullName,
  state,
  country,
}: UserDetailsType) => {
  const router = useRouter();

  // Return JSX
  return (
    <View style={styles.mainContainer}>
      {/* Define Profile Image container */}

      <View style={styles.detailsContainer}>
        <TouchableOpacity
          onPress={() => router.push('/(user)/UserProfile')}
          style={styles.imageContainer}
        >
          <Image source={profilePicture} style={styles.image} />
        </TouchableOpacity>

        <View>
          <Text style={styles.name}>{fullName}</Text>
          <Text style={styles.location}>{`${state}, ${country}`}</Text>
        </View>
      </View>
      {/* Show Notifications Bell */}

      <View style={styles.notificationContainer}>
        <Ionicons name="notifications" size={24} color={'white'} />
      </View>
    </View>
  );
};

export default UserDetails;

const styles = StyleSheet.create({
  mainContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  detailsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  notificationContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  textContainer: {},
  imageContainer: {
    overflow: 'hidden',
    borderRadius: 100,
  },
  image: {
    width: 50,
    height: 50,
  },
  name: {
    fontFamily: 'PoppinsSemiBold',
    color: Colors.dark,
    fontSize: 22,
    marginBottom: -8,
  },
  location: {
    color: Colors.white,
    fontFamily: 'PoppinsSemiBold',
  },
});
