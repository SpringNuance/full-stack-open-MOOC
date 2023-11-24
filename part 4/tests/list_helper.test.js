const listHelper = require('../utils/list_helper')

test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
})

describe('total likes', () => {
    const listWithNoBlog = []
    const listWithOneBlog = [
      {
        _id: '5a422aa71b54a676234d17f8',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 5,
        __v: 0
      }
    ]
    const listWithTwoBlog = [
        {
          _id: '5a422aa71b54a676234d17f8',
          title: 'Go To Statement Considered Harmful',
          author: 'Edsger W. Dijkstra',
          url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
          likes: 5,
          __v: 0
        }, 
        {
            _id: '5a42uiwehfiuwehfiuw234d17f8',
            title: 'Diary Of Time',
            author: 'Spring Nuance',
            url: 'http://DiaryOfTime/page1',
            likes: 3,
            __v: 0
        }
      ]
    test('of an empty list is zero', () => {
        const result = listHelper.totalLikes(listWithNoBlog)
        expect(result).toBe(0)
    })
    test('when list has only one blog, equals the likes of that blog', () => {
      const result = listHelper.totalLikes(listWithOneBlog)
      expect(result).toBe(5)
    })
    test('of a bigger list is calculated right', () => {
        const result = listHelper.totalLikes(listWithTwoBlog)
        expect(result).toBe(8)
    })
  })

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

describe('Favourite blog', () => {   
    test('of empty list returns empty object', () => {
        const result = listHelper.favoriteBlog([])
        expect(result).toEqual({})
    })
    test('of non empty list returns correctly', () => {
        const result = listHelper.favoriteBlog(blogs)
        expect(result).toEqual(
            {
                title: "Canonical string reduction",
                author: "Edsger W. Dijkstra",
                likes: 12
            }
        )
    })
})


describe('Most Blogs', () => {
    test('of empty list returns empty object', () => {
        const result = listHelper.mostBlogs([])
        expect(result).toEqual({})
    })

    test('one blog list returns the author of that blog', () => {
        const listWithOneBlog = [
            {
              _id: '5a422aa71b54a676234d17f8',
              title: 'Go To Statement Considered Harmful',
              author: 'Edsger W. Dijkstra',
              url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
              likes: 5,
              __v: 0
            }
          ]
        const result = listHelper.mostBlogs(listWithOneBlog)
        expect(result).toEqual({
            author: 'Edsger W. Dijkstra',
            blogs: 1
        })
    })

    test('of a bigger list is calculated right', () => {
        const result = listHelper.mostBlogs(blogs)
        expect(result).toEqual({
            author: "Robert C. Martin",
            blogs: 3
        })
    })
})

describe('Most Likes', () => {
    test('of empty list returns empty object', () => {
        const result = listHelper.mostBlogs([])
        expect(result).toEqual({})
    })

    test('one blog list returns the author of that blog', () => {
        const listWithOneBlog = [
            {
              _id: '5a422aa71b54a676234d17f8',
              title: 'Go To Statement Considered Harmful',
              author: 'Edsger W. Dijkstra',
              url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
              likes: 5,
              __v: 0
            }
          ]
        const result = listHelper.mostLikes(listWithOneBlog)
        expect(result).toEqual({
            author: 'Edsger W. Dijkstra',
            likes: 5
        })
    })

    test('of a bigger list is calculated right', () => {
        const result = listHelper.mostLikes(blogs)
        expect(result).toEqual({
            author: "Edsger W. Dijkstra",
            likes: 17
        })
    })
})