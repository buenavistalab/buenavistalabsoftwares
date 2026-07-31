const btn = document.querySelector(".btn-toggle");
const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");

function isDarkTheme() {
  if (document.body.classList.contains("light-theme")) return false;
  if (document.body.classList.contains("dark-theme")) return true;
  return prefersDarkScheme.matches;
}

function syncThemeClass() {
  const theme = localStorage.getItem("theme");
  document.body.classList.remove("dark-theme", "light-theme");

  if (theme === "dark") {
    document.body.classList.add("dark-theme");
  } else if (theme === "light") {
    document.body.classList.add("light-theme");
  } else if (prefersDarkScheme.matches) {
    document.body.classList.add("dark-theme");
  }
}

syncThemeClass();

btn.addEventListener("click", function () {
  const dark = !isDarkTheme();
  const theme = dark ? "dark" : "light";
  localStorage.setItem("theme", theme);
  syncThemeClass();
});

let div = document.getElementById("icon");
let icon = div.innerText;
btn.addEventListener("click", function () {
  if (this.innerText == icon) {
    div.innerText = "nightlight";
    div.classList.add("md-dark");
    div.classList.remove("md-light");
  }
  else {
    div.innerText = icon;
    div.classList.add("md-light");
    div.classList.remove("md-dark");
  }
}, false);
