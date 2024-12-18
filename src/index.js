import "./pages/index.css";

import { createCard, deleteCard, cardLiked} from "./components/card.js";

import { openModal, closeModal} from "./components/modal.js";

import {  enableValidation, clearValidation} from "./components/validation.js";

import { getCardsData, getProfileData , updateUserInfo, addCardRequest, newAvatar} from "./components/api.js";

const cardContainer = document.querySelector(".places__list");
let myId;
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

const avatarButton = document.querySelector(".profile__avatar-button");
const popupAvatar = document.querySelector(".popup_type_new-avatar");
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
const avatarUrlInput = avatarUpdateForm.elements.new_avatar_link;
const profileImage = document.querySelector(".profile__image");
// валидация форм
const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button-inactive",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__input-error_active",
};

// редактирование профиля

function handleEditFormSubmit(evt) {
  evt.preventDefault();

  loading(editForm, true);

  updateUserInfo(nameInput.value, jobInput.value)
    .then(() => {
      editProfileTitle.textContent = nameInput.value;
      editProfileDescrp.textContent = jobInput.value;
      closeModal(popupEdit);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      loading(editForm, false);
    });
}

// добавление новой карточки

function addNewCard(evt) {
  evt.preventDefault();

  const newCard = {};
  newCard.name = cardNameInput.value;
  newCard.link = cardUrlInput.value;

  loading(cardForm, true);

  addCardRequest(newCard)
    .then((data) => {
      cardContainer.prepend(
        createCard(data, myId, deleteCard, openPopupImage, cardLiked),
      );
    })
    .then(() => {
      clearValidation(cardForm, validationConfig);
      closeModal(popupAdd);
      cardForm.reset();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      loading(cardForm, false);
    });
}

// новый аватар

function updateUserAvatar(evt) {
  evt.preventDefault();

  loading(avatarUpdateForm, true);

  newAvatar(avatarUrlInput.value)
    .then((data) => {
      profileImage.style.backgroundImage = `url(${data.avatar})`;
    })
    .then(() => {
      clearValidation(avatarUpdateForm, validationConfig);
      closeModal(popupAvatar);
      avatarUpdateForm.reset();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      loading(avatarUpdateForm, false);
    });
}

// попап картинка

function openPopupImage(data) {
  imageUrl.src = data.link;
  imageUrl.alt = data.name;
  imageText.textContent = data.name;
  openModal(popupImage);
}

// UX

function loading(form, isLoading) {
  const submitButton = form.querySelector(".popup__button");
  if (isLoading) {
    submitButton.textContent = "Сохранение...";
  } else {
    submitButton.textContent = "Сохранить";
  }
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

avatarUpdateForm.addEventListener("submit", updateUserAvatar);

enableValidation(validationConfig);

// Загрузка обновленных данных

Promise.all([getCardsData(), getProfileData()])
  .then((results) => {
    console.log(results);
    const cards = results[0];
    const myData = results[1];

    myId = myData._id;

    cards.forEach((cardData) => {
      cardContainer.append(
        createCard(cardData, myId, deleteCard, openPopupImage, cardLiked),
      );
    });

    editProfileTitle.textContent = myData.name;
    editProfileDescrp.textContent = myData.about;

    profileImage.style.backgroundImage = `url(${myData.avatar})`;
  })
  .catch((err) => {
    console.log(err);
  });
