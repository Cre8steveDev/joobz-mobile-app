import Colors from '@/constants/Colors';
import React, { useEffect } from 'react';
import { AntDesign } from '@expo/vector-icons';
import {
  Dimensions,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
  interpolate,
} from 'react-native-reanimated';

type OnboardingCardType = {
  id: number;
  visibleScreen: number;
  setVisibleScreen: React.Dispatch<React.SetStateAction<number>>;
  heading: string;
  image: any;
};

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const OnboardingCard = ({
  id,
  visibleScreen,
  setVisibleScreen,
  heading,
  image,
}: OnboardingCardType) => {
  // Define animation setup
  const translateX = useSharedValue(0);

  useEffect(() => {
    let translationValue: number;

    if (visibleScreen === 0) translationValue = visibleScreen * -SCREEN_WIDTH;
    else if (visibleScreen === 1)
      translationValue = visibleScreen * -SCREEN_WIDTH + 40;
    else translationValue = visibleScreen * -SCREEN_WIDTH + 80;

    translateX.value = withTiming(translationValue, {
      duration: 500,
      easing: Easing.inOut(Easing.ease),
    });
  }, [visibleScreen]);

  //  Define animated style from shared value
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  // Return JsX
  return (
    <Animated.View style={[styles.mainContainer, animatedStyle]}>
      <Text style={styles.heading}>{heading}</Text>
      <View style={[styles.container]}>
        <View>
          <Image source={image} style={styles.image} />
        </View>
      </View>
    </Animated.View>
  );
};

export default OnboardingCard;

const styles = StyleSheet.create({
  mainContainer: {
    marginTop: 30,
    width: '100%',
  },
  container: {
    width: '93%',
    position: 'relative',
    marginHorizontal: 'auto',
  },
  heading: {
    color: Colors.dark,
    fontFamily: 'PoppinsBold',
    paddingRight: 20,
    fontSize: 20,
  },
  image: {
    borderRadius: 15,
    width: '100%',
    height: 350,
    marginBottom: 15,
  },
});
