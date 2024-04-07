import './pages/index.css';
import {enableValidation, clearValidation} from './scripts/validation.js';
import {createCard} from './scripts/card.js';
import {openPopup, closePopup, closePopupHandler} from './scripts/modal.js';
import {getInitialCards, getProfileUser, changeProfile, postCard, deleteCardServer, likedCardServer, deleteLikedCardServer, editAvatorServer} from './scripts/api.js';

const popupTypeEdit = document.querySelector('.popup_type_edit');
const popupTypeAvatar = document.querySelector('.popup_type_avatar');
const profileTypeAvatarButton = document.querySelector('.profile__image-wrapper');
const popup = document.querySelectorAll('.popup');
const profileEditButton = document.querySelector('.profile__edit-button');
const profileAddButton = document.querySelector('.profile__add-button');
const placesList = document.querySelector('.places__list');
const profileTitle = document.querySelector('.profile__title');
const popupInputTypeName = document.querySelector('.popup__input_type_name')
const profileDescription = document.querySelector('.profile__description');
const popupInputTypeDescription = document.querySelector('.popup__input_type_description');
const popupInputTypeCardName = document.querySelector('.popup__input_type_card-name');
const popupInputTypeUrl = document.querySelector('.popup__input_type_url');
const popupTypeNewCard = document.querySelector('.popup_type_new-card');
const popupTypeConfirm = document.querySelector('.popup_type_confirm');
const formModalDelete = popupTypeConfirm.querySelector('.popup__form');
const profileAvatar = document.querySelector('.profile__image');
const popupEditProfileForm = document.forms['edit-profile'];
const popupNewPlaceForm = document.forms['new-place'];
const popupInputEditAvatar = document.querySelector('.popup__input_type-avatar_url');

let deleteCardElement;
let deleteCardId;

const validationConfig = {
    formSelector: ".popup__form",
    inputSelector: ".popup__input",
    submitButtonSelector: ".popup__button",
    inactiveButtonClass: "popup__button_disabled",
    inputErrorClass: "popup__input_type_error",
    errorClass: "popup__error_visible",
  };

enableValidation(validationConfig); 

const showPopupTypeImage = (element) => {
    const popupTypeImage = document.querySelector('.popup_type_image');
    const popupImage = popupTypeImage.querySelector('.popup__image');
    const popupCaption = popupTypeImage.querySelector('.popup__caption');
    popupImage.src = element.src;
    popupCaption.textContent = element.alt;
    openPopup(popupTypeImage);
}

const handlerProfileEdit = () => {
    popupInputTypeName.value = profileTitle.textContent;
    popupInputTypeDescription.value = profileDescription.textContent;
    clearValidation(popupEditProfileForm, validationConfig);
    openPopup(popupTypeEdit);
}

export const handlerTypeConfirm = (cardId, cardElement) => {
    deleteCardElement = cardElement;
    deleteCardId = cardId;
    openPopup(popupTypeConfirm);
}

const handlerNewCard = () => {
    openPopup(popupTypeNewCard);
}

const handlerAvatarEdit = () => {
    openPopup(popupTypeAvatar);
}

const deleteCard = (event) => {
    event.preventDefault();
    deleteCardServer(deleteCardId)
    .then(() => {
        deleteCardElement.remove();
        closePopup(popupTypeConfirm);
    })
    .catch((err) => {
        console.log(err);
      })
}

const handlerFormEditTypeSubmit = (event) => {
    event.preventDefault();
    popupTypeEdit.querySelector('.popup__button').textContent = 'Сохранение...';
    changeProfile(popupInputTypeName.value, popupInputTypeDescription.value)
        .then((res) => {
            profileTitle.textContent = res.name;
            profileDescription.textContent = res.about;
            closePopup(popupTypeEdit);
        })
        .catch((err) => {
            console.log(err);
          })
        .finally(() => {
            popupTypeEdit.querySelector('.popup__button').textContent = 'Сохраненить';
          });
}

const handleFormNewCardSubmit = async (event) => {
    event.preventDefault();
    popupTypeNewCard.querySelector('.popup__button').textContent = 'Сохранение...';
    const item = {
        name: popupInputTypeCardName.value,
        link: popupInputTypeUrl.value,
        likes: []
    }
    postCard(item.name, item.link, item.likes)
        .then((res) => {
            popupNewPlaceForm.reset();
            clearValidation(popupNewPlaceForm, validationConfig);
            closePopup(popupTypeNewCard);
            return placesList.prepend(createCard(res, showPopupTypeImage, res.owner._id));
        })
        .catch((err) => {
            console.log(err);
          })
        .finally(() => {
            popupTypeNewCard.querySelector('.popup__button').textContent = 'Сохраненить';
          });
}

const handlerAvatarSubmit = async (event) => {
    event.preventDefault();
    popupTypeAvatar.querySelector('.popup__button').textContent = 'Сохранение...';
    const avatar = {
        avatar: popupInputEditAvatar.value,
    }
    editAvatorServer(avatar)
    .then((res) => {
        profileAvatar.style.backgroundImage = `url(${res.avatar})`;
        closePopup(popupTypeAvatar);
        popupInputEditAvatar.value = '';
    })
    .catch((err) => {
        console.log(err);
      })
    .finally(() => {
        popupTypeAvatar.querySelector('.popup__button').textContent = 'Сохраненить';
      });
}

export const likedCard = (event, idCard) => {
    let likesCount = event.target.parentNode.querySelector('.card__like-count');
    if (event.target.classList.contains('card__like-button_is-active')) {
        deleteLikedCardServer(idCard)
        .then((res) => {
            event.target.classList.remove('card__like-button_is-active');
            likesCount.textContent = res.likes.length;
        })
    } else {
        likedCardServer(idCard)
        .then((res) => {
            event.target.classList.add('card__like-button_is-active');
            likesCount.textContent = res.likes.length;
        })
        .catch((err) => {
            console.log(err);
          })
    }
}

const getInitialInfo = async () => {
    return Promise.all([getProfileUser(), getInitialCards()]);
  };

getInitialInfo().then((res) => {
    profileTitle.textContent = res[0].name;
    profileDescription.textContent = res[0].about;
    profileAvatar.style.backgroundImage = `url(${res[0].avatar})`;
    res[1].map(item => placesList.append(createCard(item, showPopupTypeImage, res[0]._id)));
  })

popup.forEach((item) => item.addEventListener('click', closePopupHandler));
profileEditButton.addEventListener('click', handlerProfileEdit);
profileAddButton.addEventListener('click', handlerNewCard);
profileTypeAvatarButton.addEventListener('click', handlerAvatarEdit);
popupTypeEdit.addEventListener('submit', handlerFormEditTypeSubmit);
popupTypeNewCard.addEventListener('submit', handleFormNewCardSubmit);
formModalDelete.addEventListener('submit', (event) => deleteCard(event));
popupTypeAvatar.addEventListener('submit', (event) => handlerAvatarSubmit(event));
