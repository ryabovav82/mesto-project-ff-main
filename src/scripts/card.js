import {handlerTypeConfirm, likedCard} from '../index';

export const createCard = (item, showPopupTypeImage,userId) => {
    const cardTemplate = document.querySelector('#card-template').content;
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    const cardImage = cardElement.querySelector('.card__image');
    const cardLikeButton = cardElement.querySelector('.card__like-button');
    const likeCount = cardElement.querySelector('.card__like-count');
    const cardDeleteButton = cardElement.querySelector('.card__delete-button');

    cardImage.src = item.link;
    cardImage.alt = item.name;
    likeCount.textContent = item.likes.length;

    cardElement.querySelector('.card__title').textContent = item.name;
    cardElement.querySelector('.card__like-button').addEventListener('click', (event) => likedCard(event, item._id));
    cardImage.addEventListener('click', () => showPopupTypeImage(cardImage));

    if (item.owner._id !== userId) {
        cardDeleteButton.remove();
    } else {
        cardDeleteButton.addEventListener('click', () => handlerTypeConfirm(item._id, cardElement));
    }

     if (item.likes.some((item) => item._id === userId)) {
         cardLikeButton.classList.add('card__like-button_is-active');
     } else {
         cardLikeButton.classList.remove('card__like-button_is-active');
     }
    
    return cardElement;
} 
