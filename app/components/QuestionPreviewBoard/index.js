import React from 'react'
import PropTypes from 'prop-types'
import { fromJS } from 'immutable'
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
import styles from './styles'
import { isEqual, isEmpty } from 'lodash'
import { questionPattern } from 'utils/constants'

class QuestionPreviewBoard extends React.Component {
  static propTypes = {
    open: PropTypes.bool,
    data: PropTypes.object,  // 当前登陆教师的基本信息，如 ID，姓名，头像等
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
    handleOnAddLabels: PropTypes.func,  // 没有知识点时点击添加新知识点
    prePaperPage: PropTypes.func,  // 组卷，上一题
    nextPaperPage: PropTypes.func,  // 组卷，下一题
    currentPaperPage: PropTypes.number,
    subsInPaper: PropTypes.object,
    isPaper: PropTypes.bool,
    paperTitle: PropTypes.string,
    allKnowledgePoint: PropTypes.object,
    isPreview: PropTypes.bool,
  }

  static defaultProps = {
    open: false,
    data: {},
  }

  state = {
    subQuestionIndex: 0,
    paper: {},
    isPaper: false,
  }

  componentWillMount() {
    const { currentPaperPage, subsInPaper } = this.props
    if (currentPaperPage && subsInPaper && subsInPaper.size > 0) {
      this.setState({ paper: subsInPaper.toJS()[currentPaperPage - 1] })
    }
  }

  componentWillReceiveProps(nextProps) {
    const { currentPaperPage, subsInPaper } = nextProps
    if (this.props.data.id !== nextProps.data.id) {
      this.setState({ subQuestionIndex: 0 })
    }
    if (!isEqual(subsInPaper, this.props.subsInPaper)) {
      this.setState({
        paper: subsInPaper && subsInPaper.size > 0 ? {
          ...subsInPaper.toJS()[currentPaperPage - 1],
          answer: subsInPaper.toJS()[currentPaperPage - 1].pattern === 6 ?
            subsInPaper.toJS()[currentPaperPage - 1].subQuestions :
            subsInPaper.toJS()[currentPaperPage - 1].answer,
        } : {}
      })
    }
    if (!isEqual(currentPaperPage, this.props.currentPaperPage)) {
      this.setState({
        paper: subsInPaper && subsInPaper.size > 0 ? {
          ...subsInPaper.toJS()[currentPaperPage - 1],
          answer: subsInPaper.toJS()[currentPaperPage - 1].pattern === 6 ?
            subsInPaper.toJS()[currentPaperPage - 1].subQuestions :
            subsInPaper.toJS()[currentPaperPage - 1].answer,
        } : {}
      })
    }
  }

  handleOnSubQuestionChange = (value) => {
    this.setState({ subQuestionIndex: value })
  }

  render() {
    const {
      open,
      data,
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
      handleOnAddLabels,
      prePaperPage,
      nextPaperPage,
      currentPaperPage,
      subsInPaper,
      paperTitle,
      allKnowledgePoint,
      isPaper,
      isPreview,
    } = this.props
    const {
      subQuestionIndex, paper,
    } = this.state
    const blackCoverClassName = (!open && styles.hidden) || ''

    let analysisData = answerAnalysis && answerAnalysis.data
    if (isPaper) {
      analysisData = {
        questionId: paper.id,
        review: paper.review.html,
        labels: paper.labels.reduce((result, value) => (
          result.push(allKnowledgePoint.get(String(value)))
        ), fromJS([])).toJS(),
      }
    } else if (questionAnswer && questionAnswer.pattern === questionPattern.group) {
      analysisData = questionAnswer.answer
    }

    return (
      <BlackCover
        className={blackCoverClassName}
        topRightButton={<GoBack handleOnClick={handleOnClickGoBack} />}
        middleLeftButton={handleOnClickPrev && <GoLeft handleOnClick={handleOnClickPrev} />}
        middleRightButton={handleOnClickNext && <GoRight handleOnClick={handleOnClickNext} />}
        bottomToolBar={
          <BottomToolBar
            handleOnEdit={handleOnClickEdit}
            handleOnClone={handleOnClickClone}
            handleOnCopy={handleOnClickCopy}
            handleOnMove={handleOnClickMove}
            handleOnDelete={handleOnClickDelete}
          />
        }
      >
        <div className={styles.content}>
          <div className={styles.leftContentWrapper}>
            <div className={styles.leftContent}>
              {isPaper && <div className={styles.paperSelector}>
                <div style={{ width: 20, cursor: 'pointer' }}>
                  {currentPaperPage > 1 &&
                    <i className='material-icons' onTouchTap={prePaperPage}>
                      keyboard_arrow_left
                    </i>}
                </div>
                {`${paperTitle} 第 ${currentPaperPage}/ ${subsInPaper.size} 页`}
                <div style={{ width: 20, cursor: 'pointer' }}>
                  {(currentPaperPage) < subsInPaper.size &&
                    <i className='material-icons' onTouchTap={nextPaperPage}>
                      keyboard_arrow_right
                    </i>}
                </div>
              </div>}
              {(questionContent || !isEmpty(paper)) && <QuestionContent
                content={isPaper ? paper.content.html : questionContent.content}
                title={isPaper ? {
                  pattern: paper.pattern,
                  serialNumber: paper.serialNumber,
                  difficulty: paper.difficulty,
                } : questionContent.title}
              />}
              {(questionAnswer || !isEmpty(paper)) && <QuestionAnswer
                answer={isPaper ? paper.answer : questionAnswer.answer}
                img={isPaper ? paper.img : questionAnswer.img}
                coursewareName={isPaper ? '' : questionAnswer.coursewareName}
                playCourseware={() => {
                  window.open(questionAnswer.previewUrl)
                }} // 播放课件方法，目前未绑定
                isAnswerOpen
                isPreview={isPreview}
                isAnswered
                canAnswer={false}
                pattern={isPaper ? paper.pattern : questionAnswer.pattern}
                subQuestionIndex={subQuestionIndex}
                onSubQuestionChange={this.handleOnSubQuestionChange}
              />}
              {analysisData && <AnswerAnalysis
                data={analysisData}
                isAnswerOpen
                isAnswered
                canAnswer={false}
                subQuestionIndex={subQuestionIndex}
                handleOnAddLabels={handleOnAddLabels}
                isTeacher
              />}
            </div>
          </div>
          <div className={styles.rightContent}>
            <QuestionComment
              comments={comments}
              data={data}
            />
          </div>
        </div>
      </BlackCover>
    )
  }
}

export default QuestionPreviewBoard
