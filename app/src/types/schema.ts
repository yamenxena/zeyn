export type Metrics = {
  intelligence: number;
  strength: number;
  speed: number;
  durability: number;
  energyProjection: number;
  fightingSkills: number;
};

export type CharacterCard = {
  id: string;
  name: string;
  realName: string;
  isUnknown: boolean;
  universe: string; // e.g. "MCU", "Earth-616"
  faction: string;  // e.g. "Avengers", "X-Men"
  metrics: Metrics;
  movies: string[];
  series: string[];
  magazines: string[];
  chronologicalDebut: number; // year e.g. 1939
  description: string;
  imageFallback?: string;
};

export type RelationEdge = {
  id: string;
  source: string; // CharacterCard id
  target: string; // CharacterCard id
  relationType: 'ally' | 'enemy' | 'neutral';
  weight: number; // 0 to 1 scaling thickness
};

export type ZeynGraph = {
  nodes: CharacterCard[];
  edges: RelationEdge[];
};
