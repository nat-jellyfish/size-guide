// app/page.tsx
"use client";

import React, { useEffect, useRef, useState } from "react";
import { Matrix4 } from "three";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

declare global {
  interface Window {
    arToolkitContext: any;
  }
}

const ARMeasure: React.FC = () => {
  const [cameraInitialized, setCameraInitialized] = useState(false);
  const sceneRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window !== "undefined" && window.THREE && window.THREEx) {
      THREEx.ArToolkitContext.baseURL = "../";
      // init renderer
      var renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
      });
      renderer.setClearColor(new THREE.Color("lightgrey"), 0);
      renderer.setSize(640, 480);
      renderer.domElement.style.position = "relative";
      renderer.domElement.style.top = "0px";
      renderer.domElement.style.left = "0px";
      document.body.appendChild(renderer.domElement);

      // array of functions for the rendering loop
      var onRenderFcts: any = [];
      var arToolkitContext: {
          arController: {
            canvas: any;
            orientation: string | null;
            options: { orientation: string | null };
          } | null;
          init: (arg0: () => void) => void;
          getProjectionMatrix: () => Matrix4;
          update: (arg0: any) => void;
        },
        markerControls;
      // init scene and camera
      var scene = new THREE.Scene();

      //////////////////////////////////////////////////////////////////////////////////
      //		Initialize a basic camera
      //////////////////////////////////////////////////////////////////////////////////

      // Create a camera
      var camera = new THREE.Camera();
      scene.add(camera);
      var markerRoot1 = new THREE.Group();
      markerRoot1.name = "marker1";
      scene.add(markerRoot1);
      var markerRoot2 = new THREE.Group();
      markerRoot2.name = "marker2";
      scene.add(markerRoot2);

      ////////////////////////////////////////////////////////////////////////////////
      //          handle arToolkitSource
      ////////////////////////////////////////////////////////////////////////////////

      var arToolkitSource = new THREEx.ArToolkitSource({
        // to read from the webcam
        sourceType: "webcam",

        // to read from an image
        // sourceType : 'image',
        // sourceUrl : THREEx.ArToolkitContext.baseURL + '../data/images/img.jpg',

        // to read from a video
        // sourceType : 'video',
        // sourceUrl : THREEx.ArToolkitContext.baseURL + '../data/videos/headtracking.mp4',
      });

      arToolkitSource.init(function onReady() {
        initARContext();
        onResize();
      });

      // handle resize
      window.addEventListener("resize", function () {
        onResize();
      });
      function onResize() {
        arToolkitSource.onResizeElement();
        arToolkitSource.copyElementSizeTo(renderer.domElement);
        if (arToolkitContext.arController !== null) {
          arToolkitSource.copyElementSizeTo(
            arToolkitContext.arController.canvas
          );
        }
      }
      ////////////////////////////////////////////////////////////////////////////////
      //          initialize arToolkitContext
      ////////////////////////////////////////////////////////////////////////////////
      function initARContext() {
        console.log("initARContext()");
        // create atToolkitContext
        arToolkitContext = new THREEx.ArToolkitContext({
          cameraParametersUrl:
            THREEx.ArToolkitContext.baseURL + "/camera_para.dat",
          detectionMode: "mono",
        });
        // initialize it
        arToolkitContext.init(function onCompleted() {
          // copy projection matrix to camera
          camera.projectionMatrix.copy(arToolkitContext.getProjectionMatrix());

          if (arToolkitContext.arController !== null) {
            arToolkitContext.arController.orientation = getSourceOrientation();
            arToolkitContext.arController.options.orientation =
              getSourceOrientation();

            console.log("arToolkitContext", arToolkitContext);

            window.arToolkitContext = arToolkitContext;
          }
        });
        // build markerControls for markerRoot1
        markerControls = new THREEx.ArMarkerControls(
          arToolkitContext,
          markerRoot1,
          {
            type: "pattern",
            patternUrl: THREEx.ArToolkitContext.baseURL + "/patt.kanji",
            // patternUrl : THREEx.ArToolkitContext.baseURL + '../data/data/patt.kanji',
          }
        );
        // build markerControls for markerRoot2
        markerControls = new THREEx.ArMarkerControls(
          arToolkitContext,
          markerRoot2,
          {
            type: "pattern",
            // patternUrl : THREEx.ArToolkitContext.baseURL + '../data/data/patt.hiro',
            patternUrl: THREEx.ArToolkitContext.baseURL + "/patt.hiro",
          }
        );
      }

      function getSourceOrientation() {
        if (!arToolkitSource) {
          return null;
        }

        console.log(
          "actual source dimensions",
          arToolkitSource.domElement.videoWidth,
          arToolkitSource.domElement.videoHeight
        );

        if (
          arToolkitSource.domElement.videoWidth >
          arToolkitSource.domElement.videoHeight
        ) {
          console.log("source orientation", "landscape");
          return "landscape";
        } else {
          console.log("source orientation", "portrait");
          return "portrait";
        }
      }

      // update artoolkit on every frame
      onRenderFcts.push(function () {
        if (!arToolkitContext || !arToolkitSource || !arToolkitSource.ready) {
          return;
        }

        arToolkitContext.update(arToolkitSource.domElement);
      });
      (function () {
        //////////////////////////////////////////////////////////////////////////////
        //		markerRoot1
        //////////////////////////////////////////////////////////////////////////////

        // build markerControls

        // add a gizmo in the center of the marker
        var geometry = new THREE.OctahedronGeometry(0.1, 0);
        var material = new THREE.MeshNormalMaterial({
          wireframe: true,
        });
        var mesh = new THREE.Mesh(geometry, material);
        markerRoot1.add(mesh);

        //////////////////////////////////////////////////////////////////////////////
        //		markerRoot2
        //////////////////////////////////////////////////////////////////////////////

        // add a gizmo in the center of the marker
        var geometry = new THREE.OctahedronGeometry(0.1, 0);
        var material = new THREE.MeshNormalMaterial({
          wireframe: true,
        });
        var mesh = new THREE.Mesh(geometry, material);
        markerRoot2.add(mesh);
      })();
      (function () {
        var markerRoot1 = scene.getObjectByName("marker1");
        var markerRoot2 = scene.getObjectByName("marker2");

        var container = new THREE.Group();
        scene.add(container);

        // update container.visible and scanningSpinner visibility
        onRenderFcts.push(function () {
          if (markerRoot1 != undefined && markerRoot2 != undefined) {
            if (markerRoot1.visible === true && markerRoot2.visible === true) {
              container.visible = true;
              document.querySelector(".scanningSpinner").style.display = "none";
            } else {
              container.visible = false;
              document.querySelector(".scanningSpinner").style.display = "";
            }
          }
        });

        //////////////////////////////////////////////////////////////////////////////
        //		build lineMesh
        //////////////////////////////////////////////////////////////////////////////
        var material = new THREE.LineDashedMaterial({
          dashSize: 1,
          gapSize: 1,
        });
        var geometry: any = new THREE.BufferGeometry();
        var vertices: any = new Float32Array([1.0, 0.0, -3.0, -1.0, 0.0, -3.0]);
        const positionNumComponents = 3;
        geometry.setAttribute(
          "position",
          new THREE.BufferAttribute(
            new Float32Array(vertices),
            positionNumComponents
          )
        );
        var lineMesh = new THREE.Line(geometry, material);
        container.add(lineMesh);

        // update lineMesh
        onRenderFcts.push(function () {
          if (markerRoot1 != undefined && markerRoot2 != undefined) {
            var geometry = lineMesh.geometry;
            vertices = [
              markerRoot1.position.x,
              markerRoot1.position.y,
              markerRoot1.position.z,
              markerRoot2.position.x,
              markerRoot2.position.y,
              markerRoot2.position.z,
            ];
            geometry.setAttribute(
              "position",
              new THREE.Float32BufferAttribute(vertices, 3)
            );
            geometry.verticesNeedUpdate = true;

            geometry.computeBoundingSphere();
            lineMesh.computeLineDistances();

            var length = markerRoot1.position.distanceTo(markerRoot2.position);
            lineMesh.material.scale = length * 10;
            lineMesh.material.needsUpdate = true;
          }
        });

        //////////////////////////////////////////////////////////////////////////////
        //		display the distance between the 2 markers
        //////////////////////////////////////////////////////////////////////////////

        // build texture
        var canvas: any = document.createElement("canvas");
        canvas.width = 128;
        canvas.height = 64;
        var context = canvas.getContext("2d");
        var texture = new THREE.CanvasTexture(canvas);

        // build sprite
        var material2: any = new THREE.SpriteMaterial({
          map: texture,
          color: 0xffffff,
        });
        var sprite: any = new THREE.Sprite(material2);
        sprite.scale.multiplyScalar(0.5);
        container.add(sprite);

        // upload measure
        onRenderFcts.push(function () {
          if (markerRoot1 != undefined && markerRoot2 != undefined) {
            // update sprite position
            sprite.position
              .addVectors(markerRoot1.position, markerRoot2.position)
              .multiplyScalar(1 / 2);

            // get the text to display
            var length = markerRoot1.position.distanceTo(markerRoot2.position);
            var text = length.toFixed(2);

            // put the text in the sprite
            context.font = "40px monospace";
            context.clearRect(0, 0, canvas.width, canvas.height);
            context.fillStyle = "#fff";
            context.fillText(text, canvas.width / 4, (3 * canvas.height) / 4);
            sprite.material.map.needsUpdate = true;
          }
        });
      })();
      //////////////////////////////////////////////////////////////////////////////////
      //		render the whole thing on the page
      //////////////////////////////////////////////////////////////////////////////////

      // render the scene
      onRenderFcts.push(function () {
        renderer.render(scene, camera);
      });

      // run the rendering loop
      var lastTimeMsec: number | null = null;
      requestAnimationFrame(function animate(nowMsec) {
        // keep looping
        requestAnimationFrame(animate);
        // measure time
        lastTimeMsec = lastTimeMsec || nowMsec - 1000 / 60;
        var deltaMsec = Math.min(200, nowMsec - lastTimeMsec);
        lastTimeMsec = nowMsec;
        // call each update function
        onRenderFcts.forEach(function (
          onRenderFct: (arg0: number, arg1: number) => void
        ) {
          onRenderFct(deltaMsec / 1000, nowMsec / 1000);
        });
      });
    }
  }, []);

  return (
    <div>
    <div className="scanningSpinner">
      <label>Scanning</label>
      <div className="rect1"></div>
      <div className="rect2"></div>
      <div className="rect3"></div>
    </div>
    <Link
            href="/shopper"
            className="flex items-center gap-5 self-start rounded-lg bg-pink-400 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-pink-500 md:text-base"
          >
            <span>Finish</span> <ArrowRightIcon className="w-5 md:w-6" />
          </Link>
    </div>
  );
};

export default ARMeasure;
