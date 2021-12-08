const btn = document.querySelector(".btn-toggle");
const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");

const currentTheme = localStorage.getItem("theme");
if (currentTheme == "dark") {
  document.body.classList.toggle("dark-theme");
} else if (currentTheme == "light") {
  document.body.classList.toggle("light-theme");
}

btn.addEventListener("click", function () {
  if (prefersDarkScheme.matches) {
    document.body.classList.toggle("light-theme");
    let theme = document.body.classList.contains("light-theme")
      ? "light"
      : "dark";
  } else {
    document.body.classList.toggle("dark-theme");
    let theme = document.body.classList.contains("dark-theme")
      ? "dark"
      : "light";
  }
  localStorage.setItem("theme", theme);
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
