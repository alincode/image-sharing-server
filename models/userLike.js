const { Sequelize, Model } = require('sequelize')

const attributes = {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  likeCount: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
  unlikeCount: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
}

module.exports = (sequelize, DataTypes) => {
  class Like extends Model {
    static associate(models) {
      Like.belongsTo(models.User)
    }
  }
  const options = {
    sequelize,
    modelName: 'UserLike',
    createdAt: false,
    updatedAt: false,
  }
  Like.init(attributes, options)
  return Like
}
