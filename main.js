import './style.css'

import * as THREE from 'three';

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
})

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);

renderer.render(scene, camera);

// Add event listener on resize to ensure that everything resizes without a need to refresh
function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}
window.addEventListener('resize', onWindowResize, false);

// Sun
const sunTexture = new THREE.TextureLoader().load('imgs/sun.jpg')

let sun = new THREE.Mesh(
  new THREE.SphereGeometry(3, 32, 32),
  new THREE.MeshStandardMaterial( {
    map: sunTexture,
  })
)
scene.add(sun)
sun.position.z = -20;
sun.position.setX(0);



// Earth
const earthTexture = new THREE.TextureLoader().load('imgs/earth.jpeg')

const earth = new THREE.Mesh(
  new THREE.SphereGeometry(3, 32, 32),
  new THREE.MeshStandardMaterial( {
    map: earthTexture,
  })
)
scene.add(earth)

earth.position.z = 20;
earth.position.setX(0);


// Mars
const marsTexture = new THREE.TextureLoader().load('imgs/mars.jpeg')

const mars = new THREE.Mesh(
  new THREE.SphereGeometry(3, 32, 32),
  new THREE.MeshStandardMaterial( {
    map: marsTexture,
  })
)
scene.add(mars)

mars.position.z = 40;
mars.position.setX(0);

// Mercury
const mercuryTexture = new THREE.TextureLoader().load('imgs/mercury.jpeg')

const mercury = new THREE.Mesh(
  new THREE.SphereGeometry(3, 32, 32),
  new THREE.MeshStandardMaterial( {
    map: mercuryTexture,
  })
)
scene.add(mercury)

mercury.position.z = 60;
mercury.position.setX(0);


// Jupiter
const jupiterTexture = new THREE.TextureLoader().load('imgs/jupiter.jpeg')

const jupiter = new THREE.Mesh(
  new THREE.SphereGeometry(3, 32, 32),
  new THREE.MeshStandardMaterial( {
    map: jupiterTexture,
  })
)
scene.add(jupiter)

jupiter.position.z = 80;
jupiter.position.setX(0);


// Neptune
const neptuneTexture = new THREE.TextureLoader().load('imgs/neptune.jpeg')

const neptune = new THREE.Mesh(
  new THREE.SphereGeometry(3, 32, 32),
  new THREE.MeshStandardMaterial( {
    map: neptuneTexture,
  })
)
scene.add(neptune)

neptune.position.z = 100;
neptune.position.setX(0);


// Light Source
const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(5,5,5)

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight, ambientLight)

const controls = new OrbitControls(camera, renderer.domElement);

// Stars
function addStar() {
  const geometry = new THREE.SphereGeometry(0.25);
  const material = new THREE.MeshStandardMaterial( { color: 0xffffff })
  const star = new THREE.Mesh( geometry , material );

  const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread( 200));

  star.position.set(x, y, z);
  scene.add(star)
}

Array(500).fill().forEach(addStar)

const spaceTexture = new THREE.TextureLoader().load('imgs/space.jpg');
scene.background = spaceTexture;


// Make the planets rotate
function animate() {
  requestAnimationFrame(animate);

  sun.rotation.x += 0.001;
  sun.rotation.y +=0.0005;
  sun.rotation.z += 0.001;

  earth.rotation.x += 0.001;
  earth.rotation.y +=0.0005;
  earth.rotation.z += 0.001;

  jupiter.rotation.x += 0.001;
  jupiter.rotation.y +=0.0005;
  jupiter.rotation.z += 0.001;

  mercury.rotation.x += 0.001;
  mercury.rotation.y +=0.0005;
  mercury.rotation.z += 0.001;

  mars.rotation.x += 0.001;
  mars.rotation.y +=0.0005;
  mars.rotation.z += 0.001;

  neptune.rotation.x += 0.001;
  neptune.rotation.y +=0.0005;
  neptune.rotation.z += 0.001;

  controls.update();

  renderer.render(scene, camera);
}

// Scroll Animation
function moveCamera() {
  const t = document.body.getBoundingClientRect().top;
  if (t < -4){
    camera.position.z = t * -0.01;
  }
}

document.body.onscroll = moveCamera;


animate();