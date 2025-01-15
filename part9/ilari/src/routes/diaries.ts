import express from "express";
import diaryService from "../service/diaryService";
import { NewDiaryEntry } from "../types";

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(diaryService.getNonSensitiveEntries());
});

router.get('/:id', (req, res) => {
  const id: number = Number(req.params.id);
  const diary = diaryService.findById(id);

  if (diary) {
    res.send(diary);
  } else {
    res.sendStatus(404);
  }
});

router.post('/', (req, res) => {
  const { date, weather, visibility, comment } = req.body as NewDiaryEntry; // This was my solution instead of using disable-no-unsafe-vars

  const newDiaryEntry = diaryService.addEntry({
    date,
    weather,
    visibility,
    comment
  });
  res.send(newDiaryEntry);
});

export default router;