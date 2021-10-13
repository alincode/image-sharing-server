async function initData(db) {
  await models.User.signup('alincode', '12345678')
  // console.log(await models.User.findAll())
}

module.exports = initData
