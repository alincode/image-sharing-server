const fs = require('fs')
const util = require('util')
const { pipeline } = require('stream')
const pump = util.promisify(pipeline)
const { v4: uuidv4 } = require('uuid')
const { Attachment } = models

function getConvertToAttachmentFormat(part) {
  let mimetype = part.mimetype
  let fileExtension = mimetype.split('/')[1]
  let random = new Date().getTime() + '-' + uuidv4().substring(0, 4)
  let filename = `${random}.${fileExtension}`
  return {
    filename,
    sourceFilename: part.filename,
    mimetype: part.mimetype,
    url: process.env.IMAGE_PREFIX_URL + filename,
  }
}

const uploadHandler = async (request, reply) => {
  const parts = request.parts()
  let fields = {}
  fields.attachments = []
  for await (const part of parts) {
    if (part.file) {
      let attachment = getConvertToAttachmentFormat(part)
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

  let values = {
    filename: fields.attachments[0].filename,
    sourceFilename: fields.attachments[0].sourceFilename,
    mimetype: fields.attachments[0].mimetype,
    url: fields.attachments[0].url,
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
