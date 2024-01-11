window.addEventListener('DOMContentLoaded', async () => {
  const ctx = document.getElementById('chart-map');
  const data = await loadData()

  loadChart(data);
  populateSelect(data);

  function loadData() {
    return new Promise(resolve => {
      fetch('https://disease.sh/v3/covid-19/historical/all?lastdays=all')
        .then(e => e.json())
        .then(data => {
          const keys = Object.keys(data);
          const result = keys.reduce((obj, key) => ({
            ...obj,
            [key]: Object.entries(data[key]).map(e => [new Date(e[0]), e[1]])
          }), {});

          resolve(result);
        });
    })
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
          color: {
            axis: 'x',
            interpolate: (v) => {
              if (v <= 0.3) {
                return '#dfe0ff';
              } else if (v <= 0.5) {
                return '#d9dbff';
              } else if (v <= 0.8) {
                return '#d4d6ff';
              } else {
                return '#ced0ff';
              }
            }
          },
          projection: {
            axis: 'x',
            projection: 'equirectangular'
          }
        },
        onClick: (_, elems) => {
          if (elems.length > 0) {
            console.log(elems.map((elem) => elem.element.feature));
          }
        }
      }
    });
  }

  function populateSelect(data) {
    const selectElement = document.getElementById('chart-map-select');

    const startYear = data.cases[0][0].getFullYear();
    const endYear = data.cases.slice(0).reverse()[0][0].getFullYear();
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
});