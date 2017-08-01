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
import styles from './index.scss'

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

export default QuestionPreview
