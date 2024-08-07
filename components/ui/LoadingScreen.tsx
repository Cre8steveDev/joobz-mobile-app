import {
  ActivityIndicator,
  Dimensions,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React from 'react';
import { StatusBar } from 'expo-status-bar';
import Colors from '@/constants/Colors';

const LoadingScreen = ({
  text,
  textColor = 'white',
  bgColor = 'rgba(0,0,0,0.9)',
  indicatorColor = 'white',
}: {
  bgColor?: string;
  textColor?: string;
  indicatorColor?: string;
  text: string;
}) => {
  //Return JSX
  return (
    <View style={[styles.container, { backgroundColor: bgColor }]}>
      {/* <StatusBar style="light" backgroundColor={Colors.gray} /> */}
      <ActivityIndicator
        style={[styles.activityIndicator]}
        color={indicatorColor}
        size={100}
      />
      <Text style={[styles.loadingText, { color: textColor }]}>{text}</Text>
    </View>
  );
};

export default LoadingScreen;

const styles = StyleSheet.create({
  activityIndicator: {},
  loadingText: {
    fontFamily: 'PoppinsBold',
    marginTop: 10,
  },
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    flex: 1,
    width: '100%',
    height: Dimensions.get('screen').height,
    zIndex: 5,
    backgroundColor: Colors.primary,
    opacity: 0.8,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
