document.addEventListener("DOMContentLoaded", () => {
    // — Setup básico —
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(innerWidth, innerHeight);
    renderer.setClearColor(0x111111, 1);
    document.getElementById('canvas-art').appendChild(renderer.domElement);
  
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, innerWidth/innerHeight, 0.1, 5000);
    camera.position.set(0, 0, 800);
  
    // — Luzes —
    scene.add(new THREE.AmbientLight(0x555555));
    const point = new THREE.PointLight(0xffffff, 1.2, 2000);
    point.position.set(0, 0, 1000);
    scene.add(point);
  
    // — Dados das instâncias —
    const count = 800;
    const geometry = new THREE.DodecahedronBufferGeometry(20);
    const material = new THREE.MeshStandardMaterial({
      roughness: 0.5,
      metalness: 0.7,
      color: 0x00aaff
    });
    const inst = new THREE.InstancedMesh(geometry, material, count);
    scene.add(inst);
  
    const dummy = new THREE.Object3D();
    const data = [];            // armazena estado de cada instância
    for (let i = 0; i < count; i++) {
      // posição inicial em esfera
      const phi = Math.acos(2 * Math.random() - 1);
      const theta = 2 * Math.PI * Math.random();
      const r = 200 + 200 * Math.random();
      const pos = new THREE.Vector3(
        r * Math.sin(phi) * Math.cos(theta),
        r * Math.sin(phi) * Math.sin(theta),
        r * Math.cos(phi)
      );
      // rotação, escala e velocidade
      const quat = new THREE.Quaternion().setFromEuler(new THREE.Euler(
        Math.random()*Math.PI, Math.random()*Math.PI, Math.random()*Math.PI
      ));
      const scaleBase = 0.5 + Math.random() * 0.5;
      const pulseSpeed = 0.5 + Math.random() * 1.5;
      const velocity = new THREE.Vector3(); // começa em repouso
  
      data.push({ pos, quat, scaleBase, pulseSpeed, velocity });
      // inicializa matriz
      dummy.position.copy(pos);
      dummy.quaternion.copy(quat);
      dummy.scale.set(scaleBase, scaleBase, scaleBase);
      dummy.updateMatrix();
      inst.setMatrixAt(i, dummy.matrix);
    }
  
    // — Interatividade —
    const raycaster = new THREE.Raycaster();
    const mouseNDC = new THREE.Vector2();
    const plane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);
    let mousePoint = new THREE.Vector3();
  
    window.addEventListener("mousemove", e => {
      mouseNDC.x = (e.clientX / innerWidth) * 2 - 1;
      mouseNDC.y = -(e.clientY / innerHeight) * 2 + 1;
      raycaster.setFromCamera(mouseNDC, camera);
      raycaster.ray.intersectPlane(plane, mousePoint);
    });
  
    // — Loop de animação —
    const clock = new THREE.Clock();
    function animate() {
      requestAnimationFrame(animate);
      const t = clock.getElapsedTime();
  
      for (let i = 0; i < count; i++) {
        const d = data[i];
        // Pulsação
        const scale = d.scaleBase * (1 + 0.3 * Math.sin(t * d.pulseSpeed + i));
        // Repulsão: vetor do mouse à partícula
        const dir = new THREE.Vector3().subVectors(d.pos, mousePoint);
        const dist2 = dir.lengthSq() + 0.001;
        const force = dir.normalize().multiplyScalar(2000 / dist2);
        d.velocity.add(force);
        // Damping
        d.velocity.multiplyScalar(0.92);
        // Atualiza posição
        d.pos.add(d.velocity);
  
        // Rotação lenta
        d.quat.multiply(new THREE.Quaternion().setFromEuler(
          new THREE.Euler(0.002, 0.003, 0)
        ));
  
        // Escreve de volta
        dummy.position.copy(d.pos);
        dummy.quaternion.copy(d.quat);
        dummy.scale.set(scale, scale, scale);
        dummy.updateMatrix();
        inst.setMatrixAt(i, dummy.matrix);
      }
      inst.instanceMatrix.needsUpdate = true;
  
      renderer.render(scene, camera);
    }
    animate();
  
    // — Responsividade —
    window.addEventListener("resize", () => {
      camera.aspect = innerWidth/innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(innerWidth, innerHeight);
    });
  });
  