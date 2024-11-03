const config = {
    baseUrl: 'https://nomoreparties.co/v1/wff-cohort-25',
    headers: {
      authorization: 'b492c2c7-d2dc-4f84-ab81-75d472967bfc',
      'Content-Type': 'application/json'
    }
  }

// Для Promise.all([]) , в index.js

const getCardsData = () => {
    return fetch(`${config.baseUrl}/cards`, {
        headers: config.headers
      })
        .then((res) => {
          if (res.ok) {
            return res.json();
          }
          return Promise.reject(`Что-то пошло не так: ${res.status}`);
        })
        .catch((err) => {
          console.log(err);
        });
}

const getId = () => {
    return fetch(`${config.baseUrl}/users/me`, {
        headers: config.headers
      })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Что-то пошло не так: ${res.status}`);
      })
      .catch((err) => {
        console.log(err);
      });  
}

// Редактирование профиля

const updateUserInfo = (name, about) => {
    return fetch(`${config.baseUrl}/users/me`, {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify({name ,about})
    })
    .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Что-то пошло не так: ${res.status}`);
      })
      .catch((err) => {
        console.log(err);
      })
}

// добавление новой карточки

const addCardRequest = (name, link) => {
    return fetch(`${config.baseUrl}/cards`, {
        method: 'POST',
        headers: config.headers,
        body: JSON.stringify({name , link})
    })
    .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Что-то пошло не так: ${res.status}`);
      })
      .catch((err) => {
        console.log(err);
      })
}

// Новый аватар 

const newAvatar = (avatarUrl) => {
    return fetch(`${config.baseUrl}/users/me/avatar`, {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify({avatar: avatarUrl})
    })
    .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Что-то пошло не так: ${res.status}`);
      })
      .catch((err) => {
        console.log(err);
      })
}

// Для card.js
// Удаление карточки

const deleteCardRequest = (cardId) => {
    return fetch(`${config.baseUrl}/cards/${cardId}`, {
        method: 'DELETE',
        headers: config.headers
    })
    .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Что-то пошло не так: ${res.status}`);
      })
      .catch((err) => {
        console.log(err);
      })
}

//  Постановка и снятие лайка

const addLike = (cardId, button, counter) => {
    return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
        method: 'PUT',
        headers: config.headers
    })
    .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Что-то пошло не так: ${res.status}`);
      })
      .then((res) => {
        counter.textContent = res.likes.length;
        button.classList.toggle('card__like-button_is-active');
      })
      .catch((err) => {
        console.log(err);
      })
}

const removeLike = (cardId, button, counter) => {
    return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
        method: 'DELETE',
        headers: config.headers
    })
    .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Что-то пошло не так: ${res.status}`);
      })
      .then((res) => {
        counter.textContent = res.likes.length;
        button.classList.toggle('card__like-button_is-active');
      })
      .catch((err) => {
        console.log(err);
      })
}


export { getCardsData, getId , updateUserInfo, addCardRequest, newAvatar, deleteCardRequest, addLike, removeLike};