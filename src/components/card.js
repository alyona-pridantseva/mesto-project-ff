// @todo: Темплейт карточки
const cardTemplate = document.querySelector("#card-template").content; //выбираю эл-т по идентификатору, получаю доступ к контенту

// @todo: Функция создания карточки
function createCard(
  cardData,
  cardDelete,
  cardLike,
  handleImagePopup,
  myProfile,
  likeToggle,
  deleteCardFromServer
) {
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

  deleteButton.addEventListener("click", function (event) {
    cardDelete(event, cardData, deleteCardFromServer);
  });

  const cardLikeButton = cardElement.querySelector(".card__like-button");

  // Возвращается элемент, если массив likes содержит такой элемент, у которого _id такой же как и _id моего профиля, иначе undefined
  const myLike = cardData.likes.find((like) => like._id === myProfile._id);

  // если элемент не undefined, то красим кнопку лайка
  if (myLike) {
    cardLike(cardLikeButton);
  }

  updateLikesCounter(cardElement, cardData);

  cardLikeButton.addEventListener("click", function (event) {
    const contains = event.target.classList.contains("card__like-button");

    if (contains) {
      cardLike(event.target);
    }
    
    // Возвращается элемент, если массив likes содержит такой элемент, у которого _id такой же как и _id моего профиля, иначе undefined
    const myLike = cardData.likes.find((like) => like._id === myProfile._id);

    likeToggle(cardData._id, myLike).then((data) => {
      cardData = data;

      updateLikesCounter(cardElement, cardData);
    });
  });

  // если _id создателя карточки не равен _id моего профиля, тогда убираем иконку удаления карточки
  if (cardData.owner._id !== myProfile._id) {
    deleteButton.remove();
  }

  return cardElement;
}

function updateLikesCounter(cardElement, cardData) {
  if (cardData.likes) {
    const cardlikeCounter = cardElement.querySelector(".card__like-counter");

    cardlikeCounter.textContent = cardData.likes.length;
  }
}

// функция удаления карточки
function cardDelete(event, cardData, deleteCardFromServer) {
  const cardItem = event.target.closest(".card");
  deleteCardFromServer(cardData._id)
    .then(() => {
      cardItem.remove();
    })
    .catch((error) => {
      console.log(error);
    });
}

// функция лайка в карточке
function cardLike(changeLike) {
  // смена состояния (переключение)
  changeLike.classList.toggle("card__like-button_is-active");
}

export { createCard, cardDelete, cardLike };
