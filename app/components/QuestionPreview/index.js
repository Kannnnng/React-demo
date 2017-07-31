import React from 'react'
import PropTypes from 'prop-types'
// import lodash from 'lodash'
import AnswerAnalysis from 'components/AnswerAnalysis'
import QuestionAnswer from 'components/QuestionAnswer'
import QuestionContent from 'components/QuestionContent'
import QuestionComment from 'components/QuestionComment'
import BlackCover from './BlackCover'
import {
  GoBack,
  GoLeft,
  GoRight,
  BottomToolBar,
} from './Mess'
import styles from './index.scss'

const comments = [
  {
    id: '001',
    name: '闫守康',
    avatar: 'https://avatars2.githubusercontent.com/u/22359680?v=4&s=460',
    like: 3,
    comment: '这是一段评论，老师你出这个题真是太他妈的操蛋了',
  },
  {
    id: '002',
    name: '闫守康',
    avatar: 'https://avatars2.githubusercontent.com/u/22359680?v=4&s=460',
    like: 3,
    comment: '这是一段评论，老师你出这个题真是太他妈的操蛋了',
  },
  {
    id: '003',
    name: '闫守康',
    avatar: 'https://avatars2.githubusercontent.com/u/22359680?v=4&s=460',
    like: 3,
    comment: '这是一段评论，老师你出这个题真是太他妈的操蛋了',
  },
  {
    id: '004',
    name: '闫守康',
    avatar: 'https://avatars2.githubusercontent.com/u/22359680?v=4&s=460',
    like: 3,
    comment: '这是一段评论，老师你出这个题真是太他妈的操蛋了',
  },
]

class QuestionPreview extends React.Component {
  static propTypes = {
    data: PropTypes.object,
  }

  state = {
    subQuestionIndex: 0,
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.data.id !== nextProps.data.id) {
      this.setState({ subQuestionIndex: 0 })
    }
  }

  handleOnSubQuestionChange = (value) => {
    this.setState({ subQuestionIndex: value + 1 })
  }

  render() {
    const {
      data,
    } = this.props
    const {
      subQuestionIndex,
    } = this.state

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
          <div className={styles.leftContent}>
            {/* <QuestionContent
              content={this.questionContent.content}
              title={this.questionContent.title}
            />
            <QuestionAnswer
              answer={this.questionAnswer.answer}
              isAnswerOpen
              isAnswered
              canAnswer={false}
              pattern={this.questionAnswer.pattern}
              subQuestionIndex={subQuestionIndex}
              onSubQuestionChange={this.handleOnSubQuestionChange}
            />
            <AnswerAnalysis
              data={this.answerAnalysis.data}
              isAnswered
              isAnswerOpen
              canAnswer={false}
              subQuestionIndex={subQuestionIndex}
            /> */}
          </div>
          <div className={styles.rightContent}>
            <QuestionComment
              comments={comments}
              data={{}}
            />
          </div>
        </div>
      </BlackCover>
    )
  }
}

export default QuestionPreview
