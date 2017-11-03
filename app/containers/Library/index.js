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
import * as acts from './actions'
import selector from './selector'
import styles from './styles'

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
    data: PropTypes.object,
    actions: PropTypes.object,
  }

  static defaultProps = {
    data: {},
  }

  state = {
    stateData: {},
  }

  render() {
    return (
      <div className={styles.container}>
        <button onClick={this.props.actions.getMyAllCoursesAction}>
          111
        </button>
      </div>
    )
  }
}
