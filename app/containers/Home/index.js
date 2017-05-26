import React from 'react'
import { Link } from 'react-router-dom'
import styles from './index.scss'

class Home extends React.Component {
  render() {
    return (
      <div className={styles.container}>
        <div className={styles.centerBox}>
          <div className={styles.title}>
            <div style={{ textAlign: 'center' }}>
              <Link to="/test">跳转至测试页</Link>
            </div>
            <div style={{ textAlign: 'center' }}>
              <Link to="/pro">跳转至个人主页</Link>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Home
