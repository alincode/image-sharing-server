const bcrypt = require('bcrypt')

const generatePassword = async (password) => {
  const round = new Date().getDate() % 10
  const salt = await bcrypt.genSalt(round)
  const hash = await bcrypt.hash(password, salt)
  return hash
}

const comparePassword = async (password, hash) =>
  await bcrypt.compare(password, hash)

module.exports = {
  generatePassword,
  comparePassword,
}
