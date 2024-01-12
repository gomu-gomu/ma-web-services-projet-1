import { sendReadyEvent } from './utils.js';

window.addEventListener('DOMContentLoaded', async () => {
  let eventsRecorded = 0;

  document.addEventListener('apiLoaded', (e) => {
    ++eventsRecorded;

    if (eventsRecorded === 4) {
      sendReadyEvent();
    }
  });
});