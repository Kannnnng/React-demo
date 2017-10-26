import React from 'react'
import PropTypes from 'prop-types'
import styles from './styles'

const noContentElement = (
  <span className={styles.noContent}>
    {'未填写'}
  </span>
)

export default function StudentInfomation({
  open,
  avatar,
  name,
  nickName,
  gender,
  school,
  college,
  className,
  studentId,
  order,
  birthday,
  location,
  introduction,
  education,
  job,
  email,
  QQ,
  phone,
  style,
  handleOnClickClose,
}) {
  const containerStyle = { ...style, display: `${open ? '' : 'none'}` }
  const headerBackgroundStyle = { backgroundImage: `url(${avatar})` }
  const avatarStyle = headerBackgroundStyle
  const genderClassName = `${styles.gender} fa ${
    (gender === 1 && 'fa-venus') ||
    (gender === 2 && 'fa-mars') || 'fa-intersex'
  }`
  const titleClassName = `${styles.title} ${styles.bottomLine}`
  const itemClassName = `${styles.items} ${styles.bottomLine}`

  return (
    <div
      className={styles.container}
      style={containerStyle}
    >
      <div className={styles.header}>
        <div
          className={styles.headerBackground}
          style={headerBackgroundStyle}
        />
        <button
          className={styles.closeButton}
          onClick={handleOnClickClose}
        />
        <div
          className={styles.avatar}
          style={avatarStyle}
        />
        <div className={styles.name}>{name}</div>
        <div className={styles.nickName}>
          <span>
            {nickName && <span>{nickName}</span>}
            <i className={genderClassName} />
          </span>
        </div>
      </div>
      <div className={titleClassName}>
        {'学籍档案'}
      </div>
      <div className={styles.items}>
        <span>{'学校'}</span>
        {school ? (
          <span>
            {school}
          </span>
        ) : noContentElement}
      </div>
      <div className={styles.items}>
        <span>{'院系'}</span>
        {college ? (
          <span>
            {college}
          </span>
        ) : noContentElement}
      </div>
      <div className={styles.items}>
        <span>{'班级'}</span>
        {className ? (
          <span>
            {className}
          </span>
        ) : noContentElement}
      </div>
      <div className={styles.items}>
        <span>{'学号'}</span>
        {studentId ? (
          <span>
            {studentId}
          </span>
        ) : noContentElement}
      </div>
      <div className={itemClassName}>
        <span>{'序号'}</span>
        {order ? (
          <span>
            {order}
          </span>
        ) : noContentElement}
      </div>
      <div className={titleClassName}>
        {'个人资料'}
      </div>
      <div className={styles.items}>
        <span>{'出生日期'}</span>
        {birthday ? (
          <span>
            {birthday}
          </span>
        ) : noContentElement}
      </div>
      <div className={styles.items}>
        <span>{'所在地'}</span>
        {location ? (
          <span>
            {location}
          </span>
        ) : noContentElement}
      </div>
      <div className={styles.items} style={{ height: 'auto' }}>
        <span>{'简历'}</span>
        {introduction ? (
          <span>
            {introduction}
          </span>
        ) : noContentElement}
      </div>
      <div className={styles.items}>
        <span>{'学历'}</span>
        {education ? (
          <span>
            {education}
          </span>
        ) : noContentElement}
      </div>
      <div className={itemClassName}>
        <span>{'职业'}</span>
        {job ? (
          <span>
            {job}
          </span>
        ) : noContentElement}
      </div>
      <div className={titleClassName}>
        {'联系方式'}
      </div>
      <div className={styles.items}>
        <span>{'电子邮件'}</span>
        {email ? (
          <span>
            {email}
          </span>
        ) : noContentElement}
      </div>
      <div className={styles.items}>
        <span>{'QQ'}</span>
        {QQ ? (
          <span>
            {QQ}
          </span>
        ) : noContentElement}
      </div>
      <div className={itemClassName}>
        <span>{'手机号'}</span>
        {phone ? (
          <span>
            {phone}
          </span>
        ) : noContentElement}
      </div>
    </div>
  )
}

StudentInfomation.propTypes = {
  open: PropTypes.bool,  // 是否显示
  avatar: PropTypes.string,  // 头像链接
  name: PropTypes.string,  // 姓名
  nickName: PropTypes.string,  // 昵称
  gender: PropTypes.number,  // 性别，0 未知，1 女，2 男
  school: PropTypes.string,  // 学校
  college: PropTypes.string,  // 学院
  className: PropTypes.string,  // 班级
  studentId: PropTypes.string,  // 学号
  order: PropTypes.string,  // 序号
  birthday: PropTypes.string,  // 生日
  location: PropTypes.string,  // 所在地
  introduction: PropTypes.string,  // 简介
  education: PropTypes.string,  // 学历
  job: PropTypes.string,  // 职业工作
  email: PropTypes.string,  // 电子邮箱
  QQ: PropTypes.string,  // QQ 号
  phone: PropTypes.string,  // 电话号码
  style: PropTypes.object,  // 外部样式
  handleOnClickClose: PropTypes.func,  // 点击关闭按钮所要执行的回调函数
}

StudentInfomation.defaultProps = {
  open: false,
  avatar: '',
  name: '',
  nickName: '',
  gender: 0,
  school: '',
  college: '',
  className: '',
  studentId: '',
  order: '',
  birthday: '',
  location: '',
  introduction: '',
  education: '',
  job: '',
  email: '',
  QQ: '',
  phone: '',
  style: {},
}
