window.addEventListener('DOMContentLoaded', () => {
  fetch('https://disease.sh/v3/covid-19/historical/all?lastdays=all')
    .then(e => e.json())
    .then(data => {
      const keys = Object.keys(data);

      for (const key of keys) {
        const number = getLastRecordedStat(data, key);
        const counter = new countUp.CountUp(`stat-${key}`, number);

        counter.start();
      }
    });

  function getLastRecordedStat(data, key) {
    const stat = Object
      .entries(data[key])
      .reverse()
      .find(e => e[1] > 0);

    return stat[1] || 0;
  }
});