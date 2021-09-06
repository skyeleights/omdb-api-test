const movieId = localStorage.getItem("movieId");
const gettingMovie = async function () {
  const movie = await fetch(
    `http://www.omdbapi.com/?i=${movieId}&apikey=a106e057`
  );
  const response = await movie.json();
  console.log(response);

  const html=`
  `

};
gettingMovie();
