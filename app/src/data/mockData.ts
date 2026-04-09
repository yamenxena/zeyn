import { ZeynGraph } from "../types/schema";

export const mockMarvelGraph: ZeynGraph = {
  nodes: [
    {
      id: "tony_stark_mcu",
      name: "Iron Man",
      realName: "Tony Stark",
      isUnknown: false,
      universe: "MCU",
      faction: "Avengers",
      metrics: {
        intelligence: 6,
        strength: 6,
        speed: 5,
        durability: 6,
        energyProjection: 6,
        fightingSkills: 4,
      },
      movies: ["Iron Man", "The Avengers", "Avengers: Endgame"],
      series: [],
      magazines: [],
      chronologicalDebut: 2008,
      description: "Genius, billionaire, playboy, philanthropist."
    },
    {
      id: "steve_rogers_mcu",
      name: "Captain America",
      realName: "Steve Rogers",
      isUnknown: false,
      universe: "MCU",
      faction: "Avengers",
      metrics: {
        intelligence: 3,
        strength: 4,
        speed: 3,
        durability: 4,
        energyProjection: 1,
        fightingSkills: 6,
      },
      movies: ["Captain America: The First Avenger", "The Avengers"],
      series: [],
      magazines: [],
      chronologicalDebut: 2011,
      description: "The First Avenger, enhanced by the Super Soldier serum."
    },
    {
      id: "thanos_mcu",
      name: "Thanos",
      realName: "Thanos of Titan",
      isUnknown: false,
      universe: "MCU",
      faction: "Black Order",
      metrics: {
        intelligence: 6,
        strength: 7,
        speed: 3,
        durability: 7,
        energyProjection: 6,
        fightingSkills: 7,
      },
      movies: ["The Avengers", "Avengers: Infinity War", "Avengers: Endgame"],
      series: [],
      magazines: [],
      chronologicalDebut: 2012,
      description: "The Mad Titan seeking balance in the universe."
    },
    {
      id: "unknown_redditor_entity",
      name: "Nightcat?",
      realName: "Unknown",
      isUnknown: true,
      universe: "Earth-616",
      faction: "None",
      metrics: {
        intelligence: 2,
        strength: 2,
        speed: 4,
        durability: 2,
        energyProjection: 1,
        fightingSkills: 3,
      },
      movies: [],
      series: [],
      magazines: ["Reddit Speculation Issues"],
      chronologicalDebut: 2026,
      description: "Flagged from subreddits as an unknown entity unverified by canonical DBs."
    }
  ],
  edges: [
    {
      id: "r1",
      source: "tony_stark_mcu",
      target: "steve_rogers_mcu",
      relationType: "ally",
      weight: 0.8
    },
    {
      id: "r2",
      source: "tony_stark_mcu",
      target: "thanos_mcu",
      relationType: "enemy",
      weight: 0.9
    },
    {
      id: "r3",
      source: "steve_rogers_mcu",
      target: "thanos_mcu",
      relationType: "enemy",
      weight: 0.85
    }
  ]
};
