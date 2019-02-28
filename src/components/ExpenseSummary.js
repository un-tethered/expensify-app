import React from 'react';
import { connect } from 'react-redux';
import number from '../util/numeral-locale-naira';
import selector from '../selectors/expenses';
import amountCalculator from '../selectors/expense-total';

export const ExpenseSummary = ({ expenses, filters }) => {
  const filterdExpenses = selector(expenses, filters);
  const expenseCount = filterdExpenses.length;
  const totalAmount = amountCalculator(filterdExpenses);
  const totalAmountInNaira = number(totalAmount).divide(100).format('$0,0.00');
  const jsx = (
    <h1>
      Viewing {expenseCount}&nbsp;
      expense{expenseCount !== 1 && 's'}&nbsp;
      totalling {totalAmountInNaira}
    </h1>
  );

  return (
    <div>
      {expenseCount > 0 && jsx}
    </div>
  );
};

const mapStateToProps = ({ expenses, filters }) => ({ expenses, filters });

export default connect(mapStateToProps)(ExpenseSummary);
