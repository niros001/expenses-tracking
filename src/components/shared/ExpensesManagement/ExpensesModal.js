import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {
  View,
  Text,
  Modal,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {connect} from 'react-redux';
import {actions as expensesActions} from '../../../store/reducers/expenses';
import Field from './Field';
import PrimaryButton from '../PrimaryButton';
import storage from '../../../../src/storage';

const windowHeight = Dimensions.get('window').height;

const ExpensesModal = ({expense, visible, onClose, updateExpense}) => {
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState(0);
  const [date, setDate] = useState('');

  useEffect(() => {
    if (visible) {
      setTitle(expense?.title || '');
      setAmount(expense?.amount || 0);
      setDate(expense?.date || '');
    }
  }, [visible, expense]);

  const isDisabled = useMemo(
    () => !title || !amount || !date,
    [title, amount, date],
  );

  const onUpdateExpense = useCallback(() => {
    let newExpense = {
      id: expense?.id || Date.now().toString(36),
      title,
      amount,
      date,
    };
    storage
      .save({key: 'expenses', id: newExpense.id, data: newExpense})
      .then(() => {
        updateExpense(newExpense);
        onClose();
      });
  }, [updateExpense, expense, title, amount, date, onClose]);

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
        <Text style={styles.title}>{expense ? 'Edit' : 'Create'} Expense</Text>
        <Field
          type="string"
          title="Title"
          value={title}
          onChangeText={setTitle}
        />
        <Field
          type="number"
          title="Amount"
          value={amount === 0 ? '' : amount.toString()}
          onChangeText={setAmount}
        />
        <Field type="date" title="Date" value={date} onChangeText={setDate} />
        <View style={styles.primaryButtonWrapper}>
          <PrimaryButton
            disabled={isDisabled}
            onPress={onUpdateExpense}
            text={expense ? 'Save' : 'Create'}
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

export default connect(null, expensesActions)(ExpensesModal);
