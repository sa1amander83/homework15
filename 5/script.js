

function pageLoaded() {
let geobtn=document.querySelector(".geobtn");
let sendbtn=document.querySelector(".sendbtn");
const mapLink = document.querySelector('#link');
const chatOutput = document.querySelector(".output");
const input = document.querySelector("#input");

let socket = new WebSocket("wss://echo.websocket.org/");

socket.onopen = () => {
  chatOutput.innerText = "Соединение c сервером установлено";
};

socket.onmessage = (event) => {
  sendToChat(event.data, true);
};

socket.onerror = () => {
  chatOutput.innerText = "При передаче данных произошла ошибка";
};

sendbtn.addEventListener("click", sndMsg);
//отправка на эхосервер
function sndMsg() {
  if (!input.value){ alert('Вы нчичего не ввели!');}
  else{  socket.send(input.value);
  sendToChat(input.value, false);
  //очистка поля ввода сообщения
  input.value ="";}
}

//отправка сообщений в чат
function sendToChat(message, msgClass) {
let msg="";
  if (!msgClass) {
msg= `<div class="msgSent"><p> Вы: ${message}</p></div>`;
}
 else {
  msg = `<div class="msgRecieved"><p>Сервер: ${message}</p></div>`;}
  chatOutput.innerHTML += msg;
}


geobtn.addEventListener('click', () => {
  mapLink.href = '';
    if (!navigator.geolocation) {
    chatOutput.innerHTML += `<p>Geolocation не поддерживается вашим браузером</p>`;
  } else {
    chatOutput.innerHTML += `<p>Определение местоположения…</p>`;
    navigator.geolocation.getCurrentPosition(success, error);
  }
});


const error = () => {
  chatOutput.innerHTML += `<p>Невозможно получить ваше местоположение</p>`;
};

const success = (position) => {
  console.log('position', position);
  const latitude  = position.coords.latitude;
  const longitude = position.coords.longitude;

  chatOutput.innerHTML += `<p><a  align="right" href = "https://www.openstreetmap.org/#map=18/${latitude}/${longitude}"
   target="_blank">Геолокация</a></p>`;

};








}






document.addEventListener("DOMContentLoaded", pageLoaded);