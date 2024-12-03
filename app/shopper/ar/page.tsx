'use client'

import AcmeLogo from "@/app/ui/acme-logo";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { lusitana } from "@/app/ui/fonts";
import Image from "next/image";
import { useEffect } from 'react'
import * as THREE from 'three';

import { ARButton } from 'three/examples/jsm/webxr/ARButton.js';
import { BufferGeometryUtils  } from 'three/examples/jsm/utils/BufferGeometryUtils.js';


export default function Page() {
  let container, labelContainer: any;
let camera: any, scene: any, renderer: any, light: any;
let controller;

let hitTestSource: any = null;
let hitTestSourceRequested = false;

let measurements: any = [];
let labels: any = [];

let reticle: any;
let currentLine: any = null;

let width: any, height: any;

function toScreenPosition(point: any, camera: any)
{
  var vector = new THREE.Vector3();
  
  vector.copy(point);
  vector.project(camera);
  
  vector.x = (vector.x + 1) * width /2;
  vector.y = (-vector.y + 1) * height/2;
  vector.z = 0;

  return vector

};

function getCenterPoint(points: any) {
  let line:any = new THREE.Line3(...points)
  return line.getCenter();
}

function matrixToVector(matrix: any) {
  let vector = new THREE.Vector3();
  vector.setFromMatrixPosition(matrix);
  return vector;
}

function initLine(point: any) {
  let lineMaterial = new THREE.LineBasicMaterial({
    color: 0xffffff,
    linewidth: 5,
    linecap: 'round'
  });

  let lineGeometry = new THREE.BufferGeometry().setFromPoints([point, point]);
  return new THREE.Line(lineGeometry, lineMaterial);
}

function updateLine(matrix: any) {
  let positions = currentLine.geometry.attributes.position.array;
  positions[3] = matrix.elements[12]
  positions[4] = matrix.elements[13]
  positions[5] = matrix.elements[14]
  currentLine.geometry.attributes.position.needsUpdate = true;
  currentLine.geometry.computeBoundingSphere();
}

function initReticle() {
  let ring = new THREE.RingBufferGeometry(0.045, 0.05, 32).rotateX(- Math.PI / 2);
  let dot = new THREE.CircleBufferGeometry(0.005, 32).rotateX(- Math.PI / 2);
  reticle = new THREE.Mesh(
    BufferGeometryUtils.mergeBufferGeometries([ring, dot]),
    new THREE.MeshBasicMaterial()
  );
  reticle.matrixAutoUpdate = false;
  reticle.visible = false;
}

function initRenderer() {
  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.xr.enabled = true;
}

function initLabelContainer() {
  labelContainer = document.createElement('div');
  labelContainer.style.position = 'absolute';
  labelContainer.style.top = '0px';
  labelContainer.style.pointerEvents = 'none';
  labelContainer.setAttribute('id', 'container');
}

function initCamera() {
  camera = new THREE.PerspectiveCamera(70, width / height, 0.01, 20);
}

function initLight() {
  light = new THREE.HemisphereLight(0xffffff, 0xbbbbff, 1);
  light.position.set(0.5, 1, 0.25);
}

function initScene() {
  scene = new THREE.Scene();
}

function getDistance(points: any) {
  if (points.length == 2)
    return points[0].distanceTo(points[1]);
}

function initXR() {
  container = document.createElement('div');
  document.body.appendChild(container);

  width = window.innerWidth;
  height = window.innerHeight;

  initScene();

  initCamera();

  initLight();
  scene.add(light);

  initRenderer()
  container.appendChild(renderer.domElement);

  initLabelContainer()
  container.appendChild(labelContainer);

  document.body.appendChild(ARButton.createButton(renderer, {
    optionalFeatures: ["dom-overlay"],
    domOverlay: {root: document.querySelector('#container')}, 
    requiredFeatures: ['hit-test']
  }));

  controller = renderer.xr.getController(0);
  controller.addEventListener('select', onSelect);
  scene.add(controller);

  initReticle();
  scene.add(reticle);

  window.addEventListener('resize', onWindowResize, false);
  animate()
}

function onSelect() {
  if (reticle.visible) {
    measurements.push(matrixToVector(reticle.matrix));
    if (measurements.length == 2) {
      let distance = Math.round(getDistance(measurements) * 100);

      let text = document.createElement('div');
      text.className = 'label';
      text.style.color = 'rgb(255,255,255)';
      text.textContent = distance + ' cm';
      document.querySelector('#container')!.appendChild(text);

      labels.push({div: text, point: getCenterPoint(measurements)});

      measurements = [];
      currentLine = null;
    } else {
      currentLine = initLine(measurements[0]);
      scene.add(currentLine);
    }
  }
}

function onWindowResize() {
  width = window.innerWidth;
  height = window.innerHeight;
  camera.aspect = width/height;
  camera.updateProjectionMatrix();
  renderer.setSize(width, height);
}

function animate() {
  renderer.setAnimationLoop(render);
}

function render(timestamp: any, frame: any) {
  if (frame) {
    let referenceSpace: any = renderer.xr.getReferenceSpace();
    let session = renderer.xr.getSession();
    if (hitTestSourceRequested === false) {
      session.requestReferenceSpace('viewer').then(function (referenceSpace: any) {
        session.requestHitTestSource({ space: referenceSpace }).then(function (source: any) {
          hitTestSource = source;
        });
      });
      session.addEventListener('end', function () {
        hitTestSourceRequested = false;
        hitTestSource = null;
      });
      hitTestSourceRequested = true;
    }

    if (hitTestSource) {
      let hitTestResults = frame.getHitTestResults(hitTestSource);
      if (hitTestResults.length) {
        let hit = hitTestResults[0];
        reticle.visible = true;
        reticle.matrix.fromArray(hit.getPose(referenceSpace).transform.matrix);
      } else {
        reticle.visible = false;
      }

      if (currentLine) {
        updateLine(reticle.matrix);
      }
    }

    labels.map((label: { point: any; div: { style: { transform: string; }; }; }) => {
      let pos = toScreenPosition(label.point, renderer.xr.getCamera(camera));
      let x = pos.x;
      let y = pos.y;
      label.div.style.transform = "translate(-50%, -50%) translate(" + x + "px," + y + "px)";
    })

  }
  renderer.render(scene, camera);
}

  useEffect(() => {
    initXR();
  }, []);

  return (
    <></>
  )
}
