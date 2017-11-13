/**
 *
 * Name: Library
 * Date: 2017-11-03 10:31:39
 * Description: 题库页面
 * Author: Einskang
 * Organization: HUST
 *
 */

import React from 'react'
import PropTypes from 'prop-types'
import ImmutablePropTypes from 'react-immutable-proptypes'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import List from 'material-ui/List/List'
import ListItem from 'material-ui/List/ListItem'
import makeSelectable from 'material-ui/List/makeSelectable'
import GroupSvg from 'material-ui/svg-icons/action/group-work'
import HumanSvg from 'material-ui/svg-icons/action/accessibility'
import ClassroomSvg from 'material-ui/svg-icons/action/supervisor-account'
import Pagination from 'components/Pagination'
import QuestionPreviewBoard from 'components/QuestionPreviewBoard'
import { questionPattern } from 'utils/constants'
import CurrentChoice from './CurrentChoice'
import QuestionItem from './QuestionItem'
import * as acts from './actions'
import selector from './selector'
import styles from './styles'

const SelectableList = makeSelectable(List)

class Library extends React.PureComponent {
  static propTypes = {
    actions: PropTypes.object.isRequired,
    myInfomation: ImmutablePropTypes.map,
    myClassrooms: ImmutablePropTypes.map,
    myCourses: ImmutablePropTypes.map,
    myCourseGroups: ImmutablePropTypes.map,
    selectedCourseChapters: ImmutablePropTypes.list,
    selectedCourseLabels: ImmutablePropTypes.map,
    questionItems: ImmutablePropTypes.map,
    searchConditions: ImmutablePropTypes.list,
    totalPages: PropTypes.number.isRequired,
    currentPageNumber: PropTypes.number.isRequired,
    selectedQuestionItems: ImmutablePropTypes.map,
    previewQuestionItem: ImmutablePropTypes.map,
  }

  state = {
    selectableListValue: null,
    currentQuizPage: 1,
  }

  componentWillMount() {
    this.props.actions.getMyAllCoursesAction()
    this.props.actions.getMyAllCourseGroupsAction()
    this.props.actions.getMyAllClassroomsAction()
  }

  /* 当左侧被选中的项发生变化时触发 */
  handleOnSelectableListChange = (event, value) => {
    if (value === '我的课程' || value === '课程组' || !value) {
      this.props.actions.selectCourseOrCourseGroupOrClassroomAction(null)
    } else {
      const [name, id] = value.split('|')
      this.props.actions.selectCourseOrCourseGroupOrClassroomAction({
        id,
        name,
      })
      switch (name) {
        case 'course':
          this.props.actions.getQuestionsByCourseIdAction({
            courseId: id,
          })
          break
        case 'courseGroup':
          this.props.actions.getQuestionsByCourseGroupIdAction({
            courseGroupId: id,
          })
          break
        case 'classroom':
          this.props.actions.getQuestionsByClassroomIdAction({
            classroomId: id,
          })
          break
        default:
          break
      }
    }
    this.setState({ selectableListValue: value })
  }

  /* 当底部页码发生变化时触发 */
  handleOnPageChange = (number) => {
    this.props.actions.pageNumberChangeAction({
      number,
    })
  }

  handleOnClickCurrentChoiceCancel = ({ name }) => () => {
    this.props.actions.deleteConditionAction({
      name,
    })
  }

  handleOnClickCopyTarget = ({ targetId, chapterId, name }) => {
    this.props.actions.copyQuestionItemToLibraryAction({
      targetId,
      chapterId,
      name,
      selectedQuestionItems: this.props.selectedQuestionItems.toList().toJS(),
    })
  }

  handleOnClickChapter = ({ id }) => () => {
    this.props.actions.selectChpaterAction({
      id,
    })
  }

  handleOnClickSearch = ({ value }) => {
    this.props.actions.filterQuestionsBySearchAction({
      searchText: value,
    })
  }

  handleOnClickQuestionItem = ({ id, name }) => () => {
    this.props.actions.previewQuestionItemAction({
      id,
      name,
    })
  }

  handleOnQuestionItemCheck = ({ id, name }) => (event, isChecked) => {
    this.props.actions.selectQuestionItemAction({
      id,
      name,
      isChecked,
    })
  }

  handleOnPreQuizPageInPreview = () => {
    this.setState({ currentQuizPage: this.state.currentQuizPage - 1 })
  }

  handleOnNextQuizPageInPreview = () => {
    this.setState({ currentQuizPage: this.state.currentQuizPage + 1 })
  }

  handleOnClosePreviewQuestionItem = () => {
    this.setState({ currentQuizPage: 1 })
    this.props.actions.closePreviewQuestionItemAction()
  }


  render() {
    const {
      myInfomation,
      myClassrooms,
      myCourses,
      myCourseGroups,
      selectedCourseChapters,
      selectedCourseLabels,
      questionItems,
      searchConditions,
      totalPages,
      currentPageNumber,
      selectedQuestionItems,
      previewQuestionItem,
    } = this.props
    const {
      selectableListValue,
      currentQuizPage,
    } = this.state

    return (
      <div className={styles.container}>
        <div className={styles.leftArea}>
          <SelectableList
            value={selectableListValue}
            onChange={this.handleOnSelectableListChange}
          >
            <ListItem
              primaryText={'我的课堂'}
              leftIcon={<HumanSvg />}
              initiallyOpen={false}
              nestedItems={myCourses.map((value) => (
                <ListItem
                  key={value.get('id')}
                  primaryText={`${value.get('name')}${
                    value.get('newCopyedQuestionItemNumbers') ? (
                      `(${value.get('newCopyedQuestionItemNumbers')})`
                    ) : ''
                  }`}
                  value={`course|${value.get('id')}`}
                />
              )).toList().toJS()}
              value={'我的课程'}
            />
            <ListItem
              primaryText={'课程组'}
              leftIcon={<GroupSvg />}
              initiallyOpen={false}
              nestedItems={myCourseGroups.map((value) => (
                <ListItem
                  key={value.get('groupId')}
                  primaryText={`${value.get('groupName')}${
                    value.get('newCopyedQuestionItemNumbers') ? (
                      `(${value.get('newCopyedQuestionItemNumbers')})`
                    ) : ''
                  }`}
                  value={`courseGroup|${value.get('groupId')}`}
                />
              )).toList().toJS()}
              value={'课程组'}
            />
          </SelectableList>
          <SelectableList
            value={selectableListValue}
            onChange={this.handleOnSelectableListChange}
            style={{ borderTop: 'dashed 1px #666' }}
          >
            {myClassrooms.map((value) => (
              <ListItem
                key={value.get('id')}
                primaryText={value.get('name')}
                leftIcon={<ClassroomSvg />}
                value={`classroom|${value.get('id')}`}
              />
            )).toList().toJS()}
          </SelectableList>
        </div>
        <div className={styles.rightArea}>
          <div className={styles.functionalArea}>
            <CurrentChoice
              conditions={searchConditions}
              courses={myCourses}
              courseGroups={myCourseGroups}
              classrooms={myClassrooms}
              chapters={selectedCourseChapters}
              isSelectedQuestionItemsEmpty={selectedQuestionItems.isEmpty()}
              handleOnClickCancel={this.handleOnClickCurrentChoiceCancel}
              handleOnClickCopyTarget={this.handleOnClickCopyTarget}
              handleOnClickChapter={this.handleOnClickChapter}
              handleOnClickSearch={this.handleOnClickSearch}
            />
          </div>
          <div className={styles.displayArea}>
            {questionItems.map((value) => (
              <QuestionItem
                key={value.get('id')}
                id={value.get('id')}
                pattern={value.get('pattern')}
                difficulty={value.get('difficulty')}
                summary={value.get('isCourseware') ? ({
                  word: value.get('name'),
                  image: value.get('cover'),
                }) : (
                  value.get('isQuiz') ? ({
                    word: value.get('title'),
                  }) : (
                    value.get('summary').toJS()
                  )
                )}
                correctRate={Number(value.get('correct'))}
                answerCount={value.get('studentCount')}
                isQuiz={value.get('isQuiz')}
                isCourseware={value.get('isCourseware')}
                fileType={value.get('fileType')}
                isChecked={selectedQuestionItems.has(value.get('id'))}
                previewUrl={value.get('previewUrl')}
                handleOnClick={this.handleOnClickQuestionItem}
                handleOnQuestionItemCheck={this.handleOnQuestionItemCheck}
              />
            )).toList().toJS()}
            <Pagination
              total={totalPages}
              currentNumber={currentPageNumber}
              handleOnChange={this.handleOnPageChange}
            />
          </div>
        </div>
        {/* 题目预览 */}
        {!previewQuestionItem.isEmpty() && (
          <QuestionPreviewBoard
            open
            data={myInfomation.toJS()}
            comments={undefined}
            questionContent={{
              content: previewQuestionItem.getIn(['content', 'html']),
              title: previewQuestionItem.get('title'),
            }}
            questionAnswer={{
              pattern: previewQuestionItem.get('pattern'),
              answer: previewQuestionItem.get('pattern') === questionPattern.group ? (
                previewQuestionItem.get('subQuestions').toJS()
              ) : (!previewQuestionItem.get('isQuiz') ? {
                items: previewQuestionItem.get('items') ? (
                  previewQuestionItem.get('items').toJS()
                ) : undefined,
                // isAllCorrect: previewQuestionItem.get(''),
                correctAnswer: previewQuestionItem.get('correctAnswer'),
                // hasCorrectness: previewQuestionItem.get(''),
                // caseSensitive: previewQuestionItem.get(''),
                // strict: previewQuestionItem.get(''),
              } : undefined),
              img: previewQuestionItem.getIn(['answer', 'summary', 'image']),
              coursewareName: previewQuestionItem.get('name'),
              previewUrl: previewQuestionItem.get('previewUrl'),
            }}
            answerAnalysis={!previewQuestionItem.get('isQuiz') ? {
              data: {
                review: previewQuestionItem.getIn(['review', 'html']),
                labels: previewQuestionItem.get('labels') ? (
                  previewQuestionItem.get('labels').toJS()
                ) : undefined,
                questionId: previewQuestionItem.get('id'),
              }
            } : undefined}
            prePaperPage={this.handleOnPreQuizPageInPreview}
            nextPaperPage={this.handleOnNextQuizPageInPreview}
            subsInPaper={previewQuestionItem.get('subQuestions')}
            isPaper={previewQuestionItem.get('isQuiz')}
            paperTitle={previewQuestionItem.get('title')}
            isPreview
            allKnowledgePoint={selectedCourseLabels}
            currentPaperPage={currentQuizPage}
            handleOnClickGoBack={this.handleOnClosePreviewQuestionItem}
          />
        )}
      </div>
    )
  }
}

const mapStateToProps = () => {
  return selector
}

const mapDispatchToProps = (dispatch) => {
  const actions = {
    ...acts,
  }
  const actionMap = {
    actions: bindActionCreators(actions, dispatch)
  }
  return actionMap
}

export default connect(mapStateToProps, mapDispatchToProps)(Library)
