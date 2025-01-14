document.addEventListener('DOMContentLoaded', () => {
  fetch("/src/components/header/header.html")
    .then((response) => response.text())
    .then((data) => {
      document.getElementById("header-container").innerHTML = data;
    })
    .catch((error) =>
      console.error("Erreur lors du chargement du header :", error)
    );
});