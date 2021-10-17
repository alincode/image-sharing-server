const { getConvertToAttachmentFormat } = require('./convert')

describe('utils convert', () => {
  test('getConvertToAttachmentFormat', () => {
    const mimetype = 'image/png'
    const filename = 'dog.png'

    let result = getConvertToAttachmentFormat(mimetype, filename)
    let keys = ['filename', 'sourceFilename', 'mimetype', 'url']
    expect(Object.keys(result)).toEqual(keys)
  })
})
