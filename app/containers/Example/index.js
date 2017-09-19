/**
 *
 * Example
 *
 */

import React from 'react'
import PropTypes from 'prop-types'
import styles from './styles'

export default function Example({
  data,
}) {
  return (
    <div className={styles.container}>
      <div className={styles.leftArea}>
        123123123123123131231123123121231312312
      </div>
      <div className={styles.rightArea}>
        123123123123123131231123123121231312312
      </div>
    </div>
  )
}

Example.propTypes = {
  data: PropTypes.object,
}

Example.default = {
  data: {},
}
