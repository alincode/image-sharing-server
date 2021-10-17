const {
  uploadHandler,
  getAttachmentsHandler,
} = require('../../controllers/attachment')
const { verifyJWT } = require('../../policies/auth')

const attachmentOpts = {
  type: 'object',
  required: ['id', 'url', 'description'],
  properties: {
    id: { type: 'number' },
    url: { type: 'string' },
    description: { type: 'string' },
  },
}

const getAttachmentsOpts = {
  schema: {
    response: {
      200: {
        type: 'object',
        required: ['attachments', 'total'],
        properties: {
          attachments: {
            type: 'array',
            items: attachmentOpts,
          },
          total: { type: 'number' },
        },
      },
    },
  },
  handler: getAttachmentsHandler,
}

const createAttachmentsOptsOpts = {
  schema: {
    consumes: ['multipart/form-data'],
    body: {
      type: 'object',
      required: ['file', 'description'],
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
        description: { type: 'string' },
      },
    },
    response: {
      200: attachmentOpts,
    },
  },
  preHandler: verifyJWT,
  handler: uploadHandler,
}

function attachmentRoutes(app, options, done) {
  // docs: https://www.fastify.io/docs/latest/Routes/
  app.register(require('fastify-multipart'))
  app.get('/attachments', getAttachmentsOpts)
  app.post('/attachments', createAttachmentsOptsOpts)

  done()
}

module.exports = attachmentRoutes
