import { v1 as uuid } from 'uuid'
import { books, authors } from "../../data.js"

const mutation = {
  addBook: (root, args) => {
    const newBook = {
      ...args,
      id: uuid()
    }
    books.push(newBook)
    return newBook
  }, 
  editAuthor: (root, args) => {
    const authorIndex = authors.findIndex((a) => a.name === args.name);
    if (authorIndex === -1) {
      return null;
    }
    const updatedAuthor = {
      ...authors[authorIndex],
      born: args.setBornTo
    };
    authors[authorIndex] = updatedAuthor;
    return updatedAuthor;
  }
} 

export default mutation