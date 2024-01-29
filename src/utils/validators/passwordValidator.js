const passwordMaxLength = 40
const passwordMinLength = 8

function passwordValidator(password) {
  const isValidMaxLength = password.length <= passwordMaxLength
  const isValidMinLength = password.length >= passwordMinLength

  const errors = []

  if (!isValidMaxLength) {
    errors.push('* The length of the entered password must be less than 40 characters')
  }

  if (!isValidMinLength) {
    errors.push('* The length of the entered password must be more than 8 characters')
  }

  const valid = isValidMaxLength && isValidMinLength

  return {
    valid,
    error: errors.join('\n')
  }
}

export default passwordValidator
