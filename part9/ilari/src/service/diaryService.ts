import diaries from '../data/diaries';

import { DiaryEntry, NewDiaryEntry, NonSensitiveDiaryEntry } from '../types';

const getEntries = (): DiaryEntry[] => {
  return diaries;
};

const getNonSensitiveEntries = (): NonSensitiveDiaryEntry[] => {
  return diaries.map(({ id, date, weather, visibility }) => ({
    id, 
    date, 
    weather, 
    visibility,
  }));
};

const addEntry = (entry: NewDiaryEntry) => {
  const newDiaryEntry: DiaryEntry = {
    id: Math.max(...diaries.map(d => d.id)) + 1,
    ...entry
  };

  diaries.push(newDiaryEntry);
  return newDiaryEntry;
};

const findById = (id: number): DiaryEntry | undefined => {
  const entry = diaries.find(diary => diary.id === id);
  return entry;
};

export default {
  getEntries,
  getNonSensitiveEntries,
  addEntry,
  findById
};