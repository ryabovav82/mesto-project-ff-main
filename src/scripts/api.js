const config = {
  baseUrl: "https://nomoreparties.co/v1/wff-cohort-10",
  headers: {
    authorization: "cb7f8fe3-44be-480a-9138-f3e33c810e56",
    "Content-Type": "application/json",
  },
};

const handleResponse = (res) => {
  if (res.ok) {
    return res.json();
}
return Promise.reject(`Ошибка: ${res.status}`);
};

export const getInitialCards = async () => {
  return fetch(`${config.baseUrl}/cards`, {
      headers: config.headers
  }).then(handleResponse);
};

export const getProfileUser = async () => {
  return fetch(config.baseUrl + "/users/me", {
    headers: config.headers,
  }).then(handleResponse);
};

export const changeProfile = async (name, about) => {
  return fetch(`${config.baseUrl}/users/me`, {
      method: 'PATCH',
      headers: config.headers,
      body: JSON.stringify({
          name: name,
          about: about
      })
  }).then(handleResponse);
};

export const postCard = async (name, link) => {
  return fetch(`${config.baseUrl}/cards`, {
      method: 'POST',
      headers: config.headers,
      body: JSON.stringify({
          name: name,
          link: link
      })
  }).then(handleResponse);
};

export const deleteCardServer = async (id) => {
  return fetch(`${config.baseUrl}/cards/${id}`, {
      method: 'DELETE',
      headers: config.headers
  }).then(handleResponse);
};

export const likedCardServer = async (id) => {
  return fetch(`${config.baseUrl}/cards/likes/${id}`, {
      method: 'PUT',
      headers: config.headers
  }).then(handleResponse);
};

export const deleteLikedCardServer = async (id) => {
  return fetch(`${config.baseUrl}/cards/likes/${id}`, {
      method: 'DELETE',
      headers: config.headers
  }).then(handleResponse);
};

export const editAvatorServer = async (data) => {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: config.headers,
      body: JSON.stringify({
        avatar: data.avatar
    })
  }).then(handleResponse);
};