const { test, after, beforeEach, describe } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('../utils/list_helper')
const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog')

describe('Blog API tests', () => {
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
    
        assert(blog.hasOwnProperty('id') && !blog.hasOwnProperty('_id'))
    })
    
    //4.10
    test('POST requests create a new object in blogsArray', async () => {
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
    
        const blogsAfterPOST = await api.get('/api/blogs')
        assert.strictEqual(blogsAfterPOST.body.length, helper.blogs.length + 1)
    })
    
    //4.11
    test('if there is no `likes` prop, it will have the value 0 by default',async () => {
        const newBlog = {
            id: "111",
            title: "Testing POST requests",
            author: "Me",
            url: "post.com"
        }
    
        const lastBlogPost = await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)
    
        const response = lastBlogPost.body
        assert.strictEqual(response.likes, 0)        
        console.log('Likes: ', response.likes);
    })
    
    //4.12
    test('if there is no `title` or `URL` props, the response will be 400 Bad Request', async () => {
        const newBlog = {
            id: "111",
            title: "Testing POST requests",
            author: "Me",
        }
    
        const lastBlogPost = await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(400)
            .expect('Content-Type', /application\/json/)
    
        console.log('res.status: ', lastBlogPost.status)
        assert.strictEqual(lastBlogPost.status, 400)
    })

    //4.13 DELETE
    test('a blog can be deleted', async () => {
        const initialArray = await helper.blogsInDB()
        console.log('START', initialArray.length)

        const noteToDelete = initialArray[0].id
        
        await api
            .delete(`/api/blogs/${noteToDelete}`)
            .expect(204)
        
        const finalArray = await helper.blogsInDB()
        console.log('END', finalArray.length);

        assert.strictEqual(finalArray.length, initialArray.length - 1)
    })

    //4.14 PUT
    test('the likes of a blog can be updated', async () => {
        const initialArray = await helper.blogsInDB()
        const noteToUpdate = await initialArray[0].id
        
        const updates = {
            likes: 111
        }

        const response = await api
            .put(`/api/blogs/${noteToUpdate}`)
            .send(updates)
            .expect(200)
            .expect('Content-Type', /application\/json/)
            
        const updatedBlog = response.body
        console.log(updatedBlog) 
        assert.strictEqual(updatedBlog.likes, 111)

        const updatedArray = await helper.blogsInDB();       
        const updatedBlogFromDB = updatedArray.find(blog => blog.id === noteToUpdate);
        assert.strictEqual(updatedBlogFromDB.likes, 111);
        })
})

after(async () => {
    await mongoose.connection.close()
})