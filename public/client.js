const socket = io();

const form = document.getElementById('send-box');
const text = document.getElementById('text-box');
const msgcontainer = document.querySelector(".msgbox");

var audio = new Audio('ting.mp3');

const append = (message, position) => {
  const messageElement = document.createElement('div');
  messageElement.innerText = message;
  messageElement.classList.add('message');
  messageElement.classList.add(position);
  msgcontainer.append(messageElement);
  // audio.play();

}

form.addEventListener('submit', (e) => {

  e.preventDefault();
  const message = text.value;
  if (text.value != "") {

    append(`You : ${message}`, 'msgRight');
    socket.emit('send', message);
  }
  else{

  }
  text.value = '';

});


const uname = prompt("Enter your Name to join the chat ");
console.log("check uname value: "+uname);
if(uname != "")
{

socket.emit('new-user-joined', uname);

socket.on('user-joined', uname => {
  append(`${uname} joined the chat`, 'msgLeft');
  audio.play();

});

socket.on('receive', data => {
  append(`${data.name} : ${data.message} `, 'msgLeft')
  audio.play();

});

socket.on('left', name=>{
  append(`${name} left the chat`, 'msgLeft');
  audio.play();

});


}

else{
  alert("Please enter name ");
  location.reload();
}