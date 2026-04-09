// Auto-generated export
import { ZeynGraph, CharacterCard, RelationEdge } from '../types/schema';
import iron_man from './characters/iron_man.json';
import captain_america from './characters/captain_america.json';
import thor from './characters/thor.json';
import hulk from './characters/hulk.json';
import black_widow from './characters/black_widow.json';
import hawkeye from './characters/hawkeye.json';
import spider_man from './characters/spider_man.json';
import doctor_strange from './characters/doctor_strange.json';
import black_panther from './characters/black_panther.json';
import captain_marvel from './characters/captain_marvel.json';
import scarlet_witch from './characters/scarlet_witch.json';
import vision from './characters/vision.json';
import wolverine from './characters/wolverine.json';
import professor_x from './characters/professor_x.json';
import magneto from './characters/magneto.json';
import dr_doom from './characters/dr_doom.json';
import thanos from './characters/thanos.json';
import kang from './characters/kang.json';
import starlord from './characters/starlord.json';
import unknown_redditor from './characters/unknown_redditor.json';

export const nodes: CharacterCard[] = [
  iron_man as CharacterCard,
  captain_america as CharacterCard,
  thor as CharacterCard,
  hulk as CharacterCard,
  black_widow as CharacterCard,
  hawkeye as CharacterCard,
  spider_man as CharacterCard,
  doctor_strange as CharacterCard,
  black_panther as CharacterCard,
  captain_marvel as CharacterCard,
  scarlet_witch as CharacterCard,
  vision as CharacterCard,
  wolverine as CharacterCard,
  professor_x as CharacterCard,
  magneto as CharacterCard,
  dr_doom as CharacterCard,
  thanos as CharacterCard,
  kang as CharacterCard,
  starlord as CharacterCard,
  unknown_redditor as CharacterCard,
];

import edgesData from './edges/relations.json';
export const edges: RelationEdge[] = edgesData as RelationEdge[];

export const zeynGraph: ZeynGraph = { nodes, edges };
