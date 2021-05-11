import config from '../constants/config.json';

const API_URL = config.API_LOCAL;

async function addTransaction(data) {
  return await fetch(`${API_URL}/transactions/add`, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    }
  }).then(res => res.json());
}

async function getListTransactions(userID) {
  return await fetch(`${API_URL}/transactions/${userID}`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    }
  }).then(res => res.json());
}

export { addTransaction, getListTransactions }