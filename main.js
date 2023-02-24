import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { gsap } from "gsap";

gsap.from("h1", { duration: 5, opacity: 0 });
gsap.from("p", { duration: 9, opacity: 0 });

let clock = new THREE.Clock();
let delta = 0;

//camera
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  1,
  1000
);
camera.position.z = 190;

//scene
const scene = new THREE.Scene();
// scene.background = new THREE.Color(0xffffff);
scene.fog = new THREE.Fog(0xc0f0ff, 0.0015);

//renderer

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight * 2);
document.body.appendChild(renderer.domElement);

//light

const light = new THREE.HemisphereLight(0xd6e6ff, 0xa38c08, 1);
scene.add(light);

//orbit controls
// const controls = new OrbitControls(camera, renderer.domElement);

//smoke texture
const smokeTexture = new THREE.TextureLoader().load("./Smoke15Frames.png");
smokeTexture.encoding = THREE.sRGBEncoding;
const smokeGeometry = new THREE.PlaneGeometry(300, 300);

//LambertMaterial

const smokeMaterial = new THREE.MeshLambertMaterial({
  // color: 0x000000,
  map: smokeTexture,
  emissive: 0x222222,
  opacity: 0.15,
  transparent: true,
});

let smokeParticles = [];

for (let i = 0; i < 100; i++) {
  let smokeElement = new THREE.Mesh(smokeGeometry, smokeMaterial);

  smokeElement.scale.set(2, 2, 2);

  smokeElement.position.set(
    Math.random() * 1000 - 500,
    Math.random() * 1000 - 500,
    Math.random() * 1000 - 100
  );

  smokeElement.rotation.z = Math.random() * 360;

  scene.add(smokeElement);
  smokeParticles.push(smokeElement);
}

window.addEventListener("resize", onWindowResize);

animate();

function animate() {
  requestAnimationFrame(animate);

  delta = clock.getDelta();

  for (let i = 0; i < smokeParticles.length; i++) {
    smokeParticles[i].rotation.z += delta * 0.12;
  }

  renderer.render(scene, camera);
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;

  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);
}
