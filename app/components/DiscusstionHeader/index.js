/**
 *
 * DiscusstionHeader
 *
 */

import React from 'react'
import PropTypes from 'prop-types'
import Toggle from 'material-ui/Toggle'
import styles from './styles'

export default class DiscusstionHeader extends React.PureComponent {
  static propTypes = {
    data: PropTypes.object,
  }

  static defaultProps = {
    data: {},
  }

  state = {
    stateData: {},
  }

  render() {
    const {
      data,
    } = this.props
    const {
      stateData,
    } = this.state
    const discusstionToggleClassName = `${styles.showTypeButton} ${styles.discusstionToggle}`

    return (
      <div className={styles.container}>
        <div className={styles.leftArea}>
          <div className={styles.goBack}>
            <button>
              <span />
            </button>
          </div>
          <div className={styles.title}>
            你是谁的谁你是谁的谁你是谁的谁
          </div>
        </div>
        <div className={styles.rightArea}>
          <div className={styles.showTypeButton}>
            <button>
              <span className={styles.speakContentIcon} />
              <span className={styles.typeText}>{'发言内容'}</span>
            </button>
          </div>
          <div className={styles.showTypeButton}>
            <button>
              <span className={styles.keyWordIcon} />
              <span className={styles.typeText}>{'核心词'}</span>
            </button>
          </div>
          <div className={styles.showTypeButton}>
            <button>
              <span className={styles.PicsIcon} />
              <span className={styles.typeText}>{'图片墙'}</span>
            </button>
          </div>
          <div className={discusstionToggleClassName}>
            <Toggle
              thumbStyle={{ backgroundColor: '#4db553' }}
              thumbSwitchedStyle={{ backgroundColor: '#3B9E46' }}
            />
            <span className={styles.typeText}>{'图片墙'}</span>
          </div>
        </div>
      </div>
    )
  }
}
