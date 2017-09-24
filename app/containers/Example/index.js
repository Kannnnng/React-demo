/**
 *
 * Example
 *
 */

import React from 'react'
import PropTypes from 'prop-types'
import CountDown from 'components/CountDown'
import styles from './styles'

export default class Example extends React.Component {
  static propTypes = {

  }

  static defaultProps = {

  }

  state = {
    countDownStart: true,
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
            // button={}
            start={countDownStart}
            limit={300}
            // style={}
          />
        </div>
      </div>
    )
  }
}
