/**
 *
 * DiscussionHeader
 *
 */

import React from 'react'
import PropTypes from 'prop-types'
import Toggle from 'material-ui/Toggle'
import styles from './styles'

export default function DiscussionHeader({
  title,
  checkedTab,
  isDiscussionOpening,
  handleOnToggleDiscussion,  // 第二个参数代表当前的开关状态
  handleOnGoBack,
}) {
  const discussionToggleClassName = `${styles.showTypeButton} ${styles.discussionToggle}`
  const speakContentClassName = `${styles.showTypeButton}${checkedTab === 'speakContent' ? ` ${styles.showTypeButtonChecked}` : ''}`  // eslint-disable-line
  const keyWordClassName = `${styles.showTypeButton}${checkedTab === 'keyWord' ? ` ${styles.showTypeButtonChecked}` : ''}`  // eslint-disable-line
  const picsClassName = `${styles.showTypeButton}${checkedTab === 'Pics' ? ` ${styles.showTypeButtonChecked}` : ''}`

  return (
    <div className={styles.container}>
      <div className={styles.leftArea}>
        <div className={styles.goBack}>
          <button onClick={handleOnGoBack}>
            <span />
          </button>
        </div>
        <div className={styles.title}>
          {title}
        </div>
      </div>
      <div className={styles.rightArea}>
        <div className={speakContentClassName}>
          <button>
            <span className={styles.speakContentIcon} />
            <span className={styles.typeText}>{'发言内容'}</span>
          </button>
        </div>
        <div className={keyWordClassName}>
          <button>
            <span className={styles.keyWordIcon} />
            <span className={styles.typeText}>{'核心词'}</span>
          </button>
        </div>
        <div className={picsClassName}>
          <button>
            <span className={styles.picsIcon} />
            <span className={styles.typeText}>{'图片墙'}</span>
          </button>
        </div>
        <div className={discussionToggleClassName}>
          <Toggle
            defaultToggled={isDiscussionOpening}
            thumbStyle={{ backgroundColor: '#FFF' }}
            trackStyle={{ backgroundColor: 'rgba(34, 31, 31, 0.26)' }}
            thumbSwitchedStyle={{ backgroundColor: '#4DB553' }}
            trackSwitchedStyle={{ backgroundColor: '#3B9E46' }}
            onToggle={handleOnToggleDiscussion}
          />
          <span className={styles.typeText}>{isDiscussionOpening ? '讨论开启中' : '讨论关闭'}</span>
        </div>
      </div>
    </div>
  )
}

DiscussionHeader.propTypes = {
  title: PropTypes.string,
  checkedTab: PropTypes.oneOf(['speakContent', 'keyWord', 'Pics']),
  isDiscussionOpening: PropTypes.bool,
  handleOnToggleDiscussion: PropTypes.func,
  handleOnGoBack: PropTypes.func,
}

DiscussionHeader.defaultProps = {
  title: '',
  checkedTab: 'speakContent',
  isDiscussionOpening: false,
  handleOnToggleDiscussion: () => {},
  handleOnGoBack: () => {},
}
