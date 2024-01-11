window.addEventListener('DOMContentLoaded', () => {
  let mapChart = null;
  const ctx = document.getElementById('chart-map');

  populateSelect();
  loadChart();

  function populateSelect() {
    const selectElement = document.getElementById('chart-country-select');

    const startYear = 2019;
    const endYear = new Date().getFullYear();
    const yearRange = Math.abs(endYear - startYear + 1);
    const years = Array(yearRange).fill(startYear).map((_, i) => startYear + i);

    for (const year of years) {
      const optionElement = document.createElement('option');

      optionElement.value = year;
      optionElement.innerText = year.toString();
      optionElement.selected = year === endYear;

      selectElement.appendChild(optionElement);
    }
  }

  async function loadChart() {
    const data = await fetch('verbose/worldatlas/countries-50m.json').then(e => e.json());
    const world = ChartGeo.topojson.feature(data, data.objects.countries).features;
    const countries = world.map((d) => d.properties.name);

    mapChart = new Chart(ctx, {
      type: 'choropleth',
      data: {
        labels: countries,
        datasets: [
          {
            label: 'Countries',
            data: world.map((d) => ({ feature: d, value: Math.random() }))
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        showOutline: false,
        showGraticule: false,
        plugins: {
          legend: {
            display: false
          },
        },
        scales: {
          projection: {
            axis: 'x',
            projection: 'equirectangular'
          }
        },
        onClick: (_, elems) => {
          console.log(elems.map((elem) => elem.element.feature));
        }
      }
    });

    console.log({ world });
  }
});