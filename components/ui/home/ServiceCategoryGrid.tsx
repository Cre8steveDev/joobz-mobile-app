import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import React from 'react';
import ServicesGrid from '@/constants/ServicesGrid';
import { useRouter } from 'expo-router';
import { ExpoRouter } from 'expo-router/types/expo-router';
import Colors from '@/constants/Colors';

type CategoryCard = {
  image: any;
  link: string;
  label: string;
  router: ExpoRouter.Router;
};

const sortedServicesGrid = [...ServicesGrid].sort((a, b) =>
  a.label.localeCompare(b.label)
);

const ServiceCategoryGrid = () => {
  const router = useRouter();
  return (
    <View style={styles.mainContainer}>
      <Text style={styles.heading}>Service Category</Text>
      {/* Map and Create the Services  */}
      <View style={styles.categoryContainer}>
        {sortedServicesGrid.map((item, index) => (
          <CategoryCard
            key={index}
            image={item.image}
            link={item.link}
            label={item.label}
            router={router}
          />
        ))}
      </View>
    </View>
  );
};

const CategoryCard = ({ image, link, label, router }: CategoryCard) => {
  return (
    <TouchableOpacity onPress={() => router.push(link)} style={styles.card}>
      <Image source={image} style={styles.cardImage} />
      <Text style={styles.cardLabel}>{label}</Text>
    </TouchableOpacity>
  );
};

export default ServiceCategoryGrid;

const styles = StyleSheet.create({
  mainContainer: {
    paddingTop: 2,
    paddingBottom: 15,
    width: '100%',
  },
  heading: {
    paddingHorizontal: 15,
    fontSize: 24,
    fontFamily: 'PoppinsExtraBold',
    color: Colors.gray,
  },
  categoryContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
    width: '100%',
    gap: 8,
  },
  card: {
    maxWidth: '20%',
    overflow: 'hidden',
    width: 100,
    alignItems: 'center',
    borderRadius: 8,
    padding: 3,
    backgroundColor: Colors.neutral,
  },
  cardImage: {
    width: '100%',
    height: 60,

    objectFit: 'contain',
  },
  cardLabel: {
    textAlign: 'center',
    fontSize: 12,
  },
});
