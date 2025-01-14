import diaries from '../data/diaries';

import { DiaryEntry, NonSensitiveDiaryEntry } from '../types';

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

const addEntry = () => {
  return null;
};

export default {
  getEntries,
  getNonSensitiveEntries,
  addEntry
};