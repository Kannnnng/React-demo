import React from 'react'
import PropTypes from 'prop-types'
import lodash from 'lodash'
import { Dialog } from 'material-ui'
import { LibraryCell } from './LibraryCell'
import styles from './index.scss'

class SelectLibrary extends React.Component {
  static propTypes = {
    open: PropTypes.bool,
    data: PropTypes.array,
    className: PropTypes.string,
    handleOnSelectLibrary: PropTypes.func,
  }

  static defaultProps = {
    data: [],
  }

  constructor(props) {
    super(props)

    this.searchTextDebounceFunc = lodash.debounce((value) => (
      this.setState({ searchTextDebounce: value })
    ), 500)
  }

  state = {
    searchText: '',
    searchTextDebounce: '',
  }

  handleOnSearchTextChange = (event) => {
    const value = event.target.value
    this.setState({ searchText: value })
    this.searchTextDebounceFunc(value)
  }

  renderLibraryCell() {
    const {
      data,
      handleOnSelectLibrary,
    } = this.props
    const {
      searchTextDebounce,
    } = this.state
    return data.map((value) => (
      (value.libraryName.indexOf(searchTextDebounce) !== -1) && <LibraryCell
        key={value.libraryId}
        libraryId={value.libraryId}
        libraryName={value.libraryName}
        cover={value.cover}
        questionNumber={value.questionNumber}
        quizNumber={value.quizNumber}
        coursewareNumber={value.coursewareNumber}
        hasJoin={value.hasJoin}
        handleOnSelectLibrary={handleOnSelectLibrary}
        className={styles.libraryCell}
      />
    ))
  }

  render() {
    const {
      open,
      className,
    } = this.props
    const {
      searchText,
    } = this.state
    const dialogClassName = `${styles.dialog} ${className || ''}`

    return (
      <Dialog
        contentClassName={dialogClassName}
        open={open}
      >
        <div className={styles.container}>
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
            <input
              className={styles.searchInput}
              type="text"
              value={searchText}
              placeholder="过滤题库"
              onChange={this.handleOnSearchTextChange}
            />
          </div>
        </div>
      </Dialog>
    )
  }
}

export default SelectLibrary