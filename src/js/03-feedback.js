import throttle from 'lodash.throttle';

const form = document.querySelector('.feedback-form');
const input = document.querySelector('input');
const textArea = document.querySelector('textarea');
const StorageKey = 'feedback-form-state';

function onFormInput(event) {
  const {
    elements: { email, message },
  } = event.currentTarget;

  const userData = {
    email: email.value,
    message: message.value,
  };

  saveToStorage(userData);
}

function saveToStorage(obj) {
  localStorage.setItem(StorageKey, JSON.stringify(obj));
}

function getFromStorage() {
  const dataFromStorage = localStorage.getItem(StorageKey);

  if (dataFromStorage !== null) {
    const savedUserData = JSON.parse(dataFromStorage);
    input.value = savedUserData.email;
    textArea.value = savedUserData.message;
  } else return;
}

function onFormSubmit(event) {
  event.preventDefault();

  const dataFromStorage = localStorage.getItem(StorageKey);
  if (dataFromStorage !== null) {
    const savedUserData = JSON.parse(dataFromStorage);
    console.log('email:', savedUserData.email);
    console.log('message:', savedUserData.message);
  }

  localStorage.clear();
  event.currentTarget.reset();
}

///

form.addEventListener('input', throttle(onFormInput, 500));

form.addEventListener('submit', onFormSubmit);

getFromStorage();
