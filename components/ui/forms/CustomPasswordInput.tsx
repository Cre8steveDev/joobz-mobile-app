import {
  StyleSheet,
  TextInput,
  View,
  TouchableOpacity,
  KeyboardTypeOptions,
} from 'react-native';
import React, { ReactNode, useState } from 'react';
import Colors from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';

type CustomPasswordInputProp = {
  value: string;
  setValue: (text: string) => void;
  placeholder?: string;
  textColor?: string;
  bgColor?: string;
  keyBoardType?: KeyboardTypeOptions;
  extraStyles?: any;
  children?: ReactNode;
};

const CustomPasswordInput = ({
  value,
  setValue,
  placeholder = '',
  textColor,
  bgColor,
  keyBoardType,
  extraStyles = {},
  children,
}: CustomPasswordInputProp) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <View
      style={[
        extraStyles,
        styles.inputContainer,
        { backgroundColor: bgColor ? bgColor : Colors.neutral },
      ]}
    >
      <View style={{ width: '90%', flexDirection: 'row', gap: 5 }}>
        {children}

        <TextInput
          style={[
            styles.input,
            {
              color: textColor ? textColor : Colors.gray,
            },
          ]}
          value={value}
          onChangeText={setValue}
          placeholder={placeholder}
          secureTextEntry={!showPassword}
          placeholderTextColor={Colors.gray}
          cursorColor={Colors.secondary}
          keyboardAppearance="light"
          keyboardType={keyBoardType}
          autoComplete="off"
          autoCapitalize="none"
          autoCorrect={false}
        />
      </View>
      <TouchableOpacity
        onPress={() => setShowPassword(!showPassword)}
        style={styles.iconContainer}
      >
        <Ionicons
          name={showPassword ? 'eye-off' : 'eye'}
          size={24}
          color="#b3b3b3"
        />
      </TouchableOpacity>
    </View>
  );
};

export default CustomPasswordInput;

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    borderTopRightRadius: 15,
    borderBottomRightRadius: 15,
    borderBottomLeftRadius: 15,
    padding: 12,
    alignItems: 'center',
  },
  input: {
    fontFamily: 'PoppinsRegular',
    fontSize: 18,
    width: '90%',
  },
  iconContainer: {},
});
