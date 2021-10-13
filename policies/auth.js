const { getDecoded, TOKEN_TYPE } = require('../utils/jwt')
const { User } = models

const verifyJWT = async (request, reply) => {
  console.log('=== verifyJWT ===')
  const { authorization } = request.headers
  if (!authorization) {
    reply.code(400)
    throw new Error('Authorization header missing')
  }
  const pre = TOKEN_TYPE + ' '
  if (authorization.indexOf(pre) == -1) {
    reply.code(400)
    throw new Error('Authorization header invalid format')
  }
  const jwtToken = authorization.replace(pre, '')
  try {
    const payload = await getDecoded(jwtToken)
    let { sub: userId } = payload
    let user = await User.findOne({ where: { id: userId } })
    request.user = user
  } catch (error) {
    reply.code(400)
    throw new Error(error.message)
  }
  return
}

// const verifyUserAndPassword = async (request, reply) => {
//   return { id: 9999 }
// }

module.exports = {
  verifyJWT,
  // verifyUserAndPassword,
}
