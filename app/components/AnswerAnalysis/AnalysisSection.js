import React from 'react'
import PropTypes from 'prop-types'
import styles from './styles.scss'

function AnalysisSection({ review }) {
  return (
    <div className={styles.analysisContainer}>
      <div className={styles.analysisTitle}>
        <span>{'解析'}</span>
      </div>
      {review ?
        <div dangerouslySetInnerHTML={{ __html: review }} />
      :
        <div>
          <span>{'请等待老师公布答案后查看解析'}</span>
        </div>
      }
    </div>
  )
}

AnalysisSection.propTypes = {
  review: PropTypes.string,
}

export default AnalysisSection
