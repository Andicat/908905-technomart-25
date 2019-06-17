var messageLink = document.querySelector(".message");
var mapLink = document.querySelector(".map");
var messageForm = document.querySelector(".modal-message");
var mapForm = document.querySelector(".modal-map");
var orderForm = document.querySelector(".modal-order");
var closeOrderFormContinue = orderForm.querySelector(".continue");
var orderLinksList = document.querySelectorAll(".item-buy");
var orderLink;
var closeButtonsList = document.querySelectorAll(".modal-button-close");
var closeButtonLink;
var close;
var userName;
var userEmail;
var messageContent;
var isStorageSupport = true;
var storageuserName = "";
var storageuserEmail = "";
var storagemessageContent = "";
var timerId;

//проверка работы хранилища  
try {
	storageuserName = localStorage.getItem("userName");
	storageuserEmail = localStorage.getItem("userEmail");
	storagemessageContent = localStorage.getItem("messageContent");
} catch (err) {
	isStorageSupport = false;
}

//форма отправки сообщения
if (messageLink) {
	userName = messageForm.querySelector("[id=name]");
	userEmail = messageForm.querySelector("[id=email]");
	messageContent = messageForm.querySelector("[id=content]");
	
	//открытие формы отправки сообщения по кнопке
	messageLink.addEventListener("click", function (evt) {
		evt.preventDefault();
		messageForm.classList.add("modal-show");
		userName.focus();
	});

	//проверка полей формы отправки сообщения
	messageForm.addEventListener("submit", function (evt) {
		if (!userName.value || !userEmail.value || messageContent.value == "")
			{
				evt.preventDefault();
				console.log("Заполните ваше имя, обратный электронный адрес и текст письма");
				messageForm.classList.remove("modal-error");
				messageForm.offsetWidth = messageForm.offsetWidth;
				messageForm.classList.add("modal-error");
				if (!userName.value) {
					userName.focus();
				} else {
					if (!userEmail.value) {
						userEmail.focus();
					} else {
						if (messageContent.value == "") {
							messageContent.focus();
						}
					}
				}
		} else {
			if (isStorageSupport) {
				localStorage.setItem("userName", userName.value);
				localStorage.setItem("userEmail", userEmail.value);
			}
		}
	});
}

//карта
if (mapLink) {
	mapLink.addEventListener("click", function (evt) {
		evt.preventDefault();
		mapForm.classList.add("modal-show");
	});
}

//окно покупки
for (var i = 0; i < orderLinksList.length; i++) {
	orderLink = orderLinksList[i];
	orderLink.addEventListener("click", function (evt) {
		evt.preventDefault();
		orderForm.classList.add("modal-show");
		//закрытие окна покупки через 5 секунд
		clearTimeout(timerId);
		timerId = setTimeout(function() {
			orderForm.classList.remove("modal-show");
		}, 5000);
	});
}

//закрытие модальных окон по кнопке закрытия
for (var i = 0; i < closeButtonsList.length; i++) {
	closeButtonLink = closeButtonsList[i];
	closeButtonLink.addEventListener("click", function (evt) {
		close = evt.target;
		if (close.parentNode.classList.contains("modal-show")) {
				close.parentNode.classList.remove("modal-show");
		}
		if (close.parentNode.classList.contains("modal-error")) {
				close.parentNode.classList.remove("modal-error");
		}
	});
}

//закрытие окна покупки по ссылке "Продолжить покупки"
closeOrderFormContinue.addEventListener("click", function (evt) {
	evt.preventDefault();
	orderForm.classList.remove("modal-show");
});

//закрытие модальных окон по esc
window.addEventListener("keydown", function (evt) {
	if (evt.keyCode === 27) {
		evt.preventDefault();
		if (messageForm) {
			if (messageForm.classList.contains("modal-show")) {
				messageForm.classList.remove("modal-show");
				messageForm.classList.remove("modal-error");
			}
		}
		if (mapForm) {
			if (mapForm.classList.contains("modal-show")) {
				mapForm.classList.remove("modal-show");
			}
		}
		if (orderForm) {
			if (orderForm.classList.contains("modal-show")) {
				orderForm.classList.remove("modal-show");
			}
		}	
	}
});