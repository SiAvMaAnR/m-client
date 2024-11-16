import { fileExtension } from '../../../constants/chat'

function adapt(pattern, extensions) {
  return extensions.map((ext) => pattern + ext).join(', ')
}

const acceptedFiles = adapt('application/', [
  fileExtension.pdf,
  fileExtension.docx,
  fileExtension.doc,
  fileExtension.rtf,
  fileExtension.odt
])

const acceptedImages = adapt('image/', [
  fileExtension.jpeg,
  fileExtension.jpg,
  fileExtension.png,
  fileExtension.svg
])

const acceptedVideos = adapt('video/', [fileExtension.mp4, fileExtension.webm, fileExtension.avi])

export { acceptedFiles, acceptedImages, acceptedVideos }
