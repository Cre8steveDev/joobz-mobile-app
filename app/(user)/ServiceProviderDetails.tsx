import { Dimensions, ScrollView, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import LoadingScreen from '@/components/ui/LoadingScreen';
import { Redirect, useLocalSearchParams } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import Colors from '@/constants/Colors';
import { FullFreelancer } from '@/types/global';
import EmptyResult from '@/components/ui/EmptyResult';
import { SafeAreaView } from 'react-native-safe-area-context';
import fetchSingleProfessionalById from '@/lib/fetchSingleProfessionalById';
import GoBackBtn from '@/components/ui/buttons/GoBackBtn';
import { Image } from 'expo-image';

// Placeholder image
import Placeholder from '@/assets/images/loading-image.gif';
import Button from '@/components/ui/buttons/Button';
import useToast from '@/components/Toast';
import { Ionicons } from '@expo/vector-icons';

/**
 * Service Provider Compnents for the view
 * @returns
 */
const ServiceProviderDetails = () => {
  const { userId } = useLocalSearchParams();

  // Define core component state
  const [loading, setLoading] = useState(false);
  const [pro, setPro] = useState<FullFreelancer | null>(null);

  // If userId is not valid or not in params; then redirect
  if (!userId) {
    return <Redirect href={'/(user)/Home'} />;
  }

  // Set up useEffect to fetch the user data from db
  useEffect(() => {
    setLoading(true);

    // Fetch public profile of the select professional
    fetchSingleProfessionalById(userId as string)
      .then((data) => {
        setPro(data);
      })
      .finally(() => setLoading(false));
  }, [userId]);

  if (loading) {
    return <LoadingScreen text="Loading..." />;
  }

  // if finished loading and pro is still null show user not found
  if (!pro) {
    return (
      <SafeAreaView style={[styles.container, styles.noPro]}>
        <EmptyResult
          heading="Sorry. User not found."
          subtext="An error occured while retrieving information for the selected professional. "
        />
      </SafeAreaView>
    );
  }

  // Handle Message Professional
  const handleSendMessage = () => {
    useToast('Messaging user: ');
  };

  // Return JSX to View
  return (
    <SafeAreaView style={styles.container}>
      {/* Define Back Button  */}
      <GoBackBtn />

      {/* Place User Image here */}
      <View style={styles.baseDetailsContainer}>
        <Image
          source={pro.profilePicture}
          placeholderContentFit="cover"
          placeholder={Placeholder}
          contentFit="cover"
          style={styles.image}
        />

        <Text style={styles.name}>{pro.fullName}</Text>
        <Text style={styles.category}>
          {pro.category} | {pro.location.state}, {pro.location.country}
        </Text>

        <Text style={styles.ratingText}>
          Ratings:
          {'⭐'.repeat(pro.averageRating)}{' '}
          <Text>{` (${pro.averageRating})  |  `}</Text>
          <Text>{` (${pro.reviews.length} Reviews)`}</Text>
        </Text>
      </View>

      <ScrollView style={styles.scrollContainer}>
        {/* Define the remainder of the UI */}
        <View style={styles.detailsContainer}>
          {/* Buttons Container */}
          <View style={styles.buttonContainer}>
            <Button
              text="Message"
              bgColor={Colors.primary}
              textColor="white"
              onPress={() => handleSendMessage()}
              extraStyles={{
                paddingVertical: 6,
                paddingHorizontal: 8,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 6,
                // width: '40%',
              }}
              children={<Ionicons name="chatbox" color={'white'} size={18} />}
            />

            <Button
              text="Invite to Job"
              bgColor={Colors.secondary}
              textColor="white"
              onPress={() => handleSendMessage()}
              extraStyles={{
                paddingVertical: 6,
                paddingHorizontal: 8,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 6,
                // width: '40%',
              }}
              children={
                <Ionicons name="arrow-forward" color={'white'} size={18} />
              }
            />
          </View>
          <Text>User ServiceProviderDetails</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ServiceProviderDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },

  scrollContainer: {
    width: '100%',
    height: '100%',
    position: 'relative',
  },

  noPro: {
    justifyContent: 'center',
  },

  baseDetailsContainer: {
    position: 'absolute',
    width: '100%',
    top: 0,
    left: 0,
  },

  image: {
    width: '100%',
    height: 330,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },

  detailsContainer: {
    width: '100%',
    height: Dimensions.get('screen').height,
    backgroundColor: Colors.neutral,
    marginTop: 390,
    padding: 20,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },

  name: {
    textAlign: 'center',
    fontFamily: 'PoppinsExtraBold',
    fontSize: 32,
    color: Colors.gray,
  },

  category: {
    textAlign: 'center',
    fontFamily: 'PoppinsSemiBold',
    marginTop: -8,
    fontSize: 16,
    color: Colors.gray,
  },

  ratingText: {
    textAlign: 'center',
    fontSize: 14,
  },

  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
    gap: 7,
    marginBottom: 10,
  },
});
