import * as THREE from "https://cdn.skypack.dev/three@0.129.0/build/three.module.js";
import { GLTFLoader } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/loaders/GLTFLoader.js";




// Declare orientation data variables
let alpha = 0;
let beta = 0;
let gamma = 0;
let buttonPressed = false;

window.onload = function() {
  fetch('/domain')
    .then(response => response.text())
    .then(domain => {
      console.log(domain); // Log the domain

      const ws = new WebSocket(`wss://${domain}`);

      // Handle incoming messages
      ws.onmessage = (event) => {
        const data = JSON.parse(event.data);

        if (data.buttonPressed) {
          alpha = data.orientationData.alpha;
          beta = data.orientationData.beta;
          gamma = data.orientationData.gamma;
          buttonPressed = data.buttonPressed;

          // console.log(alpha, beta, gamma);
        }
      };
    });
};

// Create a scene
var scene = new THREE.Scene();

// Create a camera
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(-500, 100, 270);
camera.rotation.set(0, -120, 0);  

// Create a renderer and enable shadows
var renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true; // Enable shadows in the renderer
document.body.appendChild(renderer.domElement);

// // -----------------------------------------------------
// // TEMP
// import { OrbitControls } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/controls/OrbitControls.js";
// // Create OrbitControls
// var controls = new OrbitControls(camera, renderer.domElement);
// controls.enableDamping = true; // optional, for smoother rotation
// controls.dampingFactor = 0.25; // optional, damping factor for rotation
// // -----------------------------------------------------

// Create a CubeTextureLoader
let sky_loader = new THREE.CubeTextureLoader();
let textureCube = sky_loader.load([
  'skybox/posx.jpg',
  'skybox/negx.jpg',
  'skybox/posy.jpg',
  'skybox/negy.jpg',
  'skybox/posz.jpg',
  'skybox/negz.jpg'
]);

// Set the scene's background to the loaded texture
scene.background = textureCube;


// Handle window resize
window.addEventListener('resize', function() {
  // Update camera
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(window.innerWidth, window.innerHeight);
}, false);

const ambientLight = new THREE.AmbientLight(0xffffff, 1); // soft white light
scene.add(ambientLight);

// Create a plane
const planeGeometry = new THREE.PlaneGeometry(1500, 1500, 10, 10);
const planeMaterial = new THREE.MeshStandardMaterial({ color: '#02c436' });
const plane = new THREE.Mesh(planeGeometry, planeMaterial);
plane.rotation.x = -Math.PI / 2;
plane.castShadow = true;
plane.receiveShadow = true;
scene.add(plane);

// Load the font
var loader = new THREE.FontLoader();
loader.load('https://threejs.org/examples/fonts/helvetiker_regular.typeface.json', function(font) {
  // Create the text material
  var textMaterial = new THREE.MeshStandardMaterial({ color: 0x000000 });

  // Directions and their positions
  var directions = {
    'N': new THREE.Vector3(0, 0, -750),
    'S': new THREE.Vector3(0, 0, 750),
    'E': new THREE.Vector3(750, 0, 0),
    'W': new THREE.Vector3(-750, 0, 0)
  };

  for (var dir in directions) {
    var textGeometry = new THREE.TextGeometry(dir, {
      font: font,
      size: 80,
      height: 5,
      curveSegments: 12,
      bevelEnabled: true,
      bevelThickness: 10,
      bevelSize: 8,
      bevelOffset: 0,
      bevelSegments: 5
    });

    var text = new THREE.Mesh(textGeometry, textMaterial);
    text.position.copy(directions[dir]);
    text.position.y += 300; // placeing the text above the plane
    text.lookAt(new THREE.Vector3(0, 0, 0));
    scene.add(text);
  }
});

// Create a GLTF loader
let model_loader = new GLTFLoader();

model_loader.load(
  'models/imaginary_city_i/scene.gltf',
  // Called when the model has finished loading
  function (gltf) {
    // Scale the model
    let scale = 10
    gltf.scene.scale.set(scale, scale, scale); // Scale up by 2

    // Add the model to the scene
    scene.add(gltf.scene);
  },
  // Called while loading is progressing
  function (xhr) {
    console.log((xhr.loaded / xhr.total * 100) + '% loaded');
  },
  // Called when loading has errors
  function (error) {
    console.log('An error happened', error);
  }
);



// Log rotation data
function logRotation() {
  console.log(
    camera.rotation.x.toFixed(2),
    camera.rotation.y.toFixed(2),
    camera.rotation.z.toFixed(2)
  );
}

// Log the orientation data
function logOrientation() {
  console.log(
    alpha.toFixed(2),
    beta.toFixed(2),
    gamma.toFixed(2)
  );  
}

// Animation loop
function animate() {
  requestAnimationFrame(animate);

  // Convert degrees to radians
  var alphaRad = alpha * (Math.PI / 180);
  var betaRad = beta * (Math.PI / 180) * 0.01;
  var gammaRad = gamma * (Math.PI / 180) * 0.01;

  // Create a quaternion for the alpha rotation
  var alphaQuaternion = new THREE.Quaternion();
  alphaQuaternion.setFromAxisAngle(new THREE.Vector3(0, 1, 0), alphaRad * 0.01);

  // Create a quaternion for the beta and gamma rotations
  var betaGammaQuaternion = new THREE.Quaternion();
  betaGammaQuaternion.setFromEuler(new THREE.Euler(betaRad, 0, -gammaRad, 'YXZ'));

  // Apply the quaternions to the camera
  camera.quaternion.multiplyQuaternions(camera.quaternion, betaGammaQuaternion);
  camera.quaternion.multiplyQuaternions(camera.quaternion, alphaQuaternion);

  if (buttonPressed) {
    // make the camera move in the direction it is facing
    camera.translateZ(-0.2);
  }
  else {
    camera.translateZ(0);
  }

  // TEMP --------------------------------------
  // controls.update(); // required if controls.enableDamping or controls.autoRotate are set to true
  // -------------------------------------------

  renderer.render(scene, camera);

  // logRotation();

}


animate();