import "./pages/index.css";
import { initialCards } from "./scripts/cards.js";

// @todo: Темплейт карточки
const cardTemplate = document.querySelector("#card-template").content; //выбираю эл-т по идентификатору, получаю доступ к контенту

// @todo: DOM узлы
const placesList = document.querySelector(".places__list");

// @todo: Функция удаления карточки
function cardDelete(event) {
  const cardItem = event.target.closest(".card");
  cardItem.remove();
}

// @todo: Функция создания карточки
function createCard(cardData, cardDelete) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true); //клонирую шаблон
  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  cardImage.src = cardData.link; //установка значений вложенных эл-в
  cardImage.alt = cardData.name; //установка значений вложенных эл-в
  cardTitle.textContent = cardData.name; //установка значений вложенных эл-в

  const deleteButton = cardElement.querySelector(".card__delete-button");

  deleteButton.addEventListener("click", cardDelete); // function (event) { cardDelete(event); }

  return cardElement;
}

// @todo: Вывести карточки на страницу
function placeContentForLoop() {
  for (let i = 0; i < initialCards.length; i++) {
    const cardElement = createCard(initialCards[i], cardDelete);
    placesList.append(cardElement);
  }
}

// function placeContentForEach() {
//   initialCards.forEach(function (cardData) {
//     const cardElement = createCard(cardData, cardDelete);
//     placesList.append(cardElement);
//   });
// }

placeContentForLoop();
// placeContentForEach();

// SIXTH SPRINT
// находим кнопки секции profile и кнопки при нажатии на картинки
const profileEditPopupButton = document.querySelector(".profile__edit-button");
const profileAddPopupButton = document.querySelector(".profile__add-button");
const placesCardImage = document.querySelectorAll(".card__image");

// находим все popups связанные с кнопками
const profileAddPopup = document.querySelector(".popup_type_new-card");
const profileEditPopup = document.querySelector(".popup_type_edit");
const imagePopup = document.querySelector(".popup_type_image");

const allPopups = [profileAddPopup, profileEditPopup, imagePopup];

//Закрытие попапа нажатием на Esc
function closePopupEscape(event) {
  const popupOpen = document.querySelector(".popup_is-opened");

  if (event.key === "Escape") {
    closePopup(popupOpen);
  }
}

// ф-ция закрытия попапа при клике на оверлей
function closePopupOverlay(event) {
// event.target - эл-т на который кликнули

// проверка условия, что эл-т, на который кликнули,
// это и есть родительский эл-т (попап)
  if (event.target === event.currentTarget) {
    closePopup(event.currentTarget);
  }
}

function openPopup(popupElement) {
  popupElement.classList.add("popup_is-opened");
  document.addEventListener("keydown", closePopupEscape);

  // родитель (event.currentTarget), которому добавили слушатель события
  // и передали в качестве колбека ф-цию closePopupOverlay
  popupElement.addEventListener("click", closePopupOverlay);
}

function closePopup(popupElement) {
  // удаление класса popup_is-opened для закрытия попапа
  popupElement.classList.remove("popup_is-opened");

  // удаление обработчика события esc
  document.removeEventListener("keydown", closePopupEscape);

  // удаление обработчика события при закрытом попап (оверлей)
  popupElement.removeEventListener("click", closePopupOverlay);
}

//открытие попап при клике
function addPopupsEventListeners() {
  profileEditPopupButton.addEventListener("click", function () {
    openPopup(profileEditPopup);
  });

  profileAddPopupButton.addEventListener("click", function () {
    openPopup(profileAddPopup);
  });

  placesCardImage.forEach(function (imageCard) {
    imageCard.addEventListener("click", function () {
      openPopup(imagePopup);
    });
  });

  // закрытие попап при клике по крестику в правом верхнем углу
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

addPopupsEventListeners();
