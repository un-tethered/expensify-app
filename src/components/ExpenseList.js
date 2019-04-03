import React from 'react';
import { connect } from 'react-redux';
import ExpenseListItem from './ExpenseListItem';
import selectExpenses from '../selectors/expenses'

const expenseArray = expenses => (
  expenses.map(expense => <ExpenseListItem key={expense.id} {...expense}/>)
);

export const ExpenseList = ({ expenses }) => (
  <div className="content-container">
    <div className="list-header">
      <div className="show-for-mobile">Expenses</div>
      <div className="show-for-desktop">Expense</div>
      <div className="show-for-desktop">Amount</div>
    </div>

    <div className="list-body">
      {
        expenses.length > 0 ? (
          expenseArray(expenses)
        ) : (
          <div className="list-item list-item__message">
            <span>No expenses</span>
          </div>
        )
      }
    </div>
  </div>
);

const mapStateToProps = ({ expenses, filters }) => ({
  expenses: selectExpenses(expenses, filters)
});

export default connect(mapStateToProps)(ExpenseList);
