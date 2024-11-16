import PropTypes from 'prop-types'
import { useEffect, useState } from 'react'
import { SearchIcon } from '../../../common/Icon/_exports'
import './MessageSearch.scss'

function MessageSearch({ className = '', setSearchMessage }) {
  const [messageFilter, setMessageFilter] = useState('')
  const [hideInput, setHideInput] = useState(true)

  const visibleInputClass = hideInput ? 'hide' : ''

  useEffect(() => {
    setSearchMessage(messageFilter)
  }, [messageFilter, setSearchMessage])

  const onClickHandler = () => {
    setHideInput((visible) => !visible)
  }

  return (
    <div className={`c-message-search ${className} ${visibleInputClass}`}>
      <div className="search-icon-wrapper" onClick={onClickHandler} role="presentation">
        <SearchIcon className="search-icon" />
      </div>

      <input
        type="text"
        placeholder="Search"
        value={messageFilter}
        onChange={(e) => setMessageFilter(e.target.value)}
      />
    </div>
  )
}

MessageSearch.propTypes = {
  className: PropTypes.string,
  setSearchMessage: PropTypes.func
}

export default MessageSearch
