var messageLink				= document.querySelector(".message");
var mapLink					= document.querySelector(".map");
var orderLinksList			= document.querySelectorAll(".item-buy");
var orderLink;

var messageForm				= document.querySelector(".modal-message");
var closeMessageForm;

var mapForm					= document.querySelector(".modal-map");
var closeMapForm;

var orderForm				= document.querySelector(".modal-order");
var closeOrderForm			= orderForm.querySelector(".modal-button-close");

var UserName;
var UserEmail;
var MessageContent;

var isStorageSupport		= true;
var storageUserName			= "";
var storageUserEmail		= "";
var storageMessageContent	= "";

//проверка работы хранилища  
try {
	storageUserName 		= localStorage.getItem("UserName");
	storageUserEmail 		= localStorage.getItem("UserEmail");
	storageMessageContent 	= localStorage.getItem("MessageContent");
} catch (err) {
	isStorageSupport = false;
}

/***************************************************************** формы отправки сообщения*/

if (messageForm) {
	closeMessageForm = messageForm.querySelector(".modal-button-close");
	UserName		 = messageForm.querySelector("[id=name]");
	UserEmail		 = messageForm.querySelector("[id=email]");
	MessageContent	 = messageForm.querySelector("[id=content]");
}

//открытие формы отправки сообщения по кнопке
if (messageLink) {
	messageLink.addEventListener("click", function (evt) {
		evt.preventDefault();
		messageForm.classList.add("modal-show");
		UserName.focus();
	});
}

//закрытие формы отправки сообщения по кнопке-крестику
if (closeMessageForm) {
	closeMessageForm.addEventListener("click", function (evt) {
		evt.preventDefault();
		messageForm.classList.remove("modal-show");
		messageForm.classList.remove("modal-error");
	});
}

//проверка полей формы отправки сообщения
if (messageForm) {
	messageForm.addEventListener("submit", function (evt) {
		if (!UserName.value || !UserEmail.value || MessageContent.value == "")
			{
				evt.preventDefault();
				console.log("Заполните ваше имя, обратный электронный адрес и текст письма");
				messageForm.classList.remove("modal-error");
				messageForm.offsetWidth = messageForm.offsetWidth;
				messageForm.classList.add("modal-error");
			}
		else
			{
				if (isStorageSupport) {
					localStorage.setItem("UserName", UserName.value);
					localStorage.setItem("UserEmail", UserEmail.value);
				}
			}
	});
}

/***************************************************************** карта*/
if (mapForm) {
	closeMapForm = mapForm.querySelector(".modal-button-close");
}

//открытие карты по ссылке
if (mapLink) {
	mapLink.addEventListener("click", function (evt) {
		evt.preventDefault();
		mapForm.classList.add("modal-show");
	});
}

//закрытие карты по кнопке-крестику
if (closeMapForm) {
	closeMapForm.addEventListener("click", function (evt) {
		evt.preventDefault();
		mapForm.classList.remove("modal-show");
	});
}

/***************************************************************** окно покупки*/

//открытие окна покупки по ссылке
for (var i = 0; i < orderLinksList.length; i++) {
	orderLink = orderLinksList[i];
	orderLink.addEventListener("click", function (evt) {
		evt.preventDefault();
		orderForm.classList.add("modal-show");
	});
}

//закрытие окна покупки по кнопке-крестику
closeOrderForm.addEventListener("click", function (evt) {
	evt.preventDefault();
	orderForm.classList.remove("modal-show");
});

//закрытие окна покупки через 5 секунд
function close5() {
	if (orderForm) {
		if (orderForm.classList.contains("modal-show")) {
			orderForm.classList.remove("modal-show");
		}
	}	
}

setTimeout(close5, 100);

/***************************************************************** закрытие всех окон по esc*/

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