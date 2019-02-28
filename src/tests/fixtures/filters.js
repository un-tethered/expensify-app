import moment from 'moment';

export const filters = {
  text: '',
  sortBy: 'date',
  startDate: undefined,
  endDate: undefined
};

export const filters2 = {
  text: 'foo',
  sortBy: 'amount',
  startDate: moment(),
  endDate: moment().add(3, 'days')
};

export const filters3 = {
  text: 'a',
  sortBy: 'date',
  startDate: undefined,
  endDate: undefined
};
