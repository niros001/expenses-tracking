import React, {useCallback, useState} from 'react';
import {
  View,
  Text,
  Modal,
  StyleSheet,
  TouchableOpacity,
  Button,
  Dimensions,
} from 'react-native';
import Field from '../../shared/ExpensesManagement/Field';
import {PrimaryButton} from '../../shared';

const windowHeight = Dimensions.get('window').height;

const FiltersModal = ({
  visible,
  onClose,
  filters,
  setFilters,
  defaultFilters,
}) => {
  const [tempFilters, setTempFilters] = useState({...filters});

  const handleFilters = useCallback(
    (key, value) => {
      setTempFilters({...tempFilters, [key]: value});
    },
    [tempFilters],
  );

  const handleClose = useCallback(() => {
    setTempFilters({...filters});
    onClose();
  }, [filters, onClose]);

  const onClean = useCallback(() => {
    setTempFilters(defaultFilters);
  }, [defaultFilters]);

  const onFilter = useCallback(() => {
    setFilters(tempFilters);
    onClose();
  }, [setFilters, tempFilters, onClose]);

  return (
    <Modal
      visible={visible}
      onRequestClose={handleClose}
      animationType="slide"
      transparent={true}>
      <View style={styles.modalContainer}>
        <View style={styles.header}>
          <Button title="clean" onPress={onClean} />
          <Text style={styles.title}>Filters</Text>
          <TouchableOpacity onPress={handleClose}>
            <Text style={styles.closeButton}>X</Text>
          </TouchableOpacity>
        </View>
        <Field
          type="string"
          title="Title"
          value={tempFilters.title}
          onChangeText={value => handleFilters('title', value)}
        />
        <Field
          type="number"
          title="Amount (up to)"
          value={tempFilters.amount === 0 ? '' : tempFilters.amount.toString()}
          onChangeText={value => handleFilters('amount', value)}
        />
        <Field
          type="date"
          title="Date (up tp)"
          value={tempFilters.date}
          onChangeText={value => handleFilters('date', value)}
        />
        <View style={styles.filterButtonWrapper}>
          <PrimaryButton onPress={onFilter} text="Filter" />
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
  header: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  closeButton: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 18,
    color: 'black',
  },
  filterButtonWrapper: {
    marginTop: 50,
  },
});

export default FiltersModal;
