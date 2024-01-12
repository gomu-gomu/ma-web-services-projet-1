import { getCountryData } from './api.js';
import { sendLoadEvent } from './utils.js';

window.addEventListener('DOMContentLoaded', async () => {
  const data = await getCountryData();

  populateTable(data);
  sendLoadEvent(() => {
    setTimeout(() => {
      for (let i = 0; i < data.length; ++i) {
        const rank = i + 1;
        const stat = data[i];

        const casesCounter = new countUp.CountUp(`td-cases-${rank}`, stat.timeline.cases);
        const deathsCounter = new countUp.CountUp(`td-deaths-${rank}`, stat.timeline.deaths);

        casesCounter.start();
        deathsCounter.start();
      }
    }, 600);
  });

  function populateTable(data) {
    const tableBodyElement = document.getElementById('table-body');
    tableBodyElement.innerHTML = '';

    for (let i = 0; i < data.length; ++i) {
      const rank = i + 1;
      const stat = data[i];

      const rowElement = document.createElement('tr');
      const rankElement = document.createElement('td');
      const countryElement = document.createElement('td');
      const proviceElement = document.createElement('td');
      const casesElement = document.createElement('td');
      const deathsElement = document.createElement('td');

      rankElement.textContent = rank;
      rankElement.classList.add('rank');

      countryElement.textContent = stat.country;
      countryElement.classList.add('country');

      casesElement.textContent = 0;
      casesElement.classList.add('cases');
      casesElement.id = `td-cases-${rank}`;

      deathsElement.textContent = 0;
      deathsElement.classList.add('deaths');
      deathsElement.id = `td-deaths-${rank}`;

      proviceElement.textContent = stat.province || 'All';
      proviceElement.classList.add('province');

      rowElement.appendChild(rankElement);
      rowElement.appendChild(countryElement);
      rowElement.appendChild(proviceElement);
      rowElement.appendChild(casesElement);
      rowElement.appendChild(deathsElement);
      tableBodyElement.appendChild(rowElement);
    }
  }
});