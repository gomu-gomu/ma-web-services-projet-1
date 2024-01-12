import { sendReadyEvent } from './utils.js';

window.addEventListener('DOMContentLoaded', async () => {
  const modalElement = document.getElementById('loader-modal');
  const options = { keyboard: false, backdrop: false };
  const modal = new bootstrap.Modal(modalElement, options);

  let eventsRecorded = 0;
  modal.show();

  document.addEventListener('apiLoaded', (e) => {
    ++eventsRecorded;

    if (eventsRecorded === 4) {
      modal.hide();
      sendReadyEvent();
    }
  });
});