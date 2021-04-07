document.addEventListener("DOMContentLoaded", function (event) {
  var renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setClearColor(0x000000, 1);

  document.body.appendChild(renderer.domElement);

  var scene = new THREE.Scene();

  var camera = new THREE.PerspectiveCamera(
    90,
    window.innerWidth / window.innerHeight,
    0.1,
    5000
  );
  camera.position.z = -5000;
  camera.lookAt(scene.position);

  var light = new THREE.DirectionalLight(0xffffff, 0.2);
  light.position.x = -1;
  light.position.y = -1;
  light.position.z = -1;
  scene.add(light);

  const geometries = [
    new THREE.BoxBufferGeometry(30, 30, 30),
    new THREE.ConeBufferGeometry(30, 30, 30),
    new THREE.TorusBufferGeometry(30, 10, 16, 100),
    new THREE.CircleBufferGeometry(30, 32),
    new THREE.CylinderBufferGeometry(30, 30, 90, 100),
    new THREE.DodecahedronBufferGeometry(30),
    new THREE.IcosahedronBufferGeometry(30),
    new THREE.OctahedronBufferGeometry(30),
    new THREE.SphereBufferGeometry(30, 30, 30),
    new THREE.TetrahedronBufferGeometry(30),
    new THREE.TorusKnotBufferGeometry(30, 5, 100, 16),
  ];

  let hue = 0;
  let shapes = [];

  const addShape = function (x, y) {
    const material = new THREE.MeshLambertMaterial({
      color: 0xffffff,
      emissive: new THREE.Color("hsl(" + hue + ", 100%, 70%)")
    });

    hue += 1;

    var mesh = new THREE.Mesh(geometry, material);

    mesh.position.x = window.innerWidth / 2 - x;
    mesh.position.y = window.innerHeight / 2 - y;
    mesh.position.z = camera.position.z + 200;

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
      shape.rotateX(0.01);
    });
  };

  animate();

  let isMouseDown = true;

  var geometry = geometries[9];

  document.addEventListener("mousemove", function (event) {
    if (isMouseDown) {
      addShape(event.pageX, event.pageY);
    }
    return;
  });

  document.addEventListener("touchmove", function (event) {
    if (isMouseDown) {
      addShape(event.pageX, event.pageY);
    }
    event.preventDefault();
    return;
  });

  document.addEventListener("click", () => {
    if (isMouseDown) {
      geometry = geometries[Math.floor(Math.random() * geometries.length)];
    }
    return;
  })

  window.addEventListener("resize", function () {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });
});
