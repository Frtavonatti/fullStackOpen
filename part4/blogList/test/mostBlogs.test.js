const { test, describe } = require('node:test')
const assert = require('node:assert')

const { blogs, mostBlogs } = require('../utils/list_helper')

describe('', () => {
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

    test('of empty array is undefined', () => {
        assert.deepStrictEqual(mostBlogs([]), undefined || null)
    })

    test('when list has only one blog equals to that blog', () => {
        assert.deepStrictEqual(mostBlogs(listWithOneBlog), 'Edsger W. Dijkstra')
    })

    test('of a bigger list is calculated right', () => {
        assert.deepStrictEqual(mostBlogs(blogs), 'Robert C. Martin')
    })
})