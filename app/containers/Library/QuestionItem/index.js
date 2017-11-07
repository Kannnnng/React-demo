/**
 *
 * Name: QuestionItem
 * Date: 2017-11-07 11:05:47
 * Description: 题目、题组、组卷、课件的预览展示组件
 * Author: Einskang
 * Organization: HUST
 *
 */

import React from 'react'
import PropTypes from 'prop-types'
import styles from './styles'
import T1 from 'images/t1C.svg'
import T2 from 'images/t2C.svg'
import T3 from 'images/t3C.svg'
import T4 from 'images/t4C.svg'
import T5 from 'images/t5C.svg'
import T6 from 'images/t6C.svg'
import T7 from 'images/t7C.svg'
import PPT from 'images/ppt.svg'
import { questionPattern } from 'utils/constants'

export default function QuestionItem({
  /* 题目、组卷、课件的 ID */
  id,
  /* 类型，单选、多选、题组、组卷、课件等 */
  pattern,
  /* 难度 */
  difficulty,
  /* 摘要 */
  summary,
  /* 正确率，如果有答题记录的话 */
  correctRate,
  /* 答题人数，如果有答题记录的话 */
  answerCount,
  /* 是否是组卷 */
  isQuiz,
  /* 是否是课件 */
  isCourseware,
  /* 课件类型，如果当前是课件的话 */
  fileType,
}) {
  let patternIcon
  let patternText
  if (isQuiz) {
    patternIcon = T7
    patternText = '组卷'
  } else if (isCourseware) {
    switch (fileType) {
      case 'pdf':
        break
      case 'ppt':
        patternText = 'POWERPOINT'
        patternIcon = PPT
        break
      default:
        break
    }
  } else {
    switch (pattern) {
      case questionPattern.singleSelection:
        patternIcon = T1
        patternText = '单选'
        break
      case questionPattern.multipleChoice:
        patternIcon = T2
        patternText = '多选'
        break
      case questionPattern.judge:
        patternIcon = T3
        patternText = '判断'
        break
      case questionPattern.fillInTheBlanks:
        patternIcon = T4
        patternText = '填空'
        break
      case questionPattern.shortAnswer:
        patternIcon = T5
        patternText = '简答'
        break
      case questionPattern.group:
        patternIcon = T6
        patternText = '题组'
        break
      default:
        break
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.pattern}>
        <div style={{ maskImage: `url(${patternIcon})` }} />
        <div>
          {patternText}
        </div>
        <div>
          {Array(difficulty).fill('☆')}
        </div>
      </div>
      <div className={styles.summary}>
        <div>
          {summary.word}
        </div>
        {summary.image && <div style={{ backgroundImage: `url(${summary.image})` }} />}
      </div>
    </div>
  )
}

QuestionItem.propTypes = {
  id: PropTypes.string.isRequired,
  pattern: PropTypes.number,
  difficulty: PropTypes.string,
  summary: PropTypes.number,
  correctRate: PropTypes.number,
  answerCount: PropTypes.number,
  isQuiz: PropTypes.bool,
}
