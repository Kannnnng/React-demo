import React from 'react'
import PropTypes from 'prop-types'
import StudentCard from 'components/StudentCard'
import styles from './index.scss'

export default function StudentCardContainer({
  show, // 展开还是折叠
  title, // 标题
  studentList,  // 学生信息集合
}) {
  const foldButtonClassName = `${styles.foldButton} ${(!show && styles.foldButtonClose) || ''}`
  const StudentCardClassName = `${styles.floatLeft} ${styles.contentItem}`
  // const contentStyle = { height:  }

  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <div className={styles.titleText}>
          <i />
          <span>{title}</span>
        </div>
        <i className={foldButtonClassName}>
          <button />
        </i>
      </div>
      <div
        className={styles.content}
        style={contentStyle}
      >
        {studentList.map((value) => (
          <StudentCard
            key={value.id}
            name={value.name}
            avatar={value.avatar}
            studentId={value.studentId}
            status={value.status}
            className={StudentCardClassName}
          />
        ))}
      </div>
    </div>
  )
}

StudentCardContainer.propTypes = {
  show: PropTypes.bool,
  title: PropTypes.string,
  studentList: PropTypes.array,
}

StudentCardContainer.defaultProps = {
  show: true,
  title: '',
  studentList: [],
}
