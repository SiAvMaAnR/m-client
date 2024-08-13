import PropTypes from 'prop-types'
import './MessageIcon.scss'

function MessageIcon({ className = '' }) {
  return (
    <div className={`c-message-icon ${className} `}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="800px"
        height="800px"
        viewBox="0 0 24 24"
        fill="none"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M6.84572 18.6204C6.74782 18.0072 6.4668 17.4522 6.05816 17.0088C4.18319 15.5427 3 13.3942 3 11C3 6.58173 7.02944 3 12 3C16.9706 3 21 6.58173 21 11C21 15.4183 16.9706 19 12 19C11.1546 19 10.3365 18.8964 9.56074 18.7027C9.45389 18.676 9.34187 18.72 9.28125 18.8119C9.15858 18.998 9.02331 19.1851 8.87719 19.3674C8.64734 19.6542 8.39065 19.9289 8.11392 20.1685C7.59543 20.6174 7.00662 20.943 6.39232 20.9932C6.37166 20.9949 6.35097 20.9963 6.33025 20.9974C6.28866 20.9995 6.26498 20.9519 6.28953 20.9182C6.30109 20.9024 6.3125 20.8865 6.32376 20.8704C6.67743 20.3664 6.88397 19.7586 6.88397 19.1044C6.88397 19.0915 6.88389 19.0786 6.88373 19.0658C6.88185 18.9146 6.86893 18.7659 6.84572 18.6204ZM4.66223 18.4535C2.45613 16.6579 1 14.0103 1 11C1 5.26221 6.15283 1 12 1C17.8472 1 23 5.26221 23 11C23 16.7378 17.8472 21 12 21C11.3978 21 10.8057 20.9559 10.2276 20.8709C9.93606 21.2084 9.60764 21.5363 9.24519 21.8294C8.55521 22.3873 7.59485 22.9353 6.43241 22.9948L6.43238 22.9948C4.55136 23.0909 3.75168 21.003 4.67402 19.7392C4.81033 19.5524 4.88397 19.3363 4.88397 19.1044C4.88397 18.8684 4.80711 18.6449 4.66223 18.4535Z"
          fill="#0F1729"
        />
      </svg>
    </div>
  )
}

MessageIcon.propTypes = {
  className: PropTypes.string
}

export default MessageIcon
