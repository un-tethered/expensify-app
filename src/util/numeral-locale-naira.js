import numeral from 'numeral';

numeral.register('locale', 'ng', {
  delimiters: {
      thousands: ',',
      decimal: '.'
  },
  abbreviations: {
      thousand: 'k',
      million: 'm',
      billion: 'Bn',
      trillion: 't'
  },
  currency: {
      symbol: '₦'
  }
});

numeral.locale('ng');

export default numeral;