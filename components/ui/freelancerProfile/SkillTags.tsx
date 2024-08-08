import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import Colors from '@/constants/Colors';

const SkillTags = ({ skills }: { skills: string[] }) => {
  return (
    <View>
      <Text style={styles.heading}>Skills:</Text>
      {skills.length > 0 && (
        <View style={styles.tagContainer}>
          {skills.map((skill, index) => (
            <Text key={index} style={styles.tag}>
              {skill}
            </Text>
          ))}
        </View>
      )}
    </View>
  );
};

export default SkillTags;

const styles = StyleSheet.create({
  heading: {
    fontSize: 24,
    fontFamily: 'PoppinsBold',
    color: Colors.gray,
  },
  tagContainer: {
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 5,
  },
  tag: {
    backgroundColor: Colors.white,
    color: 'black',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
  },
});
