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
      <div>1231231213123212312e323234234</div>
      <div>1231231</div>
      <div>123131</div>
    </div>
  )
}

Example.propTypes = {
  data: PropTypes.object,
}

Example.default = {
  data: {},
}
