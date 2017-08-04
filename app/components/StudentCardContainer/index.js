import React from 'react'
import PropTypes from 'prop-types'
import StudentCard from 'components/StudentCard'
import styles from './index.scss'

let contentRealHeight

export default class StudentCardContainer extends React.Component {
  static propTypes = {
    title: PropTypes.string,  // 标题
    studentList: PropTypes.array,  // 学生信息集合
  }

  static defaultProps = {
    title: '',
    studentList: [],
  }

  state = {
    show: true,  // 展开还是折叠
    contentHeight: undefined,
  }

  componentDidMount() {
    window.content = this.content
    console.log(this.content.offsetHeight, 123)
  }

  handleOnClickFoldButton = () => {
    const {
      show,
    } = this.state
    console.log(this.content.offsetHeight, 123)
    this.setState({ show: !show })
    if (show) {
      this.setState({ contentHeight: contentRealHeight })
      window.setTimeout(() => { this.setState({ contentHeight: '0' }) }, 0)  // eslint-disable-line
    } else {
      this.setState({ contentHeight: '0' })
      window.setTimeout(() => { this.setState({ contentHeight: contentRealHeight }) }, 0)  // eslint-disable-line
    }
  }

  render() {
    const {
      title,
      studentList,
    } = this.props
    const {
      show,
      contentHeight,
    } = this.state
    const foldButtonClassName = `${styles.foldButton} ${(!show && styles.foldButtonClose) || ''}`
    const StudentCardClassName = `${styles.floatLeft} ${styles.contentItem}`
    const contentStyle = contentHeight ? { height: `${contentHeight}px` } : {}

    return (
      <div className={styles.container}>
        <div className={styles.title}>
          <div className={styles.titleText}>
            <i />
            <span>{title}</span>
          </div>
          <i className={foldButtonClassName}>
            <button onClick={this.handleOnClickFoldButton} />
          </i>
        </div>
        <div
          className={styles.content}
          ref={(node) => { this.content = node }}
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
}
