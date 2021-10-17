const FormData = require('form-data')
const fs = require('fs')

jest.setTimeout(10000)

describe('attachment', () => {
  let app
  let user
  beforeAll(async () => {
    app = await require('../start')
    const username = 'username'
    const { User } = models
    await User.signup(username, 'password')
    user = await User.findOne({
      where: { username },
    })
    return app.ready()
  })
  afterAll(() => {
    return app.close()
  })

  // docs: https://www.fastify.io/docs/latest/Testing/
  it('should upload file successfully', async () => {
    const { Token } = models
    const form = new FormData()

    let token = await Token.generateToken(user.dataValues.username)
    const headers = Object.assign(form.getHeaders(), {
      Authorization: 'Bearer ' + token.accessToken,
    })

    form.append('file', fs.createReadStream('./test/dog.jpeg'))
    form.append('description', 'image description')

    const response = await app.inject({
      method: 'POST',
      url: '/v1/attachments',
      payload: form,
      headers,
    })

    expect(response.statusCode).toBe(200)
  })
})
