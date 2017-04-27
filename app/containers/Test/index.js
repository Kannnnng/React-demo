import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import styles from './index.scss'

class Test extends React.Component {
  render() {
    return (
      <div className={styles.divTest}>
        这是一段测试文本
        <div>
          <Link to="/app">点我跳转</Link>
        </div>
      </div>
    )
  }
}

export default Test
