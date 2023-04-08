import Vimeo from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframe = document.querySelector('iframe');
const player = new Vimeo(iframe);

const localStorageKey = 'videoplayer-current-time';

function saveToLocalStorage(value) {
  localStorage.setItem(localStorageKey, value);
}

const onPlay = function (timeupdate) {
  // data is an object containing properties specific to that event
  console.log('time:', timeupdate.seconds);
  let value = timeupdate.seconds;
  saveToLocalStorage(value);
};

player.on('play', throttle(onPlay, 1000));

player.setCurrentTime(localStorage.getItem(localStorageKey));
