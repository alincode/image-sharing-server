const { signupHandler, loginHandler } = require('../../controllers/auth')

const tokenResponse = {
  type: 'object',
  properties: {
    accessToken: { type: 'string' },
    expiresIn: { type: 'integer' },
    expiresAt: { type: 'integer' },
    tokenType: { type: 'string' },
    userId: { type: 'integer' },
  },
}

const signupOpts = {
  schema: {
    body: {
      type: 'object',
      required: ['username', 'password'],
      properties: {
        username: { type: 'string', maxLength: 20, minLength: 6 },
        password: { type: 'string', maxLength: 40, minLength: 8 },
      },
    },
    response: {
      200: tokenResponse,
    },
  },
  handler: signupHandler,
}

const loginOpts = {
  schema: {
    body: {
      type: 'object',
      required: ['username', 'password'],
      properties: {
        username: { type: 'string', maxLength: 20, minLength: 6 },
        password: { type: 'string', maxLength: 40, minLength: 8 },
      },
    },
    response: {
      200: tokenResponse,
    },
  },
  handler: loginHandler,
}

function authRoutes(fastify, options, done) {
  fastify.post('/signup', signupOpts)
  fastify.post('/login', loginOpts)

  done()
}

module.exports = authRoutes
