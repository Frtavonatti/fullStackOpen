const { test, describe } = require('node:test')
const assert = require('node:assert')

const { blogs, mostLiked } = require('../utils/list_helper')

describe('mostLikes', () => {
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
        assert.deepStrictEqual(mostLiked([]), undefined)
    })

    test('when list has only one blog equals to that blog', () => {
        assert.deepStrictEqual(mostLiked(listWithOneBlog), listWithOneBlog[0])
    })

    test('of a bigger list is calculated right', () => {
        assert.deepStrictEqual(mostLiked(blogs), {
            _id: '5a422b3a1b54a676234d17f9',
            title: 'Canonical string reduction',
            author: 'Edsger W. Dijkstra',
            url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
            likes: 12,
            __v: 0
        })
    })
})