/**
*
* AnswerFillInTheBlanks
*
*/

import React from 'react'
import PropTypes from 'prop-types'
import styles from './index.scss'

function renderFillInTheBlanksContent(value/* , hasCorrectness */) {
  // if (hasCorrectness && value.myAnswer === value.correctAnswer) {
  //   return <span style={{ color: '#118675' }}>{value.correctAnswer}</span>
  // } else if (!hasCorrectness) {
  //   return <span style={{ color: '#118675' }}>{value.myAnswer}</span>
  // }
  return (
    <div>
      {/* value.myAnswer && <span style={{ color: '#EE192E', paddingRight: '10px' }}>{value.myAnswer}</span> */}
      <span style={{ color: '#333' }}>{`正确答案「${value.correctAnswer}」`}</span>
    </div>
  )
}

function AnswerFillInTheBlanks(props) {
  const {
    items,
    isAnswered,
    isAnswerOpen,
    canAnswer,
    hasCorrectness,
    // answer,
    // handleOnClickAnswer,
  } = props
  const temp = []
  items.forEach((value, index) => {
    if (isAnswered && isAnswerOpen && !canAnswer) {
      temp.push(
        <div className={styles.answerContent} key={index}>
          <div className={styles.circleOrder}>
            {index + 1}
          </div>
          <div style={{ marginLeft: '33px', fontSize: '14px', lineHeight: '40px' }}>
            {renderFillInTheBlanksContent(value, hasCorrectness)}
          </div>
        </div>,
      )
    } else {
      // temp.push(
      //   <div className={styles.answerContent} key={index}>
      //     <div className={styles.circleOrder}>
      //       {index + 1}
      //     </div>
      //     <div style={{ marginLeft: '33px', height: '40px', fontSize: '0' }}>
      //       <input
      //         type="text"
      //         placeholder="输入你的答案"
      //         value={answer ? (answer[value.id] || '') : ''}
      //         onChange={handleOnClickAnswer(value.id)}
      //         style={{ width: '100%', height: '100%', outline: 'none', fontSize: '14px' }}
      //         disabled={!canAnswer}
      //       />
      //     </div>
      //   </div>,
      // )
    }
  })

  return (
    <div>
      {temp}
    </div>
  )
}

AnswerFillInTheBlanks.propTypes = {
  items: PropTypes.array,
  // answer: PropTypes.object,
  isAnswered: PropTypes.bool,
  isAnswerOpen: PropTypes.bool,
  canAnswer: PropTypes.bool,
  hasCorrectness: PropTypes.bool,
  // handleOnClickAnswer: PropTypes.func,
}

AnswerFillInTheBlanks.defaultProps = {
  items: [],
  answer: {},
}

export default AnswerFillInTheBlanks
