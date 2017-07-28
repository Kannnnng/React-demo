/**
*
* AnswerAnalysis
*
*/

import React from 'react'
import PropTypes from 'prop-types'
import NoteSection from './NoteSection'
import KPointSection from './KPointSection'
import AnalysisSection from './AnalysisSection'
import TCommentSection from './TCommentSection'
import WrongReason from './WrongReason'

function AnswerAnalysis({
  data,
  isAnswered,
  isAnswerOpen,
  canAnswer,
  subQuestionIndex,
}) {
  if (Object.prototype.toString.call(data).slice(8, -1) === 'Array') {
    const subData = data[subQuestionIndex]
    return (
      <AnswerAnalysis
        data={subData}
        pattern={subData.pattern}
        isAnswered={subData.isAnswered}
        isAnswerOpen={subData.isAnswerOpen}
        canAnswer={subData.canAnswer}
      />
    )
  }

  if (!isAnswered || canAnswer) {
    return null
  } else if (!isAnswerOpen) {
    return (
      <div>
        <AnalysisSection review={isAnswerOpen ? data.review : null} />
      </div>
    )
  }

  return (
    <div>
      {data.teacherComment && <TCommentSection teacherComment={data.teacherComment} />}
      <AnalysisSection review={data.review} />
      <KPointSection labels={data.labels} />
      <WrongReason wrongReason={data.wrongReason} />
      <NoteSection courseId={data.courseId} questionId={data.questionId} data={data.note} />
    </div>
  )
}

AnswerAnalysis.propTypes = {
  data: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  isAnswered: PropTypes.bool,
  isAnswerOpen: PropTypes.bool,
  canAnswer: PropTypes.bool,
  subQuestionIndex: PropTypes.number,
}

AnswerAnalysis.defaultProps = {
  data: {},
  subQuestionIndex: 0,
}

export default AnswerAnalysis
