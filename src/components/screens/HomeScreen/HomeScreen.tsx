import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {connect} from 'react-redux';
import {actions as expensesActions} from '../../../store/reducers/expenses';
import Table from './Table';
import FiltersModal from './FiltersModal';
import {ExpensesManagement} from '../../shared';
import storage from '../../../storage';
import {FiltersType} from '../../../types';

const HomeScreen = ({expenses, loadExpenses}) => {
  const defaultFilters: FiltersType = useMemo(
    () => ({title: '', amount: 0, date: ''}),
    [],
  );
  const [visible, setVisible] = useState<boolean>(false);
  const [filters, setFilters] = useState<FiltersType>(defaultFilters);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    storage
      .getAllDataForKey('expenses')
      .then(value => {
        loadExpenses(value);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, [loadExpenses]);

  const onOpen = useCallback(() => {
    setVisible(true);
  }, [setVisible]);

  const onClose = useCallback(() => {
    setVisible(false);
  }, [setVisible]);

  const totalAmount = useMemo(
    () => expenses.reduce((acc, {amount}) => acc + amount, 0),
    [expenses],
  );

  const sections = useMemo(() => {
    const initSections = {};
    expenses
      .filter(
        expense =>
          expense.title.includes(filters.title) &&
          (!filters.amount || expense.amount <= filters.amount) &&
          (!filters.date || expense.date <= filters.date),
      )
      .forEach(value => {
        if (!initSections[value.date]) {
          initSections[value.date] = [];
        }
        initSections[value.date].push(value);
      });

    return Object.keys(initSections)
      .map(key => ({
        title: key,
        data: initSections[key],
      }))
      .sort((a, b) => b.title.localeCompare(a.title));
  }, [expenses, filters]);

  return (
    <View style={styles.container}>
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator />
        </View>
      ) : (
        <>
          <View style={styles.content}>
            <View style={styles.row}>
              <Text style={styles.title}>Total expenses:</Text>
              <Text style={styles.amount}>{totalAmount.toLocaleString()}$</Text>
            </View>
            <TouchableOpacity style={styles.filters} onPress={onOpen}>
              <Icon name="filter" size={16} color="black" />
              <Text
                style={[
                  styles.filterText,
                  !!(filters.title || filters.amount || filters.date) &&
                    styles.bold,
                ]}>
                Filters
              </Text>
            </TouchableOpacity>
            <Table sections={sections} />
            <FiltersModal
              visible={visible}
              onClose={onClose}
              filters={filters}
              setFilters={setFilters}
              defaultFilters={defaultFilters}
            />
          </View>
          <ExpensesManagement />
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingVertical: 12,
  },
  content: {
    flex: 1,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  bold: {
    fontWeight: 'bold',
  },
  amount: {
    fontSize: 18,
    marginLeft: 12,
  },
  filters: {
    alignSelf: 'flex-end',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#D9D9D9',
    borderRadius: 60,
    height: 28,
    width: 94,
    marginRight: 12,
    marginVertical: 12,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  filterText: {
    marginLeft: 5,
  },
});

export default connect(
  ({expenses}) => ({expenses}),
  expensesActions,
)(HomeScreen);
