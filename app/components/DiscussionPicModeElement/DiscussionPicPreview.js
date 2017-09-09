/**
 *
 * DiscussionPicPreview
 *
 */

import React from 'react'
import PropTypes from 'prop-types'
import styles from './styles'

export default function DiscussionPicPreview({
  avatar,
  content,
  date,
  id,
  isAgree,
  name,
  picture,
  style,
}) {
  return (
    <div className={styles.discussionPicPreviewContainer} style={style}>

      <div className={styles.bottomInfo}>
        <span style={avatar ? { backgroundImage: `url(${avatar})` } : null} />
        <span>
          {name}
        </span>
      </div>
    </div>
  )
}

DiscussionPicPreview.propTypes = {
  avatar: PropTypes.string,
  content: PropTypes.string,
  date: PropTypes.string,
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  isAgree: PropTypes.bool,
  name: PropTypes.string,
  picture: PropTypes.string,
  style: PropTypes.object,
}

DiscussionPicPreview.defaultProps = {
  avatar: '',
  content: '',
  date: '',
  id: 0,
  isAgree: false,
  name: '',
  picture: '',
  style: null,
}
