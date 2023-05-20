import React, {useCallback} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  NativeModules,
} from 'react-native';
import {connect} from 'react-redux';
import {ExpensesManagement} from '../shared';
import storage from '../../storage';

const ProfileScreen = ({expenses}) => {
  const onSignOut = useCallback(() => {
    const p1 = storage.remove({key: 'user'});
    const p2 = storage.clearMapForKey('expenses');
    Promise.all([p1, p2]).then(() => {
      NativeModules.DevSettings.reload();
    });
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.item}>
          <Text>Total Expenses Items</Text>
          <Text style={styles.bold}>{expenses.length}</Text>
        </View>
        <View style={styles.item}>
          <TouchableOpacity onPress={onSignOut}>
            <Text>Sign out</Text>
          </TouchableOpacity>
        </View>
      </View>
      <ExpensesManagement />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
  },
  item: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 12,
    paddingBottom: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#DCDCDC',
  },
  bold: {
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default connect(({expenses}) => ({expenses}))(ProfileScreen);
