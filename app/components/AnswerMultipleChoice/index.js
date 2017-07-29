/**
*
* AnswerMultipleChoice
*
*/

import React from 'react'
import PropTypes from 'prop-types'
import lodash from 'lodash'
import { letter } from 'utils/constants'
// import type2 from 'images/type2.png'
// import type22 from 'images/type22.png'
import ItemLabel from 'components/ItemLabel'
import styles from './index.scss'

const findIndex = (array, id) =>
  lodash.findIndex(array, (o) => o === id)

function AnswerMultipleChoice(props) {
  const {
    items,
    isAnswered,
    isAnswerOpen,
    hasCorrectness,
    canAnswer,
    isAllCorrect,
    answer,
    // handleOnClickAnswer,
  } = props
  const temp = []
  const correctAnswer = []
  // const myChoice = []
  items.forEach((value, index) => {
    const selected = (findIndex(answer, value.id) >= 0)
    if (isAnswered && isAnswerOpen) {
      temp.push(
        <div
          className={styles.answerContentForShow}
          key={index}
        >
          <ItemLabel
            selected={selected}
            correct={value.correctAnswer}
            hasCorrectness={hasCorrectness}
            showMySelected={!isAllCorrect}
          >
            {letter[index]}
          </ItemLabel>
          <span dangerouslySetInnerHTML={{ __html: value.content }} />
        </div>,
      )
      if (value.correctAnswer) {
        correctAnswer.push(letter[index])
      }
      // if (selected) {
      //   myChoice.push(letter[index])
      // }
    } else {
      // temp.push(
      //   <button
      //     className={styles.answerContent}
      //     onClick={handleOnClickAnswer(value.id)}
      //     key={index}
      //     disabled={!canAnswer}
      //   >
      //     <img src={selected ? type2 : type22} alt="" />
      //     <span dangerouslySetInnerHTML={{ _lodashhtml: value.content }} />
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
        <span>{`正确答案是「${correctAnswer.join('')}」。`}</span>
        {/* answer && <span>{`你的答案是「${myChoice.join('')}」。`}</span> */}
        {/* isAllCorrect ?
          <span className={styles.right}>{'回答正确'}</span> :
          <span className={styles.wrong}>{'回答错误'}</span>
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

AnswerMultipleChoice.propTypes = {
  items: PropTypes.array,
  answer: PropTypes.array,
  isAnswered: PropTypes.bool,
  isAnswerOpen: PropTypes.bool,
  hasCorrectness: PropTypes.bool,
  canAnswer: PropTypes.bool,
  isAllCorrect: PropTypes.bool,
  // handleOnClickAnswer: PropTypes.func,
}

AnswerMultipleChoice.defaultProps = {
  items: [],
  answer: [],
}

export default AnswerMultipleChoice
