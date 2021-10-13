const path = require('path')
const fastify = require('fastify')
const db = require('./models')
require('dotenv').config()

const { infoHandler } = require('./controllers/system')

function build(opts) {
  const app = fastify(opts)
  global.models = db

  app.register(require('fastify-cors'), {
    // put your options here
    // TODO: production mode
  })

  app.register(require('fastify-static'), {
    root: path.join(__dirname, 'uploads'),
    prefix: '/uploads/',
  })

  app.register(require('fastify-swagger'), {
    exposeRoute: true,
    routePrefix: '/docs',
    swagger: {
      info: { title: 'fastify-api' },
    },
  })

  const systemInfoResponse = {
    type: 'object',
    required: ['apiVersion', 'environment'],
    properties: {
      apiVersion: { type: 'string' },
      environment: { type: 'string' },
    },
  }

  const systemInfoOpts = {
    schema: {
      response: {
        200: systemInfoResponse,
      },
    },
    handler: infoHandler,
  }

  app.get('/', systemInfoOpts)

  app.register(require('./routes/v1/auth'), { prefix: '/v1' })
  app.register(require('./routes/v1/attachment'), { prefix: '/v1' })

  app.ready(() => {
    // console.log(app.printRoutes())
  })

  return app
}

module.exports = {
  build,
}
