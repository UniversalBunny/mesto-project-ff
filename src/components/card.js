function createCard (cardData , deleteCard, openPopupImage, cardLiked){
    const cardTemplate = document.querySelector('#card-template').content;
    const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);
    const deleteButton = cardElement.querySelector('.card__delete-button');
    const cardImage = cardElement.querySelector('.card__image');
  
    cardElement.querySelector('.card__image').src = cardData.link;
    cardElement.querySelector('.card__image').alt  = cardData.name;
    cardElement.querySelector('.card__title').textContent = cardData.name;
    
    deleteButton.addEventListener('click', deleteCard);
  
    cardElement.addEventListener('click', cardLiked);
  
    
    const popupImage = document.querySelector('.popup_type_image');
    cardImage.addEventListener('click', function(){
           openPopupImage(cardData, popupImage);
    })
  
    return cardElement;
  }
  
  function deleteCard(event) {
  event.target.closest('.card').remove();
  }
  
  function cardLiked(evt) {
  if(evt.target.classList.contains('card__like-button')){
    evt.target.classList.toggle('card__like-button_is-active');
  }   
  }

  export {createCard, deleteCard, cardLiked};