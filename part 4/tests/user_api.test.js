const bcrypt = require('bcrypt')
const User = require('../models/user')

beforeEach(async () => {
  await User.deleteMany({})

  const passwordHash = await bcrypt.hash('sekret', 10)
  const user = new User({ username: 'root', passwordHash })

  await user.save()
}, 100000)

describe('when there is initially one user in db', () => {


  test('creation succeeds with a fresh username', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'mluukkai',
      name: 'Matti Luukkainen',
      password: 'salainen',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

    const usernames = usersAtEnd.map(u => u.username)
    expect(usernames).toContain(newUser.username)
  }, 100000)

  test('creation fails with proper statuscode and message if username already taken', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'root',
      name: 'Superuser',
      password: 'salainen',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('`username` to be unique')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })

  test('Cannot submit username is password or username is shorter than 3 characters', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser1 = {
      username: 'ab',
      name: 'Superuser',
      password: 'xyz',
    }

    const newUser2 = {
      username: 'abc',
      name: 'Superuser',
      password: 'xy',
    }

    const result1 = await api
      .post('/api/users')
      .send(newUser1)
      .expect(400)

    expect(result1.body.error).toContain('User name must be at least 3 characters')

    const result2 = await api
      .post('/api/users')
      .send(newUser2)
      .expect(400)

    expect(result2.body.error).toContain('User name must be at least 3 characters')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })
  
})