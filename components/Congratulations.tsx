import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
  BackHandler,
} from 'react-native';
import React, { useCallback, useEffect } from 'react';

import CongratulationsPic from '@/assets/images/congratulations.png';
import Logo from '@/assets/images/big-logo-white.png';
import { StatusBar } from 'expo-status-bar';
import Colors from '@/constants/Colors';
// import { useFocusEffect, useRouter } from 'expo-router';

type CongratulationsCompType = {
  miniHeading: string;
  heading: string;
  triggerAction: () => void;
};

const Congratulations = ({
  miniHeading,
  heading,
  triggerAction,
}: CongratulationsCompType) => {
  //   Return JsX
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={Colors.primary} />

      {/* Logo Image */}
      <View>
        <Image source={Logo} alt="Joobz Logo" style={styles.logoImage} />
      </View>
      <Text style={styles.heading}>{heading}</Text>
      <Text style={styles.miniHeading}>{miniHeading}</Text>

      {/* Image Container  */}
      <View style={styles.imageContainer}>
        <Image
          source={CongratulationsPic}
          alt="Congratulations"
          resizeMode="contain"
          style={styles.congratulationsImage}
        />
      </View>

      {/* Go Home Button  */}
      <TouchableOpacity onPress={triggerAction} style={styles.actionBtn}>
        <Text>Start Exploring!</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Congratulations;

const styles = StyleSheet.create({
  container: {
    top: 0,
    left: 0,
    backgroundColor: Colors.primary,
    position: 'absolute',
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    zIndex: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },

  imageContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  congratulationsImage: {
    width: 300,
    height: 300,
  },

  logoImage: {
    height: 100,
    width: 250,
    resizeMode: 'contain',
  },

  miniHeading: {
    fontFamily: 'PoppinsSemiBold',
    color: Colors.white,
  },
  heading: {
    fontFamily: 'PoppinsExtraBold',
    fontSize: 32,
    color: Colors.white,
    marginTop: 10,
  },
  actionBtn: {
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 10,
  },
});
