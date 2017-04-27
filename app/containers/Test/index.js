import React from 'react'
import { Link } from 'react-router'
import PropTypes from 'prop-types'
import styles from './index.scss'

class Test extends React.Component {
  render() {
    console.log(this.props.children)

    return (
      <div className={styles.divTest}>
        这是一段测试文本
        <Link to="/app">点我</Link>
      </div>
    )
  }
}

Test.propTypes = {
  children: PropTypes.object,
}

export default Test
