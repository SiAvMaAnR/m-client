const dayMinValue = 1
const dayMaxValue = 31

const monthMinValue = 1
const monthMaxValue = 12

const yearMinValue = 1900
const yearMaxValue = new Date().getFullYear()

function dayValidator(day) {
  const pattern = /^\d{1,2}$/

  const isValidPattern = pattern.test(day)
  const isValidMaxValue = day <= dayMaxValue
  const isValidMinValue = day >= dayMinValue

  const valid = isValidPattern && isValidMaxValue && isValidMinValue

  const error = !valid ? '* Incorrect day' : null

  return { valid, error }
}

function monthValidator(month) {
  const pattern = /^\d{1,2}$/

  const isValidPattern = pattern.test(month)
  const isValidMaxValue = month <= monthMaxValue
  const isValidMinValue = month >= monthMinValue

  const valid = isValidPattern && isValidMaxValue && isValidMinValue

  const error = !valid ? '* Incorrect month' : null

  return { valid, error }
}

function yearValidator(year) {
  const pattern = /^\d{4}$/

  const isValidPattern = pattern.test(year)
  const isValidMaxValue = year <= yearMaxValue
  const isValidMinValue = year >= yearMinValue

  const valid = isValidPattern && isValidMaxValue && isValidMinValue

  const error = !valid ? '* Incorrect year' : null

  return { valid, error }
}

function birthdayValidator({ day, month, year }) {
  const defaultResult = { valid: true, error: null }

  const dayResult = day ? dayValidator(day) : defaultResult
  const monthResult = month ? monthValidator(month) : defaultResult
  const yearResult = year ? yearValidator(year) : defaultResult

  const errors = [dayResult.error, monthResult.error, yearResult.error]

  const isValid = {
    day: dayResult.valid,
    month: monthResult.valid,
    year: yearResult.valid
  }

  return {
    valid: isValid,
    error: errors.filter((error) => error).join('\n')
  }
}

export default birthdayValidator
