import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
// import { Link } from 'react-router-dom'
import * as acts from '../../actions/Test'
import styles from './index.scss'

class Test extends React.Component {
  static propTypes = {
    actions: PropTypes.object,
    message: PropTypes.string,
  }

  handleOnClick = () => {
    this.props.actions.test()
  }

  render() {
    const {
      message,
    } = this.props

    return (
      <div className={styles.divTest}>
        这是一段测试文本，点击按钮以后下面显示的信息会发生变化
        <div>{message}</div>
        <div>
          <button onClick={this.handleOnClick}>点击我就会发送 action！</button>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    message: state.test.get('message'),
  }
}

function mapDispatchToProps(dispatch) {
  const actions = {
    ...acts,
  }
  const actionMap = {
    actions: bindActionCreators(actions, dispatch),
  }
  return actionMap
}

export default connect(mapStateToProps, mapDispatchToProps)(Test)
