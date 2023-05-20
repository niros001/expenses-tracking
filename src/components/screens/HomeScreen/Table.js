import React, {useCallback, useState} from 'react';
import {
  SectionList,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import ExpensesModal from '../../shared/ExpensesManagement/ExpensesModal';

const Table = ({sections}) => {
  const [itemSelected, setItemSelected] = useState();

  const onClose = useCallback(() => {
    setItemSelected(null);
  }, []);

  return (
    <>
      <SectionList
        sections={sections}
        keyExtractor={(item, index) => item + index}
        renderItem={({item, index}) => (
          <TouchableOpacity
            onPress={() => setItemSelected(item)}
            style={[
              styles.itemWrapper,
              index > 0 ? styles.bordered : styles.noneBordered,
            ]}>
            <Text style={styles.itemText}>{item.title}</Text>
            <Text style={styles.itemText}>{item.amount.toLocaleString()}$</Text>
          </TouchableOpacity>
        )}
        renderSectionHeader={({section: {title}}) => (
          <View style={styles.headerWrapper}>
            <Text style={styles.headerText}>{title}</Text>
          </View>
        )}
      />
      <ExpensesModal
        expense={itemSelected}
        visible={!!itemSelected}
        onClose={onClose}
      />
    </>
  );
};

const styles = StyleSheet.create({
  itemWrapper: {
    height: 60,
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    borderTopWidth: 0.5,
  },
  itemText: {
    fontSize: 14,
  },
  headerWrapper: {
    height: 25,
    backgroundColor: '#F4EEEE',
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  headerText: {
    fontSize: 14,
  },
  bordered: {
    borderTopColor: 'black',
  },
  noneBordered: {
    borderTopColor: 'transparent',
  },
});

export default Table;
