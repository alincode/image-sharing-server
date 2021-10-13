const { User, Token } = models

const signupHandler = async (request, reply) => {
  request.log.info('Creating new user')
  let { username, password } = request.body
  let isSignup = await User.signup(username, password)
  if (isSignup) {
    return Token.generateToken(username)
  }
  reply.code(400)
  throw new Error('Account duplicate')
}

const loginHandler = async (request, reply) => {
  let { username, password } = request.body
  const isLogin = await User.verifyPassword(username, password)
  if (!isLogin) {
    reply.code(401)
    throw new Error('Password not valid')
  }
  return await Token.generateToken(username)
}

module.exports = {
  signupHandler,
  loginHandler,
}
