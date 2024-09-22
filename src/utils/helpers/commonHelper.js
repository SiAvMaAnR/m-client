function getFileExtension(filename) {
  return filename.split('.').pop()
}

function formatBytes(bytes) {
  let result

  if (bytes < 1024) {
    result = `${bytes} B`
  } else if (bytes < 1024 * 1024) {
    result = `${(bytes / 1024).toFixed(1)} KB`
  } else if (bytes < 1024 * 1024 * 1024) {
    result = `${(bytes / (1024 * 1024)).toFixed(1)} MB`
  } else {
    result = `${(bytes / (1024 * 1024 * 1024)).toFixed(1)} GB`
  }

  return result
}

export { getFileExtension, formatBytes }
