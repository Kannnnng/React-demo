import React from 'react'
import PropTypes from 'prop-types'
import styles from './index.scss'

function KPointSection({ labels = [] }) {
  return (
    <div className={styles.analysisContainer}>
      <div className={styles.analysisTitle}>
        <span>{'知识点'}</span>
      </div>
      <div>
        {labels.map((value, index) => (
          <span
            style={{ textDecoration: 'underline', paddingRight: '8px' }}
            key={index}
          >
            {value.text}
          </span>
        ))}
      </div>
    </div>
  )
}

KPointSection.propTypes = {
  labels: PropTypes.array,
}

export default KPointSection
