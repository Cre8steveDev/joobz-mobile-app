import { StyleSheet, TouchableOpacity, Image, View } from 'react-native';
import React from 'react';
import { AntDesign } from '@expo/vector-icons';
import Colors from '@/constants/Colors';

import Logo from '@/assets/images/logo-primary-subtext.png';

type AuthHeaderProps = {
  onPress: () => void;
};

const AuthHeader = ({ onPress }: AuthHeaderProps) => {
  // Return JSX to view
  return (
    <View style={styles.actionContainer}>
      <TouchableOpacity style={styles.actionBtn} onPress={onPress}>
        <AntDesign name="arrowleft" size={24} color="white" />
      </TouchableOpacity>

      <Image source={Logo} style={styles.logo} />
    </View>
  );
};

export default AuthHeader;

const styles = StyleSheet.create({
  logo: {
    objectFit: 'contain',
    height: '60%',
    width: '30%',
  },
  actionContainer: {
    width: '100%',
    height: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  actionBtn: {
    backgroundColor: Colors.gray,
    width: 30,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 100,
  },
});
