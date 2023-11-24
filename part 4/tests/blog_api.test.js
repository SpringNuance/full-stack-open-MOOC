const supertest = require('supertest')
const mongoose = require('mongoose')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog')

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(helper.initialBlogs)
})

describe('when there is initially some notes saved', () => {

// Step 1
  test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body).toHaveLength(helper.initialBlogs.length)
  })

// Step 2
  test('unique identifier', async () => {
    const blogsAtStart = await helper.blogsInDb()
    blogsAtStart.forEach(blog => expect(blog._id).toBeDefined)
  }, 100000)

  test('there are two blogs', async () => {
    const response = await api.get('/api/blogs')
  
    expect(response.body).toHaveLength(helper.initialBlogs.length)
  }, 100000)

})

describe('viewing a specific note', () => {
// Step 5
test('a specific blog can be viewed', async () => {
  const blogsAtStart = await helper.blogsInDb()

  const blogToView = blogsAtStart[0]

  const resultBlog = await api
    .get(`/api/blogs/${blogToView.id}`)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  const processedBlogToView = JSON.parse(JSON.stringify(blogToView))

  expect(resultBlog.body).toEqual(processedBlogToView)

})

test('fails with statuscode 404 if blog does not exist', async () => {
  const validNonexistingId = await helper.nonExistingId()

  console.log(validNonexistingId)
 
  await api
    .get(`/api/blogs/${validNonexistingId}`)
    .expect(404)
})

test('fails with statuscode 400 id is invalid', async () => {
  const invalidId = '5a3d5da59070081a82a3445'

  await api
    .get(`/api/blogs/${invalidId}`)
    .expect(400)
})


test('the first blog author is Michael Chan', async () => {
  const response = await api.get('/api/blogs')

  expect(response.body[0].author).toBe('Michael Chan')
}, 100000)

test('a specific blog is within the returned blogs', async () => {
  const response = await api.get('/api/blogs')

  const contents = response.body.map(r => r.title)
  expect(contents).toContain(
    'React patterns'
  )
})

// Step 4
test('Default likes is 0', async () => {
  const newBlog = {
    title: "Ngou Hon Ci Bing",
    author: "Tsoi Kuok Kuen",
    url: "http://www.timelessclassiccanto",
}
  await api.post('/api/blogs').send(newBlog)
  const blogsAtEnd = await helper.blogsInDb()
  expect(blogsAtEnd[blogsAtEnd.length - 1].likes).toBe(0)
}, 100000)
})

describe('addition of a new blog', () => {
  // Step 3
test('a valid blog can be added', async () => {
  const newBlog = {
      title: "Mok Zoi Gaa Zong Jan",
      author: "Tsoi Kuok Kuen",
      url: "http://www.timelessclassiccanto",
      likes: 7,
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.blogsInDb()
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)
  const authors = blogsAtEnd.map(blog => blog.author)
  expect(authors).toContain(
    'Tsoi Kuok Kuen'
  )
})

test('Blog without author can also be added', async () => {
  const newBlog = {
      title: "Ngan Mau Ji Cyun Cing Ji",
      url: "http://www.timelessclassiccanto",
      likes: 7,
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(200)
    
  const blogsAtEnd = await helper.blogsInDb()

  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

}, 100000)

test('no title nor url results in bad requests', async () => {
  const newBlogNoTitle = {
    author: "Tsoi Kuok Kuen",
    url: "http://www.timelessclassiccanto",
    likes: 5
  }
  const newBlogNoUrl = {
    title: "Ngou Hon Ci Bing",
    author: "Tsoi Kuok Kuen",
    likes: 5
  }
  const newBlogNoTitleNoUrl = {
    author: "Tsoi Kuok Kuen",
    likes: 5
  }
  await api.post('/api/blogs').send(newBlogNoTitle).expect(400)
  await api.post('/api/blogs').send(newBlogNoUrl).expect(400)
  await api.post('/api/blogs').send(newBlogNoTitleNoUrl).expect(400)
}, 100000)

})

describe('deletion of a blog', () => {
  test('a blog can be deleted', async () => {
    const blogsAtStart = await helper.blogsInDb()
  
    const blogToDelete = blogsAtStart[0]

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .expect(204)
  
    const blogsAtEnd = await helper.blogsInDb()
  
    expect(blogsAtEnd).toHaveLength(
      helper.initialBlogs.length - 1
    )
  
    const authors = blogsAtEnd.map(blog => blog.author)
  
    expect(authors).not.toContain(blogToDelete.author)
  })
})

describe('update number of likes for a blog', () => {
  test('blog likes can be updated', async () => {
    const blogsAtStart = await helper.blogsInDb()
  
    const blogToUpdate = blogsAtStart[0]
    console.log("Hello", blogToUpdate.id)
    const updatedBlog = {
      ...blogToUpdate,
      likes: blogToUpdate.likes + 1
    }

    await api
      .put(`/api/blogs/${updatedBlog.id}`).send(updatedBlog)
      .expect(200).expect('Content-Type', /application\/json/)
  
    const blogsAtEnd = await helper.blogsInDb()
  
    expect(blogsAtEnd[0].likes).toBe(8)
  })
})
////////////////////////














  ////////////////////////

  
  

afterAll(() => {
  mongoose.connection.close()
}) 