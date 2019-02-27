import React from 'react';
import { connect } from 'react-redux';
import ExpenseListItem from './ExpenseListItem';
import selectExpenses from '../selectors/expenses'

const expenseArray = expenses => (
  expenses.map(expense => <ExpenseListItem key={expense.id} {...expense}/>)
);

export const ExpenseList = ({ expenses }) => (
  <div>
    {
      expenses.length > 0
        ? expenseArray(expenses)
        : <p>No expenses</p>
    }
  </div>
);

const mapStateToProps = ({ expenses, filters }) => ({
  expenses: selectExpenses(expenses, filters)
});

export default connect(mapStateToProps)(ExpenseList);
