import React from 'react'
import PropTypes from 'prop-types'
import styles from './index.scss'

function BlackCover({
  children,
  topLeftButton,
  topRightButton,
}) {

  return (
    <div className={styles.blackCoverContainer}>
      {topLeftButton && <div className={styles.topLeftButton}>
        {topLeftButton}
      </div>}
      {topRightButton && <div className={styles.topRightButton}>
        {topRightButton}
      </div>}
    </div>
  )
}

BlackCover.propTypes = {
  children: PropTypes.element,
  topLeftButton: PropTypes.element,
  topRightButton: PropTypes.element,
}

export default BlackCover
