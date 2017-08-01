import React from 'react'
import PropTypes from 'prop-types'
import styles from './BlackCover.scss'

function BlackCover({
  children,
  topLeftButton,
  topRightButton,
  middleLeftButton,
  middleRightButton,
  bottomToolBar,
}) {
  return (
    <div className={styles.container}>
      {topLeftButton && <div className={styles.topLeftButton}>
        {topLeftButton}
      </div>}
      {topRightButton && <div className={styles.topRightButton}>
        {topRightButton}
      </div>}
      {middleLeftButton && <div className={styles.middleLeftButton}>
        {middleLeftButton}
      </div>}
      {middleRightButton && <div className={styles.middleRightButton}>
        {middleRightButton}
      </div>}
      {children}
      {bottomToolBar && <div className={styles.bottomToolBar}>
        {bottomToolBar}
      </div>}
    </div>
  )
}

BlackCover.propTypes = {
  children: PropTypes.element,
  topLeftButton: PropTypes.element,
  topRightButton: PropTypes.element,
  middleLeftButton: PropTypes.element,
  middleRightButton: PropTypes.element,
  bottomToolBar: PropTypes.element,
}

export default BlackCover
