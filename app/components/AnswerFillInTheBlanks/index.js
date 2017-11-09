/**
*
* AnswerFillInTheBlanks
*
*/

import React from 'react'
import PropTypes from 'prop-types'
import styles from './styles'
import lodash from 'lodash'

function renderFillInTheBlanksContent(value, /* hasCorrectness */isAnswered) {
  // if (hasCorrectness && value.myAnswer === value.correctAnswer) {
  //   return <span style={{ color: '#118675' }}>{value.correctAnswer}</span>
  // } else if (!hasCorrectness) {
  //   return <span style={{ color: '#118675' }}>{value.myAnswer}</span>
  // }
  if (lodash.get(value, 'correctAnswer') instanceof Array) {
    return (
      <div key={value.id}>
        {lodash.get(value, 'correctAnswer[0].length') ?
          value.correctAnswer.map((item, index) => (
            <div key={index} style={{ color: '#333', lineHeight: '1', marginTop: `${!index ? '13px' : '0'}` }}>{item}</div>
          )) :
          <span style={{ color: '#888' }}>{'未输入标答'}</span>
        }
      </div>
    )
  }
  return (
    <div>
      {/* value.myAnswer && (
        <span style={{ color: '#EE192E', paddingRight: '10px' }}>
          {value.myAnswer}
        </span>
      ) */}
      {value.content && isAnswered && (
        <span style={{ color: '#333' }}>
          {`正确答案「${value.content.html}」`}
        </span>
      )}
    </div>
  )
}

function AnswerFillInTheBlanks(props) {
  const {
    items,
    isAnswered,
    isAnswerOpen,
    canAnswer,
    // hasCorrectness,
    // answer,
    // handleOnClickAnswer,
    caseSensitive,
    strict,
    noBottomLine,
  } = props
  const answerContentStyle = noBottomLine ? { borderBottom: 'none' } : {}
  const temp = []
  items.forEach((value, index) => {
    if (/* isAnswered && */isAnswerOpen && !canAnswer) {
      temp.push(
        <div className={styles.answerContent} key={index} style={answerContentStyle}>
          <div className={styles.circleOrder}>
            {index + 1}
          </div>
          <div style={{ marginLeft: '33px', fontSize: '14px', lineHeight: '40px' }}>
            {renderFillInTheBlanksContent(value, /* hasCorrectness, */isAnswered)}
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

  let rightAnswer
  if (strict || caseSensitive) {
    rightAnswer = (
      <div className={styles.rightAnswer}>
        <span>{`答案${strict && '「允许次序不同」' || ''}${caseSensitive && '「不严格匹配大小写」' || ''}`}</span>
      </div>
    )
  }
  return (
    <div>
      {temp}
      {rightAnswer}
    </div>
  )
}

AnswerFillInTheBlanks.propTypes = {
  items: PropTypes.array,
  // answer: PropTypes.object,
  isAnswered: PropTypes.bool,
  isAnswerOpen: PropTypes.bool,
  canAnswer: PropTypes.bool,
  // hasCorrectness: PropTypes.bool,
  // handleOnClickAnswer: PropTypes.func,
  caseSensitive: PropTypes.bool,
  strict: PropTypes.bool,
  noBottomLine: PropTypes.bool,
}

AnswerFillInTheBlanks.defaultProps = {
  items: [],
  answer: {},
  noBottomLine: false,
}

export default AnswerFillInTheBlanks
