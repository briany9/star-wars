let nameH1;
let releaseDate;
let director;
let episode;
let filmsDiv;
let planetDiv;
let charactersUl;
const baseUrl = `https://swapi2.azurewebsites.net/api`;

// Runs on page load
addEventListener('DOMContentLoaded', () => {
  nameH1 = document.querySelector('h1#name');
  releaseDate = document.querySelector('span#release_date');
  director = document.querySelector('span#director');
  episode = document.querySelector('span#episode');
//   homeworldSpan = document.querySelector('span#homeworld');
  charactersUl = document.querySelector('#characters>ul');
  const sp = new URLSearchParams(window.location.search)
  const id = sp.get('id')
  getFilm(id)
});

async function getFilm(id) {
  let film;
  try {
    film = await fetchFilm(id)
    film.character = await fetchCharacters(id)
    film.planets = await fetchPlanets(film)
  }
  catch (ex) {
    console.error(`Error reading film ${id} data.`, ex.message);
  }
  renderFilm(film);

}
async function fetchFilm(id) {
  let filmUrl = `${baseUrl}/films/${id}`;
  return await fetch(filmUrl)
    .then(res => res.json())
}

async function fetchCharacters(id) {
  const url = `${baseUrl}/films/${id}/characters`;
  const characters = await fetch(url)
    .then(res => res.json())
  console.log(characters);
  console.log(id);
  return characters;
}

async function fetchPlanets(id) {
    const url = `${baseUrl}/films/${id}/planets`;
    const planets = await fetch(url)
      .then(res => res.json())
    return planets;
  }



const renderFilm = film => {
  console.log(film)
  document.title = `SWAPI - ${film?.title}`;  // Just to make the browser tab say their name
  nameH1.textContent = film?.title;
  releaseDate.textContent = film?.release_date;
  director.textContent = film?.director;
  episode.textContent = film?.episode_id;
//   homeworldSpan.innerHTML = `<a href="/planet.html?id=${character?.homeworld.id}">${character?.homeworld.name}</a>`;
  const charactersLis = film?.character?.map(character => `<li><a href="/character.html?id=${character.id}">${character.name}</li>`)
  charactersUl.innerHTML = charactersLis.join("");
}
