import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router'
import lodash from 'lodash'
import AnswerShortAnswer from 'components/AnswerShortAnswer'
import styles from './styles'

function NoteSection({ courseId, questionId, data = {} }) {
  return (
    <div className={styles.analysisContainer}>
      <div className={styles.analysisTitle}>
        <span>{'笔记'}</span>
        <Link className={styles.notes} to={`/student/answernotes?courseid=${courseId}&questionid=${questionId}`}>
          {lodash.isEmpty(data) ?
            <span>{'添加笔记'}</span>
          :
            <span>{'编辑笔记'}</span>
          }
        </Link>
      </div>
      {!lodash.isEmpty(data) && <div className={styles.content}>
        <AnswerShortAnswer
          answer={{ content: data.text, attaches: data.attaches }}
          canAnswer={false}
          flag={false}
        />
      </div>}
    </div>
  )
}

NoteSection.propTypes = {
  courseId: PropTypes.string,
  questionId: PropTypes.string,
  data: PropTypes.object,
}

export default NoteSection
