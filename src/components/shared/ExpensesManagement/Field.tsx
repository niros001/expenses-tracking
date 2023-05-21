import React, {useCallback, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Modal,
  Dimensions,
} from 'react-native';
import DatePicker from 'react-native-modern-datepicker';

const windowHeight = Dimensions.get('window').height;

const Field = ({type, title, value, onChangeText}) => {
  const [visible, setVisible] = useState<boolean>(false);

  const handleChangeText = useCallback(
    text => {
      if (type === 'string') {
        onChangeText(text);
      }
      if (type === 'number') {
        onChangeText(Number(text.replace(/[^0-9]/g, '')));
      }
    },
    [onChangeText, type],
  );

  const onSelectedDate = useCallback(
    date => {
      onChangeText(date);
      setVisible(false);
    },
    [onChangeText],
  );
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{title}</Text>
      {type === 'date' ? (
        <TouchableOpacity onPress={() => setVisible(true)}>
          <Text>{value || 'Select date'}</Text>
          <Modal visible={visible} animationType="slide" transparent={true}>
            <View style={styles.modalContainer}>
              <DatePicker mode="calendar" onSelectedChange={onSelectedDate} />
            </View>
          </Modal>
        </TouchableOpacity>
      ) : (
        <TextInput value={value} onChangeText={handleChangeText} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginVertical: 12,
    paddingBottom: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#DCDCDC',
  },
  label: {
    fontSize: 18,
    color: '#A6A6A6',
    marginBottom: 5,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'white',
    marginTop: windowHeight * 0.25,
  },
});

export default Field;
