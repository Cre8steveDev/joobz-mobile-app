import Colors from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import React, { ReactNode, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  FlatList,
  StyleSheet,
  Pressable,
} from 'react-native';

type Option = {
  label: string;
  value: string;
};

type DropdownSelectType = {
  options: Option[];
  onValueChange: (text: string) => void;
  selectedValue: string;
  label: string;
  icon?: ReactNode;
};

const DropdownSelect = ({
  options,
  onValueChange,
  selectedValue,
  label,
  icon,
}: DropdownSelectType) => {
  // Define modal visibility
  const [modalVisible, setModalVisible] = useState(false);

  const selectedOption = options.find(
    (option) => option.value === selectedValue
  );

  const renderOption = ({ item }: { item: Option }) => (
    <TouchableOpacity
      style={styles.option}
      onPress={() => {
        onValueChange(item.value);
        setModalVisible(false);
      }}
    >
      <Text
        style={[
          styles.optionText,
          selectedValue === item.value && { color: Colors.primary },
        ]}
      >
        {item.label}
      </Text>
      {selectedValue === item.value && (
        <Ionicons name="checkmark" size={24} color={Colors.primary} />
      )}
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* {label && <Text style={styles.label}>{label}</Text>} */}
      <TouchableOpacity
        style={[styles.selectButton]}
        onPress={() => setModalVisible(true)}
      >
        {icon && icon}
        <Text style={styles.input}>
          {selectedOption ? selectedOption.label : 'Select an option'}
        </Text>
      </TouchableOpacity>

      <Modal
        visible={modalVisible}
        onTouchCancel={() => setModalVisible(false)}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <StatusBar backgroundColor="rgba(0, 0, 0, 0.7)" />
        <Pressable
          style={styles.modalContainer}
          onPress={() => setModalVisible(false)}
        >
          <View style={styles.modalContent}>
            <FlatList
              data={options}
              renderItem={renderOption}
              keyExtractor={(item) => item.value}
            />
          </View>
        </Pressable>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  label: {
    fontSize: 16,
    marginBottom: 5,
  },

  selectButton: {
    // borderWidth: 1,
    // borderColor: '#ccc',
    // borderRadius: 5,
    borderTopRightRadius: 15,
    borderBottomRightRadius: 15,
    borderBottomLeftRadius: 15,
    backgroundColor: Colors.neutral,
    padding: 12,
    minHeight: 50,
    flexDirection: 'row',
    gap: 5,
  },

  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },

  modalContent: {
    backgroundColor: Colors.white,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    maxHeight: '65%',
  },

  option: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: Colors.neutral,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  optionText: {
    fontFamily: 'PoppinsRegular',
    fontSize: 18,
  },

  input: {
    width: '100%',
    fontFamily: 'PoppinsRegular',
    fontSize: 18,
    color: Colors.gray,
  },
});

export default DropdownSelect;
