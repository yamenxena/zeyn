"use client";
import React from 'react';
import { CharacterCard as CardType } from '../../types/schema';

type Props = {
  data: CardType | null;
  onClose: () => void;
};

// Ratio Circle for metrics (1-7 scale) with a sci-fi tech overlay vibe
const RatioCircle = ({ label, value }: { label: string, value: number }) => {
  const fraction = value / 7;
  const radius = 20;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - fraction * circumference;
  
  return (
    <div className="metric-row">
      <div className="metric-circle-wrapper">
        <svg className="metric-svg" width="48" height="48">
          <circle className="metric-bg" cx="24" cy="24" r={radius} />
          <circle 
            className="metric-fg" 
            cx="24" cy="24" r={radius} 
            strokeDasharray={circumference} 
            strokeDashoffset={offset} 
          />
        </svg>
        <span className="metric-val">{value}</span>
      </div>
      <span className="metric-label">{label}</span>
    </div>
  );
};

export default function CharacterCardPanel({ data, onClose }: Props) {
  if (!data) return null;

  return (
    <div className={`character-panel ${data.isUnknown ? 'is-unknown' : 'is-canonical'}`}>
      <button className="close-btn" onClick={onClose}>×</button>
      
      <div 
        className="cinematic-banner" 
        style={{ backgroundImage: data.imageFallback ? `url(${data.imageFallback})` : 'none' }}
      >
        <div className="banner-overlay">
          <div className="status-badge">
            {data.isUnknown ? 'UNKNOWN ENTITY' : 'CANONICAL'}
          </div>
          <h2 className="char-name">{data.name}</h2>
          <h4 className="char-real-name">{data.realName}</h4>
          <div className="char-universe">{data.universe} &middot; {data.faction}</div>
        </div>
      </div>
      
      <div className="panel-body">
        <p className="char-desc">{data.description}</p>

        <h3 className="section-title">Power Grid (1-7)</h3>
        <div className="metrics-grid">
          <RatioCircle label="Intelligence" value={data.metrics.intelligence} />
          <RatioCircle label="Strength" value={data.metrics.strength} />
          <RatioCircle label="Speed" value={data.metrics.speed} />
          <RatioCircle label="Durability" value={data.metrics.durability} />
          <RatioCircle label="Energy Projection" value={data.metrics.energyProjection} />
          <RatioCircle label="Fighting Skills" value={data.metrics.fightingSkills} />
        </div>

        <h3 className="section-title">Appearances</h3>
        <div className="appearance-list">
          {data.movies.length > 0 && <div className="app-tag">Movies: {data.movies.length}</div>}
          {data.series.length > 0 && <div className="app-tag">Series: {data.series.length}</div>}
          {data.magazines.length > 0 && <div className="app-tag">Mags: {data.magazines.length}</div>}
          <div className="app-tag chronological-debut">Debut: {data.chronologicalDebut}</div>
        </div>
      </div>
    </div>
  );
}
