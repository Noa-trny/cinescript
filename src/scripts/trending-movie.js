let pageNb = 0;
const movieList = document.getElementById("movie-list");
const apikey = "fa5a9170";
const moviesToLoad = [
  "tt13186482",
  "tt18259086",
  "tt26743414",
  "tt15239678",
  "tt11315808",
  "tt28607951",
  "tt1262426",
  "tt29547746",
  "tt15239678",
  "tt9218128",
  "tt27490099",
  "tt30795948",
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
      .then((response) => response.json())
      .then((data) => {
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

document.addEventListener("DOMContentLoaded", () => {
  const movieBatch = 6;
  loadTrendingFilms(); // Chargement initial

  const loadMoreBtn = document.getElementById("load-more-btn");
  if (loadMoreBtn) {
    loadMoreBtn.addEventListener("click", () => {
      if ((pageNb + 1) * movieBatch < moviesToLoad.length) {
        pageNb++;
        loadTrendingFilms();
        loadMoreBtn.style.display = "none";
      }
    });
  }
});
