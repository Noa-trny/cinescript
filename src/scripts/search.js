const apikey = "fa5a9170";
const searchInputField = document.querySelector("#search-input");
const errorElement = document.querySelector("#error-message");
const movieListElement = document.querySelector("#movie-list");
const pageNb = 1;

searchInputField.addEventListener("input", () => {
  searchApi(false);
});

function searchApi(fromScroll) {
  let input = searchInputField.value.replace(/\s/g, "+");
  const url = `https://www.omdbapi.com/?apikey=${apikey}&page=${pageNb}&s=${input}`;

  movieListElement.innerHTML = "";
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      if (data.Response === "False" && !fromScroll) {
        errorElement.innerHTML = data.Error;
      } else if (data.Response === "True") {
        errorElement.innerHTML = "";
        data.Search.forEach((element) => {
          if (element.Type === "movie" && element.Poster !== "N/A") {
            const movieCard = document.createElement("a");
            movieCard.classList.add("movieCard");
            movieCard.href = `movie.html?id=${element.imdbID}`;

            const movieTitle = document.createElement("h3");
            movieTitle.innerHTML = element.Title;

            const moviePoster = document.createElement("img");
            moviePoster.src = element.Poster;

            movieCard.appendChild(movieTitle);
            movieCard.appendChild(moviePoster);
            movieListElement.appendChild(movieCard);
          }
        });
      }
    });
}
