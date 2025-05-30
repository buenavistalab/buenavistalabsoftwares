document.addEventListener("DOMContentLoaded", function () {
    // --- setup básico ---
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x999fff, 1);
    document.getElementById('canvas-art').appendChild(renderer.domElement);
  
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(90, innerWidth/innerHeight, 0.1, 5000);
    camera.position.z = 1000;
  
    const light = new THREE.DirectionalLight(0xffffff, 0.8);
    light.position.set(1, 1, 1);
    scene.add(light);
  
    // --- geometrias e estado ---
    const geometries = [
      new THREE.BoxBufferGeometry(300,300,300),
      new THREE.ConeBufferGeometry(300,300,300),
      new THREE.TorusBufferGeometry(300,10,16,100),
      new THREE.CylinderBufferGeometry(300,300,90,100),
      new THREE.SphereBufferGeometry(300,300,300)
    ];
    let currentGeometry = geometries[0];
    let shapes = [];
    let hue = 0;
    let animationMode = 0; // 0 = padrão, 1 = espiral
  
    // --- função para criar shapes ---
    function addShape(x, y) {
      const mat = new THREE.MeshLambertMaterial({
        color: new THREE.Color(`hsl(${hue%360}, 80%, 60%)`),
        transparent: true,
        opacity: 0.9
      });
      hue += 5;
      const mesh = new THREE.Mesh(currentGeometry, mat);
      // posição inicial (próxima ao centro)
      mesh.position.set(0, 0, 0);
      mesh.userData = {
        angle: Math.random() * Math.PI * 2,
        radius: randomBetween(100, 600),
        speed: randomBetween(0.005, 0.02),
        scaleBase: randomBetween(0.5, 1.5)
      };
      scene.add(mesh);
      shapes.push(mesh);
    }
  
    function randomBetween(min, max){
      return Math.random() * (max-min) + min;
    }
  
    // --- animações ---
    function animateDefault() {
      camera.position.z = 1000;
      shapes.forEach(mesh => {
        mesh.rotateX(0.01);
        mesh.rotateY(0.015);
      });
    }
  
    function animateSpiral() {
      shapes.forEach(mesh => {
        // atualiza ângulo e calcula posição em espiral no plano XZ
        mesh.userData.angle += mesh.userData.speed;
        const a = mesh.userData.angle;
        const r = mesh.userData.radius;
        mesh.position.x = Math.cos(a) * r;
        mesh.position.z = Math.sin(a) * r;
        // faz o Y oscilar para dar um efeito wave
        mesh.position.y = Math.sin(a * 3) * 100;
  
        // escala pulsante
        const s = 1 + 0.3 * Math.sin(a * 4);
        mesh.scale.set(
          mesh.userData.scaleBase * s,
          mesh.userData.scaleBase * s,
          mesh.userData.scaleBase * s
        );
        mesh.rotateY(0.02);
      });
    }
  
    // --- loop principal ---
    function render() {
      requestAnimationFrame(render);
      renderer.render(scene, camera);
      if (animationMode === 1) {
        animateSpiral();
      } else {
        animateDefault();
      }
    }
    render();
  
    // --- eventos de input ---
    document.addEventListener("mousemove", e => {
      addShape(e.clientX, e.clientY);
    });
  
    document.addEventListener("click", () => {
      // alterna geometria aleatoriamente
      currentGeometry = geometries[Math.floor(Math.random() * geometries.length)];
    });
  
    document.addEventListener("keydown", e => {
      if (e.key.toLowerCase() === 'a') {
        animationMode = 1 - animationMode;  // alterna entre 0 e 1
      }
    });
  
    window.addEventListener("resize", () => {
      camera.aspect = innerWidth/innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(innerWidth, innerHeight);
    });
  });
  