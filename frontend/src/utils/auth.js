const baseUrl = 'https://api.mesto.kpreis.nomoredomains.sbs';

const checkResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
};

export const register = (email, password) => {
  return fetch(`${baseUrl}/signup`, {
    credentials: 'include',
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email: email, password: password }),
  }).then((response) => {
    return checkResponse(response);
  });
};

export const authorization = (email, password) => {
  return fetch(`${baseUrl}/signin`, {
    credentials: 'include',
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email: email, password: password }),
  }).then((response) => {
    return checkResponse(response);
  });
};

export const logout = () => {
  return fetch(`${baseUrl}/signout`, {
    credentials: 'include',
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  }).then((response) => {
    return checkResponse(response);
  });

}

export const validateToken = () => {
  return fetch(`${baseUrl}/users/me`, {
    credentials: 'include',
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((response) => {
    return checkResponse(response);
  });
};
