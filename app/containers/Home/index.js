import React from 'react'
import styles from './index.scss'

class Home extends React.Component {
  myTest = () => {
    console.log('测试')
  }

  render() {
    return (
      <div className={styles.container}>
        <div className={styles.title}>
          {'这是一个标题刷新'}
          <button onClick={this.myTest}>{'点我查看'}</button>
        </div>
      </div>
    )
  }
}

export default Home
