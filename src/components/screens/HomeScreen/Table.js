import React from 'react';
import {
  SectionList,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';

const DATA = [
  {
    title: 'Main dishes',
    data: ['Pizza', 'Burger', 'Risotto'],
  },
  {
    title: 'Sides',
    data: ['French Fries', 'Onion Rings', 'Fried Shrimps'],
  },
  {
    title: 'Drinks',
    data: ['Water', 'Coke', 'Beer'],
  },
  {
    title: 'Desserts',
    data: ['Cheese Cake', 'Ice Cream'],
  },
];

const Table = () => {
  return (
    <SectionList
      sections={DATA}
      keyExtractor={(item, index) => item + index}
      renderItem={({item, index}) => (
        <TouchableOpacity
          style={[
            styles.itemWrapper,
            index > 0 ? styles.bordered : styles.noneBordered,
          ]}>
          <Text style={styles.itemText}>{item}</Text>
          <Text style={styles.itemText}>333$</Text>
        </TouchableOpacity>
      )}
      renderSectionHeader={({section: {title}}) => (
        <View style={styles.headerWrapper}>
          <Text style={styles.headerText}>{title}</Text>
        </View>
      )}
    />
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
