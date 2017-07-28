import React from 'react'
import PropTypes from 'prop-types'
import lodash from 'lodash'
import BlackCover from './BlackCover'
import {
  GoBack,
  GoLeft,
  GoRight,
  BottomToolBar,
} from './Mess'
import QuestionContent from 'components/QuestionContent'
import styles from './index.scss'

class QuestionPreview extends React.Component {
  static propTypes = {
    data: PropTypes.object,
  }

  constructor(props) {
    super(props)

    this.questionContent = {}
    this.questionContent.content = '<p>这是一段测试文本<span>这是一个行内元素</span><img src="http://img95.699pic.com/photo/50035/0496.jpg_wh300.jpg" alt="" /></p>'  // eslint-disable-line
    this.questionContent.title = {
      pattern: 1,
      serialNumber: 'J00001',
      difficulty: 3,
    }
  }

  render() {
    const {
      data,
    } = this.props

    return (
      <BlackCover
        topLeftButton={<GoBack handleOnClick={() => console.log(456)} />}
        middleLeftButton={<GoLeft handleOnClick={() => console.log(123)} />}
        middleRightButton={<GoRight handleOnClick={() => console.log(123)} />}
        bottomToolBar={
          <BottomToolBar
            handleOnEdit={() => console.log(321)}
            handleOnClone={() => console.log(321)}
            handleOnCopy={() => console.log(321)}
            handleOnMove={() => console.log(321)}
            handleOnDelete={() => console.log(321)}
          />
        }
      >
        <div className={styles.content}>
          <QuestionContent
            content={this.questionContent.content}
            title={this.questionContent.title}
          />
        </div>
      </BlackCover>
    )
  }
}

export default QuestionPreview
