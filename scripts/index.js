// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу
const cardContainer = document.querySelector('.places__list');
const cardTemplate = document.querySelector('#card-template').content;

function createCard (cardData , deleteCard){
        const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);
        const deleteButton = cardElement.querySelector('.card__delete-button');

        cardElement.querySelector('.card__image').src = cardData.link;
        cardElement.querySelector('.card__image').alt  = cardData.name;
        cardElement.querySelector('.card__title').textContent = cardData.name;

        deleteButton.addEventListener('click', deleteCard); 
    
        return cardElement  
}

function deleteCard(event) {
    event.target.closest('.card').remove();
}

function addCards() {
    initialCards.forEach(function(cardData){
        cardContainer.append(createCard (cardData , deleteCard))
    })
}

addCards()
