import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import Colors from '@/constants/Colors';
import OnboardingCard from './ui/onboarding/OnboardingCard';
import OnboardImage1 from '@/assets/images/onboarding/onboarding-01.png';
import OnboardImage2 from '@/assets/images/onboarding/onboarding-02.png';
import OnboardImage3 from '@/assets/images/onboarding/onboarding-03.png';
import { AntDesign } from '@expo/vector-icons';

const Onboarding = () => {
  const [visibleScreen, setVisibleScreen] = useState(0);

  // handle left navigation function
  const handleLeftNavigation = () => {
    if (visibleScreen === 0) return;
    setVisibleScreen((prev) => prev - 1);
  };

  // handle Right navigation function
  const handleRightNavigation = () => {
    if (visibleScreen === 2) return;
    setVisibleScreen((prev) => prev + 1);
  };

  // Return JSX
  return (
    <View style={styles.container}>
      <OnboardingCard
        id={0}
        visibleScreen={visibleScreen}
        setVisibleScreen={setVisibleScreen}
        heading="Find professional help near you: Whenever & Wherever."
        image={OnboardImage1}
      />

      <OnboardingCard
        id={1}
        visibleScreen={visibleScreen}
        setVisibleScreen={setVisibleScreen}
        heading="Secure Escrop payments to protect both parties."
        image={OnboardImage2}
      />

      <OnboardingCard
        id={2}
        visibleScreen={visibleScreen}
        setVisibleScreen={setVisibleScreen}
        heading="Easy in-app messaging to discuss project details."
        image={OnboardImage3}
      />

      {/* The Arrows */}
      <TouchableOpacity
        disabled={visibleScreen === 0}
        style={[
          styles.arrowContainer,
          styles.arrowLeft,
          visibleScreen === 0
            ? { backgroundColor: Colors.gray }
            : { backgroundColor: Colors.primary },
        ]}
        onPress={handleLeftNavigation}
      >
        <AntDesign name="arrowleft" size={24} color="white" />
      </TouchableOpacity>

      <TouchableOpacity
        disabled={visibleScreen === 2}
        style={[
          styles.arrowContainer,
          styles.arrowRight,
          visibleScreen === 2
            ? { backgroundColor: Colors.gray }
            : { backgroundColor: Colors.primary },
        ]}
        onPress={handleRightNavigation}
      >
        <AntDesign name="arrowright" size={24} color="white" />
      </TouchableOpacity>
    </View>
  );
};

export default Onboarding;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    overflow: 'hidden',
    flexDirection: 'row',
    position: 'relative',
  },
  arrowContainer: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 3,
    borderRadius: 100,
    width: 40,
    height: 40,
    top: '50%',
  },
  arrowLeft: {},
  arrowRight: {
    right: 0,
  },
});
