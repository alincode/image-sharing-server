const util = require('util')
const jwt = require('jsonwebtoken')
const crypto = require('crypto')
const signAsync = util.promisify(jwt.sign)
const signVerify = util.promisify(jwt.verify)
const randomBytesAsync = util.promisify(crypto.randomBytes)
const TOKEN_TYPE = 'Bearer'

const generateJwtId = async () => {
  let jti = await randomBytesAsync(32)
  return jti.toString('hex')
}

const getAccessTokenObject = async (payload, opts) => {
  const jwtid = await generateJwtId()

  // doc: https://5xruby.tw/posts/what-is-jwt
  const accessTokenPayload = Object.assign({}, payload)
  const signOptions = Object.assign(
    {
      issuer: 'backend server',
      audience: 'website',
      jwtid,
    },
    opts
  )

  const accessToken = await signAsync(
    accessTokenPayload,
    process.env.JWT_SECRET,
    signOptions
  )
  return {
    accessToken,
    jwtid,
  }
}

const getDecoded = (token, params = {}) =>
  signVerify(token, process.env.JWT_SECRET, params)

module.exports = {
  getAccessTokenObject,
  getDecoded,
  TOKEN_TYPE,
}
