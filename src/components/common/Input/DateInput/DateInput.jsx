import { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import ToolTip1 from '../../ToolTip/ToolTip1/ToolTip1'
import ValidIcon from '../FormInput/ValidIcon/ValidIcon'
import birthdayValidator from '../../../../utils/validators/birthdayValidator'
import './DateInput.scss'

function DateInput({ setValue, className, onValid }) {
  const [validDate, setValidDate] = useState({})
  const [errorMessage, setErrorMessage] = useState(null)
  const [date, setDate] = useState({})

  const { day, month, year } = date
  const isFillField = day && month && year
  const isValid = validDate?.day && validDate?.month && validDate?.year

  const onChangeDayHandler = (event) => {
    setDate({
      ...date,
      day: event.target.value
    })
  }

  const onChangeMonthHandler = (event) => {
    setDate({
      ...date,
      month: event.target.value
    })
  }

  const onChangeYearHandler = (event) => {
    setDate({
      ...date,
      year: event.target.value
    })
  }

  useEffect(() => {
    if (isValid) {
      setValue(new Date(date.year, date.month - 1, date.day))
    }
  }, [date, setValue, isValid])

  useEffect(() => {
    const { valid, error } = birthdayValidator(date)

    setValidDate(valid)
    setErrorMessage(error)
  }, [date, onValid])

  useEffect(() => {
    onValid(!!isFillField && !!isValid)
  }, [validDate, onValid, isValid, isFillField])

  return (
    <div className={`c-date-input ${className}`}>
      {!isValid && (
        <div className="valid-wrapper">
          <ToolTip1 text={errorMessage}>
            <ValidIcon />
          </ToolTip1>
        </div>
      )}

      <div className={`date-input-wrapper ${validDate?.day ? 'valid' : 'invalid'}`}>
        <input
          type="number"
          className="date-input day"
          placeholder="Day"
          onChange={onChangeDayHandler}
          value={day || ''}
          required
        />
      </div>

      <div className={`date-input-wrapper ${validDate?.month ? 'valid' : 'invalid'}`}>
        <input
          type="number"
          className="date-input month"
          placeholder="Month"
          onChange={onChangeMonthHandler}
          value={month || ''}
          required
        />
      </div>

      <div className={`date-input-wrapper ${validDate?.year ? 'valid' : 'invalid'}`}>
        <input
          type="number"
          className="date-input year"
          placeholder="Year"
          onChange={onChangeYearHandler}
          value={year || ''}
          required
        />
      </div>
    </div>
  )
}

DateInput.defaultProps = {
  setValue: () => {},
  className: '',
  onValid: () => {}
}

DateInput.propTypes = {
  setValue: PropTypes.func,
  className: PropTypes.string,
  onValid: PropTypes.func
}

export default DateInput
