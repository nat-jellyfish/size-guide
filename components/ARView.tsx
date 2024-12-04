// components/ARView.tsx

'use client'

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

const ARView: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [distance, setDistance] = useState<number | null>(null);

  useEffect(() => {
    if (typeof self !== 'undefined') {
        if (canvasRef.current) {
            initAR();
          }
      }
    
  }, []);

  const initAR = () => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera();
    let renderer: any;
    if(canvasRef.current !== null)
     renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current });

    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    const marker1 = new THREE.Group();
    const marker2 = new THREE.Group();

    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    const cube1 = new THREE.Mesh(geometry, material);
    const cube2 = new THREE.Mesh(geometry, material);

    marker1.add(cube1);
    marker2.add(cube2);

    // scene.add(marker1);
    // scene.add(marker2);

    // Set positions of the two markers
    marker1.position.set(0, 0, -5); // Example position for marker1
    marker2.position.set(3, 0, -5); // Example position for marker2

    // Function to calculate the distance between two points
    const calculateDistance = () => {
      const pos1 = marker1.position;
      const pos2 = marker2.position;
      const dist = pos1.distanceTo(pos2);
      setDistance(dist);
    };

    calculateDistance();

    // Update and render function
    const animate = () => {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
    };

    animate();
  };

  return (
    <div>
      <canvas ref={canvasRef} />
      {/* <div>
        <h2>Measured Distance: {distance ? `${distance.toFixed(2)} meters` : 'Calculating...'}</h2>
      </div> */}
    </div>
  );
};

export default ARView;
