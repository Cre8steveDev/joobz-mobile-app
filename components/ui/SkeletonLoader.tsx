import { StyleSheet, Text, View } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withRepeat,
  withTiming,
  Easing,
} from 'react-native-reanimated';
import React, { useEffect } from 'react';

type SkeletonLoaderProps = {
  bgColor: string;
  height: number;
  width: number | string;
  easing?: number[];
};

const SkeletonLoader = ({
  bgColor,
  height,
  width,
  easing = [0.25, 0.1, 0.25, 0.35],
}: SkeletonLoaderProps) => {
  const opacityAnimate = useSharedValue(0);
  const animatedStyles = useAnimatedStyle(() => {
    return {
      opacity: opacityAnimate.value,
    };
  });

  useEffect(() => {
    opacityAnimate.value = withRepeat(
      withTiming(1, {
        duration: 1000,
        easing: Easing.bezier(easing[0], easing[1], easing[2], easing[3]),
      }),
      -1, // -1 means infinite repeats
      true // reverse the animation
    );
  }, []);

  //   Return JSX
  return (
    <Animated.View
      style={[
        styles.box,
        animatedStyles,
        // @ts-ignore
        { backgroundColor: bgColor, height, width },
      ]}
    ></Animated.View>
  );
};

export default SkeletonLoader;

const styles = StyleSheet.create({
  box: {
    borderRadius: 6,
  },
});
