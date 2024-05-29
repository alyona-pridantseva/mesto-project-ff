const config = {
  baseUrl: "https://nomoreparties.co/v1/wff-cohort-14",
  headers: {
    authorization: "a10df3ac-6a59-4d05-aba7-4dad2d92876b",
    "Content-Type": "application/json",
  },
};

//Загрузка информации о пользователе с сервера
function getUserProfileData() {
  return (
    fetch(`${config.baseUrl}/users/me`, {
      method: "GET",
      headers: config.headers,
    })
      // если промис fetch выполнился со статусом resolve,
      // тогда вызовется метод then, внутри которого необходимо
      // произвести проверку ответа от сервера (response)
      .then((response) => {
        // если пришел ответ об успешном выполнении запроса, обрабатываем ответ
        if (response.ok) {
          return response.json();
        }
        // иначе возвращаем ошибку со статусом
        return Promise.reject(`Ошибка: ${response.status}`);
      })
      // если промис выполнился с ошибкой, то отлавливаем эту ошибку и возвращаем её
      .catch((error) => {
        return Promise.reject(`Ошибка запроса: ${error}`);
      })
  );
}

//Загрузка карточек с сервера
function getInitialCards() {
  return fetch(`${config.baseUrl}/cards`, {
    method: "GET",
    headers: config.headers,
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      return Promise.reject(`Ошибка: ${response.status}`);
    })
    .catch((error) => {
      return Promise.reject(`Ошибка запроса: ${error}`);
    });
}

// Отредактированные данные профиля должны сохраняться на сервере
function updateProfileData(profileTitle, profileDescription) {
  return fetch(`${config.baseUrl}/users/me`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      name: profileTitle,
      about: profileDescription,
    }),
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      return Promise.reject(`Ошибка: ${response.status}`);
    })
    .catch((error) => {
      return Promise.reject(`Ошибка запроса: ${error}`);
    });
}

//Добавить на сервер новую карточку
function addNewCard(cardName, imageLink) {
  return fetch(`${config.baseUrl}/cards`, {
    method: "POST",
    headers: config.headers,
    body: JSON.stringify({
      name: cardName,
      link: imageLink,
    }),
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      return Promise.reject(`Ошибка: ${response.status}`);
    })
    .catch((error) => {
      return Promise.reject(`Ошибка запроса: ${error}`);
    });
}

//Отображение количества лайков карточки
function likeToggle(cardId, isDelete) {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: isDelete ? "DELETE" : "PUT",
    headers: config.headers,
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      return Promise.reject(`Ошибка: ${response.status}`);
    })
    .catch((error) => {
      return Promise.reject(`Ошибка запроса: ${error}`);
    });
}

// Удалить карточку по её id
function deleteCardFromServer(cardId) {
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: "DELETE",
    headers: config.headers,
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      return Promise.reject(`Ошибка: ${response.status}`);
    })
    .catch((error) => {
      return Promise.reject(`Ошибка запроса: ${error}`);
    });
}

// Смена аватара
function updateAvatar(link) {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: "PATCH",
    headers: config.headers,
    body:JSON.stringify({
      avatar: link,
    }),
  })
  .then((response) => {
    if (response.ok) {
      return response.json();
    }
    return Promise.reject(`Ошибка: ${response.status}`);
  })
  .catch((error) => {
    return Promise.reject(`Ошибка запроса: ${error}`);
  });
}

export {
  getUserProfileData,
  getInitialCards,
  updateProfileData,
  addNewCard,
  likeToggle,
  deleteCardFromServer,
  updateAvatar,
};
