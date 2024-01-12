import { getCountryData } from './api.js';

window.addEventListener('DOMContentLoaded', async () => {
  const data = await getCountryData();
  populateTable(data);

  function populateTable(data) {
    const tableBodyElement = document.getElementById('table-body');
    tableBodyElement.innerHTML = '';

    for (let i = 0; i < data.length; ++i) {
      const stat = data[i];

      const rowElement = document.createElement('tr');
      const rankElement = document.createElement('td');
      const countryElement = document.createElement('td');
      const proviceElement = document.createElement('td');
      const casesElement = document.createElement('td');
      const deathsElement = document.createElement('td');

      rankElement.textContent = i + 1;
      rankElement.classList.add('rank');

      countryElement.textContent = stat.country;
      countryElement.classList.add('country');

      casesElement.textContent = stat.timeline.cases;
      casesElement.classList.add('cases');

      deathsElement.textContent = stat.timeline.deaths;
      deathsElement.classList.add('deaths');

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