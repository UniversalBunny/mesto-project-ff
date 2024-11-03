import {deleteCardRequest, addLike, removeLike} from "./api";

function createCard(cardData, userData, deleteCard, openPopupImage, cardLiked) {
  const cardTemplate = document.querySelector("#card-template").content;
  const cardElement = cardTemplate
    .querySelector(".places__item")
    .cloneNode(true);
  const deleteButton = cardElement.querySelector(".card__delete-button");
  const likeButton = cardElement.querySelector(".card__like-button");
  const cardImage = cardElement.querySelector(".card__image");
  const likesCounter = cardElement.querySelector(".card__like-counter");

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

// удаление карточки

function deleteCard(cardData, userData, button) {
    if (cardData.owner._id !== userData._id) {
      button.remove();
    } else {
      button.addEventListener('click', function(){
        deleteCardRequest(cardData._id);
      })
    }
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

export { createCard, deleteCard, cardLiked };