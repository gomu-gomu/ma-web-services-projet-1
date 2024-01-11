window.addEventListener('DOMContentLoaded', async () => {
  const ctx = document.getElementById('chart-line');
  const data = await loadData();

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

  function loadChart(data) {
    const months = Array(12).fill(1).map((e, i) => Intl.DateTimeFormat('en', { month: 'long' }).format(new Date(`${e + i}`)));

    lineChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: months,
        datasets: [
          {
            fill: false,
            tension: 0.4,
            label: 'Cases',
            borderColor: 'rgb(106, 109, 156)',
            data: [65, 59, 80, 81, 56, 55, 40, 100, 32, 69, 19, 55]
          },
          {
            fill: false,
            tension: 0.4,
            label: 'Recovered',
            borderColor: 'rgb(147, 153, 217)',
            data: [45, 29, 60, 78, 40, 13, 38, 75, 30, 59, 16, 30]
          }
        ]
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

  function populateSelect(data) {
    const selectElement = document.getElementById('chart-line-select');

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