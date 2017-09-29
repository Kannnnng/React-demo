import React from 'react'
import PropTypes from 'prop-types'
import styles from './styles'

function TCommentSection({ teacherComment }) {
  return (
    <div className={styles.analysisContainer} key='teacherComment'>
      <div className={styles.analysisTitle}>
        <span>{'教师点评'}</span>
      </div>
      <div>
        {teacherComment}
      </div>
    </div>
  )
}

TCommentSection.propTypes = {
  teacherComment: PropTypes.string,
}

export default TCommentSection
