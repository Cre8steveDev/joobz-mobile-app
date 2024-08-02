import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import Colors from '@/constants/Colors';
import {
  handleFacebookLogin,
  handleGoogleLogin,
  handleTwitterLogin,
} from '@/lib/handleSocialSignIn';

const SocialLogins = () => {
  //   Return JSX to View
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Sign In With Your Socials</Text>

      <View style={styles.logosContainer}>
        {/* Facebook Button */}
        <TouchableOpacity
          onPress={() => handleFacebookLogin()}
          style={[
            styles.socialLogoContainer,
            { backgroundColor: Colors.secondary },
          ]}
        >
          <Ionicons name="logo-facebook" color={'white'} size={24} />
        </TouchableOpacity>

        {/* Google Button */}
        <TouchableOpacity
          onPress={() => handleGoogleLogin()}
          style={[
            styles.socialLogoContainer,
            { backgroundColor: Colors.primary },
          ]}
        >
          <Ionicons name="logo-google" color={'white'} size={24} />
        </TouchableOpacity>

        {/* Twitter Button */}
        <TouchableOpacity
          onPress={() => handleTwitterLogin()}
          style={[styles.socialLogoContainer, { backgroundColor: Colors.dark }]}
        >
          <Ionicons name="logo-twitter" color={'white'} size={24} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SocialLogins;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginTop: 10,
    marginBottom: 20,
  },
  heading: {
    textAlign: 'center',
    fontFamily: 'PoppinsSemiBold',
    color: Colors.gray,
    marginBottom: 5,
    fontSize: 11,
    letterSpacing: 2,
  },
  socialLogoContainer: {
    width: 35,
    height: 35,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
  },

  logosContainer: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
