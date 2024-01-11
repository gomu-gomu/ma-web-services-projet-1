export function populateSelect(id, data, callback) {
  const selectElement = document.getElementById(id);

  const keys = Object.keys(data.cases)
  const startYear = parseInt(keys[0], 10);
  const endYear = parseInt(keys.slice(0).reverse()[0], 10);
  const yearRange = Math.abs(endYear - startYear + 1);
  const years = Array(yearRange).fill(startYear).map((_, i) => startYear + i);

  for (const year of years) {
    const optionElement = document.createElement('option');

    optionElement.value = year;
    optionElement.innerText = year.toString();
    optionElement.selected = year === endYear;

    selectElement.appendChild(optionElement);
  }

  selectElement.onchange = () => callback(data);
}