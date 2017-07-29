import React from 'react'
import PropTypes from 'prop-types'
// import lodash from 'lodash'
import AnswerAnalysis from 'components/AnswerAnalysis'
import QuestionAnswer from 'components/QuestionAnswer'
import QuestionContent from 'components/QuestionContent'
import BlackCover from './BlackCover'
import {
  GoBack,
  GoLeft,
  GoRight,
  BottomToolBar,
} from './Mess'
import styles from './index.scss'

class QuestionPreview extends React.Component {
  static propTypes = {
    data: PropTypes.object,
  }

  constructor(props) {
    super(props)

    this.questionContent = {
      content: '<p>这是一段测试文本<span>这是一个行内元素</span><img src="http://img95.699pic.com/photo/50035/0496.jpg_wh300.jpg" alt="" /></p>',  // eslint-disable-line
      title: {
        pattern: 3,
        serialNumber: 'J00001',
        difficulty: 3,
      },
    }
    this.questionAnswer = {
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
    this.answerAnalysis = {
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
          <div className={styles.leftContent}>
            <QuestionContent
              content={this.questionContent.content}
              title={this.questionContent.title}
            />
            <QuestionAnswer
              answer={this.questionAnswer.answer}
              myAnswer={this.questionAnswer.myAnswer}
              isAnswerOpen={this.questionAnswer.isAnswerOpen}
              isAnswered={this.questionAnswer.isAnswered}
              canAnswer={this.questionAnswer.canAnswer}
              pattern={this.questionAnswer.pattern}
              subQuestionIndex={this.questionAnswer.subQuestionIndex}
              onSubQuestionChange={this.questionAnswer.onSubQuestionChange}
            />
            <AnswerAnalysis
              data={this.answerAnalysis.data}
              isAnswered={this.answerAnalysis.isAnswered}
              isAnswerOpen={this.answerAnalysis.isAnswerOpen}
              canAnswer={this.answerAnalysis.canAnswer}
              subQuestionIndex={this.answerAnalysis.subQuestionIndex}
            />
          </div>
          <div className={styles.rightContent}>
            {'123'}
          </div>
        </div>
      </BlackCover>
    )
  }
}

export default QuestionPreview
