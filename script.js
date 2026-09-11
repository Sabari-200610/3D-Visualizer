(function () {
  const wrap = document.getElementById('canvas-wrap');
  const partNameEl = document.getElementById('part-name');
  const partDescEl = document.getElementById('part-desc');
  const infoPanel = document.getElementById('info-panel');

  // ---- part definitions: this is your "content layer" ----
  // In the real project, `desc` could instead come from an LLM call.
  const PART_INFO = {
    case:  { name: 'Case',            desc: 'The frame that holds every other component and manages airflow to keep things cool.' },
    cpu:   { name: 'CPU (Processor)', desc: 'Executes instructions and does the actual "thinking" — the speed of nearly everything depends on it.' },
    ram1:  { name: 'RAM Stick',       desc: 'Temporary fast memory. Holds data the CPU needs right now; wiped when the computer powers off.' },
    ram2:  { name: 'RAM Stick',       desc: 'A second memory module — more sticks generally means more programs can run smoothly at once.' },
    gpu:   { name: 'GPU (Graphics)',  desc: 'A specialised processor for rendering images and video, and for heavy parallel math like AI workloads.' },
    psu:   { name: 'Power Supply',    desc: 'Converts wall power into the specific voltages every other component needs to run safely.' },
    disk:  { name: 'Storage Drive',   desc: 'Where files, the operating system, and programs live permanently, even when powered off.' },
  };

  // ---- scene setup ----
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x0a0e14);

  const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 100);
  camera.position.set(4.5, 3.2, 6);
  camera.lookAt(0, 0, 0);

  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  wrap.appendChild(renderer.domElement);

  scene.add(new THREE.AmbientLight(0x8899aa, 0.7));
  const key = new THREE.DirectionalLight(0xffffff, 0.9);
  key.position.set(5, 8, 5);
  scene.add(key);
  const rim = new THREE.DirectionalLight(0x38bdf8, 0.4);
  rim.position.set(-6, 2, -4);
  scene.add(rim);

  // ---- build the "computer" out of primitives ----
  // Each part is its own mesh so it can move independently when exploded.
  const group = new THREE.Group();
  scene.add(group);

  function makePart(id, geometry, color, position) {
    const mat = new THREE.MeshStandardMaterial({ color, roughness: 0.5, metalness: 0.3 });
    const mesh = new THREE.Mesh(geometry, mat);
    mesh.position.copy(position);
    mesh.userData.id = id;
    mesh.userData.homePosition = position.clone();
    // direction each part flies outward toward when exploded
    mesh.userData.explodeDir = position.clone().normalize();
    if (mesh.userData.explodeDir.lengthSq() === 0) {
      mesh.userData.explodeDir = new THREE.Vector3(0, 1, 0);
    }
    group.add(mesh);
    return mesh;
  }

  const parts = [
    makePart('case', new THREE.BoxGeometry(2.2, 2.6, 2.2), 0x2b323f, new THREE.Vector3(0, 0, 0)),
    makePart('cpu',  new THREE.BoxGeometry(0.5, 0.12, 0.5), 0x38bdf8, new THREE.Vector3(-0.4, 0.6, 0.6)),
    makePart('ram1', new THREE.BoxGeometry(0.12, 0.7, 0.35), 0xf5a623, new THREE.Vector3(0.4, 0.6, 0.7)),
    makePart('ram2', new THREE.BoxGeometry(0.12, 0.7, 0.35), 0xf5a623, new THREE.Vector3(0.6, 0.6, 0.7)),
    makePart('gpu',  new THREE.BoxGeometry(1.6, 0.25, 0.7), 0x4ade80, new THREE.Vector3(0, -0.3, 0.9)),
    makePart('psu',  new THREE.BoxGeometry(1.0, 0.9, 1.0), 0x94a3b8, new THREE.Vector3(0, -0.9, -0.7)),
    makePart('disk', new THREE.BoxGeometry(0.9, 0.15, 0.9), 0xe2e8f0, new THREE.Vector3(0, 1.1, -0.7)),
  ];

  // make the outer case semi-transparent so inner parts read clearly
  parts[0].material.transparent = true;
  parts[0].material.opacity = 0.25;

  // ---- interaction: hover to identify, click to explode/reassemble ----
  const raycaster = new THREE.Raycaster();
  const mouse = new THREE.Vector2();
  let exploded = false;
  let hovered = null;

  function setHover(mesh) {
    if (hovered === mesh) return;
    if (hovered) hovered.material.emissive?.setHex(0x000000);
    hovered = mesh;
    if (mesh) {
      mesh.material.emissive?.setHex(0x1c3a4d);
      const info = PART_INFO[mesh.userData.id];
      partNameEl.textContent = info.name;
      partDescEl.textContent = info.desc;
      infoPanel.classList.remove('empty');
    } else {
      partNameEl.textContent = 'No part selected';
      partDescEl.textContent = 'Hover over the model to see what each piece does.';
      infoPanel.classList.add('empty');
    }
  }

  function onPointerMove(e) {
    mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
    raycaster.setFromCamera(mouse, camera);
    const hits = raycaster.intersectObjects(parts);
    setHover(hits.length ? hits[0].object : null);
  }

  function onClick() {
    exploded = !exploded;
  }

  renderer.domElement.addEventListener('pointermove', onPointerMove);
  renderer.domElement.addEventListener('click', onClick);

  // simple drag-to-orbit (no external controls library needed)
  let isDragging = false, lastX = 0, lastY = 0;
  let yaw = 0.5, pitch = 0.45;
  renderer.domElement.addEventListener('pointerdown', (e) => { isDragging = true; lastX = e.clientX; lastY = e.clientY; });
  window.addEventListener('pointerup', () => isDragging = false);
  window.addEventListener('pointermove', (e) => {
    if (!isDragging) return;
    yaw += (e.clientX - lastX) * 0.005;
    pitch += (e.clientY - lastY) * 0.005;
    pitch = Math.max(0.1, Math.min(1.3, pitch));
    lastX = e.clientX; lastY = e.clientY;
  });

  function updateCamera() {
    const radius = 6.5;
    camera.position.x = radius * Math.sin(pitch) * Math.sin(yaw);
    camera.position.z = radius * Math.sin(pitch) * Math.cos(yaw);
    camera.position.y = radius * Math.cos(pitch);
    camera.lookAt(0, 0, 0);
  }

  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });

  // ---- animation loop: eases every part toward home or exploded position ----
  const EXPLODE_DISTANCE = 1.4;
  function animate() {
    requestAnimationFrame(animate);
    updateCamera();

    parts.forEach((mesh) => {
      const target = exploded
        ? mesh.userData.homePosition.clone().add(mesh.userData.explodeDir.clone().multiplyScalar(EXPLODE_DISTANCE))
        : mesh.userData.homePosition;
      mesh.position.lerp(target, 0.08);
    });

    renderer.render(scene, camera);
  }
  animate();
})();
