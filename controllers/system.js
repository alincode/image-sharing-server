const infoHandler = async (request, reply) => {
  return {
    apiVersion: 'v1',
    environment: process.env.NODE_ENV || 'development',
  }
}

module.exports = {
  infoHandler,
}
