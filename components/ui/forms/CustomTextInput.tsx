import {
  KeyboardTypeOptions,
  ReturnKeyTypeOptions,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';
import React from 'react';
import Colors from '@/constants/Colors';

type CustomTextInputProp = {
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  placeholder: string;
  textColor?: string;
  bgColor?: string;
  keyBoardType?: KeyboardTypeOptions;
  returnType?: ReturnKeyTypeOptions;
  extraStyles?: any;
  containerStyle?: any;
  editable?: boolean;
};

const CustomTextInput = ({
  value,
  setValue,
  placeholder,
  textColor,
  bgColor,
  keyBoardType = 'default',
  returnType = 'next',
  extraStyles,
  containerStyle,
  editable = true,
}: CustomTextInputProp) => {
  return (
    <View style={containerStyle && containerStyle}>
      <TextInput
        style={[
          extraStyles && extraStyles,
          styles.input,
          {
            color: textColor ? textColor : Colors.gray,
            backgroundColor: bgColor ? bgColor : Colors.neutral,
          },
        ]}
        value={value}
        onChangeText={setValue}
        placeholder={placeholder}
        placeholderTextColor={Colors.gray}
        cursorColor={Colors.secondary}
        keyboardAppearance="light"
        keyboardType={keyBoardType}
        autoComplete="off"
        returnKeyType={returnType}
        // textContentType="none" // iOS-specific
        autoCapitalize="none"
        autoCorrect={false}
        editable={editable}
      />
    </View>
  );
};

export default CustomTextInput;

const styles = StyleSheet.create({
  input: {
    fontFamily: 'PoppinsRegular',
    fontSize: 18,
    padding: 8,
    paddingLeft: 15,
    paddingTop: 11,
    borderRadius: 10,
  },
});
