"use client";
import React, { useState } from 'react';
import { zeynGraph } from '../data';
import CharacterCardPanel from '../components/canvas/CharacterCard';
import { CharacterCard } from '../types/schema';

export default function Home() {
  const [selectedNode, setSelectedNode] = useState<CharacterCard | null>(null);

  // Extremely basic radial layout for the 20 nodes for visualization purposes before WebGL is ready
  const renderMockCanvas = () => {
    return (
      <div className="canvas-area">
        {zeynGraph.nodes.map((node, i) => {
          const angle = (i / zeynGraph.nodes.length) * Math.PI * 2;
          const radius = 250;
          const top = \`calc(50% + \${Math.sin(angle) * radius}px)\`;
          const left = \`calc(50% + \${Math.cos(angle) * radius}px)\`;
          
          return (
            <div 
              key={node.id} 
              className={\`mock-node \${node.isUnknown ? 'is-unknown' : ''}\`}
              style={{ 
                top, left,
                backgroundImage: node.imageFallback ? \`url(\${node.imageFallback})\` : 'none',
                backgroundSize: 'cover',
                boxShadow: selectedNode?.id === node.id ? '0 0 0 4px var(--marvel-gold)' : '0 4px 12px rgba(0,0,0,0.5)',
                width: '40px',
                height: '40px'
              }}
              onClick={() => setSelectedNode(node)}
              title={node.name}
            />
          );
        })}
      </div>
    );
  };

  return (
    <div className="app-container">
      {/* Ribbon Navigation */}
      <header className="ribbon">
        <div className="ribbon-brand">
          <span className="brand-zeyn">Zeyn</span>
          <span className="brand-metaverse">Metaverse Visualization</span>
        </div>
        <div className="ribbon-controls">
          <button className="btn">Sort: Chronological</button>
          <button className="btn">Sort: Power Grid</button>
        </div>
      </header>
      
      {/* Workspace Area */}
      <main className="workspace">
        {renderMockCanvas()}

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
