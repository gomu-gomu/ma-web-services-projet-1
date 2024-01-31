export function getCountryDataMock() {
  const countries = ['Morocco', 'USA'];

  return countries.map(country => ({
    country,
    timeline: {
      cases: Math.floor(Math.random() * 100),
      deaths: Math.floor(Math.random() * 100)
    }
  }));
}