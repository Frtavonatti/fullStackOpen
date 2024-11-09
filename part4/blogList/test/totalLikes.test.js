const { test, describe } = require('node:test')
const assert = require('node:assert')

const { blogs, totalLikes } = require('../utils/list_helper')

describe('totalLikes', () => {
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

    test('of empty list is zero', () => {
        assert.strictEqual(totalLikes([]), 0)
    })

    test('when list has only one blog equals the likes of that', () => {
        assert.strictEqual(totalLikes(listWithOneBlog), 5)
    })

    test('of a bigger list is calculated right', () => {
        assert.strictEqual(totalLikes(blogs), 36)
    })
})