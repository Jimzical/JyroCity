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
camera.position.set(15, 100, 100);

// Create a renderer and enable shadows
var renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true; // Enable shadows in the renderer
document.body.appendChild(renderer.domElement);

// Handle window resize
window.addEventListener('resize', function() {
  // Update camera
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(window.innerWidth, window.innerHeight);
}, false);

const spotlight = new THREE.SpotLight(0xffffff, 3);
spotlight.position.set(55, 500, 200);
spotlight.castShadow = true;
scene.add(spotlight);

// make the background color light blue
scene.background = new THREE.Color(0x87ceeb);

// Create a plane
const planeGeometry = new THREE.PlaneGeometry(500, 500, 10, 10);
const planeMaterial = new THREE.MeshStandardMaterial({ color: 0xFFFFFF });
const plane = new THREE.Mesh(planeGeometry, planeMaterial);
plane.rotation.x = -Math.PI / 2;
plane.castShadow = true;
plane.receiveShadow = true;
scene.add(plane);

// Create buildings
for (let i = 0; i < 50; i++) {
  // Generate a random height, width, and depth for each building
  let height = Math.random() * 50 + 100;
  let width = Math.random() * 20 + 10;
  let depth = Math.random() * 20 + 10;

  // Create a box geometry for the building
  let buildingGeometry = new THREE.BoxGeometry(width, height, depth);

  // Generate a random color for each building
  let buildingColor = new THREE.Color(0xffffff);
  buildingColor.setHex(Math.random() * 0xffffff);

  // Use the random color for the building material
  let buildingMaterial = new THREE.MeshStandardMaterial({ color: buildingColor });

  // Create the building and set its position
  let building = new THREE.Mesh(buildingGeometry, buildingMaterial);
  building.position.set(Math.random() * 500 - 250, height / 2, Math.random() * 500 - 250);
  building.castShadow = true; // Enable shadows for the building
  building.receiveShadow = true; // Enable shadows for the building

  // Add the building to the scene
  scene.add(building);
}

// Animation loop
function animate() {
  requestAnimationFrame(animate);

  camera.rotation.y += alpha * 0.0001;
  camera.rotation.x = beta * 0.05;
  camera.rotation.z = gamma * -0.01;

  if (buttonPressed) {
    // make the camera move in the direction it is facing
    camera.translateZ(-0.2);
  }
  else{
    camera.translateZ(0);
  }

  // Render the scene
  renderer.render(scene, camera);
}

animate();