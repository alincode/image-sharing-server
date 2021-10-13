const { Sequelize, Model } = require('sequelize')
const moment = require('moment')
const { EXPIRES_IN } = require('../config')
const { getAccessTokenObject, TOKEN_TYPE } = require('../utils/jwt')

const attributes = {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  accessToken: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  accessTokenExpiresIn: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  accessTokenExpiresAt: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  // refreshToken: {
  //   type: Sequelize.STRING,
  //   allowNull: true,
  // },
  // refreshTokenExpiresIn: {
  //   type: Sequelize.INTEGER,
  //   allowNull: true,
  // },
}

module.exports = (sequelize, DataTypes) => {
  class Token extends Model {
    static async generateToken(username) {
      let user = await this.sequelize.models.User.findOne({
        where: { username },
      })
      let payload = { sub: user.id }
      const { accessToken } = await getAccessTokenObject(payload)
      const accessTokenExpiresAt = moment().second(EXPIRES_IN).utc().valueOf()

      const tokenValues = {
        accessToken,
        accessTokenExpiresIn: EXPIRES_IN,
        accessTokenExpiresAt,
        UserId: user.id,
      }
      await this.create(tokenValues)

      return {
        accessToken,
        expiresIn: EXPIRES_IN,
        expiresAt: accessTokenExpiresAt,
        tokenType: TOKEN_TYPE,
        userId: user.id,
      }
    }

    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Token.belongsTo(models.User)
    }
  }
  const options = {
    sequelize,
    modelName: 'Token',
    updatedAt: false,
  }
  Token.init(attributes, options)
  return Token
}
