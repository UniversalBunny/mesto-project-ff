const config = {
  baseUrl: "https://nomoreparties.co/v1/wff-cohort-25",
  headers: {
    authorization: "b492c2c7-d2dc-4f84-ab81-75d472967bfc",
    "Content-Type": "application/json",
  },
};

const checkResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Что-то пошло не так: ${res.status}`);
}

// Для Promise.all([]) , в index.js

const getCardsData = () => {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers,
  }).then((res) => checkResponse(res));
};

const getProfileData = () => {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers,
  }).then((res) => checkResponse(res));
};

// Редактирование профиля

const updateUserInfo = (name, about) => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({ name, about }),
  }).then((res) => checkResponse(res));
};

// добавление новой карточки

const addCardRequest = (card) => {
  return fetch(`${config.baseUrl}/cards`, {
    method: "POST",
    headers: config.headers,
    body: JSON.stringify({
      name: card.name,
      link: card.link,
    }),
  }).then((res) => checkResponse(res));
};

// Новый аватар

const newAvatar = (avatarUrl) => {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({ avatar: avatarUrl }),
  }).then((res) => checkResponse(res));
};

// Для card.js
// Удаление карточки

const deleteCardRequest = (cardId) => {
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: "DELETE",
    headers: config.headers,
  }).then((res) => checkResponse(res));;
};

//  Постановка и снятие лайка

const addLike = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: "PUT",
    headers: config.headers,
  }).then((res) => checkResponse(res));
};

const removeLike = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: "DELETE",
    headers: config.headers,
  }).then((res) => checkResponse(res));
};

export { getCardsData, getProfileData , updateUserInfo, addCardRequest, newAvatar, deleteCardRequest, addLike, removeLike};