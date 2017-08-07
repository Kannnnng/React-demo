/**
 *
 * Loading
 *
 */

import React from 'react'
import PropTypes from 'prop-types'
import styles from './styles'

export default function Loading({
  progress,
}) {
  return (
    <div className={styles.container}>
      <div className={styles.progress}>
        {progress ? `${progress}%` : <span>{'加载中'}</span>}
      </div>
      <div className={styles.ring} />
    </div>
  )
}

Loading.propTypes = {
  progress: PropTypes.number,
}

Loading.default = {
  progress: undefined,
}
