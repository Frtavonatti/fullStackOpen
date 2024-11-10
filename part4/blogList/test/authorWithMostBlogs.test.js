const { test, describe } = require('node:test')
const assert = require('node:assert')

const { blogs, authorWithMostBlogs } = require('../utils/list_helper')

describe('Author with the most ammount of blogs', () => {
    const listWithOneBlog = [
        {
        _id: '5a422aa71b54a676234d17f8',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
        likes: 5,
        __v: 0
        }
    ]

    test('of empty array is null', () => {
        const result = authorWithMostBlogs([])
        console.log('Result:', result)
        assert.deepStrictEqual(result, {
            author: null,
            blogs: 0
        })
    })

    test('when list has only one blog equals to that blog', () => {
        const result = authorWithMostBlogs(listWithOneBlog)
        console.log('Result:', result)
        assert.deepStrictEqual(result, {
            author: 'Edsger W. Dijkstra',
            blogs: 1
        })
    })

    test('of a bigger list is calculated right', () => {
        const result = authorWithMostBlogs(blogs)
        console.log('Result:', result)
        assert.deepStrictEqual(result, { 
            author: 'Robert C. Martin',
            blogs: 3 
        })
    })
})