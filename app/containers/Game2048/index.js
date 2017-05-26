import React from 'react'
import styles from './index.scss'

class Game2048 extends React.Component {
  constructor(props) {
    super(props)

    this.state = {

    }
  }

  render() {
    return (
      <div className={styles.container}>
        <div className={styles.box}>

        </div>
      </div>
    )
  }
}

export default Game2048
