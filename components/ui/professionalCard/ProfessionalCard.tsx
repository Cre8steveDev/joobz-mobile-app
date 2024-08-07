import Colors from '@/constants/Colors';
import { ProfessionalCardType } from '@/types/global';
import { Text, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Image } from 'expo-image';
import Logo from '@/assets/images/icon.png';

const ProfessionalCard = ({
  profilePicture,
  index,
  userId,
  fullName,
  category,
  averageRating,
  location,
  router,
}: ProfessionalCardType) => {
  // Navigation handler to Professional's profile
  const handleNavigation = () => {
    router.push(`/(user)/ServiceProviderDetails?userId=${userId}`);
  };
  // Is index even
  const isEven = index % 2 == 0;

  // Return JSX
  return (
    <TouchableOpacity
      onPress={handleNavigation}
      style={[
        styles.card,
        isEven
          ? { backgroundColor: Colors.evenCard }
          : { backgroundColor: Colors.neutral },
      ]}
    >
      {/* Card Image */}
      <Image
        source={profilePicture}
        style={styles.cardImage}
        alt="Profile Photo"
        placeholder={Logo}
        placeholderContentFit="cover"
      />

      {/* Details Container  */}
      <View style={styles.detailsContainer}>
        <View>
          <Text style={styles.proName}>{fullName}</Text>
          <Text style={styles.category}>{category}</Text>
          <Text
            style={styles.location}
          >{`${location.state}, ${location.country}`}</Text>

          {/* Rating Stars */}
          <Text>{'⭐'.repeat(averageRating)}</Text>
        </View>

        <Text style={styles.linkBtn}>View Profile</Text>
      </View>
    </TouchableOpacity>
  );
};

export default ProfessionalCard;

const styles = StyleSheet.create({
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
