"use strict";

const container = document.querySelector(".movie_section");
const searchBtn = document.querySelector(".search_btn");
const searchInput = document.getElementById("search_input");

const response = async function () {
  try {
    const res = await fetch(
      `https://www.omdbapi.com/?s=${searchInput.value}&apikey=a106e057`
    );
    if (searchInput.value === "") throw new Error("please enter a movie");
    if (!res.ok) throw new Error("Cant find data");
    const data = await res.json();
    const response = data.Search;

    if (data.Response === "False") throw new Error(data.Error);
    if (data.Response === "True")
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

 const handleError = function (errorMsg) {
  const errorContent = `<div>
    <img src="./assets/IncredibleThickBarnowl-size_restricted.gif">
    <h3 class="errorMsg">${errorMsg}</h3>
    </div>`;
  return container.insertAdjacentHTML("afterbegin", errorContent);
};

container.addEventListener("click", function (e) {
  if (e.target.classList.contains("card")) {
    const Movieid = e.target.querySelector(".title").dataset.id;
    localStorage.setItem("movieId", Movieid);
  }
});
