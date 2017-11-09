import React from 'react'
import PropTypes from 'prop-types'
import styles from './BlackCover.scss'

function BlackCover({
  className,
  children,
  topLeftButton,
  topRightButton,
  middleLeftButton,
  middleRightButton,
  bottomToolBar,
}) {
  const containerClassName = `${styles.container} ${className}`
  return (
    <div className={containerClassName}>
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
  className: PropTypes.string,
  children: PropTypes.element,
  topLeftButton: PropTypes.element,
  topRightButton: PropTypes.element,
  middleLeftButton: PropTypes.element,
  middleRightButton: PropTypes.element,
  bottomToolBar: PropTypes.element,
}

BlackCover.defaultProps = {
  className: '',
}

export default BlackCover
