import "./pages/index.css";

import { createCard, deleteCard, cardLiked} from "./components/card.js";

import { initialCards } from "./components/cards.js";

import { openModal, closeModal, closeByEscape } from "./components/modal.js";

import {showError, hideError, checkInputValidity, hasInvalidInput, toggleButtonState, setEventListeners, enableValidation, clearValidation} from "./components/validation.js";

const cardContainer = document.querySelector(".places__list");
// попапы
const editButton = document.querySelector(".profile__edit-button");
const popupEdit = document.querySelector(".popup_type_edit");
const popupEditCloseButton = popupEdit.querySelector(".popup__close");

const addButton = document.querySelector(".profile__add-button");
const popupAdd = document.querySelector(".popup_type_new-card");
const popupAddCloseButton = popupAdd.querySelector(".popup__close");

const popupImage = document.querySelector(".popup_type_image");
const popupImageCloseButton = popupImage.querySelector(".popup__close");
const imageUrl = popupImage.querySelector(".popup__image");
const imageText = popupImage.querySelector(".popup__caption");

const avatarButton = document.querySelector('.profile__avatar-button');
const popupAvatar = document.querySelector('.popup_type_new-avatar');
const popupAvatarCloseButton = popupAvatar.querySelector(".popup__close");
// редактирование профиля
const editForm = document.querySelector(".popup__form");
const nameInput = editForm.querySelector(".popup__input_type_name");
const jobInput = editForm.querySelector(".popup__input_type_description");
const editProfileTitle = document.querySelector(".profile__title");
const editProfileDescrp = document.querySelector(".profile__description");
// добавление новой карточки
const cardForm = document.forms.new_place;
const cardNameInput = cardForm.elements.place_name;
const cardUrlInput = cardForm.elements.link;
// обновление аватара
const avatarUpdateForm = document.forms.avatar_update;
const avatarUrlInput = avatarUpdateForm.elements.new-avatar-link;

// редактирование профиля

function handleEditFormSubmit(evt) {
  evt.preventDefault();
  
  editProfileTitle.textContent = nameInput.value;
  editProfileDescrp.textContent = jobInput.value;

  updateUserInfo(nameInput.value, jobInput.value);

  closeModal(popupEdit);
}

// добавление новой карточки

function addNewCard(evt) {
  evt.preventDefault();

  const newCard = {};
  newCard.name = cardNameInput.value;
  newCard.link = cardUrlInput.value;

  addCardRequest(cardNameInput.value, cardUrlInput.value)
  clearValidation(cardForm, validationConfig);
  closeModal(popupAdd);
  cardForm.reset();
}

// попап картинка

function openPopupImage(data) {
  imageUrl.src = data.link;
  imageText.textContent = data.name;
  openModal(popupImage);
}

// Обработчики событий

editButton.addEventListener("click", function () {
  openModal(popupEdit);
  clearValidation(editForm, validationConfig);
  nameInput.value = editProfileTitle.textContent;
  jobInput.value = editProfileDescrp.textContent;
});

popupEditCloseButton.addEventListener("click", function () {
  closeModal(popupEdit);
});

popupEdit.addEventListener("click", function (evt) {
  if (evt.target === popupEdit) {
    closeModal(popupEdit);
  }
});

addButton.addEventListener("click", function () {
  openModal(popupAdd);
});

popupAddCloseButton.addEventListener("click", function () {
  closeModal(popupAdd);
});

popupAdd.addEventListener("click", function (evt) {
  if (evt.target === popupAdd) {
    closeModal(popupAdd);
  }
});

popupImageCloseButton.addEventListener("click", function () {
  closeModal(popupImage);
});

popupImage.addEventListener("click", function (evt) {
  if (evt.target === popupImage) {
    closeModal(popupImage);
  }
});

avatarButton.addEventListener("click", function () {
  openModal(popupAvatar);
});

popupAvatarCloseButton.addEventListener("click", function () {
  closeModal(popupAvatar);
});

popupAvatar.addEventListener("click", function (evt) {
  if (evt.target === popupAvatar) {
    closeModal(popupAvatar);
  }
});

editForm.addEventListener("submit", handleEditFormSubmit);

cardForm.addEventListener("submit", addNewCard);

//  // //

const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button-inactive',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active'
};

enableValidation(validationConfig);


// настройка апи
// Токен: b492c2c7-d2dc-4f84-ab81-75d472967bfc
// Идентификатор группы: wff-cohort-25
// Ссылка на изображение: https://images.unsplash.com/photo-1724026502211-ff953e813194?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D

function getCardsData() {
  return fetch('https://nomoreparties.co/v1/wff-cohort-25/cards', {
    headers: {
      authorization: 'b492c2c7-d2dc-4f84-ab81-75d472967bfc'
    }
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

 
function getId() {
  return fetch('https://nomoreparties.co/v1/wff-cohort-25/users/me ', {
    headers: {
      authorization: 'b492c2c7-d2dc-4f84-ab81-75d472967bfc'
    }
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

Promise.all([getCardsData(), getId()])
.then((results) => {
  console.log(results);
  const cards = results[0];
  const myData = results[1];

    cards.forEach((cardData) => {
      cardContainer.append(createCard(cardData, myData, deleteCard, openPopupImage, cardLiked));
    });

    editProfileTitle.textContent = myData.name;
    editProfileDescrp.textContent = myData.about;

});

// редактирование профиля

function updateUserInfo(name, about){
  fetch('https://nomoreparties.co/v1/wff-cohort-25/users/me', {
    method: 'PATCH',
    headers: {
      authorization: 'b492c2c7-d2dc-4f84-ab81-75d472967bfc',
      'Content-Type': 'application/json'
    },
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

function addCardRequest(name, link) {
  fetch('https://nomoreparties.co/v1/wff-cohort-25/cards', {
    method: 'POST',
    headers: {
      authorization: 'b492c2c7-d2dc-4f84-ab81-75d472967bfc',
      'Content-Type': 'application/json'
    },
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

// новый аватар 

function newAvatar() {
  evt.preventDefault();
  
  clearValidation(cardForm, validationConfig);
  closeModal(popupAdd);
  cardForm.reset();
}