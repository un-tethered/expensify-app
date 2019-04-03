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
      <div className="content-container">
        <div className="input-group">
          <div className="input-group__item">
            <input
              className="text-input"
              onChange={this.onTextFilterChange}
              placeholder="Search expenses"
              type="text" value={this.props.filters.text}
            />
          </div>

          <div className="input-group__item">
            <select className="select" onChange={this.onSortByChange}>
              <option value="date">Date</option>
              <option value="amount">Amount</option>
            </select>
          </div>

          <div className="input-group__item">
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
        </div>
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