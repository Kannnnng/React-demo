/**
 *
 * Example
 *
 */

import React from 'react'
import PropTypes from 'prop-types'
import FlatButton from 'material-ui/FlatButton'
import CountDown from 'components/CountDown'
import DiscussionBottomToolBar from 'components/DiscussionBottomToolBar'
import styles from './styles'

export default class Example extends React.Component {
  static propTypes = {

  }

  static defaultProps = {

  }

  state = {
    countDownStart: true,
  }

  handleOnClickCountDownStartButton = () => {
    this.setState({ countDownStart: !this.state.countDownStart })
  }

  render() {
    const {

    } = this.props
    const {
      countDownStart,
    } = this.state

    return (
      <div className={styles.container}>
        <div className={styles.countDownComponent}>
          <CountDown
            title={'倒计时组件'}
            button={<FlatButton
              label={countDownStart ? '暂停' : '开始'}
              primary
              onClick={this.handleOnClickCountDownStartButton}
            />}
            start={countDownStart}
            limit={3000}
          />
        </div>
        <div>
          <DiscussionBottomToolBar

          />
        </div>
      </div>
    )
  }
}
