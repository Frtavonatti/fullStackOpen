import { test, before, after } from 'node:test'
import assert from 'assert'
import mongoose from 'mongoose'
import Book from '../../models/book.js'
import Author from '../../models/author.js'
import query from './query.js'
import 'dotenv/config.js'

before(async () => {
  const url = process.env.MONGODB_TEST_URI
  await mongoose.connect(url)
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

// TEST FAILS
test('allBooks returns books filtered by author', async () => {
  const authorName = 'Robert Martin'
  const author = await Author.findOne({ name: authorName })
  const books = await query.allBooks(null, { author: author._id })
  books.forEach(book => {
    assert.strictEqual(book.author.toString(), author._id.toString())
  })
})

test('allAuthors returns all authors', async () => {
  const authors = await query.allAuthors()
  assert.strictEqual(authors.length, await Author.collection.countDocuments())
})

test('me returns the current user', async () => {
  const user = { username: 'test', favoriteGenre: 'test' }
  const currentUser = query.me(null, null, { currentUser: user })
  assert.deepStrictEqual(currentUser, user)
})