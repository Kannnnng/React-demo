/**
*
* AnswerAnalysis
*
*/

import React from 'react'
import PropTypes from 'prop-types'
// import NoteSection from './NoteSection'
import KPointSection from './KPointSection'
import AnalysisSection from './AnalysisSection'
// import TCommentSection from './TCommentSection'
// import WrongReason from './WrongReason'
import styles from './styles'

function AnswerAnalysis({
  data,
  isAnswered,
  isAnswerOpen,
  canAnswer,
  subQuestionIndex,
  handleOnAddLabels,
}) {
  if (Object.prototype.toString.call(data) === '[object Array]') {
    const subData = data[subQuestionIndex]
    return (
      <AnswerAnalysis
        data={{
          id: subData.id,
          pattern: subData.pattern,
          review: subData.review.html
        }}
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
    <div className={styles.container}>
      {/* data.teacherComment && <TCommentSection teacherComment={data.teacherComment} /> */}
      {/* 原本的逻辑是没有解析则显示 请等待老师公布答案后查看解析，但在用于题目预览时这个功能是 */}
      {/* 没有必要的，因此在用于题目预览这种情况下时如果没有解析，则解析这一部分直接不显示 */}
      {data.review && data.review !== '<p></p>' && <AnalysisSection review={data.review} />}
      {/* 知识点有相同问题，在用于题目预览这种情况下时如果没有知识点，则显示添加知识点按钮 */}
      <KPointSection
        labels={data.labels}
        questionId={data.questionId}
        handleOnAddLabels={handleOnAddLabels}
      />
      {/* <WrongReason wrongReason={data.wrongReason} /> */}
      {/* <NoteSection courseId={data.courseId} questionId={data.questionId} data={data.note} /> */}
    </div>
  )
}

AnswerAnalysis.propTypes = {
  data: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  isAnswered: PropTypes.bool,
  isAnswerOpen: PropTypes.bool,
  canAnswer: PropTypes.bool,
  subQuestionIndex: PropTypes.number,
  handleOnAddLabels: PropTypes.func,
  isTeacher: PropTypes.bool,
}

AnswerAnalysis.defaultProps = {
  data: {},
  subQuestionIndex: 0,
}

export default AnswerAnalysis
