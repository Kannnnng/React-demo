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
import * as acts from './actions'
import selector from './selector'
import styles from './styles'

const SelectableList = makeSelectable(List)

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

@connect(mapStateToProps, mapDispatchToProps)

export default class Library extends React.Component {
  static propTypes = {
    actions: PropTypes.object.isRequired,
    myCourses: PropTypes.object.isRequired,
    selectedCourseChapters: PropTypes.object,
    selectedCourseCoursewares: PropTypes.object,
    selectedCourseLabels: PropTypes.object,
    selectedCourseQuestions: PropTypes.object,
    selectedCourseQuizzes: PropTypes.object,
  }

  state = {
    stateData: {},
    selectableListValue: null,
  }

  handleOnSelectableListChange = (event, value) => {
    this.setState({ selectableListValue: value })
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
                initiallyOpen={false}
                nestedItems={lodash.map(myCourses, (value) => (
                  <ListItem
                    key={value.id}
                    primaryText={value.name}
                  />
                ))}
                value={'我的课程'}
              />
            ))}
            <ListItem
              primaryText={'value.name'}
              leftIcon={<ClassroomSvg />}
              initiallyOpen={false}
              nestedItems={lodash.map(myCourses, (value) => (
                <ListItem
                  key={value.id}
                  primaryText={'value.name'}
                />
              ))}
              value={'我的课程'}
            />
            <ListItem
              primaryText={'value.name'}
              leftIcon={<ClassroomSvg />}
              initiallyOpen={false}
              nestedItems={lodash.map(myCourses, (value) => (
                <ListItem
                  key={value.id}
                  primaryText={'value.name'}
                />
              ))}
              value={'我的课程'}
            />
          </SelectableList>
        </div>
        <div className={styles.rightArea}>
          <button onClick={this.props.actions.getMyAllCoursesAction}>
            111
          </button>
        </div>
      </div>
    )
  }
}
