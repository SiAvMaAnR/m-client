const emailMaxLength = 100
const emailMinLength = 5

const regex =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

function emailValidator(email) {
  const isValidMaxLength = email.length <= emailMaxLength
  const isValidMinLength = email.length >= emailMinLength

  const isValidPattern = regex.test(email)

  const errors = []

  if (!isValidMaxLength) {
    errors.push('* The length of the entered email must be less than 100 characters')
  }

  if (!isValidMinLength) {
    errors.push('* The length of the entered email must be more than 5 characters')
  }

  if (!isValidPattern) {
    errors.push('* The entered email must match the pattern')
  }

  const valid = isValidMaxLength && isValidMinLength && isValidPattern

  return {
    valid,
    error: errors.join('\n')
  }
}

export default emailValidator
