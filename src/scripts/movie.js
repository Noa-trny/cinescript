const apikey = "fa5a9170";

document.addEventListener("DOMContentLoaded", () => {
  // on récupère l'id du film dans l'url
  const urlParams = new URLSearchParams(window.location.search);
  const movieId = urlParams.get("id");

  if (!movieId) {
    // si l'id du film n'est pas fourni
    console.error("No movie ID provided"); // on affiche un message d'erreur
    return;
  }

  // Fetch movie details
  const url = `https://www.omdbapi.com/?apikey=${apikey}&i=${movieId}`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      // mise à jour du titre de la page
      document.title = `${data.Title} - Cinescript`;

      // informations du film
      document.getElementById("top-left").innerHTML = `
                <h1>${data.Title}</h1>
                <p>${data.Year} • ${data.Runtime} • ${data.Rated}</p>
            `;
      document.getElementById("top-right").innerHTML = `
                <p>Rating: ${data.imdbRating}/10</p>
                <p>Genre: ${data.Genre}</p>
            `;

      // Poster
      const posterContainer = document.getElementById("poster-container");
      posterContainer.innerHTML = `
                <img src="${data.Poster}" alt="${data.Title} poster">
            `;

      // Plot section
      const plotSection = document.getElementById("plot");
      plotSection.innerHTML += `<p>${data.Plot}</p>`;

      // liste des acteurs
      const actorsList = document.getElementById("actors-list");
      data.Actors.split(", ").forEach((actor) => {
        const li = document.createElement("li");
        li.textContent = actor;
        actorsList.appendChild(li);
      });

      // liste des réalisateurs
      const directorsList = document.getElementById("directors-list");
      data.Director.split(", ").forEach((director) => {
        const li = document.createElement("li");
        li.textContent = director;
        directorsList.appendChild(li);
      });

      // liste des scénaristes
      const writersList = document.getElementById("writers-list");
      data.Writer.split(", ").forEach((writer) => {
        const li = document.createElement("li");
        li.textContent = writer;
        writersList.appendChild(li);
      });
    })
    // message d'erreur si la requête échoue dans la console
    .catch((error) => {
      console.error("Error fetching movie details:", error);
    });
});
