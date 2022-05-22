let editButton = document.querySelector('.profile__edit-button');
let popup = document.querySelector('.popup');
let closeButton = popup.querySelector('.popup__close-button');
let profileName = document.querySelector('.profile__name')
let profileAbout = document.querySelector('.profile__about-me')
let valueName = popup.querySelector('.popup__item_info_name')
let valueAbout = popup.querySelector('.popup__item_info_about')

function openProfile() {
    popup.classList.toggle('popup_opened');
 
    let isPopupOpened = popup.classList.contains('popup_opened');

    if (isPopupOpened) {
        valueName.value = profileName.textContent;
        valueAbout.value = profileAbout.textContent;
    }
}

let formElement = popup.querySelector('.popup__container');

function formSubmitHandler(evt) {
    evt.preventDefault();

    if (valueName.value.length !== 0 && valueAbout.value.length !== 0) {
        profileName.textContent = valueName.value;
        profileAbout.textContent = valueAbout.value;
        openProfile();
    } else {
        alert('Пожалуйста, заполните данные профиля');
    }    
}

formElement.addEventListener('submit', formSubmitHandler);
editButton.addEventListener('click', openProfile);
closeButton.addEventListener('click', openProfile);

