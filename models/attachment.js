const { Sequelize, Model } = require('sequelize')

const attributes = {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  filename: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  sourceFilename: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  mimetype: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  url: {
    type: Sequelize.STRING,
    // allowNull: false,
  },
  description: {
    type: Sequelize.STRING,
    allowNull: false,
  },
}

module.exports = (sequelize, DataTypes) => {
  class Attachment extends Model {
    static async createAttachment(values) {
      let attachment = await this.create(values)
      return attachment
    }
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Attachment.belongsTo(models.User)
    }
  }
  const options = {
    sequelize,
    modelName: 'Attachment',
    updatedAt: false,
  }
  Attachment.init(attributes, options)
  return Attachment
}
