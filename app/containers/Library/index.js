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
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import List from 'material-ui/List/List'
import ListItem from 'material-ui/List/ListItem'
import makeSelectable from 'material-ui/List/makeSelectable'
import GroupSvg from 'material-ui/svg-icons/action/group-work'
import HumanSvg from 'material-ui/svg-icons/action/accessibility'
import ClassroomSvg from 'material-ui/svg-icons/action/supervisor-account'
import { immutableObjectEmpty } from 'utils/constants'
import Pagination from 'components/Pagination'
import CurrentChoice from './CurrentChoice'
import * as acts from './actions'
import selector from './selector'
import styles from './styles'

const SelectableList = makeSelectable(List)

class Library extends React.PureComponent {
  static propTypes = {
    actions: PropTypes.object.isRequired,
    myClassroom: PropTypes.object,
    myCourses: PropTypes.object,
    myCourseGroups: PropTypes.object,
    selectedCourseChapters: PropTypes.object,
    selectedCourseCoursewares: PropTypes.object,
    selectedCourseLabels: PropTypes.object,
    selectedCourseQuestions: PropTypes.object,
    selectedCourseQuizzes: PropTypes.object,
    currentPageNumber: PropTypes.number,
    searchConditions: PropTypes.object,
  }

  static defaultProps = {
    myClassroom: immutableObjectEmpty,
    myCourseGroups: immutableObjectEmpty,
  }

  state = {
    stateData: {},
    selectableListValue: null,
  }

  componentWillMount() {
    this.props.actions.getMyAllCoursesAction()
  }

  /* 当左侧被选中的项发生变化时触发 */
  handleOnSelectableListChange = (event, value) => {
    if (value === '我的课程' || value === '课程组' || !value) {
      this.props.actions.selectCourseAction(null)
    } else {
      this.props.actions.selectCourseAction({
        courseId: value,
      })
      this.props.actions.getQuestionsByCourseIdAction({
        courseId: value,
      })
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
    console.log(`你取消了 ${name} 筛选条件`)
  }

  handleOnClickCopyTarget = ({ id, name }) => () => {
    console.log(`你选择了将选中的题目复制到 ID 为 ${id} 的 ${name} 中`)
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

  render() {
    const {
      myClassroom,
      myCourses,
      myCourseGroups,
      selectedCourseChapters,
      selectedCourseCoursewares,
      selectedCourseLabels,
      selectedCourseQuestions,
      selectedCourseQuizzes,
      searchConditions,
    } = this.props
    const {
      selectableListValue,
    } = this.state

    return (
      <div className={styles.container}>
        <div className={styles.leftArea}>
          <SelectableList
            value={selectableListValue}
            onChange={this.handleOnSelectableListChange}
          >
            <ListItem
              primaryText={'我的课程'}
              leftIcon={<HumanSvg />}
              initiallyOpen={false}
              nestedItems={myCourses.map((value) => (
                <ListItem
                  key={value.get('id')}
                  primaryText={value.get('name')}
                  value={value.get('id')}
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
                  key={value.get('id')}
                  primaryText={value.get('name')}
                  value={value.get('id')}
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
            {myClassroom.map((value) => (
              <ListItem
                key={value.get('id')}
                primaryText={value.get('name')}
                leftIcon={<ClassroomSvg />}
                value={value.get('id')}
              />
            )).toList().toJS()}
          </SelectableList>
        </div>
        <div className={styles.rightArea}>
          <CurrentChoice
            conditions={searchConditions}
            courses={myCourses}
            courseGroups={myCourseGroups}
            classroom={myClassroom}
            chapters={selectedCourseChapters}
            handleOnClickCancel={this.handleOnClickCurrentChoiceCancel}
            handleOnClickCopyTarget={this.handleOnClickCopyTarget}
            handleOnClickChapter={this.handleOnClickChapter}
            handleOnClickSearch={this.handleOnClickSearch}
          />
          <Pagination
            total={100}
            handleOnChange={this.handleOnPageChange}
          />
        </div>
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
