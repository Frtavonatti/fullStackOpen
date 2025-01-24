import axios from "axios";
import { NewDiaryEntry } from "../types";

const baseUrl = "http://localhost:3000/api/diaries"

const getAll = async () => {
  const res = await axios.get(baseUrl)
  return res.data
}

const createNew = async (newObject: NewDiaryEntry) => {
  const res = await axios.post(baseUrl, newObject)
  return res.data
}

export { getAll, createNew }