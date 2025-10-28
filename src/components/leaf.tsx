"use client";
import * as THREE from "three";
import { useEffect } from "react";

export const Leaf = () => {
  useEffect(() => {
    const container = document.getElementById("object");
    if (!container) return;

    const w = window.innerWidth;
    const h = window.innerHeight;

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(75, w / h, 0.1, 1000);
    camera.position.z = 7;
    scene.add(camera);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(w, h);

    renderer.setClearColor(0x000000, 0);

    container.appendChild(renderer.domElement);

    scene.add(new THREE.AmbientLight(0xffffff, 1));
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 10, 7.5);
    scene.add(directionalLight);

    type Leaf = THREE.Mesh<THREE.PlaneGeometry, THREE.MeshPhongMaterial> & {
      speed: number;
      swayAmplitude: number;
      swayFrequency: number;
      swayPhase: number;
    };

    let leaves: Leaf[] = [];

    const leavesLoader = new THREE.TextureLoader();
    leavesLoader.crossOrigin = "";

    leavesLoader.load("/leave.png", (texture) => {
      const leave = new THREE.PlaneGeometry(13, 13);
      const leaveMaterial = new THREE.MeshPhongMaterial({
        map: texture,
        transparent: true,
        alphaTest: 0.5,
        side: THREE.DoubleSide,
      });

      const NUM_OF_LEAVES = 200;

      for (let p = 0; p < NUM_OF_LEAVES; p++) {
        const singleLeave = new THREE.Mesh(leave, leaveMaterial) as Leaf;

        singleLeave.position.set(
          Math.random() * 1000 - 500,
          Math.random() * 300 + 300,
          Math.random() * 1000 - 500
        );

        singleLeave.speed = 0.5 + Math.random();
        singleLeave.swayAmplitude = Math.random() * 5 + 5;
        singleLeave.swayFrequency = Math.random() * 0.001 + 0.0005;
        singleLeave.swayPhase = Math.random() * Math.PI * 2;

        leaves.push(singleLeave);
        scene.add(singleLeave);
      }
    });

    function animateLeaves() {
      const time = Date.now();
      leaves.forEach((leaf) => {
        if (!leaf.speed) return;

        leaf.position.y -= leaf.speed;
        leaf.position.x +=
          Math.sin(time * leaf.swayFrequency! + leaf.swayPhase!) * 0.5;
        leaf.rotation.z += 0.01;

        if (leaf.position.y < -100) {
          leaf.position.y = Math.random() * 300 + 300;
          leaf.position.x = Math.random() * 1000 - 500;
          leaf.position.z = Math.random() * 1000 - 500;
        }
      });
    }

    const animate = () => {
      requestAnimationFrame(animate);
      animateLeaves();
      renderer.render(scene, camera);
    };

    animate();

    return () => {
      container.removeChild(renderer.domElement);
      renderer.dispose();
    };
  }, []);

  return (
    <div
      id="object"
      className="fixed top-0 left-0 z-[5] pointer-events-none"
    ></div>
  );
};
