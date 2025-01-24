import express from "express";
import diaryService from "../service/diaryService";
import toNewDiaryEntry from "../utils/utils";

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
  try {
    const diaryEntry = toNewDiaryEntry(req.body);
    const addedEntry = diaryService.addEntry(diaryEntry);
    res.send(addedEntry);
  } catch (error) {
    let errorMessage = 'Something went wrong.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    res.status(400).send({ error: errorMessage });
  }
});

export default router;
