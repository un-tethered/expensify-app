import React from 'react';
import { connect } from 'react-redux';
import ExpenseForm from './ExpenseForm';
import { startEditExpense, startRemoveExpense } from '../actions/expenses';

export class EditExpensePage extends React.Component {
  editExpense = (expense) => {
    this.props.editExpense(expense);
    this.props.history.push('/');
  };

  removeExpense = () => {
    this.props.removeExpense();
    this.props.history.push('/');
  };

  render() {
    return (
      <div>
        <ExpenseForm expense={this.props.expense} onSubmit={this.editExpense} />
        <button onClick={this.removeExpense}>Remove</button>
      </div>
    );
  }
}

const mapStateToProps = ({ expenses }, props) => ({
  expense: expenses.find(({ id }) => id === props.match.params.id)
});

const mapDispatchToProps = (dispatch, { match: { params: { id } } }) => ({
  editExpense: expense => dispatch(startEditExpense(id, expense)),
  removeExpense: () => dispatch(startRemoveExpense(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(EditExpensePage);
