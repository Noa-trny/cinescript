const apikey = "fa5a9170";

document.addEventListener('DOMContentLoaded', () => {
    // Get movie ID from URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const movieId = urlParams.get('id');

    if (!movieId) {
        console.error('No movie ID provided');
        return;
    }

    // Fetch movie details
    const url = `https://www.omdbapi.com/?apikey=${apikey}&i=${movieId}`;
    fetch(url)
        .then(response => response.json())
        .then(data => {
            // Update page title
            document.title = `${data.Title} - Cinescript`;

            // Top row information
            document.getElementById('top-left').innerHTML = `
                <h1>${data.Title}</h1>
                <p>${data.Year} • ${data.Runtime} • ${data.Rated}</p>
            `;
            
            document.getElementById('top-right').innerHTML = `
                <p>Rating: ${data.imdbRating}/10</p>
                <p>Genre: ${data.Genre}</p>
            `;

            // Poster
            const posterContainer = document.getElementById('poster-container');
            posterContainer.innerHTML = `
                <img src="${data.Poster}" alt="${data.Title} poster">
            `;

            // Plot section
            const plotSection = document.getElementById('plot');
            plotSection.innerHTML += `<p>${data.Plot}</p>`;

            // Actors list
            const actorsList = document.getElementById('actors-list');
            data.Actors.split(', ').forEach(actor => {
                const li = document.createElement('li');
                li.textContent = actor;
                actorsList.appendChild(li);
            });

            // Directors list
            const directorsList = document.getElementById('directors-list');
            data.Director.split(', ').forEach(director => {
                const li = document.createElement('li');
                li.textContent = director;
                directorsList.appendChild(li);
            });

            // Writers list
            const writersList = document.getElementById('writers-list');
            data.Writer.split(', ').forEach(writer => {
                const li = document.createElement('li');
                li.textContent = writer;
                writersList.appendChild(li);
            });
        })
        .catch(error => {
            console.error('Error fetching movie details:', error);
        });
});