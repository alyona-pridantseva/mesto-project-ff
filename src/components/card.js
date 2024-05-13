// @todo: Темплейт карточки
const cardTemplate = document.querySelector("#card-template").content; //выбираю эл-т по идентификатору, получаю доступ к контенту

// @todo: Функция создания карточки
function createCard(cardData, cardDelete, cardLike, handleImagePopup) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true); //клонирую шаблон
  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");

  cardImage.src = cardData.link; //установка значений вложенных эл-в
  cardImage.alt = cardData.name; //установка значений вложенных эл-в
  cardTitle.textContent = cardData.name; //установка значений вложенных эл-в

  cardImage.addEventListener("click", function () {
    handleImagePopup(cardImage);
  });

  const deleteButton = cardElement.querySelector(".card__delete-button");

  deleteButton.addEventListener("click", cardDelete); // function (event) { cardDelete(event); }

  const cardLikeButton = cardElement.querySelector(".card__like-button");

  cardLikeButton.addEventListener("click", function (event) {
    const contains = event.target.classList.contains("card__like-button");

    if (contains) {
      cardLike(event.target);
    }
  });

  return cardElement;
}

// функция удаления карточки
function cardDelete(event) {
  const cardItem = event.target.closest(".card");
  cardItem.remove();
}

// функция лайка в карточке
function cardLike(changeLike) {
  // смена состояния (переключение)
  changeLike.classList.toggle("card__like-button_is-active");
}

export { createCard, cardDelete, cardLike };
