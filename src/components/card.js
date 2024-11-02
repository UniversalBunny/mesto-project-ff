function createCard(cardData, userData, deleteCard, openPopupImage, cardLiked) {
  const cardTemplate = document.querySelector("#card-template").content;
  const cardElement = cardTemplate
    .querySelector(".places__item")
    .cloneNode(true);
  const deleteButton = cardElement.querySelector(".card__delete-button");
  const likeButton = cardElement.querySelector(".card__like-button");
  const cardImage = cardElement.querySelector(".card__image");
  const likesCounter = cardTemplate.querySelector(".card__like-counter");

  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  cardElement.querySelector(".card__title").textContent = cardData.name;

  deleteCard(cardData, userData, deleteButton);

  likesCounter.textContent = cardData.likes.length; 
  
  isCardLiked(cardData, userData, likeButton);
  
  likeButton.addEventListener('click', function(){
    cardLiked(cardData, likeButton, likesCounter);
  })

  cardImage.addEventListener("click", function () {
    openPopupImage(cardData);
  });

  return cardElement;
}

function deleteCard(cardData, userData, button) {
    if (cardData.owner._id !== userData._id) {
      button.remove();
    } else {
      button.addEventListener('click', function(){
        deleteCardRequest(cardData._id);
      })
    }
}

function deleteCardRequest(cardId) {
  fetch(`https://nomoreparties.co/v1/wff-cohort-25/cards/${cardId}`, {
    method: 'DELETE',
    headers: {
      authorization: 'b492c2c7-d2dc-4f84-ab81-75d472967bfc',
      'Content-Type': 'application/json'
    },
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
function isCardLiked(cardData, userData, button){
  if(cardData.likes.some(like => like._id === userData._id)){
    button.classList.add('card__like-button_is-active');
  }
}

function cardLiked(cardData, button, counter) {
  if(button.classList.contains('card__like-button_is-active')) {
    removeLike(cardData._id, button, counter);
  } else {
    addLike(cardData._id, button, counter);
  }
}

function addLike(cardId, button, counter) {
  fetch(`https://nomoreparties.co/v1/wff-cohort-25/cards/likes/${cardId}`, {
    method: 'PUT',
    headers: {
      authorization: 'b492c2c7-d2dc-4f84-ab81-75d472967bfc'
    },
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

function removeLike(cardId, button, counter) {
  fetch(`https://nomoreparties.co/v1/wff-cohort-25/cards/likes/${cardId}`, {
    method: 'DELETE',
    headers: {
      authorization: 'b492c2c7-d2dc-4f84-ab81-75d472967bfc'
    },
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

export { createCard, deleteCard, cardLiked };