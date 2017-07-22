/**
*
* AnswerCorrectRate
*
*/

import React, { PropTypes } from 'react'
import styles from './styles.scss'

// 将百分比分配为圆的360度显示
function getRateInfo(rate) {
  let transform1 = 0
  let transform2 = 0
  if (rate === 0.5) {
    transform1 = 180
  } else if (rate < 0.5) {
    transform1 = rate * 360
    transform2 = 0
  } else if (rate > 0.5) {
    transform1 = 180
    transform2 = (rate - 0.5) * 360
  }

  return { transform1, transform2 }
}

function AnswerCorrectRate(props) {
  const { rightNum, errorNum } = props
  const rate = rightNum / (rightNum + errorNum)
  const info = getRateInfo(rate)
  const transformStyle1 = {
    WebkitTransform: `rotate(${info.transform1}deg)`,
  }
  const transformStyle2 = {
    WebkitTransform: `rotate(${info.transform2}deg)`,
  }
  return (
    <div className={styles.accuracyWrapper}>
      <div className={styles.pluginWrapper}>
        <div className={styles.hold1}>
          <div className={styles.pie1} style={transformStyle1} />
        </div>
        <div className={styles.hold2}>
          <div className={styles.pie2} style={transformStyle2} />
        </div>
        <div className={styles.circle} />
        <div className={styles.innerCircle}>
          <div className={styles.word}>
            123456
          </div>
          <div className={styles.rateWrapper}>
            <span className={styles.rate}>{rate.toFixed(2) * 100}</span>
            <span>%</span>
          </div>
          <div>
            <span className={styles.num}>{rightNum}</span>
            <span className={styles.margin}>/</span>
            <span>{errorNum}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

AnswerCorrectRate.propTypes = {
  rightNum: PropTypes.number.isRequired, // 正确题目数
  errorNum: PropTypes.number.isRequired, // 错误题目数
}

AnswerCorrectRate.defaultProps = {
  rightNum: 0,
  errorNum: 0,
}

export default AnswerCorrectRate
