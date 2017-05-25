import React from 'react'
import styles from './index.scss'

class Home extends React.Component {
  handleOnClick = () => {
    console.log('测试鸡巴毛')
  }

  render() {
    return (
      <div className={styles.container}>
        <div className={styles.centerBox}>
          <div className={styles.title}>
            Einskang闫守康
            <input type="button" value="点我查看" onClick={this.handleOnClick} />
          </div>
        </div>
      </div>
    )
  }
}

export default Home
