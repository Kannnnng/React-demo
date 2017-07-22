import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import styles from './index.scss'

class CountDown extends React.PureComponent {
  static propTypes = {
    start: PropTypes.bool,
    limit: PropTypes.number,
    style: PropTypes.object,
  }

  constructor(props) {
    super(props)

    this.timer = null
  }

  state = {
    limit: null,
  }

  componentWillMount() {
    const {
      start,
      limit,
    } = this.props
    if (start) {
      this.handleOnSetTimer(limit)
    } else {
      this.setState({ limit })
    }
  }

  componentWillReceiveProps(nextProps) {
    const {
      start,
      limit,
    } = this.props
    const {
      start: nextStart,
      limit: nextLimit,
    } = nextProps
    if (limit !== nextLimit) {
      this.setState({ limit: nextLimit })
    }
    if (start && !nextStart) {
      window.clearInterval(this.timer)  //eslint-disable-line
    } else if (!start && nextStart) {
      window.clearInterval(this.timer)  //eslint-disable-line
      this.handleOnSetTimer(nextLimit)
    }
  }

  handleOnSetTimer = (limit) => {
    this.timer = window.setInterval(() => {  //eslint-disable-line
      const nowLimit = (
        (this.state.limit > 0 && (this.state.limit - 1)) ||
        (this.state.limit === 0 && 0) ||
        (this.state.limit === null && limit) || 0
      )
      this.setState({ limit: nowLimit })
      if (!(nowLimit > 0)) {
        window.clearInterval(this.timer)  //eslint-disable-line
      }
    }, 1000)
  }

  render() {
    const {
      style,
    } = this.props
    const {
      limit,
    } = this.state
    const limitMoment = moment.duration(limit, 'seconds')
    const minutes = limitMoment.get('minutes')
    const seconds = limitMoment.get('seconds')

    return (
      <div className={styles.container} style={style}>
        <div className={styles.content}>
          <div>{'签到开启于2017年7月17日'}</div>
          <div>{`${/^\d$/.test(minutes) ? `0${minutes}` : minutes}:${/^\d$/.test(seconds) ? `0${seconds}` : seconds}`}</div>
          <div>{'立即关闭'}</div>
        </div>
      </div>
    )
  }
}

export default CountDown
