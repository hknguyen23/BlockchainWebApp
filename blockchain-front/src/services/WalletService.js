import config from '../constants/config.json';

const API_URL = config.API_LOCAL;

async function updateWallet(data) {
  return await fetch(`${API_URL}/wallets/update/`, {
    method: 'PUT',
    body: JSON.stringify(data),
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    }
  }).then(res => res.json());
}

export { updateWallet }