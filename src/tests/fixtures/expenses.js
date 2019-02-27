import moment from 'moment';

export default [{
  id: '1',
  description: 'This',
  amount: 1000,
  createdAt: moment(0).valueOf(),
  note: 'This mistake extracts a heavy toll'
}, {
  id: '2',
  description: 'Mistake',
  amount: 50,
  createdAt: moment(0).subtract(4, 'days').valueOf(),
  note: 'This mistake extracts a heavy toll'
}, {
  id: '3',
  description: 'Extracts',
  amount: 500,
  createdAt: moment(0).add(4, 'days').valueOf(),
  note: 'This mistake extracts a heavy toll'
}];
