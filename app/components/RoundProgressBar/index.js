import React from 'react'
import PropTypes from 'prop-types'
import styles from './index.scss'

function getDegress(tempPercent) {
  let leftDeg
  let rightDeg
  if (tempPercent >= 0 && tempPercent < 50) {
    leftDeg = 135
    rightDeg = (tempPercent * 3.6) + 135
  } else if (tempPercent >= 50 && tempPercent <= 100) {
    leftDeg = (tempPercent * 3.6) - 45
    rightDeg = 315
  } else {
    leftDeg = 135
    rightDeg = 135
  }
  return { leftDeg, rightDeg }
}

function RoundProgressBar({
  display,
  percent,
  color,
  style,
}) {
  const tempPercent = parseInt(percent, 10)
  const { leftDeg, rightDeg } = getDegress(tempPercent)
  const leftArcStyle = { transform: `rotateZ(${leftDeg}deg)`, borderColor: color }
  const rightArcStyle = { transform: `rotateZ(${rightDeg}deg)`, borderColor: color }

  return (
    <div className={styles.container} style={style}>
      <div className={styles.content}>
        <div className={styles.leftRect}>
          <div className={styles.leftArc} style={leftArcStyle} />
        </div>
        <div className={styles.rightRect}>
          <div className={styles.rightArc} style={rightArcStyle} />
        </div>
        <div className={styles.displayArea}>
          {display}
        </div>
      </div>
    </div>
  )
}

RoundProgressBar.propTypes = {
  display: PropTypes.oneOf(PropTypes.element, PropTypes.array),
  percent: PropTypes.number,
  color: PropTypes.string,
  style: PropTypes.object,
}

export default RoundProgressBar