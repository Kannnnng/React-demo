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
import HomeSvg from 'material-ui/svg-icons/action/account-balance'
import * as acts from './actions'
import selector from './selector'
import styles from './styles'

const mapStateToProps = () => {
  return selector()
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
    selectedCourseChapters: PropTypes.object.isRequired,
    selectedCourseCoursewares: PropTypes.object.isRequired,
    selectedCourseLabels: PropTypes.object.isRequired,
    selectedCourseQuestions: PropTypes.object.isRequired,
    selectedCourseQuizzes: PropTypes.object.isRequired,
  }

  state = {
    stateData: {},
  }

  render() {
    const {
      myCourses,
    } = this.props

    return (
      <div className={styles.container}>
        <div className={styles.leftArea}>
          <List>
            <ListItem
              primaryText={'我的课程'}
              leftIcon={<HomeSvg />}
              initiallyOpen={false}
              nestedItems={lodash.map(myCourses, (value) => (
                <ListItem
                  key={value.id}
                  primaryText={value.name}
                />
              ))}
            />
          </List>
        </div>
        <div className={styles.rightArea}>
          123
        </div>
      </div>
    )
  }
}
