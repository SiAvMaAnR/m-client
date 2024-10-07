function isImageAttachmentType(attachmentType) {
  return /^image\/.*/.test(attachmentType)
}

function isFileAttachmentType(attachmentType) {
  return /^(application|text)\/.*/.test(attachmentType)
}

export { isImageAttachmentType, isFileAttachmentType }
