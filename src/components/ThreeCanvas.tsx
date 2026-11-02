import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface ThreeCanvasProps {
  reducedMotion?: boolean;
  intensity?: 'high' | 'normal' | 'subtle';
  cameraZoomLevel?: number; // 1 = standard, 1.4 = zoomed in intro
}

export const ThreeCanvas: React.FC<ThreeCanvasProps> = ({
  reducedMotion = false,
  intensity = 'normal',
  cameraZoomLevel = 1.0,
}) => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    let width = container.clientWidth || window.innerWidth;
    let height = container.clientHeight || window.innerHeight;

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x06080e, 0.035);

    const camera = new THREE.PerspectiveCamera(55, width / height, 0.1, 100);
    camera.position.set(0, 0, 10 / cameraZoomLevel);

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance'
      });
    } catch {
      return; // WebGL not available
    }

    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x06080e, 0);
    container.appendChild(renderer.domElement);

    // 2. Lights
    const ambientLight = new THREE.AmbientLight(0xfff3d4, 0.6);
    scene.add(ambientLight);

    const centerGoldLight = new THREE.PointLight(0xf59e0b, 2.5, 30);
    centerGoldLight.position.set(0, 0, 2);
    scene.add(centerGoldLight);

    const rimBlueLight = new THREE.PointLight(0x0284c7, 1.2, 25);
    rimBlueLight.position.set(0, -4, -2);
    scene.add(rimBlueLight);

    // 3. Sacred 3D Golden Mandala Group
    const mandalaGroup = new THREE.Group();
    scene.add(mandalaGroup);

    // Outer Torus Ring
    const torusGeo = new THREE.TorusGeometry(3.6, 0.025, 16, 100);
    const goldMat = new THREE.MeshStandardMaterial({
      color: 0xf59e0b,
      roughness: 0.25,
      metalness: 0.9,
      emissive: 0x92400e,
      emissiveIntensity: 0.35,
    });
    const outerRing = new THREE.Mesh(torusGeo, goldMat);
    mandalaGroup.add(outerRing);

    // Inner Concentric Torus Rings
    const midRingGeo = new THREE.TorusGeometry(2.4, 0.02, 16, 80);
    const midRing = new THREE.Mesh(midRingGeo, goldMat);
    mandalaGroup.add(midRing);

    const innerRingGeo = new THREE.TorusGeometry(1.2, 0.02, 16, 60);
    const innerRing = new THREE.Mesh(innerRingGeo, goldMat);
    mandalaGroup.add(innerRing);

    // Radial Sacred Petals / Spokes
    const spokeCount = 12;
    const spokeMat = new THREE.LineBasicMaterial({
      color: 0xfde047,
      transparent: true,
      opacity: 0.45,
    });

    for (let i = 0; i < spokeCount; i++) {
      const angle = (i * Math.PI * 2) / spokeCount;
      const points = [];
      points.push(new THREE.Vector3(0, 0, 0));
      points.push(
        new THREE.Vector3(
          Math.cos(angle) * 3.6,
          Math.sin(angle) * 3.6,
          Math.sin(angle * 3) * 0.3
        )
      );
      const spokeGeo = new THREE.BufferGeometry().setFromPoints(points);
      const spokeLine = new THREE.Line(spokeGeo, spokeMat);
      mandalaGroup.add(spokeLine);
    }

    // Sacred Star Icosahedron at center
    const icoGeo = new THREE.IcosahedronGeometry(0.7, 0);
    const icoWireGeo = new THREE.WireframeGeometry(icoGeo);
    const icoLine = new THREE.LineSegments(
      icoWireGeo,
      new THREE.LineBasicMaterial({ color: 0xfef08a, transparent: true, opacity: 0.75 })
    );
    mandalaGroup.add(icoLine);

    // 4. Golden Dust Particle Cloud (1,400 points)
    const particleCount = intensity === 'high' ? 1800 : intensity === 'subtle' ? 700 : 1300;
    const particleGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const scales = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 22;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 16;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 16 - 2;
      scales[i] = Math.random() * 0.8 + 0.2;
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particleGeo.setAttribute('scale', new THREE.BufferAttribute(scales, 1));

    // Custom Particle Canvas Texture
    const particleCanvas = document.createElement('canvas');
    particleCanvas.width = 32;
    particleCanvas.height = 32;
    const pctx = particleCanvas.getContext('2d');
    if (pctx) {
      const grad = pctx.createRadialGradient(16, 16, 0, 16, 16, 16);
      grad.addColorStop(0, 'rgba(255, 240, 180, 1)');
      grad.addColorStop(0.35, 'rgba(245, 158, 11, 0.8)');
      grad.addColorStop(0.7, 'rgba(217, 119, 6, 0.25)');
      grad.addColorStop(1, 'rgba(0,0,0,0)');
      pctx.fillStyle = grad;
      pctx.beginPath();
      pctx.arc(16, 16, 16, 0, Math.PI * 2);
      pctx.fill();
    }
    const particleTex = new THREE.CanvasTexture(particleCanvas);

    const pMat = new THREE.PointsMaterial({
      size: 0.22,
      map: particleTex,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      color: 0xfef08a,
    });

    const particles = new THREE.Points(particleGeo, pMat);
    scene.add(particles);

    // Mouse Parallax Interaction
    let targetMouseX = 0;
    let targetMouseY = 0;
    let currentMouseX = 0;
    let currentMouseY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      targetMouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      targetMouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // WebGL Context Lost / Restored handling
    const handleContextLost = (e: Event) => {
      e.preventDefault();
      cancelAnimationFrame(animId);
    };

    const canvasDom = renderer.domElement;
    canvasDom.addEventListener('webglcontextlost', handleContextLost, false);

    // Animation Loop
    let animId = 0;
    let clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const delta = clock.getDelta();
      const elapsed = clock.getElapsedTime();

      // Smooth mouse lerp
      currentMouseX += (targetMouseX - currentMouseX) * 0.05;
      currentMouseY += (targetMouseY - currentMouseY) * 0.05;

      if (!reducedMotion) {
        mandalaGroup.rotation.z += 0.0025;
        mandalaGroup.rotation.x = currentMouseY * 0.15;
        mandalaGroup.rotation.y = currentMouseX * 0.15;

        icoLine.rotation.x += 0.01;
        icoLine.rotation.y += 0.012;

        // Subtle pulsing light
        centerGoldLight.intensity = 2.0 + Math.sin(elapsed * 2) * 0.5;

        // Floating particles
        const posArr = particleGeo.attributes.position.array as Float32Array;
        for (let i = 0; i < particleCount; i++) {
          posArr[i * 3 + 1] += Math.sin(elapsed + i) * 0.002;
          posArr[i * 3] += Math.cos(elapsed * 0.5 + i) * 0.001;
        }
        particleGeo.attributes.position.needsUpdate = true;
      }

      // Smooth camera position
      const targetCamZ = 10 / (cameraZoomLevel || 1.0);
      camera.position.z += (targetCamZ - camera.position.z) * 0.08;
      camera.position.x = currentMouseX * 0.4;
      camera.position.y = -currentMouseY * 0.4;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    };

    animate();

    // Resize Handler
    const handleResize = () => {
      if (!container) return;
      width = container.clientWidth || window.innerWidth;
      height = container.clientHeight || window.innerHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      canvasDom.removeEventListener('webglcontextlost', handleContextLost);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      particleGeo.dispose();
      pMat.dispose();
      particleTex.dispose();
      torusGeo.dispose();
      midRingGeo.dispose();
      innerRingGeo.dispose();
      goldMat.dispose();
      spokeMat.dispose();
      icoGeo.dispose();
      icoWireGeo.dispose();
    };
  }, [reducedMotion, intensity, cameraZoomLevel]);

  return (
    <div
      ref={mountRef}
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
      aria-hidden="true"
    />
  );
};
