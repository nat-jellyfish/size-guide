// app/page.tsx
'use client'

import React, { useEffect, useRef, useState } from "react";

const ARMeasure: React.FC = () => {
  const [cameraInitialized, setCameraInitialized] = useState(false);
  const sceneRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window !== "undefined" && window.THREE && window.THREEx) {
      // Create a Three.js scene, camera, and renderer
      const scene = new window.THREE.Scene();
      const camera = new window.THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
      );
      const renderer = new window.THREE.WebGLRenderer({ alpha: true });
      renderer.setSize(window.innerWidth, window.innerHeight);
      sceneRef.current?.appendChild(renderer.domElement);

      // Set up AR.js for webcam input
      const arToolkitSource = new window.THREEx.ArToolkitSource({
        sourceType: "webcam",
      });

      arToolkitSource.init(() => {
        setCameraInitialized(true);
      });

      const arToolkitContext = new window.THREEx.ArToolkitContext({
        cameraParametersUrl:
          "https://cdn.jsdelivr.net/gh/jeromeetienne/AR.js/three.js/data/camera_para.dat",
        detectionMode: "mono",
      });

      arToolkitContext.init();

      // Set up a marker (example: Hiro marker)
      const markerGroup = new window.THREE.Group();
      scene.add(markerGroup);

      const markerControls = new window.THREEx.ArMarkerControls(arToolkitContext, markerGroup, {
        type: "pattern",
        patternUrl:
          "https://cdn.jsdelivr.net/gh/jeromeetienne/AR.js/data/patterns/hiro.patt",
      });

      // Create a simple 3D object to appear on the marker
      const geometry = new window.THREE.BoxGeometry(1, 1, 1);
      const material = new window.THREE.MeshBasicMaterial({ color: 0xff0000 });
      const cube = new window.THREE.Mesh(geometry, material);
      markerGroup.add(cube);

      // Animation loop
      const animate = () => {
        requestAnimationFrame(animate);
        if (arToolkitSource.ready) {
          arToolkitContext.update(arToolkitSource.domElement);
        }
        renderer.render(scene, camera);
      };

      animate();

      // Resize the renderer when the window is resized
      window.addEventListener("resize", () => {
        const width = window.innerWidth;
        const height = window.innerHeight;
        renderer.setSize(width, height);
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
      });

      return () => {
        // Cleanup on component unmount
        window.removeEventListener("resize", () => {});
      };
    }
  }, []);

  return (
    <div>
      <div
        ref={sceneRef}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100vh",
          backgroundColor: "black",
        }}
      >
        {!cameraInitialized && <div>Loading Camera...</div>}
      </div>
    </div>
  );
};

export default ARMeasure;
