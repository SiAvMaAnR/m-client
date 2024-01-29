const passwordMaxLength = 40
const passwordMinLength = 8

function cPasswordValidator(password, cPassword) {
  const isValidMaxLength = cPassword.length <= passwordMaxLength
  const isValidMinLength = cPassword.length >= passwordMinLength
  const isMatchPasswords = cPassword === password

  const errors = []

  if (!isValidMaxLength) {
    errors.push('* The length of the entered password must be less than 40 characters')
  }

  if (!isValidMinLength) {
    errors.push('* The length of the entered password must be more than 8 characters')
  }

  if(!isMatchPasswords){
    errors.push('* Password mismatch')
  }

  const valid = isValidMaxLength && isValidMinLength && isMatchPasswords

  return {
    valid,
    error: errors.join('\n')
  }
}

export default cPasswordValidator
