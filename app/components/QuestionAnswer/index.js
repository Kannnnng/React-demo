/**
*
* QuestionAnswer
*
*/

import React from 'react'
import PropTypes from 'prop-types'
// import lodash from 'lodash'
import AnswerSingleSelection from 'components/AnswerSingleSelection'
import AnswerMultipleChoice from 'components/AnswerMultipleChoice'
import AnswerJudge from 'components/AnswerJudge'
import AnswerFillInTheBlanks from 'components/AnswerFillInTheBlanks'
import AnswerShortAnswer from 'components/AnswerShortAnswer'
import { questionPattern, letter } from 'utils/constants'
// import { getNewImages } from 'containers/Answers/helper'
import SubQuestionTitle from './SubQuestionTitle'
import styles from './styles'

class QuestionAnswer extends React.Component {
  static propTypes = {
    answer: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    myAnswer: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.array,
      PropTypes.bool,
    ]),
    isAnswerOpen: PropTypes.bool,
    isAnswered: PropTypes.bool,
    canAnswer: PropTypes.bool,
    pattern: PropTypes.number,
    // onChange: PropTypes.func,
    subQuestionIndex: PropTypes.number,
    onSubQuestionChange: PropTypes.func,
  }

  static defaultProps = {
    answer: {},
    isAnswerOpen: false,
    isAnswered: false,
    subQuestionIndex: 0,
  }

  // state = {
  //   gallery: {},
  // }

  // handleOnUpload = () => (file) => {
  //   const { myAnswer } = this.props
  //   if (file.size > 102400) {
  //     alert('上传图片最大为100KB') //eslint-disable-line
  //   } else {
  //     const objectURL = URL.createObjectURL(file.nativeFile) //eslint-disable-line
  //     let attaches
  //     let files
  //     if (myAnswer.attaches) {
  //       attaches = [...myAnswer.attaches, objectURL]
  //       files = [...myAnswer.files, file.nativeFile]
  //     } else {
  //       attaches = [objectURL]
  //       files = [file.nativeFile]
  //     }
  //     const answer = {
  //       ...myAnswer,
  //       attaches,
  //       files,
  //     }
  //     this.props.onChange(answer)
  //   }
  // }

  // handleOnImageClick = () => (file, id) => {
  //   const gallery = {
  //     url: file.url,
  //     id,
  //   }
  //   this.setState({ gallery })
  // }

  // handleOnCloseGallery = () => () => {
  //   this.setState({ gallery: {} })
  // }

  // handleOnDeleteImage = () => (id) => {
  //   const { myAnswer } = this.props
  //   const attaches = myAnswer.attaches ? [...myAnswer.attaches] : []
  //   const files = myAnswer.files ? [...myAnswer.files] : []
  //   const objectURL = attaches.splice(id, 1)[0]
  //   const fileIndex = lodash.findIndex(getNewImages(myAnswer), (o) => o === objectURL)
  //   files.splice(fileIndex, 1)
  //   if (objectURL.startsWith('blob:')) {
  //     URL.revokeObjectURL(objectURL) //eslint-disable-line
  //   }
  //   this.props.onChange({
  //     ...myAnswer,
  //     attaches,
  //     files,
  //   })
  // }

  // handleOnClickAnswer = (id) => (event) => {
  //   event.preventDefault()
  //   const { pattern, myAnswer } = this.props
  //   let answer
  //   switch (pattern) {
  //     case questionPattern.singleSelection:
  //       answer = [id]
  //       break
  //     case questionPattern.multipleChoice: {
  //       answer = [...myAnswer]
  //       const index = lodash.findIndex(myAnswer, (o) => o === id)
  //       if (index >= 0) {
  //         answer.splice(index, 1)
  //       } else {
  //         answer.push(id)
  //       }
  //       break
  //     }
  //     case questionPattern.judge:
  //       answer = id
  //       break
  //     case questionPattern.fillInTheBlanks: {
  //       answer = {
  //         ...myAnswer,
  //         [id]: event.target.value,
  //       }
  //       break
  //     }
  //     case questionPattern.shortAnswer: {
  //       answer = {
  //         ...myAnswer,
  //         content: event.target.value,
  //       }
  //       break
  //     }
  //     default:
  //       break
  //   }
  //   this.props.onChange(answer)
  // }

  renderAnswer() {
    let answerSection
    const {
      pattern, answer, /* myAnswer, */
      isAnswered, isAnswerOpen, canAnswer,
    } = this.props
    const {
      items: candidateItems,
      isAllCorrect,
      correctAnswer,
      hasCorrectness,
    } = answer
    switch (pattern) {
      case questionPattern.singleSelection:
        answerSection = (
          <AnswerSingleSelection
            canAnswer={canAnswer}
            isAnswered={isAnswered}
            isAnswerOpen={isAnswerOpen}
            isAllCorrect={isAllCorrect}
            hasCorrectness={hasCorrectness}
            items={candidateItems}
            // answer={myAnswer}
            handleOnClickAnswer={this.handleOnClickAnswer}
          />
        )
        break
      case questionPattern.multipleChoice:
        answerSection = (
          <AnswerMultipleChoice
            canAnswer={canAnswer}
            isAnswered={isAnswered}
            isAnswerOpen={isAnswerOpen}
            isAllCorrect={isAllCorrect}
            hasCorrectness={hasCorrectness}
            items={candidateItems}
            // answer={myAnswer}
            handleOnClickAnswer={this.handleOnClickAnswer}
          />
        )
        break
      case questionPattern.judge:
        answerSection = (
          <AnswerJudge
            canAnswer={canAnswer}
            isAnswered={isAnswered}
            isAnswerOpen={isAnswerOpen}
            isAllCorrect={isAllCorrect}
            correctAnswer={correctAnswer}
            hasCorrectness={hasCorrectness}
            // answer={myAnswer}
            handleOnClickAnswer={this.handleOnClickAnswer}
          />
        )
        break
      case questionPattern.fillInTheBlanks:
        answerSection = (
          <AnswerFillInTheBlanks
            canAnswer={canAnswer}
            isAnswered={isAnswered}
            isAnswerOpen={isAnswerOpen}
            items={candidateItems}
            hasCorrectness={hasCorrectness}
            // answer={myAnswer}
            handleOnClickAnswer={this.handleOnClickAnswer}
          />
        )
        break
      case questionPattern.shortAnswer:
        answerSection = (
          <AnswerShortAnswer
            canAnswer={canAnswer}
            limit={answer.limit}
            // answer={myAnswer}
            answer={candidateItems[0]}
            // gallery={this.state.gallery}
            maxCount={3}
            textAreaPlaceHolder={'请填写你的答案'}
            functions={{
              handleOnClickAnswer: this.handleOnClickAnswer,
              handleOnUpload: this.handleOnUpload,
              handleOnImageClick: this.handleOnImageClick,
              handleOnCloseGallery: this.handleOnCloseGallery,
              handleOnDeleteImage: this.handleOnDeleteImage,
            }}
          />)
        break
      case questionPattern.group:
        answerSection = this.renderGroup()
        break
      default:
        break
    }

    return answerSection
  }

  renderGroup() {
    const {
      answer: questions,
      // myAnswer: myAnswers,
      canAnswer,
      // onChange,
      isAnswerOpen,
      isAnswered,
      subQuestionIndex,
      onSubQuestionChange,
    } = this.props
    const question = questions[subQuestionIndex]
    question.answer = {
      ...question.answer,
      hasCorrectness: question.hasCorrectness,
      answerCount: question.answerCount,
      studentCount: question.studentCount,
      correctRate: question.correctRate,
      easyWrongOption: question.easyWrongOption,
      referenceCount: question.referenceCount,
      usageCount: question.usageCount,
    }
    return (
      <div className={styles.subQuestion}>
        <SubQuestionTitle
          canAnswer={false}
          index={subQuestionIndex + 1}
          totalCount={questions.length}
          question={question}
          onChange={(index) => { onSubQuestionChange(index) }}
        />
        <QuestionAnswer
          answer={question.answer}
          // myAnswer={myAnswers[question.id]}
          isAnswerOpen={isAnswerOpen}
          isAnswered={isAnswered}
          canAnswer={canAnswer}
          pattern={question.pattern}
          // onChange={(state) => {
          //   onChange({
          //     ...myAnswers,
          //     [question.id]: state,
          //   })
          // }}
        />
      </div>
    )
  }

  renderStatistics() {
    const { answer, pattern } = this.props
    const {
      items,
      hasCorrectness,
      answerCount,
      // studentCount,
      correctRate,
      easyWrongOption,
      referenceCount,
      usageCount,
    } = answer
    const temp = []

    switch (pattern) {
      case questionPattern.singleSelection:
      case questionPattern.multipleChoice:
      case questionPattern.AnswerFillInTheBlanks:
      case questionPattern.judge:
        temp.push(<span key="referenceCount">{`本题被${referenceCount}位老师引用。共计使用${usageCount}次。学生作答${answerCount}人次。`}</span>)  // eslint-disable-line
        if (!hasCorrectness) {
          // temp = <span key="answerCount">{`本题共被作答${answerCount}次。你的答案与${studentCount}人相同。`}</span>
        } else {
          let easyWrongOptionText
          if (pattern === questionPattern.judge) {
            easyWrongOptionText = easyWrongOption.join('')
          } else {
            easyWrongOptionText = items.map((value, index) => {
              /* 这里的代码存疑，items 里面的元素是对象，而对对象应用 indexOf 方法显然不合理 */
              /* 而且之前这里讨论好的数据结构是，易错项里面是选项的 ID，通过比较选项的 ID 来确 */
              /* 定哪一个选项是易错项 */
              // if (easyWrongOption.indexOf(value) !== -1) {
              if (easyWrongOption.indexOf(value.id) !== -1) {
                if (pattern === questionPattern.judge) {
                  return index + 1
                }
                return letter[index]
              }
              return null
            }).join('')
          }
          temp.push(<span key="correctRate">{`正确率${correctRate}%。`}</span>)
          if (easyWrongOptionText) {
            temp.push(<span key="easyWrongOption">{`易错项为「${easyWrongOptionText}」。`}</span>)
          }
        }
        break
      default:
        break
    }

    if (temp) {
      return (
        <div className={styles.statistics}>
          {temp}
        </div>
      )
    }

    return null
  }

  render() {
    const {
      pattern,
      isAnswerOpen,
      isAnswered,
      canAnswer,
    } = this.props

    return (
      <div className={styles.container}>
        {this.renderAnswer()}
        {pattern !== questionPattern.group && isAnswered && !canAnswer && isAnswerOpen && this.renderStatistics()}
      </div>
    )
  }
}

export default QuestionAnswer
