import {
  KeyboardTypeOptions,
  Pressable,
  ReturnKeyTypeOptions,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { ReactNode } from 'react';
import Colors from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';

type SearchBarProp = {
  value: string;
  setValue: (text: string) => void;
  placeholder?: string;
  textColor?: string;
  bgColor?: string;
  keyBoardType?: KeyboardTypeOptions;
  returnType?: ReturnKeyTypeOptions;
  inputStyles?: any;
  containerStyle?: any;
  editable?: boolean;
  triggerSearch: () => void;
};

const SearchBar = ({
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
  triggerSearch,
}: SearchBarProp) => {
  return (
    <View style={styles.mainContainer}>
      <View
        style={[
          containerStyle && containerStyle,
          styles.container,
          { backgroundColor: bgColor ? bgColor : Colors.neutral },
        ]}
      >
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
          cursorColor={Colors.primary}
          keyboardAppearance="light"
          keyboardType={keyBoardType}
          autoComplete="off"
          returnKeyType={returnType}
          autoCapitalize="none"
          autoCorrect={false}
          editable={editable}
        />
        {/* Define Search Icon */}
        <TouchableOpacity onPress={triggerSearch}>
          <Ionicons name="search" size={28} color={Colors.gray} />
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.filterContainer}>
        <Ionicons name="filter" size={24} color={'white'} />
      </TouchableOpacity>
    </View>
  );
};

export default SearchBar;

const styles = StyleSheet.create({
  mainContainer: {
    flexDirection: 'row',
    gap: 6,
    width: '100%',
    overflow: 'hidden',
    marginTop: 10,
  },

  container: {
    borderRadius: 10,
    padding: 12,
    paddingVertical: 8,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    width: '83%',
  },

  input: {
    fontFamily: 'PoppinsRegular',
    width: '90%',
    fontSize: 18,
  },

  filterContainer: {
    backgroundColor: Colors.secondary,
    borderRadius: 10,
    width: '14%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
