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
  ordinal : function (number) {
      return number === 1 ? 'er' : 'ème';
  },
  currency: {
      symbol: '₦'
  }
});

numeral.locale('ng');

export default numeral;