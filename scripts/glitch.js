$(function () {
  var $projects = $(".project .word");
  var $activeProject = null;
  var image = null;
  var aimX = null;
  var aimY = null;
  var currentX = null;
  var currentY = null;

  var canvasTag = document.getElementById("project-canvas");
  var windowWidth = $(document).width();
  var windowHeight = $(document).height();

  var proportion = windowWidth > 1024 ? 0.1 : 0.1;
  var imageWidth = Math.round(windowWidth * proportion);

  var imageHeight = null;

  canvasTag.width = windowWidth * 2;
  canvasTag.height = windowHeight * 2;

  canvasTag.style.width = windowWidth + "px";
  canvasTag.style.height = windowHeight + "px";

  var context = canvasTag.getContext("2d");
  context.scale(2, 2);

  document.addEventListener("mousemove", function (event) {
    aimX = event.pageX;
    aimY = event.pageY;
    if (currentX === null) {
      currentX = event.pageX;
      currentY = event.pageY;
    }
  });

  $projects
    .mouseenter(function (event) {
      $activeProject = $(event.target).closest(".word");
      $activeProject.addClass("active");

      image = $activeProject.find("img").get(0);

      if (!image) {
        console.log("No IMAGE");
        return;
      }
      var width = image.naturalWidth;
      var height = image.naturalHeight;

      imageHeight = Math.round(imageWidth / (width / height));
    })
    .mouseleave(function (event) {
      $activeProject.removeClass("active");
      image = null;
      imageHeight = 0;
      context.clearRect(0, 0, canvasTag.width, canvasTag.height);
    });

  const draw = function () {
    if (currentX) {
      if (image && image.complete) {
        context.drawImage(
          image,
          currentX - Math.round(imageWidth / 2),
          currentY - Math.round(imageHeight / 2),
          imageWidth,
          imageHeight
        );
      }

      currentX = currentX + (aimX - currentX) * 0.1;
      currentY = currentY + (aimY - currentY) * 0.1;
    }
    requestAnimationFrame(draw);
  };

  draw();
});
