
const BASE_URL = 'https://min-api.cryptocompare.com/data/histoday';

export function getPrices(crypto, limit, aggregate) {
  return fetch(`${BASE_URL}?fsym=${crypto}&tsym=USD&limit=${limit}&aggregate=${getAggregateMapping(aggregate)}&e=CCCAGG`)
    .then(data => checkStatus(data));
}

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response.json();
  } else {
    const error = new Error(response.statusText);
    error.response = response;
    throw error;
  }
}

function getAggregateMapping(aggregate) {
  switch (aggregate) {
    case 'day':
      return 3;
    default:
      return 3;
  }
}