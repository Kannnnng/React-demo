import React from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { fromJS } from 'immutable'
import RaisedButton from 'material-ui/RaisedButton'
import FontIcon from 'material-ui/FontIcon'
import * as acts from './actions'
import styles from './styles'

class Test extends React.PureComponent {
  static propTypes = {
    actions: PropTypes.object,
    message: PropTypes.string,
  }

  state = {
    data: fromJS({
      a: 1,
    }),
  }

  handleOnClick = () => {
    this.props.actions.testAction(12345)
  }

  handleOnClickTestButton = () => {
    this.setState({
      data: this.state.data.update('a', (a) => a),
    })
  }

  render() {
    const {
      message,
    } = this.props
    const {
      data,
    } = this.state
    console.log(data.toJS(), 123)

    return (
      <div className={styles.divTest}>
        {'这是一段测试文本，点击按钮以后下面显示信息会发生变化'}
        <div>{message}</div>
        <div>{data.get('a')}</div>
        <div>
          <RaisedButton
            icon={<FontIcon className='fa fa-heart' />}
            label='点击我就会发送 action！'
            onTouchTap={this.handleOnClickTestButton}
            primary
          />
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    message: state.getIn(['test', 'message']),
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
