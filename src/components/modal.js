function openModal(page) {
    page.classList.add('popup_is-opened');

    const closeButton = page.querySelector('.popup__close')

    closeButton.addEventListener('click', function(){
        closeModal(page);
    })

    page.addEventListener('click', function(evt){
        if(evt.target === page) {
            closeModal(page);
        }
    })
    
    function closeByEscape(evt){
        if (evt.key === 'Escape') {
            closeModal(page); 
        } 
        document.removeEventListener('keydown', closeByEscape);
    }
    document.addEventListener('keydown', closeByEscape);
}

function closeModal(page) {
    page.classList.remove('popup_is-opened');
}

export { openModal, closeModal};