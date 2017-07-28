/**
*
* AnswerSingleSelection
*
*/

import React, { PropTypes } from 'react';
import { letter } from 'utils/constants';
import type1 from './images/type1.png';
import type11 from './images/type11.png';
import styles from './styles.css';
import _ from 'lodash';
import ItemLabel from 'components/ItemLabel';
import { FormattedMessage } from 'react-intl';
import messages from 'components/QuestionAnswer/messages';
import { rightAnswer as rightAnswerStyle, right, wrong } from 'components/QuestionAnswer/styles.css';

const findIndex = (array, id) =>
  _.findIndex(array, (o) => o === id);

function AnswerSingleSelection(props) {
  const {
    items,
    isAnswered,
    isAnswerOpen,
    isAllCorrect,
    hasCorrectness,
    canAnswer,
    answer,
    handleOnClickAnswer,
  } = props;
  const temp = [];
  const correctAnswer = [];
  const myChoice = [];
  items.forEach((value, index) => {
    const selected = (findIndex(answer, value.id) >= 0);
    if (isAnswered && isAnswerOpen) {
      temp.push(
        <div
          className={styles.answerContentForShow}
          key={index}
        >
          <ItemLabel
            hasCorrectness={hasCorrectness}
            selected={selected}
            correct={value.correctAnswer}
            showMySelected={!isAllCorrect}
          >
            {letter[index]}
          </ItemLabel>
          <span dangerouslySetInnerHTML={{ __html: value.content }} />
        </div>
      );
      if (value.correctAnswer) {
        correctAnswer.push(letter[index]);
      }
      if (selected) {
        myChoice.push(letter[index]);
      }
    } else {
      temp.push(
        <button
          className={styles.answerContent}
          onClick={handleOnClickAnswer(value.id)}
          key={index}
          disabled={!canAnswer}
        >
          <img src={selected ? type1 : type11} alt="" />
          <span dangerouslySetInnerHTML={{ __html: value.content }} />
        </button>
      );
    }
  });

  let rightAnswer = null;
  if (!isAnswered || !isAnswerOpen || canAnswer) {
    rightAnswer = null;
  } else if (hasCorrectness) {
    rightAnswer = (
      <div className={rightAnswerStyle}>
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
    );
  } else {
    rightAnswer = (
      <div className={rightAnswerStyle}>
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
    );
  }

  return (
    <div>
      {temp}
      {rightAnswer}
    </div>
  );
}

AnswerSingleSelection.propTypes = {
  items: PropTypes.array,
  answer: PropTypes.array,
  isAnswered: PropTypes.bool,
  isAnswerOpen: PropTypes.bool,
  canAnswer: PropTypes.bool,
  isAllCorrect: PropTypes.bool,
  hasCorrectness: PropTypes.bool,
  handleOnClickAnswer: PropTypes.func,
};

AnswerSingleSelection.defaultProps = {
  items: [],
  answer: [],
};

export default AnswerSingleSelection;
