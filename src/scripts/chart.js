import { getHistoricalData } from './api.js';
import { populateSelect, getDataByMonth, sendLoadEvent } from './utils.js';

window.addEventListener('DOMContentLoaded', async () => {
  let lineChart;
  const data = await getHistoricalData();
  const ctx = document.getElementById('chart-line');

  const keys = Object.keys(data.cases)
  const startYear = parseInt(keys[0], 10);
  const endYear = parseInt(keys.slice(0).reverse()[0], 10);
  const yearRange = Math.abs(endYear - startYear + 1);
  const years = Array(yearRange).fill(startYear).map((_, i) => startYear + i);

  sendLoadEvent(() => {
    populateSelect('chart-line-select', years, loadChart, data);
    loadChart(data);
  });

  function loadChart(data) {
    const datasets = [];
    const keys = Object.keys(data);
    const months = Array(12).fill(1).map((e, i) => Intl.DateTimeFormat('en', { month: 'long' }).format(new Date(`${e + i}`)));

    const selectedYear = document.querySelector('#chart-line-select option:checked');
    const year = parseInt(selectedYear.value, 10);

    for (const key of keys) {
      const dataset = {
        fill: false,
        tension: 0.4,
        data: getDataByMonth(data[key], year)
      };

      switch (key) {
        case 'cases': {
          dataset.label = 'Cases';
          dataset.borderColor = '#6a6d9c';
          break;
        }

        case 'deaths': {
          dataset.label = 'Deaths';
          dataset.borderColor = '#cfd1fc';
          break;
        }

        case 'recovered': {
          dataset.label = 'Recoveries';
          dataset.borderColor = '#abaff7';
          break;
        }
      }

      datasets.push(dataset);
    }

    if (lineChart) {
      lineChart.destroy();
    }

    lineChart = new Chart(ctx, {
      type: 'line',
      data: {
        datasets,
        labels: months
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false
          }
        },
        scales: {
          x: {
            beginAtZero: true,
            grid: {
              drawBorder: false,
              display: false
            },
            ticks: {
              color: 'rgba(147, 153, 217, 0.5)'
            }
          },
          y: {
            beginAtZero: true,
            grid: {
              display: false,
              drawBorder: false,
              color: 'rgba(147, 153, 217, 0.1)'
            },
            ticks: {
              color: 'rgba(147, 153, 217, 0.5)'
            }
          }
        }
      }
    });
  }
});