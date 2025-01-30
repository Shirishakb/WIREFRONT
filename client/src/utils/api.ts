import type { User } from '../models/User.js';
import auth from './auth.js';

// route to get logged in user's info (needs the token)

export const getMe = async () => {
  try {
    const response = await fetch('/auth/user', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${auth.getToken()}`,
      },
    });

    if (!response.ok) {
      throw new Error('invalid API response, check network tab!');
    }

    const data = await response.json();

    return data;
  } catch (err) {
    console.log('Error from data retrieval: ', err);
    return null;
  }
};

export const createUser = (userData: User) => {
  return fetch('/auth/signup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  });
};

export const loginUser = (userData: User) => {
  return fetch('/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  });
};