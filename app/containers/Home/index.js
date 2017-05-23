import React from 'react'
import styles from './index.scss'

class Home extends React.Component {
  render() {
    return (
      <div className={styles.container}>
        <div className={styles.title}>
          {'这是一个标题刷新'}
        </div>
      </div>
    )
  }
}

export default Home
