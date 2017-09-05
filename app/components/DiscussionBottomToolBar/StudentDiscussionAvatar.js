import React from 'react'
import PropTypes from 'prop-types'
import RaisedButton from 'material-ui/RaisedButton'
import styles from './styles.scss'

export default function StudentDiscussionAvatar({
  id,
  name,
  avatar,
  messagesCount,
  handleOnClickAvatar,
}) {
  return (
    <div
      className={styles.studentDiscussionAvatarContainer}
      style={messagesCount ? null : { opacity: '0.5' }}
    >
      <RaisedButton
        label={''}
        className={styles.studentDiscussionAvatarButton}
        backgroundColor={'transparent'}
        buttonStyle={{ height: '100%', lineHeight: '0' }}
        overlayStyle={{ height: '86px', lineHeight: '1' }}
        onClick={handleOnClickAvatar(id)}
      >
        <span
          className={styles.studentDiscussionAvatar}
          style={avatar ? { backgroundImage: `url(${avatar})` } : null}
        >
          <span>{messagesCount}</span>
        </span>
        <span>{name}</span>
      </RaisedButton>
    </div>
  )
}

StudentDiscussionAvatar.propTypes = {
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  name: PropTypes.string,
  avatar: PropTypes.string,
  messagesCount: PropTypes.number,
  handleOnClickAvatar: PropTypes.func,
}

StudentDiscussionAvatar.defaultProps = {
  id: 0,
  name: '',
  avatar: '',
  messagesCount: 0,
  handleOnClickAvatar: () => () => {},
}
