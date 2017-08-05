import React from 'react'
import PropTypes from 'prop-types'
import defaultAvatar from 'images/defaultAvatar.png'
import styles from './styles.scss'

export default function StudentCard({
  id,  // 学生 ID
  name,  // 学生姓名
  avatar,  // 学生头像
  studentId,  // 学生学号
  status,  // 学生状态，可能是签到状态
  className,  // container 的样式类名
  handleOnClickCard,  // 点击学生卡片时所执行的回调函数
}) {
  const containerClassName = `${styles.container} ${className}`
  const avatarStyle = { backgroundImage: `url(${avatar || defaultAvatar})` }
  const statusContainerClassName = `${styles.statusContainer} ${
    (status === 'late' && styles.lateContainer) ||
    (status === 'skipClasses' && styles.skipClassesContainer) || styles.attendanceContainer
  }`
  const statusClassName = `${styles.status} ${
    (status === 'late' && styles.late) ||
    (status === 'skipClasses' && styles.skipClasses) || styles.attendance
  }`

  return (
    <div className={containerClassName}>
      <button
        className={styles.topLayerButton}
        onClick={handleOnClickCard(id)}
      />
      <div className={styles.avatar} style={avatarStyle}>
        <div className={statusContainerClassName}>
          <i className={statusClassName} />
        </div>
      </div>
      <div className={styles.name}>{name}</div>
      <div className={styles.studentId}>{`No.****${studentId.slice(-4)}`}</div>
    </div>
  )
}

StudentCard.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  avatar: PropTypes.string,
  studentId: PropTypes.string,
  status: PropTypes.string,
  className: PropTypes.string,
  handleOnClickCard: PropTypes.func,
}

StudentCard.defaultProps = {
  id: '',
  name: '',
  avatar: '',
  studentId: '',
  status: '',
  className: '',
  handleOnClickCard: () => () => {},
}
