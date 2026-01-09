import { create } from "zustand";

export interface DataEntry {
  value: number;
  timestamp: number;
}

export interface DataWithHistory {
  value: number;
  history: DataEntry[];
  addValue: (entry: DataEntry) => void;
}

const MAX_HISTORY = 200;

export const useMotor1Store = create<DataWithHistory>((set, get) => ({
  value: 0,
  history: [],
  addValue: (entry) =>
    set((state) => {
      const history = [...state.history, entry];
      if (history.length > MAX_HISTORY) history.shift(); // remove oldest
      return { value: entry.value, history };
    }),
}));

export const useMotor2Store = create<DataWithHistory>((set, get) => ({
  value: 0,
  history: [],
  addValue: (entry) =>
    set((state) => {
      const history = [...state.history, entry];
      if (history.length > MAX_HISTORY) history.shift();
      return { value: entry.value, history };
    }),
}));

export const useAccelXStore = create<DataWithHistory>((set, get) => ({
  value: 0,
  history: [],
  addValue: (entry) =>
    set((state) => {
      const history = [...state.history, entry];
      if (history.length > MAX_HISTORY) history.shift();
      return { value: entry.value, history };
    }),
}));

export const useAccelYStore = create<DataWithHistory>((set, get) => ({
  value: 0,
  history: [],
  addValue: (entry) =>
    set((state) => {
      const history = [...state.history, entry];
      if (history.length > MAX_HISTORY) history.shift();
      return { value: entry.value, history };
    }),
}));

export const useAccelZStore = create<DataWithHistory>((set, get) => ({
  value: 0,
  history: [],
  addValue: (entry) =>
    set((state) => {
      const history = [...state.history, entry];
      if (history.length > MAX_HISTORY) history.shift();
      return { value: entry.value, history };
    }),
}));

export const useGyroXStore = create<DataWithHistory>((set, get) => ({
  value: 0,
  history: [],
  addValue: (entry) =>
    set((state) => {
      const history = [...state.history, entry];
      if (history.length > MAX_HISTORY) history.shift();
      return { value: entry.value, history };
    }),
}));

export const useGyroYStore = create<DataWithHistory>((set, get) => ({
  value: 0,
  history: [],
  addValue: (entry) =>
    set((state) => {
      const history = [...state.history, entry];
      if (history.length > MAX_HISTORY) history.shift();
      return { value: entry.value, history };
    }),
}));

export const useGyroZStore = create<DataWithHistory>((set, get) => ({
  value: 0,
  history: [],
  addValue: (entry) =>
    set((state) => {
      const history = [...state.history, entry];
      if (history.length > MAX_HISTORY) history.shift();
      return { value: entry.value, history };
    }),
}));
