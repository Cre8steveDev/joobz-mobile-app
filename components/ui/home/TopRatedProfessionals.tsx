import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import ServicesGrid from '@/constants/ServicesGrid';
import { useRouter } from 'expo-router';
import { ExpoRouter } from 'expo-router/types/expo-router';
import Colors from '@/constants/Colors';
import { Image } from 'expo-image';
import SkeletonLoader from '../SkeletonLoader';
import { API } from '@/constants/BaseUrl';
import useToast from '@/components/Toast';
import Logo from '@/assets/images/icon.png';
import { ProfessionalCardType } from '@/types/global';
import ProfessionalCard from '../professionalCard/ProfessionalCard';

const TopRatedProfessionals = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [errorLoading, setErrorLoading] = useState(false);
  const [professionals, setProfessionals] = useState<ProfessionalCardType[]>(
    []
  );

  // Fetch Top rated Professionals from server
  useEffect(() => {
    API.get('/get-professionals')
      .then((res) => {
        const topPros = res.data.topRatedPros as ProfessionalCardType[];
        setProfessionals(topPros);
      })
      .catch((error: any) => {
        useToast('Sorry, unable to load featured professionals.');
        setErrorLoading(true);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  // Return JSX
  return (
    <View style={styles.mainContainer}>
      <Text style={styles.heading}>Top 3 Rated Professionals</Text>
      {/* Skeleton for loading  */}
      {loading && <SkeletonLoader bgColor="gray" height={100} width={'100%'} />}

      {/* If finished loading and posts found */}
      {!loading && professionals.length > 0 && (
        <View style={styles.cardContainer}>
          {professionals.map((data, index) => (
            <ProfessionalCard
              key={index}
              index={index}
              profilePicture={data.profilePicture}
              userId={data._id!}
              fullName={data.fullName}
              category={data.category}
              averageRating={data.averageRating}
              location={data.location}
              router={router}
            />
          ))}
        </View>
      )}

      {errorLoading && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Unable to Retrive Data. </Text>
        </View>
      )}
    </View>
  );
};
export default TopRatedProfessionals;

const styles = StyleSheet.create({
  mainContainer: {
    paddingTop: 5,
    marginBottom: 20,
    width: '100%',
  },
  heading: {
    paddingHorizontal: 15,
    fontSize: 24,
    fontFamily: 'PoppinsExtraBold',
    color: Colors.gray,
  },
  cardContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
    width: '100%',
    gap: 10,
    paddingHorizontal: 15,
  },

  // Styles for the professional card start here
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    width: '100%',
    height: 120,
    padding: 10,
    gap: 15,
  },

  cardImage: {
    width: 90,
    height: '100%',
    borderRadius: 15,
    objectFit: 'cover',
  },

  detailsContainer: {
    width: '65%',
  },

  proName: {
    fontSize: 12,
  },
  category: {
    fontFamily: 'PoppinsExtraBold',
    color: Colors.dark,
    fontSize: 18,
    marginBottom: -7,
  },
  location: {},

  rating: {},

  linkBtn: {
    textAlign: 'right',
    fontSize: 11,
  },
  errorContainer: {
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    color: Colors.gray,
  },
  errorText: {
    textAlign: 'center',
    color: 'white',
  },
});
