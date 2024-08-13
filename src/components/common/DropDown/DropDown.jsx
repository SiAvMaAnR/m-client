import PropTypes from 'prop-types'
import { useEffect, useRef, useState } from 'react'
import DDItem from './DDItem/DDItem'
import './DropDown.scss'

const farAway = 150

function DropDown({ className = '', children = null, items = [] }) {
  const [showDropDown, setShowDropDown] = useState(false)
  const dropdownRef = useRef(null)

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropDown(false)
      }
    }

    const handleMouseMove = (event) => {
      if (dropdownRef.current) {
        const rect = dropdownRef.current.getBoundingClientRect()
        const isFarAway =
          event.clientX < rect.left - farAway ||
          event.clientX > rect.right + farAway ||
          event.clientY < rect.top - farAway ||
          event.clientY > rect.bottom + farAway

        if (isFarAway) {
          setShowDropDown(false)
        }
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    document.addEventListener('mousemove', handleMouseMove)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  const onClickHandler = () => {
    setShowDropDown(true)
  }

  return (
    <div className={`c-dropdown ${className}`} onClick={onClickHandler} role="presentation">
      <div className="children">{children}</div>
      {showDropDown && (
        <div className="dropdown" ref={dropdownRef}>
          {items?.map((item) => {
            const { title, icon, onClick } = item
            return <DDItem key={title} onClick={onClick} icon={icon} title={title} />
          })}
        </div>
      )}
    </div>
  )
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
