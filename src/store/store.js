import {configureStore} from '@reduxjs/toolkit';
import expensesReducer from './reducers/expenses';

export default configureStore({
  reducer: {
    expenses: expensesReducer,
  },
});
