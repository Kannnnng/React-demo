/**
*
* AnswerSingleSelection
*
*/

import React from 'react'
import PropTypes from 'prop-types'
import lodash from 'lodash'
import ItemLabel from 'components/ItemLabel'
import FroalaEditorView from 'components/QuestionAnswer/HTMLPreview'
import type1 from 'images/type1.png'
import type11 from 'images/type11.png'
import { letter } from 'utils/constants'
import styles from './styles'

const findIndex = (array, id) =>
  lodash.findIndex(array, (o) => o === id)

function AnswerSingleSelection(props) {
  const {
    items,
    isAnswered,
    isAnswerOpen,
    isAllCorrect,
    hasCorrectness,
    canAnswer,
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
            hasCorrectness={hasCorrectness}
            selected={selected}
            correct={value.isCorrectOption || value.correctAnswer}
            showMySelected={!isAllCorrect}
          >
            {letter[index]}
          </ItemLabel>
          <FroalaEditorView
            tag='span'
            model={value.content.html}
          />
        </div>,
      )
      if (value.isCorrectOption || value.correctAnswer) {
        correctAnswer.push(letter[index])
      }
      // if (selected) {
      //   myChoice.push(letter[index])
      // }
    } else {
      temp.push(
        <button
          className={styles.answerContent}
          // onClick={handleOnClickAnswer(value.id)}
          key={index}
          disabled={!canAnswer}
        >
          <img src={selected ? type1 : type11} alt='' />
          <FroalaEditorView
            tag='span'
            model={value.content.html}
          />
        </button>,
      )
    }
  })

  let rightAnswer
  if (!isAnswered || !isAnswerOpen || canAnswer) {
    rightAnswer = null
  } else if (hasCorrectness && correctAnswer.length) {
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

AnswerSingleSelection.propTypes = {
  items: PropTypes.array,
  answer: PropTypes.array,
  isAnswered: PropTypes.bool,
  isAnswerOpen: PropTypes.bool,
  canAnswer: PropTypes.bool,
  isAllCorrect: PropTypes.bool,
  hasCorrectness: PropTypes.bool,
  // handleOnClickAnswer: PropTypes.func,
}

AnswerSingleSelection.defaultProps = {
  items: [],
  answer: [],
}

export default AnswerSingleSelection
