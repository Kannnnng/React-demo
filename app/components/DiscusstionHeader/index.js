/**
 *
 * DiscusstionHeader
 *
 */

import React from 'react'
import PropTypes from 'prop-types'
import styles from './styles'

export default class DiscusstionHeader extends React.PureComponent {
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
    const {
      data,
    } = this.props
    const {
      data,
    } = this.state
    return (
      <div className={styles.container}>
      </div>
    )
  }
}
