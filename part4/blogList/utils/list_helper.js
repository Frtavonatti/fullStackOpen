const Blog = require('../models/blog')

const blogs = [
  {
    _id: "5a422a851b54a676234d17f7",
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
    __v: 0
  },
  {
    _id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
    __v: 0
  },
  {
    _id: "5a422b3a1b54a676234d17f9",
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12,
    __v: 0
  },
  {
    _id: "5a422b891b54a676234d17fa",
    title: "First class tests",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
    likes: 10,
    __v: 0
  },
  {
    _id: "5a422ba71b54a676234d17fb",
    title: "TDD harms architecture",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
    likes: 0,
    __v: 0
  },
  {
    _id: "5a422bc61b54a676234d17fc",
    title: "Type wars",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    likes: 2,
    __v: 0
  }  
]

const blogsInDB = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

// const dummy = (blogs) => {
//     return 1
// }

// const totalLikes = (array) => {
//     let sum = 0
//     for (element of array) {
//         sum += element.likes
//     }
//     return sum
// }

// const mostLiked = (array) => {
//     let comparison = 0
//     let mostLikedElement

//     for (const element of array) {
//         if (element.likes > comparison) {
//             comparison = element.likes
//             mostLikedElement = element
//         }
//     }
//     return mostLikedElement
// }

// const authorWithMostBlogs = (array) => {
//     const authorBlogCount = {}

//     for (const element of array) {
//         if (authorBlogCount[element.author]) {
//             authorBlogCount[element.author] += 1
//         } else {
//             authorBlogCount[element.author] = 1
//         }
//     }
    

//     let mostActiveAuthor = null
//     let maxBlogs = 0

//     for (const author in authorBlogCount) {
//         if (authorBlogCount[author] > maxBlogs) {
//             maxBlogs = authorBlogCount[author]
//             mostActiveAuthor = author
//         }
//     }

//     return {
//         author: mostActiveAuthor,
//         blogs: maxBlogs
//     }
// }

// const authorWithMostLikes = (array) => {
//     const authorLikesCount = {}

//     for (const element of array) {
//         if (authorLikesCount[element.author]) {
//             authorLikesCount[element.author] += element.likes
//         } else {
//             authorLikesCount[element.author] = element.likes
//         }
//     }

//     let mostLikedAuthor = null
//     let maxLikes = 0 

//     for (const author in authorLikesCount) {
//         if (authorLikesCount[author] > maxLikes) {
//             maxLikes = authorLikesCount[author]
//             mostLikedAuthor = author
//         }
//     }

//     return {
//         author: mostLikedAuthor,
//         likes: maxLikes 
//     }
// }

// console.log('TotalLikes: ', totalLikes(blogs))
// console.log('MostLikedBlog: ', mostLiked(blogs))
// console.log('AuthorWithMostBlogs: ', authorWithMostBlogs(blogs))
// console.log('AuthorWithMostLikes: ', authorWithMostLikes(blogs))

// module.exports = { blogs, dummy, totalLikes, mostLiked, authorWithMostBlogs, authorWithMostLikes }


module.exports = { blogs, blogsInDB }
