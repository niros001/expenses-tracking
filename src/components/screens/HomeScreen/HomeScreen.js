import React, {useCallback, useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Table from './Table';
import FiltersModal from './FiltersModal';
import {ExpensesManagement} from '../../shared';

const HomeScreen = () => {
  const [visible, setVisible] = useState(false);
  const [filters, setFilters] = useState({});

  const onOpen = useCallback(() => {
    setVisible(true);
  }, [setVisible]);

  const onClose = useCallback(() => {
    setVisible(false);
  }, [setVisible]);

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.row}>
          <Text style={styles.title}>Total expenses:</Text>
          <Text style={styles.amount}>999999$</Text>
        </View>
        <TouchableOpacity style={styles.filters} onPress={onOpen}>
          <Text>Filters</Text>
        </TouchableOpacity>
        <Table filters={filters} />
        <FiltersModal
          visible={visible}
          onClose={onClose}
          filters={filters}
          setFilters={setFilters}
        />
      </View>
      <ExpensesManagement />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  content: {
    flex: 1,
    paddingTop: 12,
  },
  row: {
    flexDirection: 'row',
    paddingHorizontal: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  amount: {
    fontSize: 18,
    marginLeft: 12,
  },
  filters: {
    alignSelf: 'flex-end',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#D9D9D9',
    borderRadius: 60,
    height: 28,
    width: 94,
    marginRight: 12,
    marginBottom: 12,
  },
});

export default HomeScreen;
