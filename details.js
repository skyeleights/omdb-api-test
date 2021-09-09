"use strict";

const movieId = localStorage.getItem("movieId");
const container = document.querySelector(".detailSection");
const loader = function () {
  let loader = `
  <div class="loading_component">
  <h3 class="messages">Loading...</h3>
  <img src="./assets/mememe.gif">
  </div>`;
  container.innerHTML = loader;
};

const gettingMovie = async function () {
  try {
    loader();
    const movie = await fetch(
      `http://www.omdbapi.com/?i=${movieId}&apikey=a106e057`
    );

    if (!movie.ok) throw new Error("Cant find details 😿");
    const response = await movie.json();

    const html = `<div class="poster">
  <img
    src="${response.Poster}"
    alt="${response.Title}"
  />
</div>
<div class="info">
  <h2 class="title">${response.Title}</h2>
  <p class="paragraph">${response.Plot}</p>
  <div class="additional_info">
    <div class="addinfo additional_info--1">
      <h3>
        <i class="fas fa-hashtag"></i>
        <span class="titles"> Genre:</span>
        <span class="innerText">${response.Genre}</span>
      </h3>
      <h3>
        <i class="fas fa-user-friends"></i
        ><span class="titles">Actors:</span>
          <span class="innerText">${response.Actors}</span>
      </h3>
      <h3>
        <i class="fas fa-video"></i>

        <span class="titles"> Director: </span>
        <span class="innerText">${response.Director}</span>
      </h3>
      <h3>
        <i class="fas fa-flag"></i>

        <span class="titles">Country: </span>
        <span class="innerText">${response.Country}</span>
      </h3>
    </div>
    <div class="addinfo additional_info--2">
      <h3>
        <i class="fas fa-stopwatch"></i>
        <span class="titles"> Duration: </span>
        <span class="innerText">${response.Runtime}</span>
      </h3>
      <h3>
        <i class="fas fa-medal"></i>
        <span class="titles"> Quality: </span>
        <span class="innerText">HD</span>
      </h3>
      <h3>
        <i class="fas fa-calendar-week"></i>
        <span class="titles"> Release: </span>
        <span class="innerText">${response.Released}</span>
      </h3>
      <h3>
        <i class="fab fa-imdb"></i>
        <span class="titles">IMDB:</span>
        <span class="innerText">${response.imdbRating}⭐</span>
      </h3>
    </div>
  </div>
</div>
  `;
    container.innerHTML = "";
    container.insertAdjacentHTML("afterbegin", html);
  } catch (err) {
    handleError(err.message);
  }
};

gettingMovie();

const handleError = function (errorMsg) {
  const errorContent = `<div>
      <img src="./assets/IncredibleThickBarnowl-size_restricted.gif">
      <h3 class="errorMsg">${errorMsg}</h3>
      </div>`;
  return container.insertAdjacentHTML("afterbegin", errorContent);
};
//done