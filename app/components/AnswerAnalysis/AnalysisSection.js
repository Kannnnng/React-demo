import React from 'react'
import PropTypes from 'prop-types'
import styles from './styles'
import FroalaEditorView from 'components/QuestionAnswer/HTMLPreview'

function AnalysisSection({ review }) {
  return (
    <div className={styles.analysisContainer}>
      <div className={styles.analysisTitle}>
        <span>{'解析'}</span>
      </div>
      <FroalaEditorView
        model={review}
      />
    </div>
  )
}

AnalysisSection.propTypes = {
  review: PropTypes.string,
}

export default AnalysisSection
