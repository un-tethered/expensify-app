import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import number from '../util/numeral-locale-naira';
import selector from '../selectors/expenses';
import amountCalculator from '../selectors/expense-total';

export const ExpenseSummary = ({ expenses, filters }) => {
  const filterdExpenses = selector(expenses, filters);
  const expenseCount = filterdExpenses.length;
  const totalAmount = amountCalculator(filterdExpenses);
  const totalAmountInNaira = number(totalAmount).divide(100).format('$0,0.00');
  
  return (
    <div className="page-header">
      <div className="content-container">
        <h1 className="page-header__title">
          Viewing <span>{expenseCount}</span>&nbsp;
          expense{expenseCount !== 1 && 's'}&nbsp;
          totalling <span>{totalAmountInNaira}</span>
        </h1>
        <div className="page-header__actions">
          <Link className="button" to="/create">Add Expense</Link>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = ({ expenses, filters }) => ({ expenses, filters });

export default connect(mapStateToProps)(ExpenseSummary);
