import { test, before, beforeEach, after } from 'node:test'
import assert from 'assert'
import mongoose from 'mongoose'
import User from '../../models/user.js'
import Book from '../../models/book.js'
import Author from '../../models/author.js'
import mutation from './mutation.js'
import query from './query.js'
import 'dotenv/config.js'

before(async () => {
  const url = process.env.MONGODB_TEST_URI
  await mongoose.connect(url)
})

beforeEach(async () => {
  await Book.deleteMany({})
  await Author.deleteMany({})
  await User.deleteMany({})

    const author = new Author({
      name: 'Robert Martin',
      born: 1952
    })
    await author.save()
  
    const book = new Book({
      title: 'Clean Code',
      published: 2008,
      author: author._id,
      genres: ['refactoring', 'programming']
    })
    await book.save()
})

after(async () => {
  await mongoose.connection.close()
})

test('bookCount returns the correct number of books', async () => {
  const count = await query.bookCount()
  assert.strictEqual(count, await Book.collection.countDocuments())
})

test('authorCount returns the correct number of authors', async () => {
  const count = await query.authorCount()
  assert.strictEqual(count, await Author.collection.countDocuments())
})

test('allBooks returns all books when no arguments are provided', async () => {
  const books = await query.allBooks(null, {})
  assert.strictEqual(books.length, await Book.collection.countDocuments())
})

test('allBooks returns books filtered by genre', async () => {
  const genre = 'refactoring'
  const books = await query.allBooks(null, { genre })
  books.forEach(book => {
    assert(book.genres.includes(genre))
  })
})

test('allBooks returns books filtered by author', async () => {
  const authorName = 'Robert Martin'
  const books = await query.allBooks(null, { author: authorName })
  
  assert(books.length > 0)
  books.forEach(book => {
    assert.strictEqual(book.author.name, authorName)
  })
})

test('allAuthors returns all authors', async () => {
  const authors = await query.allAuthors()
  assert.strictEqual(authors.length, await Author.collection.countDocuments())
})

test('me returns the current user', async () => {
  const user = { 
    username: 'test',
    password: 'password',  
    favoriteGenre: 'test' 
  }
  
  await mutation.createUser(null, user)

  const getContext = async () => {
    return {
      currentUser: await User.findOne({ username: 'test' })
    }
  }
  const context = await getContext()

  const currentUser = await query.me(null, null, context)
  assert.deepStrictEqual(currentUser.username, user.username)
  assert.deepStrictEqual(currentUser.favoriteGenre, user.favoriteGenre)
})