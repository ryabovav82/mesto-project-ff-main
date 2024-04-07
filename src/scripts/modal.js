const openPopup = (popup) => {
    popup.classList.add('popup_is-opened');
    document.body.addEventListener('keydown', closePopupEscHandler);
}

const closePopup = (popup) => {
    popup.classList.remove('popup_is-opened');
    document.body.removeEventListener('keydown', closePopupEscHandler);
}

const closePopupEscHandler = (event) => {
    if (event.key === 'Escape') {
        const popupIsOpen = document.querySelector('.popup_is-opened');
        closePopup(popupIsOpen);
    }
}

const closePopupHandler = (event) => {
    if (event.target.classList.contains('popup') || event.target.classList.contains('popup__close')) {
        const popupIsOpen = document.querySelector('.popup_is-opened');
        closePopup(popupIsOpen);
    }
}

export {openPopup, closePopup, closePopupHandler}