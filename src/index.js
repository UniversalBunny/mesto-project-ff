
import './pages/index.css';

import {createCard, deleteCard, cardLiked} from './components/card.js';

import {initialCards} from './components/cards.js';

import { openModal, closeModal } from './components/modal.js';

const cardContainer = document.querySelector('.places__list');


function addCards() {
    initialCards.forEach(function(cardData){
        cardContainer.append(createCard (cardData , deleteCard, openPopupImage, cardLiked))
    })
}

addCards()



//Функции открытия и закрытия окон

const editButton = document.querySelector('.profile__edit-button');
const popupEdit = document.querySelector('.popup_type_edit');

const addButton = document.querySelector('.profile__add-button');
const popupAdd = document.querySelector('.popup_type_new-card');

editButton.addEventListener('click', function(){
    openModal(popupEdit);
})

addButton.addEventListener('click', function(){
    openModal(popupAdd);
})


// редактирование профиля

const formElement = document.querySelector('.popup__form');
const nameInput = formElement.querySelector('.popup__input_type_name');
const jobInput = formElement.querySelector('.popup__input_type_description');
nameInput.value = document.querySelector('.profile__title').textContent;
jobInput.value =  document.querySelector('.profile__description').textContent;

function handleFormSubmit(evt) {
    evt.preventDefault();

    document.querySelector('.profile__title').textContent = nameInput.value;
    document.querySelector('.profile__description').textContent = jobInput.value;

    closeModal(popupEdit);
}
formElement.addEventListener('submit', handleFormSubmit);

// добавление новой карточки

const cardForm = document.forms.new_place;
const cardNameInput =  cardForm.elements.place_name;
const cardUrlInput = cardForm.elements.link;

function addNewCard(evt) {
    evt.preventDefault();

    const newCard = {};
    newCard.name = cardNameInput.value;
    newCard.alt = cardNameInput.value;
    newCard.link = cardUrlInput.value;

    cardContainer.prepend(createCard (newCard , deleteCard, openPopupImage, cardLiked));

    closeModal(popupAdd);
    cardForm.reset();
}

cardForm.addEventListener('submit', addNewCard );

// попап картинка
const popupImage = document.querySelector('.popup_type_image');
const imageUrl = popupImage.querySelector('.popup__image');
const imageText = popupImage.querySelector('.popup__caption');

    function openPopupImage(data, page ) {
        imageUrl.src = data.link;
        imageUrl.alt = data.name;
        imageText.textContent = data.name;
        openModal(page);
    }