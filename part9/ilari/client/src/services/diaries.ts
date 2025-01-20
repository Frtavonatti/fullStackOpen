import axios from "axios";
import { NewDiaryEntry } from "../types";

const baseUrl = "http://localhost:3000/api/diaries"

const getAll = () => {
  return axios.get(baseUrl).then(res => res.data)
}

const createNew = (newObject: NewDiaryEntry) => {
  return axios.post(baseUrl, newObject)
    .then(res => res.data)
}

export { getAll, createNew }