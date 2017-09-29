/**
 *
 * DiscussionPicPreview
 *
 */

import React from 'react'
import PropTypes from 'prop-types'
import FlatButton from 'material-ui/FlatButton'
import defaultAvatar from 'images/defaultAvatar.png'
import styles from './styles'

export default function DiscussionPicPreview({
  avatar,
  content,
  date,
  id,
  isAgree,
  name,
  pictures,
  style,
  handleOnClickSetTop,
  handleOnClickDelete,
}) {
  return (
    <div className={styles.discussionPicPreviewContainer} style={style}>
      <div className={styles.discussionPicPreviewTopInfo}>
        <img src={avatar} alt='头像' />
        <div>
          <div>{name}</div>
          <div>{date}</div>
        </div>
      </div>
      <div className={styles.discussionPicPreviewContent}>
        <div>{content}</div>
        <div className={styles.discussionPicPreviewPics}>
          {pictures.map((value, index) => (
            <img key={index} src={value} alt='讨论附带图片' />
          ))}
        </div>
      </div>
      <div className={styles.discussionPicPreviewBottomToolBar}>
        <div>
          <FlatButton
            backgroundColor={'transparent'}
            label={[
              <i key={'icon'} className='material-icons'>{'thumb_up'}</i>,
              <span key={'text'}>{isAgree ? '取消赞' : '点赞'}</span>,
            ]}
            labelStyle={{ fontSize: '16px', color: `#${isAgree ? '3B9E46' : '666'}`, display: 'inline-flex', alignItems: 'center', padding: '0' }}  // eslint-disable-line
            onClick={handleOnClickSetTop(id)}
            style={{ minWidth: '0', width: `${isAgree ? '75px' : '62px'}`, height: '22px', lineHeight: '0' }}
          />
        </div>
        <div>
          <FlatButton
            backgroundColor={'transparent'}
            label={[
              <i key={'icon'} className='material-icons'>{'delete'}</i>,
              <span key={'text'}>{'删除'}</span>,
            ]}
            labelStyle={{ fontSize: '16px', color: '#666', display: 'inline-flex', alignItems: 'center', padding: '0' }}
            onClick={handleOnClickDelete(id)}
            style={{ minWidth: '0', width: '62px', height: '22px', lineHeight: '0' }}
          />
        </div>
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
  pictures: PropTypes.array,
  style: PropTypes.object,
  handleOnClickSetTop: PropTypes.func,
  handleOnClickDelete: PropTypes.func,
}

DiscussionPicPreview.defaultProps = {
  avatar: defaultAvatar,
  content: '',
  date: '',
  id: 0,
  isAgree: false,
  name: '',
  pictures: [],
  style: null,
  handleOnClickSetTop: () => () => {},
  handleOnClickDelete: () => () => {},
}
