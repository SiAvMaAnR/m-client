import PropTypes from 'prop-types'
import { useState } from 'react'
import './ImgWrapper.scss'

function ImgWrapper({ className = '', src, alt, onClick, isLazy = false }) {
  const [loaded, setLoaded] = useState(false)

  const handleLoad = () => {
    setLoaded(true)
  }

  const loading = isLazy ? 'lazy' : 'eager'
  const loadingClass = loaded ? 'loaded' : ''

  return (
    <div
      className={`c-img-wrapper ${className} ${loadingClass}`}
      onClick={onClick}
      role="presentation"
    >
      <img src={src} alt={alt} loading={loading} onLoad={handleLoad} />
    </div>
  )
}

ImgWrapper.propTypes = {
  className: PropTypes.string,
  src: PropTypes.string,
  alt: PropTypes.string,
  isLazy: PropTypes.bool,
  onClick: PropTypes.func
}

export default ImgWrapper
