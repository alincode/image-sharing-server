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
    allowNull: false,
  },
  description: {
    type: Sequelize.STRING,
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
  class Attachment extends Model {
    static async createAttachment(values) {
      let attachment = await this.create(values)
      return attachment
    }

    async like(userId, attachmentId) {
      let { UserLike } = this.sequelize.models
      await Attachment.increment('likeCount', { where: { id: attachmentId } })
      await UserLike.findOrCreate({
        where: {
          UserId: userId,
          AttachmentId: attachmentId,
        },
      })
      await UserLike.increment('likeCount', {
        where: { UserId: userId, AttachmentId: attachmentId },
      })
      return Attachment.findByPk(attachmentId)
    }

    async unlike(userId, attachmentId) {
      let { UserLike } = this.sequelize.models
      await Attachment.increment('unlikeCount', { where: { id: attachmentId } })
      await UserLike.findOrCreate({
        where: {
          UserId: userId,
          AttachmentId: attachmentId,
        },
      })
      await UserLike.increment('unlikeCount', {
        where: { UserId: userId, AttachmentId: attachmentId },
      })
      return Attachment.findByPk(attachmentId)
    }

    static associate(models) {
      Attachment.belongsTo(models.User)
      Attachment.belongsToMany(models.User, { through: models.UserLike })
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
