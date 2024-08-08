import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

const BioComponent = ({ bio }: { bio: string }) => {
  return (
    <View style={styles.container}>
      <Text lineBreakMode="head" style={styles.text}>
        {bio}
      </Text>
    </View>
  );
};

export default BioComponent;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  text: {
    textAlign: 'left',
    paddingHorizontal: 10,
    fontSize: 14,
    lineHeight: 20,
  },
});
