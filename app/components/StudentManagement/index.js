/**
*
* StudentManagement
*
*/

import React from 'react'
import PropTypes from 'prop-types'
import styles from './index.scss'

export default class StudentManagement extends React.PureComponent {
  static propTypes = {
    data: PropTypes.object,
  }

  static defaultProps = {
    data: {},
  }

  state = {
    data: {},
  }

  render() {
    return (
      <div className={styles.container}>
      </div>
    )
  }
}
