import React from 'react'
import PropTypes from 'prop-types'
import { questionPattern } from 'utils/constants'
import styles from './styles'

function getQuestionFlag(pattern, canAnswer) {
  switch (pattern) {
    case questionPattern.singleSelection:
      return `(单选) ${canAnswer ? '请选择一个正确答案' : ''}`
    case questionPattern.multipleChoice:
      return `(多选) ${canAnswer ? '请选择一个或多个正确答案' : ''}`
    case questionPattern.judge:
      return `(判断) ${canAnswer ? '请选择一个正确答案' : ''}`
    case questionPattern.fillInTheBlanks:
      return `(填空) ${canAnswer ? '请依照题目中的填空位置填写答案' : ''}`
    case questionPattern.shortAnswer:
      return '(简答) '
    default:
      return null
  }
}

function SubQuestionTitle({ index, totalCount, onChange, question, canAnswer }) {
  const { pattern, answer } = question
  const { isAllCorrect, limit } = answer
  let style = {}
  const text = [(<span key="sqt-prefix">{getQuestionFlag(pattern, canAnswer)}</span>)]
  if (canAnswer) {
    if (pattern === questionPattern.shortAnswer) {
      text.push(<span key="sqt-limit">{limit ? `限${limit}字` : '不限字数'}</span>)
    }
  } else if (isAllCorrect === true) {
    text.push(<span key="sqt-result" className={styles.right}>{'回答正确'}</span>)
    style = { backgroundColor: 'rgba(77, 181, 83, 0.16)' }
  } else if (isAllCorrect === false) {
    text.push(<span key="sqt-result" className={styles.wrong}>{'回答错误'}</span>)
    style = {
      backgroundColor: 'rgba(244, 51, 60, 0.16)',
    }
  } else {
    text.push(<span key="sqt-result" className={styles.none}>{'未作答'}</span>)
  }
  return (
    <div className={styles.subQuestionTitle} style={style}>
      <div>
        <div className={styles.subQuestionCircleOrder}>{index}</div>
        <div className={styles.subQuestionIntroduction}>{text}</div>
      </div>
      <div className={styles.subQuestionPages}>
        <button
          className={styles.subQuestionPrevBtn}
          onClick={
            (e) => {
              e.preventDefault()
              onChange(index - 1)
            }
          }
          disabled={index <= 1}
        >
          &lt;
        </button>
        <span>{`${index} / ${totalCount}`}</span>
        <button
          className={styles.subQuestionNextBtn}
          onClick={
            (e) => {
              e.preventDefault()
              onChange(index + 1)
            }
          }
          disabled={index >= totalCount}
        >
          &gt;
        </button>
      </div>
    </div>
  )
}

SubQuestionTitle.propTypes = {
  canAnswer: PropTypes.bool,
  index: PropTypes.number,
  totalCount: PropTypes.number,
  onChange: PropTypes.func,
  question: PropTypes.object,
}

SubQuestionTitle.defaultProps = {
  index: 1,
  totalCount: 1,
}

export default SubQuestionTitle
