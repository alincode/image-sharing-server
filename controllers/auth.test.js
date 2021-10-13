const crypto = require('crypto')

jest.setTimeout(10000)

describe('auth API', () => {
  let app
  beforeAll(async () => {
    app = await require('../start')
    return app.ready()
  })
  afterAll(() => {
    return app.close()
  })

  let username = crypto.randomBytes(10).toString('hex')
  let password = '12345678'

  it('signup pass', async () => {
    const response = await app.inject({
      method: 'POST',
      url: '/v1/signup',
      payload: {
        username,
        password,
      },
    })

    expect(response.statusCode).toBe(200)
    const keys = [
      'accessToken',
      'expiresIn',
      'expiresAt',
      'tokenType',
      'userId',
    ]
    expect(Object.keys(response.json())).toEqual(keys)
  })

  it('account duplicate', async () => {
    const response = await app.inject({
      method: 'POST',
      url: '/v1/signup',
      payload: {
        username,
        password,
      },
    })

    expect(response.statusCode).toBe(400)
    const keys = ['statusCode', 'error', 'message']
    expect(Object.keys(response.json())).toEqual(keys)
  })

  it('login pass', async () => {
    const response = await app.inject({
      method: 'POST',
      url: '/v1/login',
      payload: {
        username,
        password,
      },
    })

    expect(response.statusCode).toBe(200)
    const keys = [
      'accessToken',
      'expiresIn',
      'expiresAt',
      'tokenType',
      'userId',
    ]
    expect(Object.keys(response.json())).toEqual(keys)
  })

  it('login password was wrong', async () => {
    const response = await app.inject({
      method: 'POST',
      url: '/v1/login',
      payload: {
        username,
        password: '12345679',
      },
    })

    expect(response.statusCode).toBe(401)
    const keys = ['statusCode', 'error', 'message']
    expect(Object.keys(response.json())).toEqual(keys)
  })

  it('login password was too short', async () => {
    const response = await app.inject({
      method: 'POST',
      url: '/v1/login',
      payload: {
        username,
        password: '1234567',
      },
    })

    expect(response.statusCode).toBe(400)
    const keys = ['statusCode', 'error', 'message']
    expect(Object.keys(response.json())).toEqual(keys)
  })
})
