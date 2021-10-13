const { getAccessTokenObject, getDecoded } = require('./jwt')
require('dotenv').config()

describe('utils jwt', () => {
  let accessToken
  it('getAccessTokenObject ', async () => {
    const payload = { sub: 1 }
    const opts = {}
    const token = await getAccessTokenObject(payload, opts)
    expect(typeof token).toBe('object')
    const keys = ['accessToken', 'jwtid']
    expect(Object.keys(token)).toEqual(keys)
    accessToken = token.accessToken
  })

  it('decoded succeeded', async () => {
    const result = await getDecoded(accessToken)
    const keys = ['sub', 'iat', 'aud', 'iss', 'jti']
    expect(Object.keys(result)).toEqual(keys)
  })

  it('decoded failed', async () => {
    try {
      const result = await getDecoded('123')
    } catch (error) {
      expect(error.name).toEqual('JsonWebTokenError')
      expect(error.message).toEqual('jwt malformed')
    }
  })
})
