import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Volume } from '../types';
import { BookOpen, Sparkles, MoveHorizontal, RotateCw } from 'lucide-react';

interface SpiralBookshelfCanvasProps {
  volumes: Volume[];
  onSelectVolume: (vol: Volume) => void;
  onOpenPreview?: (vol: Volume) => void;
}

export const SpiralBookshelfCanvas: React.FC<SpiralBookshelfCanvasProps> = ({
  volumes,
  onSelectVolume,
  onOpenPreview,
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [hoveredBook, setHoveredBook] = useState<Volume | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    let width = container.clientWidth || 900;
    let height = container.clientHeight || 650;

    // Three.js Scene, Camera, Renderer
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x16110D, 0.025);

    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(0, 0.4, 8.8);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    // Root Group for the rotating spiral bookshelf
    const spiralGroup = new THREE.Group();
    scene.add(spiralGroup);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xfff5ea, 1.6);
    scene.add(ambientLight);

    const mainSpot = new THREE.DirectionalLight(0xffecd2, 2.2);
    mainSpot.position.set(5, 8, 8);
    mainSpot.castShadow = true;
    scene.add(mainSpot);

    const rimLight = new THREE.DirectionalLight(0xa5c4d4, 1.1);
    rimLight.position.set(-6, -2, -5);
    scene.add(rimLight);

    // Texture Generator for Book Covers
    const createCoverTexture = (vol: Volume) => {
      const canvas = document.createElement('canvas');
      canvas.width = 512;
      canvas.height = 720;
      const ctx = canvas.getContext('2d');
      if (!ctx) return new THREE.CanvasTexture(canvas);

      // Base Cloth
      ctx.fillStyle = vol.spineColor;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Cloth texture noise
      ctx.fillStyle = 'rgba(0, 0, 0, 0.08)';
      for (let i = 0; i < 8000; i++) {
        ctx.fillRect(Math.random() * canvas.width, Math.random() * canvas.height, 2, 2);
      }

      // Left spine crease
      const grad = ctx.createLinearGradient(0, 0, 80, 0);
      grad.addColorStop(0, 'rgba(0,0,0,0.5)');
      grad.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 80, canvas.height);

      // Gold Foil Border
      ctx.strokeStyle = '#D4AF37';
      ctx.lineWidth = 3;
      ctx.strokeRect(30, 30, canvas.width - 60, canvas.height - 60);

      // Inner dashed rule
      ctx.strokeStyle = 'rgba(212, 175, 55, 0.4)';
      ctx.lineWidth = 1.5;
      ctx.setLineDash([6, 6]);
      ctx.strokeRect(40, 40, canvas.width - 80, canvas.height - 80);
      ctx.setLineDash([]);

      // Top Medallion
      ctx.beginPath();
      ctx.arc(canvas.width / 2, 140, 32, 0, Math.PI * 2);
      ctx.strokeStyle = '#D4AF37';
      ctx.lineWidth = 2;
      ctx.stroke();

      ctx.fillStyle = '#E2C26E';
      ctx.font = 'bold 24px serif';
      ctx.textAlign = 'center';
      ctx.fillText('✦', canvas.width / 2, 148);

      ctx.font = 'bold 14px monospace';
      ctx.fillText(vol.volString, canvas.width / 2, 195);

      // Title
      ctx.fillStyle = '#FAF7F2';
      ctx.font = 'bold 32px serif';
      const words = vol.title.split(' ');
      let line = '';
      let y = 320;
      for (let i = 0; i < words.length; i++) {
        const testLine = line + words[i] + ' ';
        if (ctx.measureText(testLine).width > 360 && i > 0) {
          ctx.fillText(line.trim(), canvas.width / 2, y);
          line = words[i] + ' ';
          y += 42;
        } else {
          line = testLine;
        }
      }
      ctx.fillText(line.trim(), canvas.width / 2, y);

      // Author
      ctx.fillStyle = '#E3DAC9';
      ctx.font = 'italic 22px serif';
      ctx.fillText(vol.author, canvas.width / 2, y + 60);

      // Publisher
      ctx.fillStyle = '#D4AF37';
      ctx.font = 'bold 13px monospace';
      ctx.fillText('THE GROOVE ARCHIVE', canvas.width / 2, canvas.height - 60);

      const tex = new THREE.CanvasTexture(canvas);
      tex.colorSpace = THREE.SRGBColorSpace;
      return tex;
    };

    // Shared Paper Texture for pages
    const pagesCanvas = document.createElement('canvas');
    pagesCanvas.width = 128;
    pagesCanvas.height = 128;
    const pctx = pagesCanvas.getContext('2d');
    if (pctx) {
      pctx.fillStyle = '#F2EAD8';
      pctx.fillRect(0, 0, 128, 128);
      pctx.fillStyle = 'rgba(120, 100, 80, 0.15)';
      for (let i = 0; i < 128; i += 3) pctx.fillRect(0, i, 128, 1);
    }
    const pagesTexture = new THREE.CanvasTexture(pagesCanvas);
    const pagesMat = new THREE.MeshStandardMaterial({ map: pagesTexture, roughness: 0.8 });

    // Build the Spiral Cylinder Bookshelf (matching the Chrome Experiment reference!)
    const totalBooks = 48; // 4 spiral revolutions
    const radius = 3.6;
    const spiralHeight = 5.2;
    const totalAngle = Math.PI * 7; // ~3.5 full rotations

    const bookMeshes: THREE.Mesh[] = [];
    const bookDataMap = new Map<THREE.Mesh, Volume>();
    const originalTransforms = new Map<THREE.Mesh, { position: THREE.Vector3; rotation: THREE.Euler }>();

    // 1. Create Books along the Spiral Helix
    const bookWidth = 0.72;
    const bookHeight = 1.05;
    const bookDepth = 0.14;
    const bookGeo = new THREE.BoxGeometry(bookWidth, bookHeight, bookDepth);

    for (let i = 0; i < totalBooks; i++) {
      const vol = volumes[i % volumes.length];
      const t = i / totalBooks; // 0 to 1
      const angle = t * totalAngle - totalAngle / 2;
      const y = (t - 0.5) * spiralHeight;

      const x = Math.cos(angle) * radius;
      const z = Math.sin(angle) * radius;

      const coverTex = createCoverTexture(vol);
      const spineMat = new THREE.MeshStandardMaterial({ color: vol.spineColor, roughness: 0.5 });
      const coverMat = new THREE.MeshStandardMaterial({ map: coverTex, roughness: 0.4, metalness: 0.1 });
      const backMat = new THREE.MeshStandardMaterial({ color: vol.spineColor, roughness: 0.6 });

      const materials = [
        pagesMat, // Right
        spineMat, // Left
        pagesMat, // Top
        pagesMat, // Bottom
        coverMat, // Front (faces outward)
        backMat   // Back (faces inward)
      ];

      const mesh = new THREE.Mesh(bookGeo, materials);
      mesh.position.set(x, y + bookHeight / 2, z);

      // Rotate book to face outward from cylinder center
      mesh.rotation.y = -angle + Math.PI / 2;
      mesh.castShadow = true;
      mesh.receiveShadow = true;

      spiralGroup.add(mesh);
      bookMeshes.push(mesh);
      bookDataMap.set(mesh, vol);
      originalTransforms.set(mesh, {
        position: mesh.position.clone(),
        rotation: mesh.rotation.clone()
      });
    }

    // 2. Create the Spiral Wood Shelf Ribbon beneath the books
    const curvePoints: THREE.Vector3[] = [];
    const steps = 300;
    for (let i = 0; i <= steps; i++) {
      const t = i / steps;
      const angle = t * totalAngle - totalAngle / 2;
      const y = (t - 0.5) * spiralHeight;
      const x = Math.cos(angle) * (radius - 0.05);
      const z = Math.sin(angle) * (radius - 0.05);
      curvePoints.push(new THREE.Vector3(x, y, z));
    }

    const curve = new THREE.CatmullRomCurve3(curvePoints);
    const shelfGeo = new THREE.TubeGeometry(curve, 300, 0.14, 8, false);
    const shelfMat = new THREE.MeshStandardMaterial({
      color: 0x362317, // Solid Smoked Walnut
      roughness: 0.7,
      metalness: 0.05
    });
    const shelfMesh = new THREE.Mesh(shelfGeo, shelfMat);
    shelfMesh.receiveShadow = true;
    spiralGroup.add(shelfMesh);

    // 3. Central Pillar Core (wood grain column)
    const pillarGeo = new THREE.CylinderGeometry(1.6, 1.6, spiralHeight + 2, 32);
    const pillarMat = new THREE.MeshStandardMaterial({
      color: 0x1c130d,
      roughness: 0.8
    });
    const pillar = new THREE.Mesh(pillarGeo, pillarMat);
    pillar.position.y = 0;
    spiralGroup.add(pillar);

    // Interaction State: Scroll to Rotate & Drag to Spin
    let targetRotationY = 0;
    let targetCameraY = 0;
    let isDragging = false;
    let prevMouseX = 0;
    let prevMouseY = 0;

    // Wheel rotation listener (strictly when cursor is INSIDE the canvas container)
    const onWheel = (e: WheelEvent) => {
      e.preventDefault(); // Stop outer page scroll while wheeling inside 3D shelf
      targetRotationY += e.deltaY * 0.004;
      targetCameraY -= e.deltaY * 0.0015;
      targetCameraY = Math.max(-1.8, Math.min(1.8, targetCameraY));
    };

    // Drag to spin
    const onMouseDown = (e: MouseEvent) => {
      isDragging = true;
      prevMouseX = e.clientX;
      prevMouseY = e.clientY;
    };

    const onMouseMove = (e: MouseEvent) => {
      const rect = renderer.domElement.getBoundingClientRect();
      const mouseX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const mouseY = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      setMousePos({ x: e.clientX, y: e.clientY });

      if (isDragging) {
        const deltaX = e.clientX - prevMouseX;
        const deltaY = e.clientY - prevMouseY;
        targetRotationY += deltaX * 0.008;
        targetCameraY += deltaY * 0.004;
        targetCameraY = Math.max(-1.8, Math.min(1.8, targetCameraY));

        prevMouseX = e.clientX;
        prevMouseY = e.clientY;
        return;
      }

      // Raycasting for Book Hover
      const raycaster = new THREE.Raycaster();
      raycaster.setFromCamera(new THREE.Vector2(mouseX, mouseY), camera);
      const intersects = raycaster.intersectObjects(bookMeshes);

      if (intersects.length > 0) {
        const hitMesh = intersects[0].object as THREE.Mesh;
        const vol = bookDataMap.get(hitMesh);
        if (vol) {
          setHoveredBook(vol);
          renderer.domElement.style.cursor = 'pointer';

          // Animate hovered book pulling outward from the shelf
          const orig = originalTransforms.get(hitMesh);
          if (orig) {
            const normal = new THREE.Vector3(orig.position.x, 0, orig.position.z).normalize();
            hitMesh.position.copy(orig.position).add(normal.multiplyScalar(0.24));
          }
        }
      } else {
        setHoveredBook(null);
        renderer.domElement.style.cursor = 'grab';

        // Reset positions
        bookMeshes.forEach(mesh => {
          const orig = originalTransforms.get(mesh);
          if (orig) {
            mesh.position.lerp(orig.position, 0.1);
          }
        });
      }
    };

    const onMouseUp = () => {
      isDragging = false;
    };

    // Click on Book
    const onClick = (e: MouseEvent) => {
      const rect = renderer.domElement.getBoundingClientRect();
      const mouseX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const mouseY = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      const raycaster = new THREE.Raycaster();
      raycaster.setFromCamera(new THREE.Vector2(mouseX, mouseY), camera);
      const intersects = raycaster.intersectObjects(bookMeshes);

      if (intersects.length > 0) {
        const hitMesh = intersects[0].object as THREE.Mesh;
        const vol = bookDataMap.get(hitMesh);
        if (vol) {
          onSelectVolume(vol);
        }
      }
    };

    // Attach listeners
    const dom = renderer.domElement;
    dom.addEventListener('wheel', onWheel, { passive: false });
    dom.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    dom.addEventListener('click', onClick);

    // Touch support for mobile/tablet
    let touchStartX = 0;
    let touchStartY = 0;
    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        touchStartX = e.touches[0].clientX;
        touchStartY = e.touches[0].clientY;
      }
    };

    const onTouchMove = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        const deltaX = e.touches[0].clientX - touchStartX;
        const deltaY = e.touches[0].clientY - touchStartY;
        targetRotationY += deltaX * 0.008;
        targetCameraY += deltaY * 0.004;
        targetCameraY = Math.max(-1.8, Math.min(1.8, targetCameraY));
        touchStartX = e.touches[0].clientX;
        touchStartY = e.touches[0].clientY;
      }
    };

    dom.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: true });

    // Handle Resize
    const onResize = () => {
      if (!container) return;
      width = container.clientWidth || 900;
      height = container.clientHeight || 650;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };
    window.addEventListener('resize', onResize);

    // Render Animation Loop
    let animId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const delta = clock.getDelta();

      // Idle gentle rotation when not scrolling/dragging
      if (!isDragging) {
        targetRotationY += delta * 0.15;
      }

      // Smooth Lerp Damping
      spiralGroup.rotation.y += (targetRotationY - spiralGroup.rotation.y) * 0.07;
      camera.position.y += (targetCameraY - camera.position.y) * 0.07;
      camera.lookAt(0, camera.position.y * 0.5, 0);

      renderer.render(scene, camera);
    };

    animate();

    // Cleanup
    return () => {
      cancelAnimationFrame(animId);
      dom.removeEventListener('wheel', onWheel);
      dom.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      dom.removeEventListener('click', onClick);
      dom.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('resize', onResize);
      renderer.dispose();
      bookGeo.dispose();
      shelfGeo.dispose();
      pillarGeo.dispose();
      pagesMat.dispose();
      shelfMat.dispose();
      pillarMat.dispose();
      if (container.contains(dom)) {
        container.removeChild(dom);
      }
    };
  }, [volumes, onSelectVolume]);

  return (
    <div className="relative w-full h-[450px] xs:h-[500px] sm:h-[620px] lg:h-[700px] bg-[#16110D] rounded-[4px] shadow-2xl overflow-hidden border border-[#2D1F17] select-none max-w-full">
      
      {/* 3D WebGL Canvas Mount */}
      <div ref={mountRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

      {/* Top Banner overlay matching the Chrome experiment style */}
      <div className="absolute top-3 sm:top-4 inset-x-0 flex justify-center pointer-events-none px-2">
        <div className="bg-[#FAF7F2] border-2 border-[#BC472A] px-4 sm:px-6 py-1 sm:py-1.5 rounded-[2px] shadow-md">
          <span className="text-[10px] sm:text-xs font-serif font-bold tracking-[0.16em] sm:tracking-[0.2em] text-[#1C1917] uppercase">
            Top Rated Archival Editions
          </span>
        </div>
      </div>

      {/* Interactive Helper Overlay at Bottom */}
      <div className="absolute bottom-3 sm:bottom-4 inset-x-2 sm:inset-x-6 flex flex-col sm:flex-row items-center justify-between text-[10px] sm:text-[11px] font-mono text-[#D4AF37]/80 pointer-events-none gap-1.5 sm:gap-2">
        <div className="flex items-center gap-1.5 sm:gap-2 bg-black/60 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full border border-white/10 backdrop-blur-xs text-center">
          <RotateCw className="w-3 h-3 sm:w-3.5 sm:h-3.5 animate-spin" style={{ animationDuration: '6s' }} />
          <span>Scroll wheel or drag horizontally to rotate cylinder</span>
        </div>
        <div className="flex items-center gap-1.5 bg-black/60 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full border border-white/10 backdrop-blur-xs text-[#FAF8F5]">
          <Sparkles className="w-3 h-3 text-[#E2C26E]" />
          <span>Click edition to inspect</span>
        </div>
      </div>

      {/* Dynamic Hover Card when pointing at a book */}
      {hoveredBook && (
        <div className="absolute top-14 left-3 right-3 sm:right-auto sm:left-6 max-w-[calc(100%-24px)] sm:max-w-xs bg-[#FAF7F2] border border-[#DDD5C7] rounded-[2px] p-3.5 sm:p-4 shadow-xl pointer-events-auto z-20 animate-fadeIn">
          <div className="flex items-center gap-2 text-[10px] font-mono text-[#BC472A] uppercase font-bold">
            <span>{hoveredBook.volString}</span>
            <span>·</span>
            <span>{hoveredBook.category}</span>
          </div>
          <h4 className="font-serif font-bold text-base text-[#1C1917] mt-0.5 leading-tight">
            {hoveredBook.title}
          </h4>
          <p className="font-serif italic text-xs text-[#6B6359]">
            by {hoveredBook.author}
          </p>
          <div className="mt-2 pt-2 border-t border-[#EAE4D8] flex items-center justify-between font-mono text-xs">
            <span className="font-bold text-[#1C1917]">${hoveredBook.price.toFixed(2)}</span>
            <span className="text-[#1E5638] text-[10px] font-semibold">{hoveredBook.stockCount} IN STOCK</span>
          </div>

          <div className="mt-3 pt-2 border-t border-[#EAE4D8] flex items-center gap-2">
            {onOpenPreview && (
              <button
                onClick={() => onOpenPreview(hoveredBook)}
                className="flex-1 bg-[#EDE7DA] hover:bg-[#E2D9C8] text-[#1C1917] border border-[#C5BBA9] px-2.5 py-1.5 rounded-[2px] font-mono font-semibold text-[10px] uppercase tracking-wider flex items-center justify-center gap-1 transition-colors cursor-pointer select-none"
              >
                <BookOpen className="w-3 h-3 text-[#BC472A]" />
                <span>READ SAMPLE</span>
              </button>
            )}
            <button
              onClick={() => onSelectVolume(hoveredBook)}
              className="flex-1 bg-[#1C1917] hover:bg-black text-[#FAF8F5] px-2.5 py-1.5 rounded-[2px] font-mono font-semibold text-[10px] uppercase tracking-wider flex items-center justify-center gap-1 transition-colors cursor-pointer select-none"
            >
              <span>DETAILS</span>
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
