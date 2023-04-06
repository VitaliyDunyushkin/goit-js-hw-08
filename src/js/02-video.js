import Vimeo from '@vimeo/player';
import lodashThrottle from 'lodash.throttle';

const iframe = document.querySelector('iframe');
const player = new Vimeo(iframe);

const localStorageKey = 'videoplayer-current-time';

const onPlay = function (timeupdate) {
  // data is an object containing properties specific to that event
  console.log('time:', timeupdate.seconds);
  localStorage.setItem(localStorageKey, timeupdate.seconds);
};

player.on('play', onPlay);

player.setCurrentTime(localStorage.getItem(localStorageKey));
