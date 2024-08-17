const loginMaxLength = 40
const loginMinLength = 4
const regex = /^[a-zA-Z0-9]+$/

function loginValidator(login) {
  const isValidMaxLength = login.length <= loginMaxLength
  const isValidMinLength = login.length >= loginMinLength
  const isValidPattern = regex.test(login)

  const errors = []

  if (!isValidMaxLength) {
    errors.push('* The length of the entered login must be less than 40 characters')
  }

  if (!isValidMinLength) {
    errors.push('* The length of the entered login must be more than 4 characters')
  }

  if (!isValidPattern) {
    errors.push('* The entered login must include English letters and numbers')
  }

  const valid = isValidMaxLength && isValidMinLength && isValidPattern

  return {
    valid,
    error: errors.join('\n')
  }
}

export default loginValidator
