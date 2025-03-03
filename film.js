let producer;
let title;
let episode_id;
let director;
let release_date;
let opening_crawl;
let charactersUl;
let planetsUl;
const baseUrl = `http://localhost:9001/api/films`;

// Runs on page load
addEventListener("DOMContentLoaded", () => {
  producer = document.querySelector("span#Producer");
  title = document.querySelector("h1#name");
  episode_id = document.querySelector("span#Episode");
  director = document.querySelector("span#Director");
  release_date = document.querySelector("span#Released");
  opening_crawl = document.querySelector("span#OpeningCrawl");
  charactersUl = document.querySelector("span#Characters_ID");
  planetsUl = document.querySelector("ul#Planets_ID");
  const sp = new URLSearchParams(window.location.search);
  const id = sp.get("id");
  getFilm(id);
});

async function getFilm(id) {
  let film;
  try {
    film = await fetchFilms(id);
    film.planets = await fetchPlanets(id);
    film.characters = await fetchCharacters(id);
  } catch (ex) {
    console.error(`Error reading film ${id} data.`, ex.message);
  }
  renderFilm(film);
}

async function fetchCharacters(id) {
  let characterUrl = `${baseUrl}/${id}/characters`;
  return await fetch(characterUrl).then((res) => res.json());
}

async function fetchPlanets(id) {
  const url = `${baseUrl}/${id}/planets`;
  const planets = await fetch(url).then((res) => res.json());
  return planets;
}

async function fetchFilms(id) {
  const url = `${baseUrl}/${id}`;
  const film = await fetch(url).then((res) => res.json());
  return film;
}

const renderFilm = (film) => {
  if (!film) {
    console.error("No film data available");
    return;
  }

  document.title = `SWAPI - ${film?.title}`; // Just to make the browser tab say the film title
  if (title) title.textContent = film?.title;
  if (producer) producer.textContent = film?.producer;
  if (episode_id) episode_id.textContent = film?.episode_id;
  if (director) director.textContent = film?.director;
  if (release_date) release_date.textContent = film?.release_date;
  if (opening_crawl) opening_crawl.textContent = film?.opening_crawl;

  if (charactersUl) {
    const charactersLis = film?.characters?.map(
      (character) =>
        `<li><a href="/character.html?id=${character.id}">${character.name}</a></li>`
    );
    charactersUl.innerHTML = charactersLis.join("");
  }

  if (planetsUl) {
    const planetsLis = film?.planets?.map(
      (planet) => `<li>${planet.name}</li>`
    );
    planetsUl.innerHTML = planetsLis.join("");
  }
};
