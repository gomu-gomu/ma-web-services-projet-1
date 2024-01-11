import { populateSelect } from './utils.js';
import { getHistoricalData } from './api.js';

window.addEventListener('DOMContentLoaded', async () => {
  let lineChart;
  const data = await getHistoricalData();
  const ctx = document.getElementById('chart-line');

  populateSelect('chart-line-select', data, loadChart);
  loadChart(data);

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
        data: getDatabyMonth(data[key], year)
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
        // {
        //   fill: false,
        //   tension: 0.4,
        //   label: 'Cases',
        //   borderColor: 'rgb(106, 109, 156)',
        //   data: [65, 59, 80, 81, 56, 55, 40, 100, 32, 69, 19, 55]
        // },
        // {
        //   fill: false,
        //   tension: 0.4,
        //   label: 'Recovered',
        //   borderColor: 'rgb(147, 153, 217)',
        //   data: [45, 29, 60, 78, 40, 13, 38, 75, 30, 59, 16, 30]
        // }
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

  function getDatabyMonth(data, year) {
    const monthlyData = [];

    console.log(data);
    for (const [key, currentStats] of Object.entries(data[year])) {
      const month = parseInt(key, 10);
      const previousStats = month > 1 ? data[year][month - 1] : (data[year - 1] || { 12: 0 })[12];
      const monthlyStats = Math.abs(currentStats - previousStats);

      monthlyData.push(monthlyStats)
    }

    return monthlyData;
  }
});