import React from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import RaisedButton from 'material-ui/RaisedButton'
import FontIcon from 'material-ui/FontIcon'
import * as acts from './actions'
import styles from './styles'

@connect(mapStateToProps, mapDispatchToProps)
export default class Test extends React.Component {
  static propTypes = {
    actions: PropTypes.object,
    message: PropTypes.string,
  }

  handleOnClick = () => {
    this.props.actions.testAction(12345)
  }

  render() {
    const {
      message,
    } = this.props


    return (
      <div className={styles.divTest}>
        {'这是一段测试文本，点击按钮以后下面显示信息会发生变化'}
        <div>{message}</div>
        <div>
          <RaisedButton
            icon={<FontIcon className='fa fa-heart' />}
            label='点击我就会发送 action！'
            onTouchTap={this.handleOnClick}
            primary
          />
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
