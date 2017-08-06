/**
*
* AnswerJudge
*
*/

import React from 'react'
import PropTypes from 'prop-types'
// import type1 from 'images/type1.png'
// import type11 from 'images/type11.png'
import { letter } from 'utils/constants'
import ItemLabel from 'components/ItemLabel'
import styles from './styles'

function AnswerJudge(props) {
  const {
    isAnswered,
    isAnswerOpen,
    isAllCorrect,
    answer,
    canAnswer,
    hasCorrectness,
    correctAnswer,
    // handleOnClickAnswer,
  } = props
  const temp = []
  const correctAnswerArray = []
  // const myChoice = []
  const yesAndNo = ['是', '否']
  yesAndNo.forEach((value, index) => {
    if (isAnswered && isAnswerOpen) {
      temp.push(
        <div
          className={styles.answerContentForShow}
          key={index}
        >
          <ItemLabel
            selected={!index === answer}
            correct={hasCorrectness ? correctAnswer === !index : undefined}
            showMySelected={!isAllCorrect}
            hasCorrectness={hasCorrectness}
          >
            {letter[index]}
          </ItemLabel>
          <span>{value}</span>
        </div>,
      )
      if (correctAnswer === !index) {
        correctAnswerArray.push(letter[index])
      }
      // if (!index === answer) {
      //   myChoice.push(letter[index])
      // }
    } else {
      // temp.push(
      //   <button
      //     className={styles.answerContent}
      //     onClick={handleOnClickAnswer(!index)}
      //     key={index}
      //     disabled={!canAnswer}
      //   >
      //     <img src={!index === answer ? type1 : type11} alt="" />
      //     <span>{value}</span>
      //   </button>,
      // )
    }
  })

  let rightAnswer = null
  if (!isAnswered || !isAnswerOpen || canAnswer) {
    rightAnswer = null
  } else if (hasCorrectness) {
    rightAnswer = (
      <div className={styles.rightAnswer}>
        <span>{`正确答案是「${correctAnswerArray.join('')}」。`}</span>
        {/* answer && <span>{`你的答案是「${answer}」。`}</span> */}
        {/* isAllCorrect ?
          <span className={styles.right}>{'回答正确。'}</span> :
          <span className={styles.wrong}>{'回答错误。'}</span>
        */}
      </div>
    )
  } else {
    rightAnswer = (
      <div className={styles.rightAnswer}>
        <span>{'本题无标答。'}</span>
        {/* answer && <span>{`你的答案是「${myChoice.join('')}」。`}</span> */}
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

AnswerJudge.propTypes = {
  answer: PropTypes.bool,
  isAnswered: PropTypes.bool,
  isAnswerOpen: PropTypes.bool,
  isAllCorrect: PropTypes.bool,
  correctAnswer: PropTypes.bool,
  canAnswer: PropTypes.bool,
  hasCorrectness: PropTypes.bool,
  // handleOnClickAnswer: PropTypes.func,
}

export default AnswerJudge
