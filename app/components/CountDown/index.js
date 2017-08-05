import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import styles from './styles.scss'

class CountDown extends React.PureComponent {
  static propTypes = {
    title: PropTypes.string,
    button: PropTypes.element,
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
      title,
      button,
      style,
    } = this.props
    const {
      limit,
    } = this.state
    const limitMoment = moment.duration(limit, 'seconds')
    const minutes = limitMoment.get('minutes')
    const seconds = limitMoment.get('seconds')
    const minutesUnitPlace = minutes % 10
    const minutesTenPlace = minutes > 9 ? parseInt(minutes / 10, 10) : 0
    const secondsUnitPlace = seconds % 10
    const secondsTenPlace = seconds > 9 ? parseInt(seconds / 10, 10) : 0
    const minutesTenPlaceZeroStyle = !minutesTenPlace ? { color: '#454850' } : {}

    return (
      <div className={styles.container} style={style}>
        <div className={styles.content}>
          <div className={styles.title}>{title}</div>
          <div className={styles.limit}>
            <span style={minutesTenPlaceZeroStyle}>{minutesTenPlace}</span>
            <span>{minutesUnitPlace}</span>
            <span>{':'}</span>
            <span>{secondsTenPlace}</span>
            <span>{secondsUnitPlace}</span>
          </div>
          <div className={styles.button}>{button}</div>
        </div>
      </div>
    )
  }
}

export default CountDown
