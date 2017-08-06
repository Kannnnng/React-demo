import React from 'react'
import PropTypes from 'prop-types'
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

const comments = [
  {
    id: '001',
    name: '闫守康',
    avatar: 'https://avatars2.githubusercontent.com/u/22359680?v=4&s=460',
    createTime: 1501551970105,
    like: 3,
    comment: '这是一段评论，老师你出这个题真是太他妈的操蛋了，我也是日了狗啦，哈哈',
  },
  {
    id: '002',
    name: '闫守康',
    avatar: 'https://avatars2.githubusercontent.com/u/22359680?v=4&s=460',
    createTime: 1501552970105,
    like: 3,
    comment: '这是一段评论，老师你出这个题真是太他妈的操蛋了，我也是日了狗啦，哈哈',
  },
  {
    id: '003',
    name: '闫守康',
    avatar: 'https://avatars2.githubusercontent.com/u/22359680?v=4&s=460',
    createTime: 1501543970105,
    like: 3,
    comment: '这是一段评论，老师你出这个题真是太他妈的操蛋了，我也是日了狗啦，哈哈',
  },
  {
    id: '004',
    name: '闫守康',
    avatar: 'https://avatars2.githubusercontent.com/u/22359680?v=4&s=460',
    createTime: 1501544970105,
    like: 3,
    comment: '这是一段评论，老师你出这个题真是太他妈的操蛋了，我也是日了狗啦，哈哈',
  },
]

const questionContent = {
  content: '<p>这是一段测试文本<span>这是一个行内元素</span><img src="http://img95.699pic.com/photo/50035/0496.jpg_wh300.jpg" alt="" /></p>',  // eslint-disable-line
  title: {
    pattern: 3,
    serialNumber: 'J00001',
    difficulty: 3,
  },
}

const questionAnswer = {
  answer:
  {
    hasCorrectness: true,
    easyWrongOption: ['optionId0001', 'optionId0004'],
    answerCount: 100,
    studentCount: 100,
    correctRate: 50,
    referenceCount: 10,
    usageCount: 60,
    correctAnswer: true,
    strict: false,
    isRequired: true,
    limit: 0,
    items: [
      {
        id: 'optionId0001',
        content: '11',
        rank: 10,
        correctAnswer: true,
        myAnswer: true,
        attaches: [
          'http://img95.699pic.com/photo/50035/0496.jpg_wh300.jpg',
          'http://img95.699pic.com/photo/50035/0496.jpg_wh300.jpg',
          'http://img95.699pic.com/photo/50035/0496.jpg_wh300.jpg',
        ],
        isCorrect: true,
      },
      {
        id: 'optionId0002',
        content: '22',
        rank: 9,
        correctAnswer: false,
        myAnswer: false,
        attaches: [
          '',
        ],
        isCorrect: true,
      },
      {
        id: 'optionId0003',
        content: '问问',
        rank: 6,
        correctAnswer: true,
        myAnswer: false,
        attaches: [
          '',
        ],
        isCorrect: true,
      },
      {
        id: 'optionId0004',
        content: '33',
        rank: 1,
        correctAnswer: false,
        myAnswer: false,
        attaches: [
          '',
        ],
        isCorrect: true,
      },
    ],
    isAllCorrect: true,
  },
  myAnswer: undefined,
  isAnswerOpen: true,
  isAnswered: true,
  canAnswer: false,
  pattern: 5,
  subQuestionIndex: undefined,
  onSubQuestionChange: undefined,
  id: '594735e135eae7be312e437f',
  sourceId: '594735e135eae7be312e437d',
  limit: 20,
  serialNumber: 'T0001',
  difficulty: 1,
  content: '<p><em><span style="text-decoration:underline;">Hello world</span></em></p><p>你好啊，但是</p>',
  oddTime: 0,
}

const answerAnalysis = {
  data: {
    labels: [
      {
        text: '知识点一',
        id: '59477487d19a5fefaa6586e3',
      },
      {
        text: '知识点二',
        id: '59477487d19a5fefaa6586e4',
      },
      {
        text: '知识点三',
        id: '59477487d19a5fefaa6586e5',
      },
    ],
    review: '这是一段解析',
  },
  isAnswered: true,
  isAnswerOpen: true,
  canAnswer: false,
  subQuestionIndex: undefined,
}

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
  }

  static defaultProps = {
    open : false,
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
      open,
      // data,
      // comments,
      // questionContent,
      // questionAnswer,
      // answerAnalysis,
      // handleOnClickGoBack,
      // handleOnClickPrev,
      // handleOnClickNext,
      // handleOnClickEdit,
      // handleOnClickClone,
      // handleOnClickCopy,
      // handleOnClickMove,
      // handleOnClickDelete,
    } = this.props
    const {
      subQuestionIndex,
    } = this.state
    const blackCoverClassName = (!open && styles.hidden) || ''

    return (
      <BlackCover
        className={blackCoverClassName}
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
              data={{}}
            />
          </div>
        </div>
      </BlackCover>
    )
  }
}

export default QuestionPreviewBoard
