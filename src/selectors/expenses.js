import moment from 'moment';

export default (expenses, { text, sortBy, startDate, endDate }) => (
  expenses.filter(expense => {
    const createdAtMoment = moment(expense.createdAt);
    const startDateMatch = startDate ? startDate.isSameOrBefore(moment(createdAtMoment, 'day')) : true;
    const endDateMatch = endDate ? endDate.isSameOrAfter(moment(createdAtMoment, 'day')) : true;
    const textMatch = typeof text !== 'string' || expense.description.toLowerCase().includes(text.toLowerCase());

    return startDateMatch && endDateMatch && textMatch;
  }).sort((a, b) => {
    if (sortBy === 'date') {
      return b.createdAt < a.createdAt ? -1 : 1;
    }
    return b.amount < a.amount ? -1 : 1;
  })
);