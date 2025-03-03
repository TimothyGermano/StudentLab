let nameH1;
let climateSpan;
let surfaceWaterSpan;
let diameterSpan;
let rotationPeriodSpan;
let terrainSpan;
let gravitySpan;
let orbitalPeriodSpan;
let populationSpan;
let charactersList;
let moviesList;
const baseUrl = `http://localhost:9001/api`;

// Runs on page load
addEventListener("DOMContentLoaded", () => {
  nameH1 = document.querySelector("h1#name");
  climateSpan = document.querySelector("span#climate");
  surfaceWaterSpan = document.querySelector("span#surface_water");
  diameterSpan = document.querySelector("span#diameter");
  rotationPeriodSpan = document.querySelector("span#rotation_period");
  terrainSpan = document.querySelector("span#terrain");
  gravitySpan = document.querySelector("span#gravity");
  orbitalPeriodSpan = document.querySelector("span#orbital_period");
  populationSpan = document.querySelector("span#population");
  charactersList = document.querySelector("ul#charactersList");
  moviesList = document.querySelector("ul#moviesList");
  const sp = new URLSearchParams(window.location.search);
  const id = sp.get("id");
  getPlanet(id);
});

async function getPlanet(id) {
  let planet;
  try {
    planet = await fetchPlanet(id);
    planet.characters = await fetchCharacters(id);
    planet.movies = await fetchMovies(id);
  } catch (ex) {
    console.error(`Error reading planet ${id} data.`, ex.message);
  }
  renderPlanet(planet);
}

async function fetchPlanet(id) {
  const url = `${baseUrl}/planets/${id}`;
  return await fetch(url).then((res) => res.json());
}

async function fetchCharacters(id) {
  const url = `${baseUrl}/planets/${id}/characters`;
  return await fetch(url).then((res) => res.json());
}

async function fetchMovies(id) {
  const url = `${baseUrl}/planets/${id}/films`;
  return await fetch(url).then((res) => res.json());
}

const renderPlanet = (planet) => {
  document.title = `SWAPI - ${planet?.name}`; // Just to make the browser tab say the planet name
  nameH1.textContent = planet?.name;
  climateSpan.textContent = planet?.climate;
  surfaceWaterSpan.textContent = planet?.surface_water;
  diameterSpan.textContent = planet?.diameter;
  rotationPeriodSpan.textContent = planet?.rotation_period;
  terrainSpan.textContent = planet?.terrain;
  gravitySpan.textContent = planet?.gravity;
  orbitalPeriodSpan.textContent = planet?.orbital_period;
  populationSpan.textContent = planet?.population;

  const charactersLis = planet?.characters?.map(
    (character) =>
      `<li><a href="/character.html?id=${character.id}">${character.name}</a></li>`
  );
  charactersList.innerHTML = charactersLis.join("");

  const moviesLis = planet?.movies?.map(
    (movie) =>
      `<li><a href="/movie.html?id=${movie.id}">${movie.title}</a></li>`
  );
  moviesList.innerHTML = moviesLis.join("");
};
