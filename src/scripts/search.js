const apikey = "fa5a9170";
const searchInputField = document.querySelector("#search-input");
const errorElement = document.querySelector("#error-message");
const movieListElement = document.querySelector("#movie-list");
const pageNb = 1;

searchInputField.addEventListener("input", () => {
  // on écoute les changements dans le champ de recherche (input)
  searchApi(false); // on lance la recherche
});

function searchApi(fromScroll) {
  // fonction pour effectuer une recherche
  let input = searchInputField.value.replace(/\s/g, "+"); // on récupère la valeur du champ de recherche et on remplace les espaces par des "+"
  const url = `https://www.omdbapi.com/?apikey=${apikey}&page=${pageNb}&s=${input}`;

  movieListElement.innerHTML = ""; // on vide la liste de films
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      if (data.Response === "False" && !fromScroll) {
        // si la réponse de l'API est "False" et que la recherche n'a pas été effectuée par scroll
        errorElement.innerHTML = data.Error; // on affiche le message d'erreur
      } else if (data.Response === "True") {
        // si la réponse de l'API est "True"
        errorElement.innerHTML = ""; // on vide le message d'erreur
        data.Search.forEach((element) => {
          // pour chaque élément dans la liste de films
          if (element.Type === "movie" && element.Poster !== "N/A") {
            // si le type est "movie" et qu'il y a un poster
            const movieCard = document.createElement("a");
            movieCard.classList.add("movieCard");
            movieCard.href = `movie.html?id=${element.imdbID}`;

            const movieTitle = document.createElement("h3");
            movieTitle.innerHTML = element.Title;

            const moviePoster = document.createElement("img");
            moviePoster.src = element.Poster;

            movieCard.appendChild(movieTitle); // on ajoute le titre du film à la carte
            movieCard.appendChild(moviePoster); // on ajoute le poster du film à la carte
            movieListElement.appendChild(movieCard); // on ajoute la carte à la liste de films
          }
        });
      }
    });
}
