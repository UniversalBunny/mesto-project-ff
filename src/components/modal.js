function openModal(popuptype) {
    popuptype.classList.add("popup_is-opened");
  }
  
  function closeModal(popuptype) {
    popuptype.classList.remove("popup_is-opened");
  }
  
  export { openModal, closeModal };