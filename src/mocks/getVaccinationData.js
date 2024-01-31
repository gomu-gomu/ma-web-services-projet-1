export function getVaccinationDataMock() {
  const currentDate = new Date();
  const currentYear = currentDate.getUTCFullYear();
  const currentMonth = currentDate.getUTCMonth() + 1;

  const startYear = 2019;
  const endYear = currentYear;
  const years = new Array(endYear - startYear + 1).fill(null).map((_, i) => startYear + i);
  const months = new Array(12).fill(null).map((_, i) => i + 1);
  const countries = ['Morocco', 'USA'];

  return countries.map(country => ({
    country,
    timeline: years.reduce((obj, year) => ({
      ...obj,
      [year]: months
        .filter(month => (year !== currentYear) || (year === currentYear && month <= currentMonth))
        .reduce((obj, month) => ({
          ...obj,
          [month]: {
            cases: Math.floor(Math.random() * 100),
            deaths: Math.floor(Math.random() * 100),
            recovered: Math.floor(Math.random() * 100)
          }
        }), {})
    }), {})
  }));
}