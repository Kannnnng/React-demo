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
      <div></div>
      <div></div>
      <div></div>
    </div>
  )
}

Example.propTypes = {
  data: PropTypes.object,
}

Example.default = {
  data: {},
}
