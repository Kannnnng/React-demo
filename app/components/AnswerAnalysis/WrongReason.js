import React from 'react'
import PropTypes from 'prop-types'
import styles from './styles.scss'

function WrongReason({ wrongReason }) {
  return (
    <div className={styles.analysisContainer}>
      <div className={styles.analysisTitle}>
        <span>{'答错原因'}</span>
      </div>
      <div className={styles.wrongReasonContent}>
        {wrongReason.map((value, index) => <button
          key={index}
          style={{
            backgroundColor: value.isChecked ? '#FF5B05' : '',
            color: value.isChecked ? '#FFF' : '#333',
          }}
        >
          {value.text}
        </button>)}
      </div>
    </div>
  )
}

WrongReason.propTypes = {
  wrongReason: PropTypes.array,
}

export default WrongReason
