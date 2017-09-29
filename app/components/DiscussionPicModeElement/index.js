/**
 *
 * DiscussionPicModeElement
 *
 */

import React from 'react'
import PropTypes from 'prop-types'
import styles from './styles'

export default function DiscussionPicModeElement({
  avatar,
  name,
  picture,
  style,
  handleOnClick,
}) {
  return (
    <div className={styles.container} style={style}>
      <button className={styles.maskButton} onClick={handleOnClick} />
      <img src={picture} alt='讨论附带图片' />
      <div className={styles.bottomInfo}>
        <span style={avatar ? { backgroundImage: `url(${avatar})` } : null} />
        <span>
          {name}
        </span>
      </div>
    </div>
  )
}

DiscussionPicModeElement.propTypes = {
  avatar: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  picture: PropTypes.string.isRequired,
  style: PropTypes.object,
  handleOnClick: PropTypes.func,
}

DiscussionPicModeElement.default = {
  avatar: '',
  name: '',
  picture: '',
  style: null,
  handleOnClick: () => {},
}
