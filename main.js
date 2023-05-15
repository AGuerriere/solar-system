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
camera.position.setZ(30);

renderer.render(scene, camera);

const geometry = new THREE.TorusGeometry(10,3,16,100)
const material = new THREE.MeshStandardMaterial( {color: 0xFF6347} );
const torus = new THREE.Mesh(geometry, material); 

// Sun
const sunTexture = new THREE.TextureLoader().load('imgs/sun.jpg')

const sun = new THREE.Mesh(
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

const lighterHelper = new THREE.PointLightHelper(pointLight)
const gridHelper = new THREE.GridHelper(200, 50);
scene.add(lighterHelper, gridHelper)

const controls = new OrbitControls(camera, renderer.domElement);

// Stars
function addStar() {
  const geometry = new THREE.SphereGeometry(0.25);
  const material = new THREE.MeshStandardMaterial( { color: 0xffffff })
  const star = new THREE.Mesh( geometry , material );

  const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread( 100));

  star.position.set(x, y, z);
  scene.add(star)
}

Array(400).fill().forEach(addStar)

const spaceTexture = new THREE.TextureLoader().load('imgs/space.jpg');
scene.background = spaceTexture;


function animate() {
  requestAnimationFrame(animate);

  sun.rotation.x += 0.001;
  sun.rotation.y +=0.0005;
  sun.rotation.z += 0.001;

  controls.update();

  renderer.render(scene, camera);
}


// Scroll Animation

function moveCamera() {
  const t = document.body.getBoundingClientRect().top;
  sun.rotation.x += 0.05;
  sun.rotation.y += 0.075;
  sun.rotation.z += 0.05;

  camera.position.z = t * 0.001;
  // camera.position.x = t * -0.0002;
  // camera.rotation.y = t * -0.0002;
}

document.body.onscroll = moveCamera;
moveCamera();

animate();