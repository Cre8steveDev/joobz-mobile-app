import {
  KeyboardTypeOptions,
  ReturnKeyTypeOptions,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';
import React, { ReactNode } from 'react';
import Colors from '@/constants/Colors';

type CustomTextInputProp = {
  value: string;
  setValue: (text: string) => void;
  placeholder?: string;
  textColor?: string;
  bgColor?: string;
  keyBoardType?: KeyboardTypeOptions;
  returnType?: ReturnKeyTypeOptions;
  inputStyles?: any;
  containerStyle?: any;
  children: ReactNode;
  editable?: boolean;
};

const CustomTextInput = ({
  value,
  setValue,
  placeholder = '',
  textColor,
  bgColor,
  keyBoardType = 'default',
  returnType = 'next',
  inputStyles,
  containerStyle,
  editable = true,
  children,
}: CustomTextInputProp) => {
  return (
    <View
      style={[
        containerStyle && containerStyle,
        styles.container,
        { backgroundColor: bgColor ? bgColor : Colors.neutral },
      ]}
    >
      {children}
      <TextInput
        style={[
          inputStyles && inputStyles,
          styles.input,
          {
            color: textColor ? textColor : Colors.gray,
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
        autoCapitalize="none"
        autoCorrect={false}
        editable={editable}
      />
    </View>
  );
};

export default CustomTextInput;

const styles = StyleSheet.create({
  container: {
    borderTopRightRadius: 15,
    borderBottomRightRadius: 15,
    borderBottomLeftRadius: 15,
    padding: 12,
    paddingVertical: 8,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },

  input: {
    fontFamily: 'PoppinsRegular',
    width: '100%',
    fontSize: 18,
  },
});
