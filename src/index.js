import "./pages/index.css";
import { initialCards } from "./scripts/cards.js";
import { createCard, cardDelete, cardLike, imagePopup, handleImagePopup } from "./components/card.js";
import { openPopup, closePopup } from "./components/modal.js";

// @todo: DOM узлы
const placesList = document.querySelector(".places__list");

// находим кнопку секции profile
const profileEditPopupButton = document.querySelector(".profile__edit-button");
const placeAddPopupButton = document.querySelector(".profile__add-button");

// находим все popups связанные с кнопками
const profileEditPopup = document.querySelector(".popup_type_edit");
const addPlacePopup = document.querySelector(".popup_type_new-card");

const allPopups = [addPlacePopup, profileEditPopup, imagePopup];

const profileEditFormElement = profileEditPopup.querySelector(".popup__form");
const addCardFormElement = addPlacePopup.querySelector(".popup__form");

// Эл-ты профиля и инпуты модального окна - редактировать профиль
const nameInputPopupEdit = profileEditFormElement.querySelector(".popup__input_type_name");
const jobInputPopupEdit = profileEditFormElement.querySelector(".popup__input_type_description");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");

// Инпуты модального окна - (+)
const nameInputPopupAdd = addCardFormElement.querySelector(".popup__input_type_card-name");
const urlInputPopupAdd = addCardFormElement.querySelector(".popup__input_type_url");

const allPopupsAnimated = document.querySelectorAll('.popup');


// @todo: Вывести карточки на страницу
function placeContentForLoop() {
  for (let i = 0; i < initialCards.length; i++) {
    const cardElement = createCard(
      initialCards[i],
      cardDelete,
      cardLike,
      handleImagePopup
    );
    placesList.append(cardElement);
  }
}

// function placeContentForEach() {
//   initialCards.forEach(function (cardData) {
//     const cardElement = createCard(cardData, cardDelete, cardLike, handleImagePopup);
//     placesList.append(cardElement);
//   });
// }


//Открытие попап при клике
function addPopupsEventListeners() {
  profileEditPopupButton.addEventListener("click", function () {
    openPopup(profileEditPopup);

    // заполненные значения при открытии попапа
    nameInputPopupEdit.value = profileTitle.textContent;
    jobInputPopupEdit.value = profileDescription.textContent;
  });

  placeAddPopupButton.addEventListener("click", function () {
    openPopup(addPlacePopup);
  });

  // Закрытие попап при клике по крестику в правом верхнем углу
  allPopups.forEach(function (popup) {
    const closeButton = popup.querySelector(".popup__close");

    // если closeButton не null и не undefined
    if (closeButton) {
      closeButton.addEventListener("click", function () {
        closePopup(popup);
      });
    }
  });
}

//Обработчик формы редактирования профиля
function handleProfileEditFormSubmit(event) {
  // отмена стандартной отправки формы
  event.preventDefault();

  // Вставка значений
  profileTitle.textContent = nameInputPopupEdit.value;
  profileDescription.textContent = jobInputPopupEdit.value;

  closePopup(profileEditPopup);
}

//Обработчик формы добавить(+)
function handleAddCardFormSubmit(event) {
  // отмена стандартной отправки формы
  event.preventDefault();

  const newCardData = {
    name: nameInputPopupAdd.value,
    link: urlInputPopupAdd.value,
  };

  const cardElement = createCard(newCardData, cardDelete, cardLike, handleImagePopup);

  // добавление карточки в начало
  placesList.prepend(cardElement);

  closePopup(addPlacePopup);

  // сброс всех полей
  addCardFormElement.reset();
}

// Плавное открытие и закрытие попапов
allPopupsAnimated.forEach((modal) => {
 modal.classList.add('popup_is-animated');
});

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
profileEditFormElement.addEventListener("submit", handleProfileEditFormSubmit);

addCardFormElement.addEventListener("submit", handleAddCardFormSubmit);

placeContentForLoop();

addPopupsEventListeners();
// placeContentForEach();
