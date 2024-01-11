export function getTotalData() {
  return new Promise(async resolve => {
    const data = await fetch('https://disease.sh/v3/covid-19/all')
      .then(e => e.json())
      .then(e => ({
        cases: e.cases,
        deaths: e.deaths,
        recovered: e.recovered
      }))

    resolve(data);
  })
}

export function getHistoricalData() {
  return new Promise(resolve => {
    fetch('https://disease.sh/v3/covid-19/historical/all?lastdays=all')
      .then(e => e.json())
      .then(data => {
        const keys = Object.keys(data);
        const result = keys.reduce((obj, key) => ({
          ...obj,
          [key]: Object
            .entries(data[key])
            .map(e => [new Date(e[0]), e[1]])
            .reduce((obj, e) => ({
              ...obj,
              [e[0].getFullYear()]: {
                ...obj[e[0].getFullYear()],
                [e[0].getMonth() + 1]: e[1]
              }
            }), {})
        }), {});

        resolve(result);
      });
  })
}

export function getVaccinationData() {
  return new Promise(resolve => {
    fetch('https://disease.sh/v3/covid-19/vaccine/coverage/countries?lastdays=all')
      .then(e => e.json())
      .then(data => {
        const result = data.map(country => ({
          ...country,
          timeline: Object
            .entries(country.timeline)
            .map(e => [new Date(e[0]), e[1]])
            .reduce((obj, e) => ({
              ...obj,
              [e[0].getFullYear()]: {
                ...obj[e[0].getFullYear()],
                [e[0].getMonth() + 1]: e[1]
              }
            }), {})
        }));

        resolve(result);
      });
  });
}