import React from 'react'
import styles from './index.scss'

class Home extends React.Component {
  render() {
    return (
      <div className={styles.container}>
        <div className={styles.centerBox}>
          <div className={styles.title}>
            Einskang
          </div>
        </div>
      </div>
    )
  }
}

export default Home
