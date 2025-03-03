let producer;
let title;
let episode_id;
let director;
let release_date;
let opening_crawl;
const baseUrl = `http://localhost:9001/api/films`;

// Runs on page load
addEventListener('DOMContentLoaded', () => {
  producer = document.querySelector('span#Producer');
  title = document.querySelector('h1#name');
  episodeid = document.querySelector('span#Episode');
  director = document.querySelector('span#Director');
  release_date = document.querySelector('span#Released');
  openingCrawl = document.querySelector('span#OpeningCrawl');
  const sp = new URLSearchParams(window.location.search)
  const id = sp.get('id')
  getFilm(id)
});

async function getFilm(id) {
    let film;
    try {
        film = await fetchFilms(id);
        film.planet = await fetchPlanet(film.character);
        film.character = await fetchCharacter(film.character);
    } catch (ex) {
        console.error(`Error reading character ${id} data.`, ex.message);
    }
    renderFilm(film);
}

async function fetchCharacter(id) {
  let characterUrl = `${baseUrl}/${id}/characters`;
  return await fetch(characterUrl)
    .then(res => res.json())
}

async function fetchPlanet(id) {
  const url = `${baseUrl}/${id}/planets`;
  const planet = await fetch(url)
    .then(res => res.json())
  return planet;
}

async function fetchFilms(id) {
  const url = `${baseUrl}/${id}`;
  const films = await fetch(url)
    .then(res => res.json())
  return films;
}

const renderFilm = film => {
    document.title = `SWAPI - ${film?.title}`;  // Just to make the browser tab say the film title
    producer.textContent = film?.producer;
    episodeid.textContent = film?.episode_id;
    director.textContent = film?.director;
    release_date.textContent = film?.release_date;
    openingCrawl.textContent = film.opening_crawl;
    const charactersLis = film?.character?.map(character => `<li><a href="/character.html?id=${character.id}">${character.name}</li>`);
    charactersUl.innerHTML = charactersLis.join("");
}
