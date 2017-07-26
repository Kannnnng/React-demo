import React from 'react'
import PropTypes from 'prop-types'
import { LibraryCell } from './LibraryCell'
import styles from './index.scss'

class SelectLibrary extends React.Component {
  static propTypes = {
    data: PropTypes.array,
    handleOnSelectLibrary: PropTypes.func,
    className: PropTypes.string,
  }

  static defaultProps = {
    data: [],
    style: {},
  }

  renderLibraryCell() {
    const {
      data,
      handleOnSelectLibrary,
    } = this.props
    return data.map((value) => (
      <LibraryCell
        key={value.libraryId}
        libraryName={value.libraryName}
        cover={value.cover}
        questionNumber={value.questionNumber}
        quizNumber={value.quizNumber}
        coursewareNumber={value.coursewareNumber}
        hasJoin={false}
        handleOnSelectLibrary={handleOnSelectLibrary}
        className={styles.libraryCell}
      />
    ))
  }

  render() {
    const {
      className,
    } = this.props
    const containerClassName = `${styles.container} ${className}`

    return (
      <div className={containerClassName}>
        <div className={styles.header}>
          <button
            className={styles.close}
            onClick={this.handleOnClickClose}
          >
            {'关闭'}
          </button>
          <div className={styles.title}>
            {'选择题库加入小组'}
          </div>
        </div>
        <div className={styles.content}>
          {this.renderLibraryCell()}
        </div>
        <div className={styles.footer}>
          <i className={styles.search} />
          <input className={styles.searchInput} type="text" placeholder="过滤题库" />
        </div>
      </div>
    )
  }
}

export default SelectLibrary
