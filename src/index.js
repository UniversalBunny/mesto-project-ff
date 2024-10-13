import "./pages/index.css";

import { createCard, deleteCard, cardLiked } from "./components/card.js";

import { initialCards } from "./components/cards.js";

import { openModal, closeModal } from "./components/modal.js";

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

// добавляет все карточки при открытии

function addCards() {
  initialCards.forEach(function (cardData) {
    cardContainer.append(
      createCard(cardData, deleteCard, openPopupImage, cardLiked),
    );
  });
}

addCards();

// Закрытие на escape

function closeByEscape(evt, popuptype) {
  if (evt.key === "Escape") {
    document.removeEventListener("keydown", closeByEscape);
    closeModal(popuptype);
  }
}

// редактирование профиля

function handleEditFormSubmit(evt) {
  evt.preventDefault();

  editProfileTitle.textContent = nameInput.value;
  editProfileDescrp.textContent = jobInput.value;

  closeModal(popupEdit);
}

// добавление новой карточки

function addNewCard(evt) {
  evt.preventDefault();

  const newCard = {};
  newCard.name = cardNameInput.value;
  newCard.link = cardUrlInput.value;

  cardContainer.prepend(
    createCard(newCard, deleteCard, openPopupImage, cardLiked),
  );

  closeModal(popupAdd);
  cardForm.reset();
}

// попап картинка

function openPopupImage(data) {
  imageUrl.src = data.link;
  imageUrl.alt = data.name;
  imageText.textContent = data.name;
  openModal(popupImage);
}

// Обработчики событий

editButton.addEventListener("click", function () {
  openModal(popupEdit);
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

document.addEventListener("keydown", function (evt) {
  closeByEscape(evt, popupEdit);
});

document.addEventListener("keydown", function (evt) {
  closeByEscape(evt, popupAdd);
});

document.addEventListener("keydown", function (evt) {
  closeByEscape(evt, popupImage);
});

editForm.addEventListener("submit", handleEditFormSubmit);

cardForm.addEventListener("submit", addNewCard);