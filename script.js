"use strict";

const container = document.querySelector(".movie_section");
const searchBtn = document.querySelector(".search_btn");
const searchInput = document.getElementById("search_input");

const response = async function () {
  try {
    //loading
    loader();
    const res = await fetch(
      `https://www.omdbapi.com/?s=${searchInput.value}&apikey=a106e057`
    );
    if (searchInput.value === "") throw new Error("please enter a movie");
    if (!res.ok) throw new Error("Cant find data");
    const data = await res.json();
    const response = data.Search;

    if (data.Response === "False") throw new Error(data.Error);
    if (data.Response === "True") container.innerHTML = "";
    response.forEach((res) => {
      const html = `<a href="./details.html"> <div
          class="card"
          style="
            background-image: url('${res.Poster}');
            background-size: cover;
            background-repeat: no-repeat;
          "
        >
          <div class="card_info">
           <h2 data-id="${res.imdbID}" class="title">${res.Title}</h2> 
          </div>
        </div> </a>`;

      container.insertAdjacentHTML("afterbegin", html);
    });
  } catch (err) {
    handleError(err.message);
  }
};

const handleError = function (errorMsg) {
  container.innerHTML = "";
  const errorContent = `<div>
    <img src="./assets/IncredibleThickBarnowl-size_restricted.gif">
    <h3 class="messages">${errorMsg}</h3>
    </div>`;
  return container.insertAdjacentHTML("afterbegin", errorContent);
};

const homePage = async function () {
  const response = await fetch(
    `https://api.themoviedb.org/3/movie/popular?api_key=9e3ec181b39e2779ab4fb40afdf5cf01`
  );
  const { results } = await response.json();
  console.log(results);

  results.forEach((res) => {
    const path = `http://image.tmdb.org/t/p/w500${res.poster_path}`;
    const html = ` <div
      class="card"
      style="
      background-image: url('${path}');
      background-size: cover;
      background-repeat: no-repeat;
    "
    >
     
      <div class="card_info">
       <h2  class="title">${res.title}</h2>
      </div>
    </div> `;
    console.log(html);
    container.insertAdjacentHTML("afterbegin", html);
    // emptying input
    searchInput.value = "";
  });
};
homePage();

const loader = function () {
  let loader = `
  <div>
  <img src="./assets/mememe.gif">
  <h3 class="messages">Loading...</h3>
  </div>`;
  container.innerHTML = loader;
};

container.addEventListener("click", function (e) {
  if (e.target.classList.contains("card")) {
    const Movieid = e.target.querySelector(".title").dataset.id;
    localStorage.setItem("movieId", Movieid);
  }
});
searchBtn.addEventListener("click", function () {
  container.innerHTML = "";
  response();
});
searchInput.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    container.innerHTML = "";
    response();
  }
});
document.querySelector(".home_btn").addEventListener("click", function () {
  homePage();
});
