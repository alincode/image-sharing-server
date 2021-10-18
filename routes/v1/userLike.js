const { verifyJWT } = require('../../policies/auth')
const { likeHandler, unlikeHandler } = require('../../controllers/userLike')

const attachmentResponse = {
  type: 'object',
  required: ['id', 'url', 'description'],
  properties: {
    id: { type: 'number' },
    url: { type: 'string' },
    description: { type: 'string' },
    likeCount: { type: 'number' },
    unlikeCount: { type: 'number' },
  },
}

const likeOpts = {
  schema: {
    response: {
      200: attachmentResponse,
    },
  },
  preHandler: verifyJWT,
  handler: likeHandler,
}

const unlikeOpts = {
  schema: {
    response: {
      200: attachmentResponse,
    },
  },
  preHandler: verifyJWT,
  handler: unlikeHandler,
}

function likeRoutes(fastify, options, done) {
  fastify.post('/attachments/:attachmentId/like', likeOpts)
  fastify.post('/attachments/:attachmentId/unlike', unlikeOpts)
  done()
}

module.exports = likeRoutes
