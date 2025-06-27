const dvd = document.getElementById("dvd");
    let x = 100;
    let y = 100;
    let dx = 2;
    let dy = 2;

    const colors = ["red", "blue", "green", "yellow", "purple", "cyan", "orange"];

    function randomColor() {
      return colors[Math.floor(Math.random() * colors.length)];
    }

    function move() {
      const dvdRect = dvd.getBoundingClientRect();
      const windowWidth = window.innerWidth;
      const windowHeight = window.innerHeight;

      if (x + dvdRect.width >= windowWidth || x <= 0) {
        dx *= -1;
        dvd.style.color = randomColor();
      }

      if (y + dvdRect.height >= windowHeight || y <= 0) {
        dy *= -1;
        dvd.style.color = randomColor();
      }

      x += dx;
      y += dy;

      dvd.style.left = x + "px";
      dvd.style.top = y + "px";

      requestAnimationFrame(move);
    }

    move();