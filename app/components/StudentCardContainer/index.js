import React from 'react'
import PropTypes from 'prop-types'
import StudentCard from 'components/StudentCard'
import styles from './styles'

function getContentHeight(
  count,
  contentWidth,
) {
  return `${200 * Math.ceil(count / Math.floor(contentWidth / 152))}px`
}

export default class StudentCardContainer extends React.Component {
  static propTypes = {
    title: PropTypes.string,  // 标题
    color: PropTypes.string,  // 小组图标的颜色
    studentList: PropTypes.array,  // 学生信息集合
    handleOnClickCard: PropTypes.func,  // 点击学生卡片时所执行的回调函数
  }

  static defaultProps = {
    title: '',
    color: '#FF0009',
    studentList: [],
    handleOnClickCard: () => () => {},
  }

  state = {
    show: true,  // 展开还是折叠
    contentHeight: undefined,  // 字符串类型
  }

  handleOnClickFoldButton = () => {
    const {
      studentList,
    } = this.props
    const {
      show,
    } = this.state
    const contentWidth = this.content.offsetWidth
    const contentHeight = getContentHeight(studentList.length, contentWidth)
    this.setState({ show: !show })
    if (show) {
      this.setState({ contentHeight })
      window.setTimeout(() => { this.setState({ contentHeight: '0' }) }, 50)  // eslint-disable-line
    } else {
      this.setState({ contentHeight })
      window.setTimeout(() => { this.setState({ contentHeight: 'auto' }) }, 500)  // eslint-disable-line
    }
  }

  render() {
    const {
      title,
      color,
      studentList,
      handleOnClickCard,
    } = this.props
    const {
      show,
      contentHeight,
    } = this.state
    const titleIconStyle = { backgroundColor: color }
    const foldButtonClassName = `${styles.foldButton} ${(!show && styles.foldButtonClose) || ''}`
    const StudentCardClassName = `${styles.floatLeft} ${styles.contentItem}`
    const contentStyle = contentHeight ? { height: contentHeight } : {}

    return (
      <div className={styles.container}>
        <div className={styles.title}>
          <div className={styles.titleText}>
            <i style={titleIconStyle} />
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
              id={value.id}
              name={value.name}
              avatar={value.avatar}
              studentId={value.studentId}
              status={value.status}
              className={StudentCardClassName}
              handleOnClickCard={handleOnClickCard}
            />
          ))}
        </div>
      </div>
    )
  }
}
