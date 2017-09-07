import React from 'react'
import PropTypes from 'prop-types'
import FlatButton from 'material-ui/FlatButton'
import defaultAvatar from 'images/yeoman.png'
import styles from './styles.scss'

export default function DiscussionBottomToolBarTips({
  type,  // 当前显示的是小组还是学生
  name,  // 学生姓名或小组名
  avatar,  // 学生头像或小组
  messagesCount,  // 发言数量
  handleOnClickCancel,  // 点击取消按钮所要执行的函数
  style,  // 外部样式
}) {
  return (
    <div className={styles.DiscussionBottomToolBarTipsContainer} style={style}>
      <span className={styles.DiscussionBottomToolBarTipsContent}>
        <span
          style={type === 'student' ?
            { backgroundImage: `url(${avatar || defaultAvatar})` } :
            { backgroundColor: `${avatar}` }}
        />
        <span>{`正在显示${name}的${messagesCount}条发言`}</span>
        <FlatButton
          backgroundColor={'transparent'}
          label={'取消'}
          labelStyle={{ fontSize: '14px', color: '#3B9E46', padding: '0', letterSpacing: '0.5px', top: '1px' }}
          onClick={handleOnClickCancel}
          style={{ minWidth: '0', width: '42px', height: '42px', borderRadius: '50%', top: '-1px' }}
        />
      </span>
    </div>
  )
}

DiscussionBottomToolBarTips.propTypes = {
  type: PropTypes.oneOf(['student', 'group']),
  name: PropTypes.string,
  avatar: PropTypes.string,
  messagesCount: PropTypes.number,
  handleOnClickCancel: PropTypes.func,
  style: PropTypes.object,
}

DiscussionBottomToolBarTips.defaultProps = {
  type: 'student',
  name: '',
  avatar: '',
  messagesCount: 0,
  handleOnClickCancel: () => {},
  style: {},
}
