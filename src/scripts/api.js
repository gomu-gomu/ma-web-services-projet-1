import { getTotalDataMock } from '../mocks/getTotalData.js';
import { getCountryDataMock } from '../mocks/getCountryData.js';
import { getHistoricalDataMock } from '../mocks/getHistoricalData.js';
import { getVaccinationDataMock } from '../mocks/getVaccinationData.js';

const remote = false;

export function getTotalData() {
  return new Promise(async resolve => {
    let data;

    if (remote) {
      data = await fetch('https://disease.sh/v3/covid-19/all')
        .then(e => e.json())
        .then(e => ({
          cases: e.cases,
          deaths: e.deaths,
          recovered: e.recovered
        }))
    } else {
      data = getTotalDataMock();
    }

    resolve(data);
  })
}

export function getHistoricalData() {
  return new Promise(resolve => {
    if (remote) {
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
    } else {
      resolve(getHistoricalDataMock());
    }
  })
}

export function getVaccinationData() {
  return new Promise(resolve => {
    if (remote) {
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
    } else {
      resolve(getVaccinationDataMock());
    }
  });
}

export function getCountryData() {
  return new Promise(resolve => {
    if (remote) {
      fetch('https://disease.sh/v3/covid-19/historical?lastdays=all')
        .then(e => e.json())
        .then(data => {
          const result = data.map(country => ({
            ...country,
            timeline: Object
              .entries(country.timeline)
              .filter(e => e[0] !== 'recovered')
              .map(e => ({ [e[0]]: Object.values(e[1]).reverse()[0] }))
              .reduce((obj, e) => ({ ...obj, ...e }), {})
          })).sort((a, b) => b.timeline.cases - a.timeline.cases);
  
          resolve(result);
        });
    } else {
      resolve(getCountryDataMock());
    }
  });
}