// ф-ция открытия модального окна
function openPopup(popupElement) {
  popupElement.classList.add("popup_is-opened");
  document.addEventListener("keydown", closePopupEscape);

  // родитель (event.currentTarget), которому добавили слушатель события
  // и передали в качестве колбека ф-цию closePopupOverlay
  popupElement.addEventListener("click", closePopupOverlay);
}

// ф-ция закрытия модального окна
function closePopup(popupElement) {
  // удаление класса popup_is-opened для закрытия попапа
  popupElement.classList.remove("popup_is-opened");

  // удаление обработчика события esc
  document.removeEventListener("keydown", closePopupEscape);

  // удаление обработчика события при закрытом попап (оверлей)
  popupElement.removeEventListener("click", closePopupOverlay);

}

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

export { openPopup, closePopup };