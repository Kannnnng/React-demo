import React from 'react'
import PropTypes from 'prop-types'
import styles from './styles'
import lodash from 'lodash'

function KPointSection({
  labels = [],
  questionId = '',
  isAnswerPage,
  handleOnAddLabels = () => () => {},
}) {
  const btn = isAnswerPage ? null : (
    <button className={styles.addLabels} onClick={handleOnAddLabels(questionId)}>
      {'点击添加知识点'}
    </button>
  )
  return (
    <div className={styles.analysisContainer}>
      <div className={styles.analysisTitle}>
        <span>{'知识点'}</span>
      </div>
      <div style={{ overflow: 'hidden' }}>
        {lodash.get(labels, '[0].text[0]') ? (
          labels.map((value, index) => (
            <span
              style={{ float: 'left', textDecoration: 'underline', paddingRight: '8px', paddingBottom: '3px' }}
              key={index}
            >
              {value.text}
            </span>
          ))
        ) : btn}
      </div>
    </div>
  )
}

KPointSection.propTypes = {
  labels: PropTypes.arrayOf(PropTypes.object),
  questionId: PropTypes.string,
  handleOnAddLabels: PropTypes.func,
  isAnswerPage: PropTypes.bool,
}

export default KPointSection
