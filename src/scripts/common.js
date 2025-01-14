function loadHeader() {
  return new Promise((resolve) => {
    // CSS
    const headerCssLink = document.createElement("link");
    headerCssLink.rel = "stylesheet";
    headerCssLink.href = "src/components/header/header.css";
    document.head.appendChild(headerCssLink);

    // JS
    const headerScript = document.createElement("script");
    headerScript.src = "src/components/header/header.js";
    headerScript.type = "module";
    document.body.appendChild(headerScript);

    let commonStyles = document.createElement("link");
    commonStyles.rel = "stylesheet";
    commonStyles.href = "src/styles/common.css";
    document.head.appendChild(commonStyles);

  });
}

document.addEventListener("DOMContentLoaded", () => {
  loadHeader();
});
