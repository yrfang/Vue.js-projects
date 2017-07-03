const apiUrl = 'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';
const searchInput = document.querySelector('#app input');
const suggestions = document.querySelector('ul.results');
const suggestionCounter = document.querySelector('span.counter');

const myModule = {
  cities: [],

  findMatches(wordToMatch) {
    return this.cities.filter(place => {
        let regexp = new RegExp(wordToMatch, 'gi');
        return place.city.match(regexp) || place.state.match(regexp);
        });
  },

  ehDisplayMatches(e) {
    let matchingCities = myModule.findMatches(e.currentTarget.value);
    suggestionCounter.innerHTML = matchingCities.length;
    suggestions.innerHTML = matchingCities.map(place => {
      let regexp = new RegExp(e.currentTarget.value, 'gi');
      let cityName = place.city.replace(regexp, `<span class="hl">${e.currentTarget.value}</span>`);
      let stateName = place.state.replace(regexp, `<span class="hl">${e.currentTarget.value}</span>`);
      return `<li> ${cityName}, ${stateName}, ${place.population} </li>`;
    }).join('');
  },

  ehInit(e) {
    fetch(apiUrl)
      .then(resp => resp.json())
      .then(data => {
         myModule.cities.push(...data);
         suggestionCounter.innerHTML = myModule.cities.length;
         suggestions.innerHTML = myModule.cities.map(place => {
           return `<li> ${place.city}, ${place.state}, ${place.population} </li>`;
         }).join('');
       });

    searchInput.addEventListener('keyup', myModule.ehDisplayMatches);
  }
};

document.addEventListener('DOMContentLoaded', myModule.ehInit);
