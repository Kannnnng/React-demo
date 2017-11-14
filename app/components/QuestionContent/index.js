/**
*
* QuestionContent
*
*/

import React from 'react'
import PropTypes from 'prop-types'
import { isEqual } from 'lodash'
import FroalaEditorView from 'components/QuestionAnswer/HTMLPreview'
import img1 from 'images/singleSelection.png'
import img2 from 'images/multipleChoice.png'
import img3 from 'images/judge.png'
import img4 from 'images/fillInTheBlanks.png'
import img5 from 'images/shortAnswer.png'
import img6 from 'images/group.png'
import { questionPattern, coursewareAssets } from 'utils/constants'
import styles from './styles'

function getQuestionFlag(pattern = 0) {
  switch (pattern) {
    case questionPattern.singleSelection:
      return { pattern: '单选', img: img1, bgc: '#4CBEA1' }
    case questionPattern.multipleChoice:
      return { pattern: '多选', img: img2, bgc: '#00CCDE' }
    case questionPattern.judge:
      return { pattern: '判断', img: img3, bgc: '#9B9B9B' }
    case questionPattern.fillInTheBlanks:
      return { pattern: '填空', img: img4, bgc: '#F6A623' }
    case questionPattern.shortAnswer:
      return { pattern: '简答', img: img5, bgc: '#9012FE' }
    case questionPattern.group:
      return { pattern: '题组', img: img6, bgc: '#E91E63' }
    default:
      return {}
  }
}

function getLevel(level = 0) {
  return Array.join(Array.fill(new Array(level), '☆'), '')
}

class QuestionContent extends React.Component {
  static propTypes = {
    content: PropTypes.string,
    title: PropTypes.object,
    contentOnly: PropTypes.bool,
  }

  static defaultProps = {
    content: '',
    title: {},
  }

  render() {
    const {
      content,
      title,
      contentOnly,
    } = this.props
    const flag = getQuestionFlag(title.pattern)
    let titleSection = null
    if (!isEqual({}, title) && title.pattern !== 7) {
      titleSection = (
        <div className={styles.title}>
          <div className={styles.chapter} style={{ backgroundColor: flag.bgc }}>
            <img src={flag.img} alt='' />
          </div>
          <div className={styles.type}>
            {`${flag.pattern}`}
          </div>
          <div className={styles.level}>
            {getLevel(title.difficulty)}
          </div>
          {title.answerState &&
          <div className={styles.answer} style={title.answerState.style}>
            {title.answerState.text}
          </div>
          }
        </div>
      )
    }
    if (!isEqual({}, title) && title.pattern === 7) {
      const assets = coursewareAssets[title.type]
      titleSection = (
        <div className={styles.title}>
          <div className={styles.chapter}>
            <img src={assets.icon} alt='' />
          </div>
          <div className={styles.type}>
            {`${title.serialNumber}`}
          </div>
        </div>
      )
    }
    return (
      <div className={styles.container}>
        {!contentOnly && titleSection}
        <div className={styles.contentBox}>
          <FroalaEditorView
            className={styles.content}
            model={content}
          />
        </div>
      </div>
    )
  }
}

export default QuestionContent
