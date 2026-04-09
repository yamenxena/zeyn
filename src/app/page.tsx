"use client";
import React, { useState, useRef, useEffect } from 'react';
import { zeynGraph } from '../data';
import CharacterCardPanel from '../components/canvas/CharacterCard';
import { CharacterCard } from '../types/schema';
import { Network, Compass, Zap, ScanSearch } from 'lucide-react';

export default function Home() {
  const [selectedNode, setSelectedNode] = useState<CharacterCard | null>(null);

  // --- Pan / Zoom Engine ---
  const containerRef = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState({ x: 0, y: 0, scale: 0.5 });
  const isDragging = useRef(false);
  const lastMousePos = useRef({ x: 0, y: 0 });

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    // Zoom exactly towards mouse position
    const scaleAdjust = e.deltaY > 0 ? 0.9 : 1.1;
    const newScale = Math.max(0.1, Math.min(transform.scale * scaleAdjust, 10));
    
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;

      const newX = mouseX - (mouseX - transform.x) * (newScale / transform.scale);
      const newY = mouseY - (mouseY - transform.y) * (newScale / transform.scale);

      setTransform({ x: newX, y: newY, scale: newScale });
    }
  };

  const handlePointerDown = (e: React.PointerEvent) => {
    isDragging.current = true;
    lastMousePos.current = { x: e.clientX, y: e.clientY };
    if (containerRef.current) containerRef.current.style.cursor = 'grabbing';
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging.current) return;
    const dx = e.clientX - lastMousePos.current.x;
    const dy = e.clientY - lastMousePos.current.y;
    setTransform(prev => ({ ...prev, x: prev.x + dx, y: prev.y + dy }));
    lastMousePos.current = { x: e.clientX, y: e.clientY };
  };

  const handlePointerUp = () => {
    isDragging.current = false;
    if (containerRef.current) containerRef.current.style.cursor = 'grab';
  };

  useEffect(() => {
    // Center the viewport initially
    if (containerRef.current) {
      const w = containerRef.current.clientWidth;
      const h = containerRef.current.clientHeight;
      setTransform({ x: w/2, y: h/2, scale: 0.8 });
    }
  }, []);

  // --- Angular Tech Layout Engine ---
  // Hardcoded cybernetic layout for the 20 canonical nodes
  const layout: Record<string, { x: number, y: number }> = {
    "iron_man": { x: 0, y: 0 },
    "captain_america": { x: -300, y: 0 },
    "thor": { x: -150, y: -200 },
    "hulk": { x: 150, y: -200 },
    "black_widow": { x: -300, y: 200 },
    "hawkeye": { x: -450, y: 200 },
    "spider_man": { x: 0, y: 300 },
    "doctor_strange": { x: 300, y: 0 },
    "black_panther": { x: 150, y: 200 },
    "captain_marvel": { x: 450, y: -200 },
    "scarlet_witch": { x: 450, y: 200 },
    "vision": { x: 600, y: 200 },
    
    "wolverine": { x: -600, y: -400 },
    "professor_x": { x: -900, y: -400 },
    "magneto": { x: -900, y: -600 },
    
    "dr_doom": { x: 600, y: -400 },
    "thanos": { x: 0, y: -600 },
    "kang": { x: 300, y: -600 },
    "starlord": { x: 300, y: -400 },
    
    "unknown_redditor": { x: 900, y: -600 }
  };

  const renderAngularEdges = () => {
    return zeynGraph.edges.map(edge => {
      const src = layout[edge.source];
      const tgt = layout[edge.target];
      if (!src || !tgt) return null;

      // Draw orthogonal (Angular/Circuit) paths: goes vertical halfway, then horizontal, then vertical
      let pathD = '';
      if (Math.abs(src.x - tgt.x) > Math.abs(src.y - tgt.y)) {
        // Horizontal priority break
        const midX = (src.x + tgt.x) / 2;
        pathD = `M ${src.x} ${src.y} L ${midX} ${src.y} L ${midX} ${tgt.y} L ${tgt.x} ${tgt.y}`;
      } else {
        // Vertical priority break
        const midY = (src.y + tgt.y) / 2;
        pathD = `M ${src.x} ${src.y} L ${src.x} ${midY} L ${tgt.x} ${midY} L ${tgt.x} ${tgt.y}`;
      }

      const isEnemy = edge.relationType === 'enemy';

      return (
        <path
          key={edge.id}
          d={pathD}
          fill="none"
          stroke={isEnemy ? 'rgba(220,38,38,0.5)' : 'rgba(56,189,248,0.4)'}
          strokeWidth={edge.weight * 5}
          className="circuit-path"
        />
      );
    });
  };

  const renderNodes = () => {
    return zeynGraph.nodes.map(node => {
      const pos = layout[node.id];
      if (!pos) return null;

      const isSelected = selectedNode?.id === node.id;

      return (
        <div 
          key={node.id} 
          className={`mock-node ${node.isUnknown ? 'is-unknown' : ''} ${isSelected ? 'is-selected' : ''}`}
          style={{ 
            transform: `translate(${pos.x - 30}px, ${pos.y - 30}px)`,
            backgroundImage: node.imageFallback ? `url(${node.imageFallback})` : 'none',
          }}
          onClick={() => setSelectedNode(node)}
          title={node.name}
        />
      );
    });
  };

  return (
    <div className="app-container">
      {/* Premium Ribbon */}
      <header className="ribbon">
        <div className="ribbon-brand">
          <img src="/images/logo.png" alt="Zeyn Logo" className="brand-logo" />
          <div className="brand-text">
            <span className="brand-zeyn">Zeyn</span>
            <span className="brand-metaverse">Metaverse Intelligence</span>
          </div>
        </div>
        <div className="ribbon-controls">
          <button className="btn"><ScanSearch size={16} /> Filter nodes</button>
          <button className="btn"><Compass size={16} /> Sort: Chronological</button>
          <button className="btn"><Zap size={16} /> Sort: Power Grid</button>
        </div>
      </header>
      
      {/* Infinite Work Plane */}
      <main 
        className="workspace"
        ref={containerRef}
        onWheel={handleWheel}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerUp}
      >
        {/* World transform layer */}
        <div 
          className="world-layer"
          style={{ transform: `translate(${transform.x}px, ${transform.y}px) scale(${transform.scale})` }}
        >
          {/* SVG underneath for technical circuit edges */}
          <svg className="edges-svg">
            {renderAngularEdges()}
          </svg>

          {/* HTML nodes over the SVG */}
          {renderNodes()}
        </div>

        {selectedNode && (
          <CharacterCardPanel 
            data={selectedNode} 
            onClose={() => setSelectedNode(null)} 
          />
        )}
      </main>
    </div>
  );
}
