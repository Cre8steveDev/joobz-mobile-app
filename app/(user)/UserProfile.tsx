import {
  FlatList,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Image } from 'expo-image';
import React, { ReactNode, useEffect, useState } from 'react';
import LoadingScreen from '@/components/ui/LoadingScreen';
import { SafeAreaView } from 'react-native-safe-area-context';

import { FullUser, UserJob } from '@/types/global';
import { useAuthRedirect } from '@/hooks/useSignedInRedirect';
import { Redirect } from 'expo-router';
import EmptyResult from '@/components/ui/EmptyResult';
import Colors from '@/constants/Colors';
import Button from '@/components/ui/buttons/Button';
import {
  AntDesign,
  Ionicons,
  MaterialCommunityIcons,
} from '@expo/vector-icons';
import { useDispatch } from 'react-redux';
import { logOut } from '@/providers/redux/authSlice';
import UpdateProfileInformation from '@/components/ui/profile/UpdateProfileInformation';
import MiniUserDetails from '@/components/ui/profile/MiniUserDetails';
import fetchUserDataForProfile from '@/lib/fetchUserDataForProfile';

/**
 * UserProfile Component
 * @returns The User's Profile Page
 */
const UserProfile = () => {
  // Define Component States
  const [loading, setLoading] = useState(false);
  const [fullUser, setFullUser] = useState<FullUser | null>(null);
  const [showFullDetails, setShowFullDetails] = useState(false);
  const [showModal, setShowModal] = useState(false);

  // dispatch function
  const dispatch = useDispatch();

  // Retrieve the authenticated user from global state
  const { user } = useAuthRedirect();

  if (!user) {
    return <Redirect href={'/(auth)/Login'} />;
  }

  // Fetch full user Data from Database
  useEffect(() => {
    fetchUserDataForProfile(user._id).then((data) => {
      setFullUser(data);
    });
  }, []);

  // Handle Log out function
  const handleLogout = () => {
    dispatch(logOut());
  };

  // Returning loading indicator
  if (loading) {
    return <LoadingScreen text="Loading..." />;
  }

  // Return JSX for View
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        style={{ flex: 1, height: '100%' }}
        contentContainerStyle={{
          marginVertical: 'auto',
        }}
      >
        <View style={styles.profileHeader}>
          <Image
            source={{ uri: user.profilePicture }}
            style={{
              width: 100,
              height: 100,
              backgroundColor: Colors.primary,
              borderRadius: 20,
              overflow: 'hidden',
              marginBottom: 8,
            }}
            placeholder={require('@/assets/images/loading-image.gif')}
            placeholderContentFit="cover"
            contentFit="cover"
            transition={800}
            contentPosition={{ top: 0, left: 0 }}
            alt={user.fullName}
            cachePolicy="memory"
            recyclingKey={user._id}
            accessible={true}
          />

          {/* User Details */}
          <Text style={styles.profileHeadingText}>{user.fullName}</Text>
          <Text
            style={styles.profileSubtitleText}
          >{`${user.location.state}, ${user.location.country}`}</Text>

          {/* Button to trigger showing full profile details */}
          <TouchableOpacity
            onPress={() => setShowFullDetails((prev) => !prev)}
            style={styles.showDetails}
          >
            <Text style={{ textAlign: 'center' }}>
              {showFullDetails ? 'Hide' : 'Show'} Profile Details
            </Text>
          </TouchableOpacity>
        </View>

        {/* Set show full user Mini Dashboard  */}
        {showFullDetails && fullUser && <MiniUserDetails fullUser={fullUser} />}
        {/* Profile ACtions  */}

        {!showFullDetails && (
          <View style={styles.allActionsContainer}>
            {/* Update Profile Information */}
            <ProfileActionComp
              icon={<AntDesign name="user" size={24} color={Colors.gray} />}
              textLabel="Update Profile Info"
              textColor={Colors.gray}
              bgColor={Colors.white}
              triggerModal={setShowModal}
            />

            {/* Fund User Account for Payment */}
            <ProfileActionComp
              icon={
                <MaterialCommunityIcons
                  name="cash-plus"
                  size={24}
                  color={Colors.gray}
                />
              }
              textLabel="Fund Your Account"
              textColor={Colors.gray}
              bgColor={Colors.white}
              triggerModal={setShowModal}
            />

            {/* Account KYC Verification */}
            <ProfileActionComp
              icon={
                <MaterialCommunityIcons
                  name="cash-plus"
                  size={24}
                  color={Colors.gray}
                />
              }
              textLabel="Account KYC Verification"
              textColor={Colors.gray}
              bgColor={Colors.white}
              triggerModal={setShowModal}
            />

            {/* Customer Care Service */}
            <ProfileActionComp
              icon={
                <AntDesign
                  name="customerservice"
                  size={24}
                  color={Colors.gray}
                />
              }
              textLabel="Customer Care Service"
              textColor={Colors.gray}
              bgColor={Colors.white}
              triggerModal={setShowModal}
            />
          </View>
        )}

        {/* Implement Modals for The various Profile Actions */}
        {fullUser && showModal && (
          <UpdateProfileInformation
            showModal={showModal}
            setShowModal={setShowModal}
            fullUser={fullUser}
            setFullUser={setFullUser}
          />
        )}

        {/*  Logout Button */}
        <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
          <Text style={styles.logoutText}>Sign Out</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default UserProfile;

// Define Type for the Profile Action Component

type ProfileActionProp = {
  icon: ReactNode;
  textLabel: string;
  textColor: string;
  bgColor: string;
  triggerModal: React.Dispatch<React.SetStateAction<boolean>>;
};

// Profile Action Component
const ProfileActionComp = ({
  icon,
  textLabel,
  textColor,
  bgColor,
  triggerModal,
}: ProfileActionProp) => {
  return (
    <TouchableOpacity
      onPress={() => triggerModal(true)}
      style={[{ backgroundColor: bgColor }, styles.actionContainer]}
    >
      <View style={styles.iconAndLabelContainer}>
        <View style={styles.iconContainer}>{icon}</View>
        <Text style={[styles.actionText, { color: textColor }]}>
          {textLabel}
        </Text>
      </View>

      {/* Arrow Icon */}
      <View style={styles.arrowContainer}>
        <Ionicons name="arrow-forward" color={Colors.gray} size={16} />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: Colors.primary,
    flex: 1,
  },

  profileHeader: {
    marginHorizontal: 'auto',
    alignItems: 'center',
  },

  profilePic: {},

  profileHeadingText: {
    textAlign: 'center',
    fontFamily: 'PoppinsExtraBold',
    fontSize: 28,
    color: 'white',
  },

  profileSubtitleText: {
    textAlign: 'center',
    fontFamily: 'PoppinsBold',
    fontSize: 18,
    color: 'rgba(255, 255, 255, 0.6)',
    marginTop: -12,
  },

  allActionsContainer: {
    gap: 10,
    width: '100%',
    alignItems: 'center',
    marginVertical: 20,
  },

  actionContainer: {
    width: '80%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 8,
    padding: 12,
  },

  iconAndLabelContainer: {
    flexDirection: 'row',
    gap: 15,
    alignItems: 'center',
  },

  iconContainer: {},

  actionText: {
    fontSize: 16,
    fontFamily: 'PoppinsRegular',
  },

  arrowContainer: {},

  logoutBtn: {
    backgroundColor: 'red',
    padding: 7,
    width: 200,
    borderRadius: 5,
    marginHorizontal: 'auto',
  },

  logoutText: {
    textAlign: 'center',
    color: Colors.white,
    fontSize: 16,
  },

  showDetails: {
    paddingVertical: 2,
    paddingHorizontal: 7,
    backgroundColor: 'white',
    borderRadius: 7,
  },
});
