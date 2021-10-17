const fs = require('fs')
const util = require('util')
const { pipeline } = require('stream')
const pump = util.promisify(pipeline)
const { getConvertToAttachmentFormat } = require('../utils/convert')
const { Attachment } = models

const uploadHandler = async (request, reply) => {
  const parts = request.parts()
  let fields = {}
  fields.attachments = []
  for await (const part of parts) {
    if (part.file) {
      let attachment = getConvertToAttachmentFormat(
        part.mimetype,
        part.filename
      )
      fields.attachments.push(attachment)
      await pump(
        part.file,
        fs.createWriteStream('uploads/' + attachment.filename)
      )
    } else {
      fields[part.fieldname] = part.value
    }
  }

  // TODO: not implement yet
  // if (file.truncated) {
  //   // you may need to delete the part of the file that has been saved on disk
  //   // before the `limits.fileSize` has been reached
  //   // reply.send(new fastify.multipartErrors.FilesLimitError());
  // }
  // console.log(fields.attachments)
  let { filename, sourceFilename, mimetype, url } = fields.attachments[0]
  let values = {
    filename,
    sourceFilename,
    mimetype,
    url,
    description: fields.description,
    UserId: request.user.dataValues.id,
  }
  let attachment = await Attachment.createAttachment(values)
  return attachment
}

const getAttachmentsHandler = async (request, reply) => {
  const attachments = (await Attachment.findAll()) || []
  return {
    attachments,
    total: attachments.length,
  }
}

module.exports = {
  uploadHandler,
  getAttachmentsHandler,
}
