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
import lodash from 'lodash'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import List from 'material-ui/List/List'
import ListItem from 'material-ui/List/ListItem'
import makeSelectable from 'material-ui/List/makeSelectable'
import GroupSvg from 'material-ui/svg-icons/action/group-work'
import HumanSvg from 'material-ui/svg-icons/action/accessibility'
import ClassroomSvg from 'material-ui/svg-icons/action/supervisor-account'
import Pagination from 'components/Pagination'
import CurrentChoice from './CurrentChoice'
import * as acts from './actions'
import MockData from './mock'
import selector from './selector'
import styles from './styles'

const SelectableList = makeSelectable(List)

class Library extends React.Component {
  static propTypes = {
    actions: PropTypes.object.isRequired,
    myCourses: PropTypes.object.isRequired,
    selectedCourseChapters: PropTypes.object,
    selectedCourseCoursewares: PropTypes.object,
    selectedCourseLabels: PropTypes.object,
    selectedCourseQuestions: PropTypes.object,
    selectedCourseQuizzes: PropTypes.object,
    currentPageNumber: PropTypes.number,
  }

  state = {
    stateData: {},
    selectableListValue: null,
  }

  /* 当左侧被选中的项发生变化时触发 */
  handleOnSelectableListChange = (event, value) => {
    this.setState({ selectableListValue: value })
  }

  /* 当底部页码发生变化时触发 */
  handleOnPageChange = (number) => {
    this.props.actions.pageNumberChangeAction({
      number,
    })
  }

  handleOnClickCurrentChoiceCancel = (name) => () => {
    console.log(`你取消了 ${name} 筛选条件`)
  }

  render() {
    const {
      myCourses,
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
              nestedItems={lodash.map(myCourses, (value) => (
                <ListItem
                  key={value.id}
                  primaryText={value.name}
                />
              ))}
              value={'我的课程'}
            />
            <ListItem
              primaryText={'课程组'}
              leftIcon={<GroupSvg />}
              initiallyOpen={false}
              nestedItems={lodash.map(myCourses, (value) => (
                <ListItem
                  key={value.id}
                  primaryText={value.name}
                />
              ))}
              value={'课程组'}
            />
          </SelectableList>
          <SelectableList
            value={selectableListValue}
            onChange={this.handleOnSelectableListChange}
            style={{ borderTop: 'dashed 1px #666' }}
          >
            {lodash.map(myCourses, (value) => (
              <ListItem
                primaryText={value.name}
                leftIcon={<ClassroomSvg />}
                value={value.name}
              />
            ))}
          </SelectableList>
        </div>
        <div className={styles.rightArea}>
          <CurrentChoice
            conditions={MockData.CurrentChoice.conditions}
            handleOnClickCancel={this.handleOnClickCurrentChoiceCancel}
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
