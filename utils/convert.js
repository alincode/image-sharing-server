const { v4: uuidv4 } = require('uuid')

function getConvertToAttachmentFormat(mimetype, filename) {
  let fileExtension = mimetype.split('/')[1]
  let random = new Date().getTime() + '-' + uuidv4().substring(0, 4)
  let newFilename = `${random}.${fileExtension}`
  return {
    filename: newFilename,
    sourceFilename: filename,
    mimetype: mimetype,
    url: process.env.IMAGE_PREFIX_URL + newFilename,
  }
}

module.exports = { getConvertToAttachmentFormat }
