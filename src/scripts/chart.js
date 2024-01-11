window.addEventListener('DOMContentLoaded', () => {

  populateSelect();
  loadChart();

  function populateSelect() {
    const selectElement = document.getElementById('chart-recovery-select');

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

  function loadChart() {
    const ctx = document.getElementById('chart-line');
    const months = Array(12).fill(1).map((e, i) => Intl.DateTimeFormat('en', { month: 'long' }).format(new Date(`${e + i}`)));

    new Chart(ctx, {
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
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }
});