/**
*
* QuestionContent
*
*/

import React from 'react'
import PropTypes from 'prop-types'
import img1 from 'images/singleSelection.png'
import img2 from 'images/multipleChoice.png'
import img3 from 'images/judge.png'
import img4 from 'images/fillInTheBlanks.png'
import img5 from 'images/shortAnswer.png'
import img6 from 'images/group.png'
import { questionPattern } from 'utils/constants'
import styles from './index.scss'

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
  }

  static defaultProps = {
    content: '',
    title: {},
  }

  render() {
    const {
      content,
      title,
    } = this.props
    const flag = getQuestionFlag(title.pattern)
    return (
      <div className={styles.container}>
        <div className={styles.title}>
          <div className={styles.chapter} style={{ backgroundColor: flag.bgc }}>
            <img src={flag.img} alt="" />
            <span>{`${flag.pattern} ${title.serialNumber}`}</span>
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
        <div className={styles.content} dangerouslySetInnerHTML={{ __html: content }} />
      </div>
    )
  }
}

export default QuestionContent
