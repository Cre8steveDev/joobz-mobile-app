import { FlatList, Image, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import LoadingScreen from '@/components/ui/LoadingScreen';
import { useLocalSearchParams, useRouter } from 'expo-router';

// Import Service grid to pick image and category name
import ServicesGrid from '@/constants/ServicesGrid';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import Colors from '@/constants/Colors';
import { ProfessionalCardType } from '@/types/global';
import { useAuthRedirect } from '@/hooks/useSignedInRedirect';
import fetchProfessionalsbyCategory from '@/lib/fetchProfessionalsbyCategory';
import useToast from '@/components/Toast';
import ProfessionalCard from '@/components/ui/professionalCard/ProfessionalCard';
import EmptyResult from '@/components/ui/EmptyResult';

const ServiceCategoryDetailPage = () => {
  // Get static page data based on param
  const { category } = useLocalSearchParams();
  const pageData = ServicesGrid.find((service) => service.label === category);

  // Define page router
  const router = useRouter();

  // Define Page States
  const [loading, setLoading] = useState(true);
  const [noOneNearUser, setNoOneNearUser] = useState(false);
  const [categoryProfessionals, setCategoryProfessionals] = useState<
    ProfessionalCardType[]
  >([]);

  // Get user from context
  const { user } = useAuthRedirect();

  //
  if (!pageData || !user) {
    return (
      <LoadingScreen
        text="Invalid category..."
        bgColor="red"
        textColor="white"
      />
    );
  }

  // Fetch All Professionals based on the category
  // sorted by user's location
  useEffect(() => {
    setNoOneNearUser(false);
    setLoading(true);

    // Fetch the data
    fetchProfessionalsbyCategory(category + '', user.location.state).then(
      (data) => {
        if (data) {
          setCategoryProfessionals(data);

          // Check if any of the professionals are near user's state
          if (data.length > 0) {
            const isNearUser = !data.some(
              (pro) => pro.location.state === user.location.state
            );
            useToast(`${user.location.state}`);
            setNoOneNearUser(isNearUser);
          }
        } else {
          setCategoryProfessionals([]);
        }

        setLoading(false);
      }
    );
  }, [category, pageData]);

  // Loading Screen
  if (loading) {
    return (
      <LoadingScreen
        text="Please wait..."
        bgColor={Colors.primary}
        textColor="white"
      />
    );
  }

  // Return JSX of Page
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" backgroundColor={Colors.primary} animated />

      {/* Header Component for Services based on category. */}
      <View style={styles.headerContainer}>
        <View style={styles.imageContainer}>
          <Image source={pageData?.image} style={styles.image} />
        </View>

        <View style={styles.textContainer}>
          <Text style={styles.heading}>{pageData?.label}</Text>
          <Text style={styles.subText}>
            Access a network of Trusted Professionals offering quality services.
          </Text>
        </View>
      </View>

      {/* Define Flatlist for Services based on selected category. */}
      <View style={styles.secondaryContainer}>
        {!loading && categoryProfessionals.length > 0 && (
          <Text style={styles.infoText}>
            Search Results: Professionals Near you are shown first.
          </Text>
        )}

        {/* If No professional is found near the user  */}

        {noOneNearUser && (
          <View style={styles.noOneContainer}>
            <Text style={styles.noOneHeading}>Oops. 🤔</Text>
            <Text style={styles.noOneSubtext}>
              No professionals near you. Here are results from other locations
              below.
            </Text>
          </View>
        )}

        {/* Render flatlist of other Professionals  */}
        <FlatList
          data={categoryProfessionals}
          initialNumToRender={10}
          contentContainerStyle={{ gap: 13 }}
          ListEmptyComponent={
            <EmptyResult
              heading="Oops...No one offering that Service yet."
              subtext="Help us spread the word and expand our network of professionals."
            />
          }
          renderItem={({ item, index }) => (
            <ProfessionalCard
              profilePicture={item.profilePicture}
              index={index}
              userId={item._id!}
              fullName={item.fullName}
              category={item.category}
              averageRating={item.averageRating}
              location={item.location}
              router={router}
            />
          )}
        />
      </View>
    </SafeAreaView>
  );
};

export default ServiceCategoryDetailPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
  },

  headerContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.neutral,
  },

  imageContainer: {
    width: '50%',
    alignSelf: 'flex-start',
    paddingVertical: 10,
  },

  image: {
    height: 120,
    width: '100%',
    objectFit: 'contain',
  },

  textContainer: {
    width: '50%',
  },

  heading: {
    fontFamily: 'PoppinsExtraBold',
    fontSize: 28,
    lineHeight: 29,

    color: Colors.gray,
  },
  subText: {},

  // Content start headerContainer
  secondaryContainer: {
    padding: 20,
  },
  infoText: {
    textAlign: 'center',
  },

  // No one near styles
  noOneContainer: {
    marginVertical: 10,
    backgroundColor: Colors.gray,
    borderRadius: 10,
    padding: 8,
  },
  noOneHeading: {
    textAlign: 'center',
    fontFamily: 'PoppinsExtraBold',
    fontSize: 40,
    color: 'white',
    marginBottom: -4,
  },
  noOneSubtext: {
    textAlign: 'center',
    color: 'white',
    paddingHorizontal: 15,
  },
});
