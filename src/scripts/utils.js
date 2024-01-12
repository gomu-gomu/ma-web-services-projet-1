export function populateSelect(id, values, callback, data) {
  const selectElement = document.getElementById(id);

  for (const value of values) {
    const optionElement = document.createElement('option');

    optionElement.value = value;
    optionElement.innerText = value.toString();
    optionElement.selected = value === values.slice(0).reverse()[0];

    selectElement.appendChild(optionElement);
  }

  selectElement.onchange = () => callback(data);
}

export function getDataByMonth(data, year) {
  const monthlyData = [];

  for (const [key, currentStats] of Object.entries(data[year])) {
    const month = parseInt(key, 10);
    const previousStats = month > 1 ? data[year][month - 1] : (data[year - 1] || { 12: 0 })[12];
    const monthlyStats = Math.abs(currentStats - (previousStats || 0));

    monthlyData.push(monthlyStats)
  }

  return monthlyData;
}

export function sendLoadEvent(callback) {
  const event = new CustomEvent('apiLoaded');
  document.dispatchEvent(event);

  const handler = document.addEventListener('pageReady', () => {
    callback();
    document.removeEventListener('pageReady', handler);
  });
}

export function sendReadyEvent() {
  const event = new CustomEvent('pageReady');
  setTimeout(() => document.dispatchEvent(event));
}

export function toggleButton(buttonId, callback) {
  let maximized = false;
  const btn = document.getElementById(buttonId);

  btn.addEventListener('click', () => {
    const img = btn.querySelector('img');
    maximized = !maximized;

    if (img) {
      const iconPath = `images/icons/${maximized ? 'minimize' : 'maximize'}.svg`;
      img.setAttribute('src', iconPath);
    }

    callback(maximized);
  });
}