var renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0x000000, 1);

document.body.appendChild(renderer.domElement);

var scene = new THREE.Scene();

var camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  5000
);
camera.position.z = -5000;
camera.lookAt(scene.position);

var light = new THREE.DirectionalLight(0xffffff, 1);
light.position.x = 0;
light.position.y = 0;
light.position.z = -1;
scene.add(light);

const geometries = [
  new THREE.BoxBufferGeometry(15, 15, 15),
  new THREE.ConeBufferGeometry(10, 20, 30),
  new THREE.TorusBufferGeometry(5, 3, 16, 100)
];

let hue = 0;
let shapes = [];

const addShape = function (x, y) {
  var geometry = geometries[Math.floor(Math.random() * geometries.length)];

  const material = new THREE.MeshLambertMaterial({
    color: 0xffffff,
    emissive: new THREE.Color("hsl(" + hue + ", 100%, 50%)")
  });

  hue += 1;

  var mesh = new THREE.Mesh(geometry, material);

  mesh.position.x = window.innerWidth / 2 - x;
  mesh.position.y = window.innerHeight / 2 - y;
  mesh.position.z = camera.position.z + 500;

  mesh.rotateX(Math.random() * Math.PI * 2);
  mesh.rotateY(Math.random() * Math.PI);

  shapes.push(mesh);

  scene.add(mesh);
};

var animate = function () {
  camera.position.z += 1;

  renderer.render(scene, camera);
  requestAnimationFrame(animate);

  shapes.forEach((shape) => {
    shape.rotateX(0.002);
  });
};

animate();

// ativar onClick
// let isMouseDown = false;

// desativar onClick
let isMouseDown = true;

document.addEventListener("mousedown", function (event) {
  isMouseDown = true;
});

document.addEventListener("mouseup", function (event) {
  isMouseDown = false;
});

document.addEventListener("mousemove", function (event) {
  if (isMouseDown) {
    addShape(event.pageX, event.pageY);
  }
});

document.addEventListener("touchstart", function (event) {
  isMouseDown = true;
});

document.addEventListener("touchend", function (event) {
  isMouseDown = false;
});

document.addEventListener("touchmove", function (event) {
  if (isMouseDown) {
    addShape(event.pageX, event.pageY);
  }
  event.preventDefault();
});

window.addEventListener("resize", function () {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
