import PropTypes from 'prop-types'
import './Brand.scss'

function Brand({ className = '', children = '' }) {
  const [word1, word2, word3] = children.split('|')

  return (
    <div className={`c-brand ${className}`}>
      <span className="first">{word1}</span>
      <span className="second">{word2}</span>
      <span className="third">{word3}</span>
    </div>
  )
}

Brand.propTypes = {
  children: PropTypes.string,
  className: PropTypes.string
}

export default Brand
