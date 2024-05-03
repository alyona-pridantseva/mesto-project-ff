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
    placesList.append(cardElement); // возможно, стоит добавить проверку на то, что элемент уже добавлен в placeList, для избежания дубликатов

    console.log(initialCards[i].name);
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
