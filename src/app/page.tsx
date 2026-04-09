"use client";
import React, { useState, useRef, useEffect, useMemo } from 'react';
import { zeynGraph } from '../data';
import CharacterCardPanel from '../components/canvas/CharacterCard';
import { CharacterCard } from '../types/schema';
import { Compass, Zap, ScanSearch, ZoomIn, ZoomOut, RotateCcw } from 'lucide-react';

type SortMode = 'chronological' | 'power';

// --- iTOL-style Circular Dendrogram Layout Engine ---
function computeCircularLayout(
  nodes: CharacterCard[],
  sortMode: SortMode
): Record<string, { x: number; y: number; angle: number; radius: number }> {
  // Group nodes by faction for the dendrogram structure
  const factions: Record<string, CharacterCard[]> = {};
  nodes.forEach(n => {
    const key = n.faction || 'None';
    if (!factions[key]) factions[key] = [];
    factions[key].push(n);
  });

  // Sort within factions
  Object.values(factions).forEach(group => {
    if (sortMode === 'chronological') {
      group.sort((a, b) => a.chronologicalDebut - b.chronologicalDebut);
    } else {
      group.sort((a, b) => {
        const totalPower = (c: CharacterCard) =>
          c.metrics.intelligence + c.metrics.strength + c.metrics.speed +
          c.metrics.durability + c.metrics.energyProjection + c.metrics.fightingSkills;
        return totalPower(b) - totalPower(a);
      });
    }
  });

  // Sort faction keys for consistent ordering
  const factionKeys = Object.keys(factions).sort();
  const totalNodes = nodes.length;
  const outerRadius = 500;

  const layout: Record<string, { x: number; y: number; angle: number; radius: number }> = {};
  let nodeIndex = 0;

  factionKeys.forEach(faction => {
    const group = factions[faction];
    group.forEach(node => {
      const angle = (nodeIndex / totalNodes) * Math.PI * 2 - Math.PI / 2;
      const x = Math.cos(angle) * outerRadius;
      const y = Math.sin(angle) * outerRadius;
      layout[node.id] = { x, y, angle, radius: outerRadius };
      nodeIndex++;
    });
  });

  return layout;
}

// Build faction arc data for the inner annotation rings
function computeFactionArcs(
  nodes: CharacterCard[],
  layout: Record<string, { x: number; y: number; angle: number; radius: number }>
) {
  const factions: Record<string, { startAngle: number; endAngle: number; color: string }> = {};
  const factionColors: Record<string, string> = {
    'Avengers': '#3b82f6',
    'X-Men': '#f59e0b',
    'Brotherhood': '#ef4444',
    'Black Order': '#a855f7',
    'Guardians': '#22c55e',
    'None': '#6b7280',
    'Unknown': '#64748b',
  };

  const factionNodes: Record<string, CharacterCard[]> = {};
  nodes.forEach(n => {
    const key = n.faction || 'None';
    if (!factionNodes[key]) factionNodes[key] = [];
    factionNodes[key].push(n);
  });

  Object.keys(factionNodes).forEach(faction => {
    const group = factionNodes[faction];
    const angles = group.map(n => layout[n.id]?.angle ?? 0);
    if (angles.length === 0) return;
    const minAngle = Math.min(...angles);
    const maxAngle = Math.max(...angles);
    // Pad the arc slightly
    const pad = 0.03;
    factions[faction] = {
      startAngle: minAngle - pad,
      endAngle: maxAngle + pad,
      color: factionColors[faction] || '#6b7280',
    };
  });

  return factions;
}

export default function Home() {
  const [selectedNode, setSelectedNode] = useState<CharacterCard | null>(null);
  const [sortMode, setSortMode] = useState<SortMode>('chronological');

  // --- Pan / Zoom Engine ---
  const containerRef = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState({ x: 0, y: 0, scale: 0.65 });
  const [isAnimating, setIsAnimating] = useState(false);
  const isDragging = useRef(false);
  const lastMousePos = useRef({ x: 0, y: 0 });

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const scaleAdjust = e.deltaY > 0 ? 0.92 : 1.08;
    const newScale = Math.max(0.15, Math.min(transform.scale * scaleAdjust, 5));
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
    if ((e.target as HTMLElement).closest('.character-panel')) return;
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

  const resetView = () => {
    if (containerRef.current) {
      const w = containerRef.current.clientWidth;
      const h = containerRef.current.clientHeight;
      setIsAnimating(true);
      setTransform({ x: w / 2, y: h / 2, scale: 0.65 });
      setTimeout(() => setIsAnimating(false), 600);
    }
  };

  // Zoom-to-node: centers the viewport on a node and zooms in
  const zoomToNode = (nodeId: string) => {
    const pos = layout[nodeId];
    if (!pos || !containerRef.current) return;
    const w = containerRef.current.clientWidth;
    const h = containerRef.current.clientHeight;
    // The SVG viewBox is -700..700 mapped to 1400x1400 CSS px,
    // so SVG coords map 1:1 to world-layer px (offset by the SVG transform of -700)
    const worldX = pos.x; // already in world-layer coords (SVG centered at 0,0)
    const worldY = pos.y;
    const targetScale = 1.8;
    // We want: screenCenter = translate + worldCoord * scale
    // So: translate = screenCenter - worldCoord * scale
    const newX = w / 2 - worldX * targetScale;
    const newY = h / 2 - worldY * targetScale;
    setIsAnimating(true);
    setTransform({ x: newX, y: newY, scale: targetScale });
    setTimeout(() => setIsAnimating(false), 600);
  };

  const handleNodeClick = (node: CharacterCard) => {
    setSelectedNode(node);
    zoomToNode(node.id);
  };

  useEffect(() => { resetView(); }, []);

  // --- Compute Layout ---
  const layout = useMemo(
    () => computeCircularLayout(zeynGraph.nodes, sortMode),
    [sortMode]
  );

  const factionArcs = useMemo(
    () => computeFactionArcs(zeynGraph.nodes, layout),
    [layout]
  );

  // --- SVG Rendering ---
  const renderEdges = () => {
    return zeynGraph.edges.map(edge => {
      const src = layout[edge.source];
      const tgt = layout[edge.target];
      if (!src || !tgt) return null;

      const isEnemy = edge.relationType === 'enemy';
      const strokeColor = isEnemy ? 'rgba(239,68,68,0.35)' : 'rgba(59,130,246,0.3)';

      // Draw curved connections through the center for that iTOL aesthetic
      return (
        <path
          key={edge.id}
          d={`M ${src.x} ${src.y} Q 0 0 ${tgt.x} ${tgt.y}`}
          fill="none"
          stroke={strokeColor}
          strokeWidth={Math.max(1, edge.weight * 3)}
          className="circuit-path"
        />
      );
    });
  };

  const renderFactionArcs = () => {
    const innerR = 420;
    const outerR = 440;
    return Object.entries(factionArcs).map(([faction, arc]) => {
      const x1i = Math.cos(arc.startAngle) * innerR;
      const y1i = Math.sin(arc.startAngle) * innerR;
      const x2i = Math.cos(arc.endAngle) * innerR;
      const y2i = Math.sin(arc.endAngle) * innerR;
      const x1o = Math.cos(arc.startAngle) * outerR;
      const y1o = Math.sin(arc.startAngle) * outerR;
      const x2o = Math.cos(arc.endAngle) * outerR;
      const y2o = Math.sin(arc.endAngle) * outerR;
      const largeArc = arc.endAngle - arc.startAngle > Math.PI ? 1 : 0;

      return (
        <g key={faction}>
          <path
            d={`M ${x1i} ${y1i} A ${innerR} ${innerR} 0 ${largeArc} 1 ${x2i} ${y2i} L ${x2o} ${y2o} A ${outerR} ${outerR} 0 ${largeArc} 0 ${x1o} ${y1o} Z`}
            fill={arc.color}
            opacity={0.25}
          />
          {/* Faction label */}
          <text
            x={Math.cos((arc.startAngle + arc.endAngle) / 2) * (outerR + 25)}
            y={Math.sin((arc.startAngle + arc.endAngle) / 2) * (outerR + 25)}
            fill={arc.color}
            fontSize="11"
            fontWeight="600"
            textAnchor="middle"
            dominantBaseline="middle"
            style={{ letterSpacing: '0.08em', textTransform: 'uppercase' } as React.CSSProperties}
          >
            {faction}
          </text>
        </g>
      );
    });
  };

  // Radial tick lines from center to each node
  const renderRadialLines = () => {
    return zeynGraph.nodes.map(node => {
      const pos = layout[node.id];
      if (!pos) return null;
      return (
        <line
          key={`radial-${node.id}`}
          x1={0} y1={0}
          x2={pos.x * 0.85} y2={pos.y * 0.85}
          stroke="rgba(255,255,255,0.04)"
          strokeWidth={1}
        />
      );
    });
  };

  // Concentric rings
  const renderConcentricRings = () => {
    return [200, 350, 500].map(r => (
      <circle
        key={`ring-${r}`}
        cx={0} cy={0} r={r}
        fill="none"
        stroke="rgba(255,255,255,0.04)"
        strokeWidth={1}
        strokeDasharray="4 8"
      />
    ));
  };

  // Power metric annotation ring (outer colored bars per node)
  const renderMetricRing = () => {
    const metricR = 540;
    const barLen = 40;
    return zeynGraph.nodes.map(node => {
      const pos = layout[node.id];
      if (!pos) return null;
      const totalPower = node.metrics.intelligence + node.metrics.strength +
        node.metrics.speed + node.metrics.durability +
        node.metrics.energyProjection + node.metrics.fightingSkills;
      const fraction = totalPower / 42; // max is 7*6 = 42
      const x1 = Math.cos(pos.angle) * metricR;
      const y1 = Math.sin(pos.angle) * metricR;
      const x2 = Math.cos(pos.angle) * (metricR + barLen * fraction);
      const y2 = Math.sin(pos.angle) * (metricR + barLen * fraction);

      const hue = fraction > 0.7 ? '45' : fraction > 0.5 ? '200' : '0';
      return (
        <line
          key={`metric-${node.id}`}
          x1={x1} y1={y1} x2={x2} y2={y2}
          stroke={`hsla(${hue}, 80%, 60%, 0.6)`}
          strokeWidth={6}
          strokeLinecap="round"
        />
      );
    });
  };

  const renderNodes = () => {
    return zeynGraph.nodes.map(node => {
      const pos = layout[node.id];
      if (!pos) return null;
      const isSelected = selectedNode?.id === node.id;
      // Rotate label to follow radial direction
      const labelAngleDeg = (pos.angle * 180 / Math.PI);
      const flipLabel = labelAngleDeg > 90 || labelAngleDeg < -90;

      return (
        <g key={node.id} className="node-group">
          {/* The circle portrait */}
          <foreignObject
            x={pos.x - 32}
            y={pos.y - 32}
            width={64}
            height={64}
            style={{ overflow: 'visible' }}
          >
            <div
              className={`graph-node ${node.isUnknown ? 'is-unknown' : ''} ${isSelected ? 'is-selected' : ''}`}
              style={{
                backgroundImage: node.imageFallback ? `url(${node.imageFallback})` : 'none',
              }}
              onClick={() => handleNodeClick(node)}
            />
          </foreignObject>
          {/* Character name label */}
          <text
            x={Math.cos(pos.angle) * (pos.radius + 50)}
            y={Math.sin(pos.angle) * (pos.radius + 50)}
            fill="rgba(255,255,255,0.8)"
            fontSize="11"
            fontWeight="500"
            textAnchor={flipLabel ? 'end' : 'start'}
            dominantBaseline="middle"
            transform={`rotate(${flipLabel ? labelAngleDeg + 180 : labelAngleDeg}, ${Math.cos(pos.angle) * (pos.radius + 50)}, ${Math.sin(pos.angle) * (pos.radius + 50)})`}
            style={{ pointerEvents: 'none' }}
          >
            {node.name}
          </text>
        </g>
      );
    });
  };

  return (
    <div className="app-container">
      {/* Premium Ribbon */}
      <header className="ribbon">
        <div className="ribbon-brand">
          <img src="/images/logo.png" alt="Zeyn" className="brand-logo" />
          <div className="brand-text">
            <span className="brand-zeyn">Zeyn</span>
            <span className="brand-metaverse">Metaverse Intelligence</span>
          </div>
        </div>
        <div className="ribbon-controls">
          <button
            className={`btn ${sortMode === 'chronological' ? 'btn-active' : ''}`}
            onClick={() => setSortMode('chronological')}
          >
            <Compass size={14} /> Chronological
          </button>
          <button
            className={`btn ${sortMode === 'power' ? 'btn-active' : ''}`}
            onClick={() => setSortMode('power')}
          >
            <Zap size={14} /> Power Grid
          </button>
          <div className="ribbon-divider" />
          <button className="btn btn-icon" onClick={() => setTransform(p => ({ ...p, scale: Math.min(p.scale * 1.2, 5) }))}>
            <ZoomIn size={16} />
          </button>
          <button className="btn btn-icon" onClick={() => setTransform(p => ({ ...p, scale: Math.max(p.scale * 0.8, 0.15) }))}>
            <ZoomOut size={16} />
          </button>
          <button className="btn btn-icon" onClick={resetView}>
            <RotateCcw size={16} />
          </button>
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
        <div
          className={`world-layer ${isAnimating ? 'is-animating' : ''}`}
          style={{ transform: `translate(${transform.x}px, ${transform.y}px) scale(${transform.scale})` }}
        >
          <svg className="dendrogram-svg" viewBox="-700 -700 1400 1400" preserveAspectRatio="xMidYMid meet">
            {renderConcentricRings()}
            {renderRadialLines()}
            {renderFactionArcs()}
            {renderMetricRing()}
            {renderEdges()}
            {renderNodes()}
          </svg>
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
