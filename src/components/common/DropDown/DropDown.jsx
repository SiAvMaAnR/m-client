import PropTypes from 'prop-types'
import './DropDown.scss'
import { useEffect, useRef, useState } from 'react'

function DropDown({ className, children, items }) {
  const refSetTimeout = useRef()
  const [showDropDown, setShowDropDown] = useState(false)
  const dropdownRef = useRef(null)

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropDown(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const onClickHandler = () => {
    clearTimeout(refSetTimeout.current)
    setShowDropDown(!showDropDown)
  }

  return (
    <div className={`c-dropdown ${className}`} onClick={onClickHandler} role="presentation">
      <div className="children">{children}</div>
      {showDropDown && (
        <div className="dropdown" ref={dropdownRef}>
          {items?.map((item) => {
            const { title } = item

            return <div key={title}>{title}</div>
          })}
        </div>
      )}
    </div>
  )
}

DropDown.defaultProps = {
  className: '',
  children: null,
  items: []
}

DropDown.propTypes = {
  className: PropTypes.string,
  children: PropTypes.element,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      icon: PropTypes.element,
      title: PropTypes.string,
      onClick: PropTypes.func
    })
  )
}

export default DropDown
