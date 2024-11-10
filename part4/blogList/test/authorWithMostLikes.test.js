const { test, describe } = require('node:test')
const assert = require('node:assert')

const { blogs, authorWithMostLikes } = require('../utils/list_helper')

describe('Author with the most ammount of likes', () => {
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
        const result = authorWithMostLikes([])
        console.log('Result:', result)
        assert.deepStrictEqual(result, {
            author: null,
            likes: 0
        })
    })

    test('when list has only one blog equals to that blog', () => {
        const result = authorWithMostLikes(listWithOneBlog)
        console.log('Result:', result)
        assert.deepStrictEqual(result, {
            author: 'Edsger W. Dijkstra',
            likes: 5
        })
    })

    test('of a bigger list is calculated right', () => {
        const result = authorWithMostLikes(blogs)
        console.log('Result:', result)
        assert.deepStrictEqual(result, { 
            author: 'Robert C. Martin',
            likes: 12 
        })
    })
})