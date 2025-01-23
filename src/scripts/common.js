async function loadContent() {
  try {
    // Charger le HTML du header
    const response = await fetch("/src/components/header/header.html");
    const headerContent = await response.text();

    // Créer et insérer le header
    const headerElement = document.createElement("header");
    headerElement.setAttribute("name", "header");
    headerElement.innerHTML = headerContent;
    document.body.prepend(headerElement);

    // CSS header
    const headerCssLink = document.createElement("link");
    headerCssLink.rel = "stylesheet";
    headerCssLink.href = "src/components/header/header.css";
    document.head.appendChild(headerCssLink);

    // CSS common
    let commonStyles = document.createElement("link");
    commonStyles.rel = "stylesheet";
    commonStyles.href = "src/styles/common.css";
    document.head.appendChild(commonStyles);

    // Charger le HTML du footer
    const footerResponse = await fetch("/src/components/footer/footer.html");
    const footerContent = await footerResponse.text();

    // Créer et insérer le footer
    const footerElement = document.createElement("footer");
    footerElement.setAttribute("name", "footer");
    footerElement.innerHTML = footerContent;
    document.body.appendChild(footerElement);

    // CSS footer
    const footerCssLink = document.createElement("link");
    footerCssLink.rel = "stylesheet";
    footerCssLink.href = "src/components/footer/footer.css";
    document.head.appendChild(footerCssLink);
  } catch (error) {
    console.error("Erreur lors du chargement du header:", error);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  loadContent();
});
