const bcrypt = require('bcrypt')
const { generatePassword, comparePassword } = require('./password')

describe('utils password', () => {
  let password = 'test'
  let hash

  it('generatePassword', async () => {
    hash = await generatePassword(password)
    const result = await bcrypt.compare(password, hash)
    expect(result).toEqual(true)
  })

  it('comparePassword', async () => {
    const result = await comparePassword(password, hash)
    expect(result).toEqual(true)
  })
})
