/**
*
* AnswerMultipleChoice
*
*/

import React from 'react'
import PropTypes from 'prop-types'
import { FormattedMessage } from 'react-intl'
import { letter } from 'utils/constants'
import type2 from 'images/type2.png'
import type22 from 'images/type22.png'
import lodash from 'lodash'
import ItemLabel from 'components/ItemLabel'
import messages from 'components/QuestionAnswer/messages'
import { rightAnswer as rightAnswerStyle, right, wrong } from 'components/QuestionAnswer/styles.css'
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
    handleOnClickAnswer,
  } = props
  const temp = []
  const correctAnswer = []
  const myChoice = []
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
        </div>
      )
      if (value.correctAnswer) {
        correctAnswer.push(letter[index])
      }
      if (selected) {
        myChoice.push(letter[index])
      }
    } else {
      temp.push(
        <button
          className={styles.answerContent}
          onClick={handleOnClickAnswer(value.id)}
          key={index}
          disabled={!canAnswer}
        >
          <img src={selected ? type2 : type22} alt="" />
          <span dangerouslySetInnerHTML={{ _lodashhtml: value.content }} />
        </button>
      )
    }
  })

  let rightAnswer = null
  if (!isAnswered || !isAnswerOpen || canAnswer) {
    rightAnswer = null
  } else if (hasCorrectness) {
    rightAnswer = (
      <div className={styles.rightAnswerStyle}>
        <FormattedMessage
          {...messages.resultCorrectAnswer}
          values={{
            correntAnswer: correctAnswer.join(''),
          }}
        />
        {answer && <FormattedMessage
          {...messages.resultMyAnswer}
          values={{
            answer: myChoice.join(''),
          }}
        />}
        {isAllCorrect ?
          <span className={right}>
            <FormattedMessage
              {...messages.answerRight}
            />
          </span>
        : <span className={wrong}>
          <FormattedMessage
            {...messages.answerWrong}
          />
        </span>}
      </div>
    )
  } else {
    rightAnswer = (
      <div className={styles.rightAnswerStyle}>
        <FormattedMessage
          {...messages.resultNoCorrectAnswer}
        />
        {answer && <FormattedMessage
          {...messages.resultMyAnswer}
          values={{
            answer: myChoice.join(''),
          }}
        />}
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
  handleOnClickAnswer: PropTypes.func,
}

AnswerMultipleChoice.defaultProps = {
  items: [],
  answer: [],
}

export default AnswerMultipleChoice
