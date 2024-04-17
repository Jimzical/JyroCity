import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.118/build/three.module.js';

import { OrbitControls } from 'https://cdn.jsdelivr.net/npm/three@0.118/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'https://cdn.jsdelivr.net/npm/three@0.118/examples/jsm/loaders/GLTFLoader.js';


class BasicWorldDemo {
  constructor() {
    this._Initialize();
  }

  _Initialize() {
    this._threejs = new THREE.WebGLRenderer({
      antialias: true,
    });
    this._threejs.shadowMap.enabled = true;
    this._threejs.shadowMap.type = THREE.PCFSoftShadowMap;
    this._threejs.setPixelRatio(window.devicePixelRatio);
    this._threejs.setSize(window.innerWidth, window.innerHeight);

    document.body.appendChild(this._threejs.domElement);

    window.addEventListener('resize', () => {
      this._OnWindowResize();
    }, false);

    const fov = 60;
    const aspect = 1920 / 1080;
    const near = 1.0;
    const far = 1000.0;
    this._camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    this._camera.position.set(75, 20, 0);

    this._scene = new THREE.Scene();

    let light = new THREE.DirectionalLight(0xFFFFFF, 1.0);
    light.position.set(20, 100, 10);
    light.target.position.set(0, 0, 0);
    light.castShadow = true;
    light.shadow.bias = -0.001;
    light.shadow.mapSize.width = 2048;
    light.shadow.mapSize.height = 2048;
    light.shadow.camera.near = 0.1;
    light.shadow.camera.far = 500.0;
    light.shadow.camera.near = 0.5;
    light.shadow.camera.far = 500.0;
    light.shadow.camera.left = 100;
    light.shadow.camera.right = -100;
    light.shadow.camera.top = 100;
    light.shadow.camera.bottom = -100;
    this._scene.add(light);

    light = new THREE.AmbientLight(0x101010);
    this._scene.add(light);

    // const controls = new OrbitControls(
    //   this._camera, this._threejs.domElement);
    // controls.target.set(0, 20, 0);
    // controls.update();

    // const loader = new THREE.CubeTextureLoader();
    // const texture = loader.load([
    //   './resources/posx.jpg',
    //   './resources/negx.jpg',
    //   './resources/posy.jpg',
    //   './resources/negy.jpg',
    //   './resources/posz.jpg',
    //   './resources/negz.jpg',
    // ]);
    // this._scene.background = texture;

    const plane = new THREE.Mesh(
      new THREE.PlaneGeometry(500, 500, 10, 10),
      new THREE.MeshStandardMaterial({
        color: 0xFFFFFF,
      }));
    plane.castShadow = false;
    plane.receiveShadow = true;
    plane.rotation.x = -Math.PI / 2;
    this._scene.add(plane);

    const box = new THREE.Mesh(
      new THREE.BoxGeometry(2, 2, 2),
      new THREE.MeshStandardMaterial({
        color: 0xFFFFFF,
      }));
    box.position.set(0, 1, 0);
    box.castShadow = true;
    box.receiveShadow = true;
    this._scene.add(box);

      
    this._LoadModel();
    this._RAF();
  }

_LoadModel() {
  const loader = new GLTFLoader();
  loader.load('models/scene.gltf', (gltf) => {
    gltf.scene.traverse(c => {
      c.castShadow = true;
    });

    gltf.scene.scale.set(15, 15, 15);

    this._scene.add(gltf.scene);
  }, undefined, function ( error ) {
    console.error( error );
  });
}
  _OnWindowResize() {
    this._camera.aspect = window.innerWidth / window.innerHeight;
    this._camera.updateProjectionMatrix();
    this._threejs.setSize(window.innerWidth, window.innerHeight);
  }

  _RAF() {
    requestAnimationFrame(() => {
      this._camera.rotation.z = 10 * 0.005;
      this._threejs.render(this._scene, this._camera);
      this._RAF();
    });
  }
}



window.addEventListener('DOMContentLoaded', () => {
  _APP = new BasicWorldDemo();
});
