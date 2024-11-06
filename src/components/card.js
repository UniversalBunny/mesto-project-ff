import { deleteCardRequest, addLike, removeLike } from "./api";

function createCard(cardData, userID, deleteCard, openPopupImage, cardLiked) {
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

  deleteCard(cardData, userID, deleteButton);

  likesCounter.textContent = cardData.likes.length;

  isCardLiked(cardData, userID, likeButton);

  likeButton.addEventListener("click", function () {
    cardLiked(cardData, likeButton, likesCounter);
  });

  cardImage.addEventListener("click", function () {
    openPopupImage(cardData);
  });

  return cardElement;
}

// удаление карточки

function deleteCard(cardData, userID, button) {
  if (cardData.owner._id !== userID) {
    button.remove();
  } else {
    button.addEventListener("click", function (event) {
      deleteCardRequest(cardData._id)
        .then(() => {
          event.target.closest(".card").remove();
        })
        .catch((err) => {
          console.log(err);
        });
    });
  }
}

//  Постановка и снятие лайка

function isCardLiked(cardData, userID, button) {
  if (cardData.likes.some((like) => like._id === userID)) {
    button.classList.add("card__like-button_is-active");
  }
}

function cardLiked(cardData, button, counter) {
  if (button.classList.contains("card__like-button_is-active")) {
    removeLike(cardData._id, button, counter)
      .then((res) => {
        counter.textContent = res.likes.length;
        button.classList.toggle("card__like-button_is-active");
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    addLike(cardData._id, button, counter)
      .then((res) => {
        counter.textContent = res.likes.length;
        button.classList.toggle("card__like-button_is-active");
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

export { createCard, deleteCard, cardLiked };
