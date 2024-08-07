import {
  Dimensions,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { API } from '@/constants/BaseUrl';
import SkeletonLoader from '../SkeletonLoader';
import Colors from '@/constants/Colors';
import { Image } from 'expo-image';
import useToast from '@/components/Toast';

// Define Ad Types
type AdType = {
  title: string;
  image: string;
  inAppRoute: string;
};

// Define Sponsored Ads
const SponsoredAds = () => {
  const [loading, setLoading] = useState(true);
  const [ads, setAds] = useState<AdType[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentAd, setCurrentAd] = useState<AdType | undefined>(undefined);

  useEffect(() => {
    if (!ads || ads.length === 0) return;

    const changeCurrentAd = () => {
      setCurrentIndex((prevIndex) => {
        const newIndex = (prevIndex + 1) % ads.length;
        setCurrentAd(ads[newIndex]);
        return newIndex;
      });
    };

    // Set initial ad
    setCurrentAd(ads[currentIndex]);
    const interval = setInterval(changeCurrentAd, 15000);

    return () => clearInterval(interval);
  }, [ads]);

  //   UseEffect to retrieve
  useEffect(() => {
    API.get('ads/all')
      .then((res) => {
        const allAds = res.data.allAds as AdType[];
        setAds(allAds);
        setCurrentAd(allAds[0]);
        setLoading(false);
      })
      .catch((error) => {
        useToast('Error Retrieving Ads.');
        setLoading(false);
      });
  }, []);

  if (!currentAd || (ads && ads.length === 0)) return null;
  // JSX
  return (
    <TouchableOpacity style={styles.container}>
      {loading && (
        <SkeletonLoader bgColor={'gray'} height={120} width={'100%'} />
      )}

      <View style={styles.imageContainer}>
        {currentAd && <Image source={currentAd.image} style={[styles.image]} />}
      </View>
    </TouchableOpacity>
  );
};

export default SponsoredAds;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
    marginBottom: 10,
    height: 130,
    overflow: 'hidden',
  },
  imageContainer: {
    width: '100%',
    height: 130,
    overflow: 'hidden',
    borderRadius: 7,
  },
  image: {
    width: '100%',
    height: 130,
  },
});
