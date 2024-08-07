import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import ContentNotFound from '@/assets/images/content-not-found.png';
import Colors from '@/constants/Colors';

const EmptyResult = ({
  heading,
  subtext,
}: {
  heading: string;
  subtext: string;
}) => {
  return (
    <View style={styles.emptyContainer}>
      <Image source={ContentNotFound} style={styles.image} />
      <Text style={styles.emptyHeading}>{heading}</Text>
      <Text style={styles.emptySubtitle}>{subtext}</Text>
    </View>
  );
};

export default EmptyResult;

const styles = StyleSheet.create({
  emptyContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },

  image: {
    width: '80%',
    height: 300,
    objectFit: 'contain',
  },

  emptyHeading: {
    fontSize: 30,
    color: Colors.gray,
    lineHeight: 36,
    fontFamily: 'PoppinsExtraBold',
    textAlign: 'center',
  },

  emptySubtitle: {
    color: Colors.dark,
    textAlign: 'center',
    fontFamily: 'PoppinsRegular',
    fontSize: 14,
    paddingHorizontal: 15,
  },
});
