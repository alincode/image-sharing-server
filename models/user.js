const { Sequelize, Model } = require('sequelize')
const { generatePassword, comparePassword } = require('../utils/password')

const attributes = {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  username: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
  },
}

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static async signup(username, password) {
      let user = await this.findOne({ where: { username } })
      if (user) return false
      let hash = await generatePassword(password)

      await this.create({
        username,
        password: hash,
      })
      return true
    }

    static async verifyPassword(username, password) {
      let user = await this.findOne({ where: { username } })
      if (!user) return false
      let isPass = await comparePassword(password, user.password)
      if (isPass) return true
      return false
    }
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.associate = function (models) {
        User.hasMany(models.Token, {
          foreignKey: 'userId',
        })
        User.hasMany(models.Attachment, {
          foreignKey: 'userId',
        })
      }
    }
  }
  const options = {
    sequelize,
    modelName: 'User',
  }
  User.init(attributes, options)
  return User
}
