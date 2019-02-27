import React from 'react';
import { connect } from 'react-redux';
import { DateRangePicker } from 'react-dates';
import {
  setTextFilter, sortByAmount, sortByDate, setStartDate, setEndDate
} from '../actions/filters';


export class ExpenseListFilters extends React.Component {
  state = {
    calendarFocused: null
  };

  onDatesChange = ({ startDate, endDate }) => {
    this.props.setStartDate(startDate);
    this.props.setEndDate(endDate);
  };

  onTextFilterChange = ({ target: { value: text } }) => {
    this.props.setTextFilter(text)
  };

  onSortByChange = ({ target: { value: sortBy } }) => {
    sortBy === 'date'
      ? this.props.sortByDate()
      : this.props.sortByAmount()
  };

  onFocusChange = (calendarFocused) => {
    this.setState(() => ({ calendarFocused }));
  };

  render() {
    return (
      <div>
        <input
          type="text" value={this.props.filters.text}
          onChange={this.onTextFilterChange}
        />

        <select onChange={this.onSortByChange}>
          <option value="date">Date</option>
          <option value="amount">Amount</option>
        </select>

        <DateRangePicker
          startDateId="startDateId"
          startDate={this.props.filters.startDate}
          endDateId="endDateId"
          endDate={this.props.filters.endDate}
          onDatesChange={this.onDatesChange}
          focusedInput={this.state.calendarFocused}
          onFocusChange={this.onFocusChange}
          numberOfMonths={1}
          showClearDates={true}
          isOutsideRange={() => false}
        />
      </div>
    );
  }
}

const mapStateToProps = ({ filters }) => ({ filters });

const mapDispatchToProps = (dispatch) => ({
  setStartDate: startDate => dispatch(setStartDate(startDate)),
  setEndDate: endDate => dispatch(setEndDate(endDate)),
  setTextFilter: text => dispatch(setTextFilter(text)),
  sortByDate: () => dispatch(sortByDate()),
  sortByAmount: () => dispatch(sortByAmount())
});


export default connect(mapStateToProps, mapDispatchToProps)(ExpenseListFilters);