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
import selectLibrary from './selector'
import styles from './styles'

@connect(mapStateToProps, mapDispatchToProps)
export default class Library extends React.Component {
  static propTypes = {
    data: PropTypes.object,
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
      </div>
    )
  }
}

const mapStateToProps = selectLibrary()

function mapDispatchToProps(dispatch) {
  const actions = {
    ...acts,
  }
  const actionMap = {
    actions: bindActionCreators(actions, dispatch)
  }
  return actionMap
}

