const { Attachment, UserLike } = models

const likeHandler = async (request, reply) => {
  let { attachmentId } = request.params
  let attachment = await Attachment.findByPk(attachmentId)
  if (!attachment) {
    reply.code(400)
    throw Error('attachmentId not exist')
  }
  attachment = await attachment.like(request.user.id)
  return attachment
}

const unlikeHandler = async (request, reply) => {
  let { attachmentId } = request.params
  let attachment = await Attachment.findByPk(attachmentId)
  if (!attachment) {
    reply.code(400)
    throw Error('attachmentId not exist')
  }
  attachment = await attachment.unlike(request.user.id)
  return attachment
}

module.exports = {
  likeHandler,
  unlikeHandler,
}
