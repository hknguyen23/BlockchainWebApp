import config from '../constants/config.json';

const API_URL = config.API_LOCAL;

async function signInUser(data) {
  return await fetch(`${API_URL}/users/signIn/`, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    }
  }).then(res => res.json());
}

async function signUpUser(data) {
  return await fetch(`${API_URL}/users/signUp/`, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    }
  }).then(res => res.json());
}

async function getUser(id) {
  return await fetch(`${API_URL}/users/${id}`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    }
  }).then(res => res.json());
}

async function updateProject(data) {
  return await fetch(`${API_URL}/projects/update/`, {
    method: 'PUT',
    body: JSON.stringify(data),
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    }
  }).then(res => res.json());
}

export { signInUser, signUpUser, getUser }