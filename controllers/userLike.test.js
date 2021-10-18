jest.setTimeout(10000)

describe('auth API', () => {
  let app
  let token
  let attachmentId
  beforeAll(async () => {
    app = await require('../start')
    const username = 'username'
    const { User, Token, Attachment } = models
    // fake user
    await User.signup(username, 'password')
    let user = await User.findOne({
      where: { username },
    })
    // fake token
    token = await Token.generateToken(user.dataValues.username)

    // fake attachment
    let attachment = await Attachment.create({
      filename: '1634538891171-13b9.jpeg',
      sourceFilename: 'dog.jpeg',
      mimetype: 'image/jpeg',
      url: 'http://0.0.0.0:5000/uploads/1634538891171-13b9.jpeg',
      description: 'image description',
    })
    attachmentId = attachment.dataValues.id

    return app.ready()
  })
  afterAll(() => {
    return app.close()
  })

  it('like', async () => {
    const headers = {
      Authorization: 'Bearer ' + token.accessToken,
    }
    const attachmentId = 1
    const response = await app.inject({
      method: 'POST',
      url: `/v1/attachments/${attachmentId}/like`,
      headers,
      payload: {},
    })

    expect(response.statusCode).toBe(200)
    const keys = ['id', 'url', 'description', 'likeCount', 'unlikeCount']
    let result = response.json()
    expect(Object.keys(result)).toEqual(keys)
    expect(result.likeCount).toEqual(1)
  })

  it('unlike', async () => {
    const headers = {
      Authorization: 'Bearer ' + token.accessToken,
    }
    const attachmentId = 1
    const response = await app.inject({
      method: 'POST',
      url: `/v1/attachments/${attachmentId}/unlike`,
      headers,
      payload: {},
    })

    expect(response.statusCode).toBe(200)
    const keys = ['id', 'url', 'description', 'likeCount', 'unlikeCount']
    let result = response.json()
    expect(Object.keys(result)).toEqual(keys)
    expect(result.unlikeCount).toEqual(1)
  })
})
