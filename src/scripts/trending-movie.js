let pageNb = 0;
const movieList = document.getElementById("movie-list");
const apikey = "fa5a9170";
const moviesToLoad = [
  "tt0892769", "tt1646971", "tt2386490", "tt0092099", "tt1745960",
  "tt2015381", "tt3896198", "tt6791350", "tt0119217", "tt15398776",
  "tt2084970", "tt3907584"
];

function loadTrendingFilms() {
  const batchSize = 6;
  const startIndex = pageNb * batchSize;
  const endIndex = (pageNb + 1) * batchSize;

  for (let i = startIndex; i < endIndex; i++) {
    if (i >= moviesToLoad.length) {
      return;
    }

    const url = `https://www.omdbapi.com/?apikey=${apikey}&i=${moviesToLoad[i]}`;
    fetch(url)
      .then(response => response.json())
      .then(data => {
        const movieCard = document.createElement("a");
        movieCard.classList.add("movieCard");
        movieCard.href = `movie.html?id=${data.imdbID}`;

        const moviePoster = document.createElement("img");
        moviePoster.src = data.Poster;

        const movieTitle = document.createElement("h3");
        movieTitle.innerHTML = data.Title;

        const moviePlot = document.createElement("p");
        moviePlot.innerHTML = data.Plot;

        movieList.appendChild(movieCard);
        movieCard.appendChild(movieTitle);
        movieCard.appendChild(moviePoster);
        movieCard.appendChild(moviePlot);
      });
  }
}

loadTrendingFilms();

