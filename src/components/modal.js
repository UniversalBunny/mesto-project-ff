function openModal(popuptype) {
  popuptype.classList.add('popup_is-opened');
  document.addEventListener('keydown', closeByEscape);
}
  
function closeModal(popuptype) {
  popuptype.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', closeByEscape);
}


function closeByEscape(evt) {
    if(evt.key === 'Escape') {
      const popupOpen = document.querySelector('.popup_is-opened');
      closeModal(popupOpen);
    }
  }

  export { openModal, closeModal, closeByEscape };
