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
  width,
  style,
}) {
  const tempPercent = parseInt(percent, 10)
  const { leftDeg, rightDeg } = getDegress(tempPercent)
  const leftArcStyle = { transform: `rotateZ(${leftDeg}deg)`, borderTopColor: color, borderLeftColor: color, borderWidth: `${width}px` }  // eslint-disable-line
  const rightArcStyle = { transform: `rotateZ(${rightDeg}deg)`, borderBottomColor: color, borderRightColor: color, borderWidth: `${width}px` }  // eslint-disable-line

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
  width: PropTypes.number,
  style: PropTypes.object,
}

export default RoundProgressBar
