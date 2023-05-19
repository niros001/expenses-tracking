import React, {useCallback, useMemo, useState} from 'react';
import {
  View,
  Text,
  Modal,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import Field from './Field';
import PrimaryButton from '../PrimaryButton';
const windowHeight = Dimensions.get('window').height;

const ExpensesModal = ({editable, visible, onClose, onUpdateExpense}) => {
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState('');

  const isDisabled = useMemo(
    () => !title || !amount || !date,
    [title, amount, date],
  );

  const handleUpdateExpense = useCallback(() => {
    onUpdateExpense({title, amount, date});
  }, [onUpdateExpense, title, amount, date]);

  return (
    <Modal
      visible={visible}
      onRequestClose={onClose}
      animationType="slide"
      transparent={true}>
      <View style={styles.modalContainer}>
        <TouchableOpacity style={styles.closeButtonWrapper} onPress={onClose}>
          <Text style={styles.closeButton}>X</Text>
        </TouchableOpacity>
        <Text style={styles.title}>{editable ? 'Edit' : 'Create'} Expense</Text>
        <Field title="Title" value={title} onChangeText={setTitle} />
        <Field title="Amount" value={amount} onChangeText={setAmount} />
        <Field title="Date" value={date} onChangeText={setDate} />
        <View style={styles.primaryButtonWrapper}>
          <PrimaryButton
            disabled={isDisabled}
            onPress={handleUpdateExpense}
            text={editable ? 'Save' : 'Create'}
          />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    alignItems: 'center',
    padding: 24,
    backgroundColor: 'white',
    marginTop: windowHeight * 0.25,
    borderRadius: 22,
  },
  closeButtonWrapper: {
    alignSelf: 'flex-end',
  },
  closeButton: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 18,
    color: 'black',
  },
  label: {
    fontSize: 18,
    color: '#A6A6A6',
    alignSelf: 'flex-start',
  },
  primaryButtonWrapper: {
    flex: 1,
    justifyContent: 'flex-end',
  },
});

export default ExpensesModal;
