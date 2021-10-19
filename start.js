const env = process.env.NODE_ENV || 'development'
const config = require(__dirname + '/config/config.json')[env]
const { build } = require('./build')
const initData = require('./database/init-data')
const PORT = process.env.PORT || 5000
let app

const start = async () => {
  let appOpts = {
    logger: {
      prettyPrint: true,
    },
  }
  // let appOpts = { logger: { level: 'info' } }
  app = build(appOpts)
  try {
    await models.sequelize.sync({ force: config.force })
    await initData()
    await app.listen(PORT, '0.0.0.0')
  } catch (err) {
    app.log.error(err)
    process.exit(1)
  }
  return app
}

process.on('SIGINT', async () => {
  console.log('=== app server stop ===')
  process.exit(0)
})

process.on('unhandledRejection', (error) => {
  console.error('=== unhandledRejection ===', error)
})

module.exports = start()
