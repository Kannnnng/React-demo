import React from 'react'
import styles from './index.scss'

class Home extends React.Component {
  handleOnClick = () => {
    console.log('我要热更新啦啦啦啦啦')
  }

  render() {
    return (
      <div className={styles.container}>
        <div>快更新</div>
        <input type="button" value="点我查看效果" onClick={this.handleOnClick} />
        <div>你特么倒是更新啊</div>
      </div>
    )
  }
}

export default Home
