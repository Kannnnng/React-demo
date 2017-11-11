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
import Checkbox from 'material-ui/Checkbox'
import IconButton from 'material-ui/IconButton'
import { questionPattern } from 'utils/constants'
import styles from './styles'

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
  /* 当前列表项是否被选中 */
  isChecked,
  /* 课件的预览地址 */
  previewUrl,
  /* 当列表项被点击时触发 */
  handleOnClick,
  /* 当列表项被选中或取消选中时触发 */
  handleOnQuestionItemCheck,
}) {
  let patternClassName
  let patternText
  let patternColor
  if (isQuiz) {
    patternClassName = styles.quizIcon
    patternText = '组卷'
    patternColor = '#4A90E2'
  } else if (isCourseware) {
    switch (fileType) {
      case 'ppt':
        patternClassName = styles.pptIcon
        patternText = 'POWERPOINT'
        patternColor = '#4A90E2'
        break
      case 'rtf':
        patternClassName = styles.rtfIcon
        patternText = 'RTF'
        patternColor = '#4A90E2'
        break
      case 'pdf':
        patternClassName = styles.pdfIcon
        patternText = 'PDF'
        patternColor = '#4A90E2'
        break
      case 'word':
        patternClassName = styles.wordIcon
        patternText = 'WORD'
        patternColor = '#4A90E2'
        break
      case 'excel':
        patternClassName = styles.excelIcon
        patternText = 'EXCEL'
        patternColor = '#4A90E2'
        break
      // case 'ppt':
      //   patternClassName = styles.wpsWordIcon
      //   patternText = 'WPSWORD'
      //   break
      // case 'ppt':
      //   patternClassName = styles.wpsPPTIcon
      //   patternText = 'WPSPPT'
      //   break
      // case 'ppt':
      //   patternClassName = styles.wpsExcelIcon
      //   patternText = 'WPSEXCEL'
      //   break
      default:
        break
    }
  } else {
    switch (pattern) {
      case questionPattern.singleSelection:
        patternClassName = styles.singleSelectionIcon
        patternText = '单选'
        patternColor = '#4CBEA1'
        break
      case questionPattern.multipleChoice:
        patternClassName = styles.multipleChoiceIcon
        patternText = '多选'
        patternColor = '#00CCDE'
        break
      case questionPattern.judge:
        patternClassName = styles.judgeIcon
        patternText = '判断'
        patternColor = '#9B9B9B'
        break
      case questionPattern.fillInTheBlanks:
        patternClassName = styles.fillInTheBlanksIcon
        patternText = '填空'
        patternColor = '#F5A623'
        break
      case questionPattern.shortAnswer:
        patternClassName = styles.shortAnswerIcon
        patternText = '简答'
        patternColor = '#9013FE'
        break
      case questionPattern.group:
        patternClassName = styles.groupIcon
        patternText = '题组'
        patternColor = '#E91E63'
        break
      default:
        break
    }
  }

  return (
    <div className={styles.container}>
      {isCourseware ? (
        <a target={'_blank'} href={previewUrl} />  // eslint-disable-line
      ) : (
        <button
          onClick={handleOnClick({
            id,
            name: isQuiz ? 'quiz' : 'question',
          })}
        />
      )}
      <div className={styles.pattern}>
        <div style={{ backgroundColor: patternColor }}>
          <div className={patternClassName} />
        </div>
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
        {summary.image && <div
          style={{ backgroundImage: `url(${summary.image})` }}
        />}
      </div>
      <div className={styles.bottomToolBar}>
        <div>
          {(correctRate != undefined) && (`正确率:${correctRate}`)}
          {(answerCount != undefined) && (` 答题人数:${answerCount}`)}
        </div>
        <div>
          <Checkbox
            checked={isChecked}
            label={'选择:'}
            labelPosition={'left'}
            labelStyle={{ whiteSpace: 'nowrap', marginTop: '6px', marginRight: '5px' }}
            iconStyle={{ marginTop: '3px' }}
            onCheck={handleOnQuestionItemCheck({
              id,
            })}
          />
        </div>
      </div>
    </div>
  )
}

QuestionItem.propTypes = {
  id: PropTypes.string.isRequired,
  pattern: PropTypes.number,
  difficulty: PropTypes.number,
  summary: PropTypes.object,
  correctRate: PropTypes.number,
  answerCount: PropTypes.number,
  isQuiz: PropTypes.bool,
  handleOnClick: PropTypes.func.isRequired,
  handleOnQuestionItemCheck: PropTypes.func.isRequired
}

QuestionItem.defaultProps = {
  handleOnClick: () => () => {},
  handleOnQuestionItemCheck: () => () => {},
}
