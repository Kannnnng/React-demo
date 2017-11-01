import React from 'react'
import PropTypes from 'prop-types'
import AnswerAnalysis from 'components/AnswerAnalysis'
import QuestionAnswer from 'components/QuestionAnswer'
import QuestionContent from 'components/QuestionContent'
import QuestionComment from 'components/QuestionComment'
import BlackCover from './BlackCover'
import {
  Close,
  GoLeft,
  GoRight,
  BottomToolBar,
} from './Mess'
import styles from './styles'

class QuestionPreviewBoard extends React.Component {
  static propTypes = {
    open: PropTypes.bool,
    teacher: PropTypes.object,  // 当前登陆教师的基本信息，如 ID，姓名，头像等
    comments: PropTypes.array,  // 其他教师对当前题目的评论
    questionContent: PropTypes.object,  // 题目内容，也就是题干
    questionAnswer: PropTypes.object,  // 题目答案部分，数据结构比较复杂，且题组与单题的数据结构差异较大，查看《PC端题目预览组件所需数据结构.txt》
    answerAnalysis: PropTypes.object,  // 题目解析，题组与单题的数据结构差异较大，查看《PC端题目预览组件所需数据结构.txt》
    handleOnClickGoBack: PropTypes.func,  // 点击左上角的返回按钮时执行的操作
    handleOnClickPrev: PropTypes.func,  // 点击前一题目按钮时执行的操作
    handleOnClickNext: PropTypes.func,  // 点击后一题目按钮时执行的操作
    handleOnClickEdit: PropTypes.func,  // 点击下方工具栏中编辑按钮时执行的操作
    handleOnClickClone: PropTypes.func,  // 点击下方工具栏中克隆按钮时执行的操作
    handleOnClickCopy: PropTypes.func,  // 点击下方工具栏中复制按钮时执行的操作
    handleOnClickMove: PropTypes.func,  // 点击下方工具栏中移动按钮时执行的操作
    handleOnClickDelete: PropTypes.func,  // 点击下方工具栏中删除按钮时执行的操作
  }

  static defaultProps = {
    open : false,
  }

  state = {
    subQuestionIndex: 0,
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.teacher.id !== nextProps.teacher.id) {
      this.setState({ subQuestionIndex: 0 })
    }
  }

  handleOnSubQuestionChange = (value) => {
    this.setState({ subQuestionIndex: value + 1 })
  }

  render() {
    const {
      open,
      teacher,
      comments,
      questionContent,
      questionAnswer,
      answerAnalysis,
      handleOnClickGoBack,
      handleOnClickPrev,
      handleOnClickNext,
      handleOnClickEdit,
      handleOnClickClone,
      handleOnClickCopy,
      handleOnClickMove,
      handleOnClickDelete,
    } = this.props
    const {
      subQuestionIndex,
    } = this.state

    return (
      <BlackCover
        topRightButton={<Close handleOnClick={handleOnClickGoBack} />}
        middleLeftButton={<GoLeft handleOnClick={handleOnClickPrev} />}
        middleRightButton={<GoRight handleOnClick={handleOnClickNext} />}
        bottomToolBar={
          <BottomToolBar
            handleOnEdit={handleOnClickEdit}
            handleOnClone={handleOnClickClone}
            handleOnCopy={handleOnClickCopy}
            handleOnMove={handleOnClickMove}
            handleOnDelete={handleOnClickDelete}
          />
        }
        style={open ? null : { display: 'none' }}
      >
        <div className={styles.content}>
          <div className={styles.leftContent}>
            <QuestionContent
              content={questionContent.content}
              title={questionContent.title}
            />
            <QuestionAnswer
              answer={questionAnswer.answer}
              isAnswerOpen
              isAnswered
              canAnswer={false}
              pattern={questionAnswer.pattern}
              subQuestionIndex={subQuestionIndex}
              onSubQuestionChange={this.handleOnSubQuestionChange}
            />
            <AnswerAnalysis
              data={answerAnalysis.data}
              isAnswerOpen
              isAnswered
              canAnswer={false}
              subQuestionIndex={subQuestionIndex}
            />
          </div>
          <div className={styles.rightContent}>
            <QuestionComment
              comments={comments}
              teacher={teacher}
            />
          </div>
        </div>
      </BlackCover>
    )
  }
}

export default QuestionPreviewBoard
