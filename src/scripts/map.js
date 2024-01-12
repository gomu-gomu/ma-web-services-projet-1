import { getVaccinationData } from './api.js';
import { populateSelect, getDataByMonth, sendLoadEvent, toggleButton, resizeChart } from './utils.js';

window.addEventListener('DOMContentLoaded', async () => {
  let mapChart;
  const data = await getVaccinationData();
  const countryMap = await loadCountryMap();
  const ctx = document.getElementById('chart-map');

  const keys = Object.keys(data[0].timeline)
  const startYear = parseInt(keys[0], 10);
  const endYear = parseInt(keys.slice(0).reverse()[0], 10);
  const yearRange = Math.abs(endYear - startYear + 1);
  const years = Array(yearRange).fill(startYear).map((_, i) => startYear + i);

  resizeChart('chart-map');
  toggleButton('chart-map-btn');

  sendLoadEvent(() => {
    populateSelect('chart-map-select', years, loadChart, data);
    loadChart(data);
  });

  async function loadChart(data) {
    const geoData = await fetch('verbose/worldatlas/countries-50m.json').then(e => e.json());
    const world = ChartGeo.topojson.feature(geoData, geoData.objects.countries).features;
    const countries = world.map((d) => d.properties.name);

    if (mapChart) {
      mapChart.destroy();
    }

    const selectedYear = document.querySelector('#chart-map-select option:checked');
    const year = parseInt(selectedYear.value, 10);

    const datasets = [{
      label: 'Countries',
      data: world.map((country) => ({
        feature: country,
        value: getCountryData(data, country.properties.name, year)
      }))
    }];

    mapChart = new Chart(ctx, {
      type: 'choropleth',
      data: {
        datasets,
        labels: countries,
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
            interpolate: (v, b) => {
              if (v >= 0.7) {
                return '#5d6191';
              } else if (v >= 0.5) {
                return '#8c8fb9';
              } else if (v >= 0.2) {
                return '#afb1d7';
              } else {
                return '#dfe0ff';
              }
            }
          },
          projection: {
            axis: 'x',
            projection: 'equirectangular'
          }
        }
      }
    });
  }

  function getCountryData(data, countryName, year) {
    const countryMatch = countryMap[countryName] || countryName;
    const countryData = data.find(e => e.country.toLowerCase() === countryMatch.toLowerCase());

    if (countryData) {
      const timeline = countryData.timeline || {};
      return getDataByMonth(timeline, year)[0];
    } else {
      return 0;
    }
  }

  async function loadCountryMap() {
    return await fetch('config/countries.json').then(e => e.json());
  }
});