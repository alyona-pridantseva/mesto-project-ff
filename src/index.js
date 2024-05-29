import "./pages/index.css";
import { createCard, cardDelete, cardLike } from "./components/card.js";
import { openPopup, closePopup } from "./components/modal.js";
import { enableValidation, clearValidation } from "./components/validation.js";
import {
  getUserProfileData,
  getInitialCards,
  updateProfileData,
  addNewCard,
  likeToggle,
  deleteCardFromServer,
  updateAvatar,
} from "./components/api.js";

const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

// @todo: DOM узлы
const placesList = document.querySelector(".places__list");
const imagePopup = document.querySelector(".popup_type_image");

// находим кнопку секции profile
const profileEditPopupButton = document.querySelector(".profile__edit-button");
const placeAddPopupButton = document.querySelector(".profile__add-button");

// находим все popups связанные с кнопками
const profileEditPopup = document.querySelector(".popup_type_edit");
const addPlacePopup = document.querySelector(".popup_type_new-card");

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

const allPopupsAnimated = document.querySelectorAll(".popup");

const bigPicturePopup = imagePopup.querySelector(".popup__image");
const namePlace = imagePopup.querySelector(".popup__caption");

// popup аватара
const profileUpdateAvatarPopup = document.querySelector(".popup_type_avatar");
const avatarFormElement = profileUpdateAvatarPopup.querySelector(".popup__form");
const avatarLinkInput = avatarFormElement.querySelector(".popup__input_type_update-avatar");
const profileAvatar = document.querySelector(".profile__image");
const avatarPopupOpenButton = document.querySelector(".profile__image-button-transition");

const profileEditSubmitButton = profileEditFormElement.querySelector(".popup__button");
const addCardSubmitButton = addCardFormElement.querySelector(".popup__button");
const profileUpdateAvatarSubmitButton = profileUpdateAvatarPopup.querySelector(".popup__button");

const saveButtonText = "Сохранить";
const savingStatusText = "Сохранение...";
const createButtonText = "Создать";

const allPopups = [
  addPlacePopup,
  profileEditPopup,
  imagePopup,
  profileUpdateAvatarPopup,
];

let profileData = {};

// Открытие попапа с картинкой(увеличенной)
function handleImagePopup(cardImage) {
  if (bigPicturePopup) {
    bigPicturePopup.src = cardImage.src;
    bigPicturePopup.alt = cardImage.alt;
    namePlace.textContent = bigPicturePopup.alt;
  }

  openPopup(imagePopup);
}

// @todo: Вывести карточки на страницу
async function loadCardsData() {
  try {
    const cardsData = await getInitialCards();

    for (let i = 0; i < cardsData.length; i++) {
      const cardElement = createCard(
        cardsData[i],
        cardDelete,
        cardLike,
        handleImagePopup,
        profileData,
        likeToggle,
        deleteCardFromServer
      );

      placesList.append(cardElement);
    }
  } catch (error) {
    console.log(error);
  }
}

//Открытие попап при клике
function addPopupsEventListeners() {
  profileEditPopupButton.addEventListener("click", function () {
    openPopup(profileEditPopup);

    // заполненные значения при открытии попапа
    nameInputPopupEdit.value = profileTitle.textContent;
    jobInputPopupEdit.value = profileDescription.textContent;
  });

  avatarPopupOpenButton.addEventListener("click", function () {
    openPopup(profileUpdateAvatarPopup);
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

  profileEditSubmitButton.textContent = savingStatusText;

  updateProfileData(nameInputPopupEdit.value, jobInputPopupEdit.value)
    .then((data) => {
      // Вставка значений
      profileTitle.textContent = data.name;
      profileDescription.textContent = data.about;

      profileEditSubmitButton.textContent = saveButtonText;

      closePopup(profileEditPopup);
    })
    .catch((error) => {
      profileEditSubmitButton.value = saveButtonText;
      console.log(error);
    })
    .finally(() => {
      profileEditSubmitButton.textContent = saveButtonText;
    });
}
// Функция редактирования аватара
function handleAvatar(event) {
  event.preventDefault();
  profileUpdateAvatarSubmitButton.textContent = savingStatusText;

  updateAvatar(avatarLinkInput.value)
  .then((data) => {
    profileUpdateAvatarSubmitButton.textContent = saveButtonText;
    profileAvatar.style.backgroundImage = `url('${data.avatar}')`;
    closePopup(profileUpdateAvatarPopup);
  })
  .catch((error) => {
    profileUpdateAvatarSubmitButton.textContent = saveButtonText;
    console.error(error)
})
.finally(() => {
  profileUpdateAvatarSubmitButton.textContent = saveButtonText;
});
}

//Обработчик формы добавить(+)
function handleAddCardFormSubmit(event) {
  // отмена стандартной отправки формы
  event.preventDefault();

  addCardSubmitButton.textContent = savingStatusText;

  addNewCard(nameInputPopupAdd.value, urlInputPopupAdd.value)
    .then((cardData) => {


      const cardElement = createCard(
        cardData,
        cardDelete,
        cardLike,
        handleImagePopup,
        profileData,
        likeToggle,
        deleteCardFromServer
      );

      // добавление карточки в начало
      placesList.prepend(cardElement);

      addCardSubmitButton.textContent = createButtonText;

      closePopup(addPlacePopup);

      // сброс всех полей
      addCardFormElement.reset();
    })
    .catch((error) => {
      addCardSubmitButton.textContent = createButtonText;
      console.log(error);
    })
    .finally(()=>{
      addCardSubmitButton.textContent = createButtonText;
    });
}

// Плавное открытие и закрытие попапов
allPopupsAnimated.forEach((modal) => {
  modal.classList.add("popup_is-animated");
});

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
profileEditFormElement.addEventListener("submit", handleProfileEditFormSubmit);

addCardFormElement.addEventListener("submit", handleAddCardFormSubmit);

avatarFormElement.addEventListener("submit", handleAvatar);

addPopupsEventListeners();
// placeContentForEach();

enableValidation(validationConfig);

Promise.all([
  getUserProfileData()
    .then((data) => {
      profileData = data;

      profileAvatar.style.backgroundImage = `url(${profileData.avatar})`;
      profileTitle.textContent = profileData.name;
      profileDescription.textContent = profileData.about;
    })
    .catch((error) => {
      console.log(error);
    }),

  loadCardsData(),
]);
