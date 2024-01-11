window.addEventListener('DOMContentLoaded', () => {
  fetch('https://disease.sh/v3/covid-19/all')
    .then(e => e.json())
    .then(e => ({
      cases: e.cases,
      deaths: e.deaths,
      recovered: e.recovered
    }))
    .then(data => {
      const keys = Object.keys(data);

      for (const key of keys) {
        const number = data[key];
        const counter = new countUp.CountUp(`stat-${key}`, number);

        counter.start();
      }
    });
});