import { test, before, beforeEach, after, only } from 'node:test'
import assert from 'assert'
import mongoose from 'mongoose'
import User from '../../models/user.js'
import Book from '../../models/book.js'
import Author from '../../models/author.js'
import mutation from './mutation.js'
import 'dotenv/config'

// Utils
const userArgs = { 
  username: 'testuser', 
  password: 'testpassword',
  favoriteGenre: 'programming'
}

const getContext = async () => {
  return {
    currentUser: await User.findOne({ username: 'testuser' })
  }
}

// Setup
before(async () => {
  const url = process.env.MONGODB_TEST_URI
  await mongoose.connect(url)
})

after(async () => {
  await mongoose.connection.close()
})

beforeEach(async () => {
  await Book.deleteMany({})
  await Author.deleteMany({})
  await User.deleteMany({})
  await mutation.createUser(null, userArgs)
  await mutation.login(null, userArgs)
})

test.only('addBook creates a new book and author if author does not exist', async () => {
  const context = await getContext();

  const args = {
    title: 'Clean Code',
    published: 2008,
    author: 'Robert Martin',
    genres: ['programming']
  }

  const book = await mutation.addBook(null, args, context)
  assert.strictEqual(book.title, args.title)
  assert.strictEqual(book.published, args.published)
  assert.strictEqual(book.genres[0], args.genres[0])

  const author = await Author.findById(book.author)
  assert.strictEqual(author.name, args.author)
})

test('addBook creates a new book with existing author', async () => {
  const context = await getContext();

  const author = new Author({ name: 'Robert Martin' })
  await author.save()

  const args = {
    title: 'Clean Architecture',
    published: 2017,
    author: 'Robert Martin',
    genres: ['programming']
  }

  const book = await mutation.addBook(null, args, context)
  assert.strictEqual(book.title, args.title)
  assert.strictEqual(book.published, args.published)
  assert.strictEqual(book.genres[0], args.genres[0])
  assert.strictEqual(book.author._id.toString(), author._id.toString())
})

test('addAuthor creates a new author', async () => {
  const args = {
    name: 'Martin Fowler',
    born: 1963
  }

  const author = await mutation.addAuthor(null, args)
  assert.strictEqual(author.name, args.name)
  assert.strictEqual(author.born, args.born)
})

test('editAuthor updates an existing author', async () => {
  const context = await getContext();

  const author = new Author({ name: 'Martin Fowler', born: 1963 })
  await author.save()

  const args = {
    name: 'Martin Fowler',
    setBornTo: 1964
  }

  const updatedAuthor = await mutation.editAuthor(null, args, context)
  assert.strictEqual(updatedAuthor.born, args.setBornTo)
})

test('createUser creates a new user', async () => {
  const args = { 
    username: 'anotheruser', 
    password: 'testpassword',
    favoriteGenre: 'fiction'
  }

  const user = await mutation.createUser(null, args)

  assert.strictEqual(user.username, args.username)
  assert.strictEqual(user.favoriteGenre, args.favoriteGenre)
})

test('login returns a token', async () => {
  const token = await mutation.login(null, userArgs)
  assert(token.value)
})