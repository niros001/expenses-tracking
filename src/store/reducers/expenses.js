import {createSlice} from '@reduxjs/toolkit';

export const expensesSlice = createSlice({
  name: 'expenses',
  initialState: [],
  reducers: {
    loadExpenses: (state, action) => action.payload,
    updateExpense: (state, action) => {
      const expense = action.payload;
      const foundIndex = state.findIndex(({id}) => id === expense.id);
      if (foundIndex !== -1) {
        state[foundIndex] = expense;
      } else {
        state.push(action.payload);
      }
    },
  },
});

export const actions = expensesSlice.actions;

export default expensesSlice.reducer;
