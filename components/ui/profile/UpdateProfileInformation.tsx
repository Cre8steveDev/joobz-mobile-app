import { Modal, ScrollView, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { FullUser } from '@/types/global';
import Colors from '@/constants/Colors';
import AuthHeader from '../auth/AuthHeader';
import { useRouter } from 'expo-router';
import UpdateSocialMedia from './UpdateSocialMedia';
import UpdatePersonalInformation from './UpdatePersonalInformation';

type UpdateProfileComp = {
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  fullUser: FullUser;
  setFullUser: React.Dispatch<React.SetStateAction<FullUser | null>>;
};

const UpdateProfileInformation = ({
  showModal,
  setShowModal,
  fullUser,
  setFullUser,
}: UpdateProfileComp) => {
  // Define route instance
  const router = useRouter();

  // Return JSX to Screen
  return (
    <Modal
      animationType="slide"
      transparent
      visible={showModal}
      presentationStyle="overFullScreen"
      onRequestClose={() => setShowModal(false)}
    >
      <ScrollView style={styles.container}>
        <AuthHeader onPress={() => setShowModal(false)} />

        <Text style={styles.headingText}>Edit Your Profile</Text>
        <Text style={styles.subtext}>
          Modify any of the fields and click update in each section.
        </Text>

        {/* Update Other Personal Information */}
        <UpdatePersonalInformation user={fullUser} setFullUser={setFullUser} />

        {/* Update Social Links Component  */}
        <UpdateSocialMedia user={fullUser} setFullUser={setFullUser} />
      </ScrollView>
    </Modal>
  );
};

export default UpdateProfileInformation;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.primary,
    padding: 20,
  },

  headingContainer: {},

  headingText: {
    fontFamily: 'PoppinsBold',
    width: '100%',
    fontSize: 34,
    lineHeight: 40,
    marginTop: 20,
    color: Colors.white,
  },

  subtext: {
    marginBottom: 10,
  },

  sectionContainer: {},
});
