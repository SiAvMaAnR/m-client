import PropTypes from 'prop-types'
import './GroupedSelector.scss'

function GroupedSelector({ className, items, setSelectedValue, selectedValue }) {
  const changeValueHandler = (event) => {
    setSelectedValue(event.target.value)
  }
console.log(selectedValue);

  return (
    <div className={`c-grouped-selector ${className}`}>
      <select name="select" value={selectedValue} onChange={changeValueHandler}>
        {items.map((group) => (
          <optgroup key={group.key} label={group.value}>
            {group.items.map((item) => (
              <option key={item.key} value={item.value}>
                {item.value.toLowerCase()}
              </option>
            ))}
          </optgroup>
        ))}
      </select>
    </div>
  )
}

GroupedSelector.propTypes = {
  className: PropTypes.string,
  selectedValue: PropTypes.string,
  setSelectedValue: PropTypes.func,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.number,
      value: PropTypes.string,
      items: PropTypes.arrayOf(
        PropTypes.shape({
          key: PropTypes.number,
          value: PropTypes.string
        })
      )
    })
  )
}

export default GroupedSelector
