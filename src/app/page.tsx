"use client";
import React, { useState } from 'react';
import { mockMarvelGraph } from '../data/mockData';
import CharacterCardPanel from '../components/canvas/CharacterCard';
import { CharacterCard } from '../types/schema';

export default function Home() {
  const [selectedNode, setSelectedNode] = useState<CharacterCard | null>(null);

  // Simple mock renderer for WebGL/D3 placeholder
  const renderMockCanvas = () => {
    // Arbitrary placement for demonstration
    const positions = [
      { top: '30%', left: '40%' },
      { top: '60%', left: '30%' },
      { top: '45%', left: '60%' },
      { top: '20%', left: '70%' },
    ];

    return (
      <div className="canvas-area">
        {mockMarvelGraph.nodes.map((node, i) => (
          <div 
            key={node.id} 
            className={`mock-node ${node.isUnknown ? 'is-unknown' : ''}`}
            style={{ 
              top: positions[i].top, 
              left: positions[i].left,
              boxShadow: selectedNode?.id === node.id ? '0 0 0 4px rgba(255,255,255,0.2)' : 'none'
            }}
            onClick={() => setSelectedNode(node)}
            title={node.name}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="app-container">
      {/* Ribbon Navigation */}
      <header className="ribbon">
        <div className="ribbon-brand">
          <span className="brand-zeyn">Zeyn</span>
          <span className="brand-metaverse">Metaverse Intelligence</span>
        </div>
        <div className="ribbon-controls">
          <button className="btn">Sort: Chronological</button>
          <button className="btn">Sort: Power Grid</button>
          <button className="btn btn-primary">Run Seeker Agent</button>
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
