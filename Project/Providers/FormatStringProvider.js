export function isValidEmail(email) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

export function parseCurrency(baseCurrency) {
  switch(baseCurrency.toLowerCase()) {
    case 'usd':
      return 'U$S';
    case 'uyu':
      return '$';
    case 'eur':
      return '€';
    default:
      return 'U$S';
  }
}
