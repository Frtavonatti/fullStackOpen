const { test, after, beforeEach } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('../utils/list_helper')
const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog')
const { log } = require('node:console')

beforeEach(async () => {
    await Blog.deleteMany({})

    for (let blog of helper.blogs) {
        let blogObject = new Blog(blog)
        await blogObject.save()
        }
    })

test('blogs are returned as json', async () => {
    await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
})

// 4.8
test('GET request returns the correct ammount of blogs in the array', async () => {
    const response = await api.get('/api/blogs')
    assert.strictEqual(response.body.length, helper.blogs.length)
})

// 4.9
test('unique identifier is `id` and not `_id`', async () => {
    const response = await api.get('/api/blogs')
    const blog = response.body[0]
    // console.log(Object.keys(blog))
    assert(blog.hasOwnProperty('id') && !blog.hasOwnProperty('_id'))
})

// //4.10
test.only('POST requests create a new object in blogsArray', async () => {
    const newBlog = {
        id: "111",
        title: "Testing POST requests",
        author: "Me",
        url: "post.com",
        likes: 5,
    }

    await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

    const notesAfterPOST = await api.get('/api/blogs')
    assert.strictEqual(notesAfterPOST.body.length, helper.blogs.length + 1)
})

// //4.11
// test('if there is no `likes` prop, it will have the value 0 by default',async () => {

// })

// //4.12
// test('if there is no `title` or `` props, the response will be 400 Bad Request', () => {

// })

after(async () => {
    await mongoose.connection.close()
})