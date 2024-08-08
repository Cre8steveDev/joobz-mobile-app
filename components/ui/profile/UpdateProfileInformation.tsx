import { Modal, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { FullUser } from '@/types/global';

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
  return (
    <Modal
      animationType="slide"
      transparent
      visible={showModal}
      presentationStyle="overFullScreen"
      onRequestClose={() => setShowModal(false)}
    ></Modal>
  );
};

export default UpdateProfileInformation;

const styles = StyleSheet.create({});
