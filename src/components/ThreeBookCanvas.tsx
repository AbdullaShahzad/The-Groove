import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { Volume } from '../types';

interface ThreeBookCanvasProps {
  volume: Volume;
}

export const ThreeBookCanvas: React.FC<ThreeBookCanvasProps> = ({ volume }) => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 340;
    const height = container.clientHeight || 480;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(38, width / height, 0.1, 1000);
    camera.position.set(0, 0.2, 5.2);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    // Group holding the 3D Book
    const bookGroup = new THREE.Group();
    scene.add(bookGroup);

    // Book Dimensions
    const bookWidth = 2.4;
    const bookHeight = 3.3;
    const bookDepth = 0.42;

    // Helper: Generate Canvas Texture for Book Cover with Gold Foil
    const createCoverTexture = () => {
      const canvas = document.createElement('canvas');
      canvas.width = 1024;
      canvas.height = 1400;
      const ctx = canvas.getContext('2d');
      if (!ctx) return new THREE.CanvasTexture(canvas);

      // Base Cloth Background
      ctx.fillStyle = volume.spineColor;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Cloth texture noise
      ctx.fillStyle = 'rgba(0, 0, 0, 0.08)';
      for (let i = 0; i < 20000; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        ctx.fillRect(x, y, 2, 2);
      }

      // Left spine crease shadow
      const spineGrad = ctx.createLinearGradient(0, 0, 160, 0);
      spineGrad.addColorStop(0, 'rgba(0,0,0,0.5)');
      spineGrad.addColorStop(0.3, 'rgba(0,0,0,0.2)');
      spineGrad.addColorStop(0.7, 'rgba(255,255,255,0.06)');
      spineGrad.addColorStop(1, 'rgba(0,0,0,0.1)');
      ctx.fillStyle = spineGrad;
      ctx.fillRect(0, 0, 160, canvas.height);

      // Gold Foil Border Frame
      ctx.strokeStyle = '#D4AF37';
      ctx.lineWidth = 4;
      ctx.strokeRect(60, 60, canvas.width - 120, canvas.height - 120);

      ctx.strokeStyle = 'rgba(212, 175, 55, 0.4)';
      ctx.lineWidth = 1.5;
      ctx.setLineDash([8, 8]);
      ctx.strokeRect(74, 74, canvas.width - 148, canvas.height - 148);
      ctx.setLineDash([]);

      // Top Gold Medallion with Star
      ctx.beginPath();
      ctx.arc(canvas.width / 2, 260, 50, 0, Math.PI * 2);
      ctx.strokeStyle = '#D4AF37';
      ctx.lineWidth = 3;
      ctx.stroke();

      ctx.fillStyle = '#E2C26E';
      ctx.font = 'bold 36px serif';
      ctx.textAlign = 'center';
      ctx.fillText('✦', canvas.width / 2, 273);

      // Volume Label
      ctx.fillStyle = '#E2C26E';
      ctx.font = 'bold 22px monospace';
      ctx.letterSpacing = '4px';
      ctx.fillText(`THE GROOVE ARCHIVE · ${volume.volString}`, canvas.width / 2, 360);

      // Title
      ctx.fillStyle = '#FAF7F2';
      ctx.font = 'bold 58px serif';
      const words = volume.title.split(' ');
      let line = '';
      let y = 600;
      for (let i = 0; i < words.length; i++) {
        const testLine = line + words[i] + ' ';
        if (ctx.measureText(testLine).width > 700 && i > 0) {
          ctx.fillText(line.trim(), canvas.width / 2, y);
          line = words[i] + ' ';
          y += 70;
        } else {
          line = testLine;
        }
      }
      ctx.fillText(line.trim(), canvas.width / 2, y);

      // Gold Divider Rule
      ctx.strokeStyle = 'rgba(212, 175, 55, 0.7)';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(canvas.width / 2 - 80, y + 50);
      ctx.lineTo(canvas.width / 2 + 80, y + 50);
      ctx.stroke();

      // Author in Italic Serif
      ctx.fillStyle = '#EAE2D3';
      ctx.font = 'italic 38px serif';
      ctx.fillText(volume.author, canvas.width / 2, y + 110);

      // Publisher imprint at bottom
      ctx.fillStyle = 'rgba(212, 175, 55, 0.8)';
      ctx.font = 'bold 20px monospace';
      ctx.fillText('OCTAVO & FOLIO PRESS', canvas.width / 2, canvas.height - 120);

      const texture = new THREE.CanvasTexture(canvas);
      texture.colorSpace = THREE.SRGBColorSpace;
      return texture;
    };

    // Pages Texture (paper sides)
    const createPagesTexture = () => {
      const canvas = document.createElement('canvas');
      canvas.width = 256;
      canvas.height = 256;
      const ctx = canvas.getContext('2d');
      if (!ctx) return new THREE.CanvasTexture(canvas);

      ctx.fillStyle = '#F4EBD9';
      ctx.fillRect(0, 0, 256, 256);

      ctx.fillStyle = 'rgba(120, 100, 80, 0.15)';
      for (let y = 0; y < 256; y += 3) {
        ctx.fillRect(0, y, 256, 1);
      }
      const texture = new THREE.CanvasTexture(canvas);
      texture.colorSpace = THREE.SRGBColorSpace;
      return texture;
    };

    const coverTexture = createCoverTexture();
    const pagesTexture = createPagesTexture();

    // Materials for the Book Box: [Right, Left(Spine), Top, Bottom, Front, Back]
    const materials = [
      new THREE.MeshStandardMaterial({ map: pagesTexture, roughness: 0.8 }), // Right (pages)
      new THREE.MeshStandardMaterial({ color: volume.spineColor, roughness: 0.5 }), // Left (spine)
      new THREE.MeshStandardMaterial({ map: pagesTexture, roughness: 0.8 }), // Top (pages)
      new THREE.MeshStandardMaterial({ map: pagesTexture, roughness: 0.8 }), // Bottom (pages)
      new THREE.MeshStandardMaterial({ map: coverTexture, roughness: 0.4, metalness: 0.1 }), // Front
      new THREE.MeshStandardMaterial({ color: volume.spineColor, roughness: 0.6 }), // Back
    ];

    const bookGeo = new THREE.BoxGeometry(bookWidth, bookHeight, bookDepth);
    const bookMesh = new THREE.Mesh(bookGeo, materials);
    bookMesh.castShadow = true;
    bookMesh.receiveShadow = true;
    bookGroup.add(bookMesh);

    // Silk Ribbon Bookmark
    const ribbonGeo = new THREE.PlaneGeometry(0.12, 0.7);
    const ribbonMat = new THREE.MeshStandardMaterial({
      color: 0x9e1b26,
      side: THREE.DoubleSide,
      roughness: 0.4
    });
    const ribbon = new THREE.Mesh(ribbonGeo, ribbonMat);
    ribbon.position.set(-0.4, -bookHeight / 2 - 0.28, 0.05);
    bookGroup.add(ribbon);

    // Subtle Desk / Floor Shadow
    const shadowGeo = new THREE.PlaneGeometry(3.5, 1.8);
    const shadowMat = new THREE.MeshBasicMaterial({
      color: 0x000000,
      transparent: true,
      opacity: 0.15
    });
    const shadowMesh = new THREE.Mesh(shadowGeo, shadowMat);
    shadowMesh.rotation.x = -Math.PI / 2;
    shadowMesh.position.y = -bookHeight / 2 - 0.02;
    scene.add(shadowMesh);

    // Studio Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.8);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xfff7e6, 2.4);
    keyLight.position.set(4, 5, 5);
    keyLight.castShadow = true;
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0xd9e5ff, 1.2);
    fillLight.position.set(-4, 2, 3);
    scene.add(fillLight);

    // Initial Angle matching physical display
    bookGroup.rotation.y = -0.22;
    bookGroup.rotation.x = 0.06;

    // Interactive Drag to Rotate
    let isDragging = false;
    let previousMousePosition = { x: 0, y: 0 };
    let targetRotationY = -0.22;
    let targetRotationX = 0.06;

    const onMouseDown = (e: MouseEvent) => {
      isDragging = true;
      previousMousePosition = { x: e.clientX, y: e.clientY };
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      const deltaX = e.clientX - previousMousePosition.x;
      const deltaY = e.clientY - previousMousePosition.y;

      targetRotationY += deltaX * 0.008;
      targetRotationX += deltaY * 0.008;
      targetRotationX = Math.max(-0.4, Math.min(0.4, targetRotationX));

      previousMousePosition = { x: e.clientX, y: e.clientY };
    };

    const onMouseUp = () => {
      isDragging = false;
    };

    // Touch support for mobile
    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        isDragging = true;
        previousMousePosition = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      }
    };

    const onTouchMove = (e: TouchEvent) => {
      if (!isDragging || e.touches.length !== 1) return;
      const deltaX = e.touches[0].clientX - previousMousePosition.x;
      const deltaY = e.touches[0].clientY - previousMousePosition.y;

      targetRotationY += deltaX * 0.008;
      targetRotationX += deltaY * 0.008;
      targetRotationX = Math.max(-0.4, Math.min(0.4, targetRotationX));

      previousMousePosition = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    };

    const domElement = renderer.domElement;
    domElement.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    domElement.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: true });
    window.addEventListener('touchend', onMouseUp);

    // Animation Loop with Idle Floating & Smooth Damping
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Gentle breathing float when not dragging
      if (!isDragging) {
        bookGroup.position.y = Math.sin(elapsedTime * 1.5) * 0.04;
      }

      // Smooth interpolation towards target rotation
      bookGroup.rotation.y += (targetRotationY - bookGroup.rotation.y) * 0.08;
      bookGroup.rotation.x += (targetRotationX - bookGroup.rotation.x) * 0.08;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      domElement.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      domElement.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onMouseUp);
      renderer.dispose();
      bookGeo.dispose();
      materials.forEach(m => m.dispose());
      coverTexture.dispose();
      pagesTexture.dispose();
      ribbonGeo.dispose();
      ribbonMat.dispose();
      if (container.contains(domElement)) {
        container.removeChild(domElement);
      }
    };
  }, [volume]);

  return (
    <div className="relative flex flex-col items-center">
      <div
        ref={mountRef}
        className="w-[320px] sm:w-[360px] md:w-[400px] h-[460px] sm:h-[500px] md:h-[540px] cursor-grab active:cursor-grabbing select-none"
      />
      <div className="text-[10px] font-mono uppercase tracking-widest text-[#8C827A] flex items-center gap-1.5 -mt-3 select-none">
        <span>✦ Drag to rotate 3D binding in Three.js</span>
      </div>
    </div>
  );
};
