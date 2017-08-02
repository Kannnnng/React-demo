import React from 'react'
import PropTypes from 'prop-types'
import styles from './index.scss'

class SearchToolBar extends React.PureComponent {
  static propTypes = {
    button: PropTypes.element,
    handleOnShowState: PropTypes.func,
    handleOnSearchContentChange: PropTypes.func,
    className: PropTypes.string,
  }

  static defaultProps = {
    handleOnShowState: () => {},
    handleOnSearchContentChange: () => {},
    className: '',
  }

  state = {
    show: null,
    searchContent: '',
  }

  handleOnShowState = () => {
    const {
      show,
    } = this.state
    this.setState({ show: !show })
    this.props.handleOnShowState(show ? 'close' : 'open')
  }

  handleOnSearchContentChange = (event) => {
    this.setState({ searchContent: event.target.value })
    this.props.handleOnSearchContentChange(event.target.value)
  }

  handleOnKeyDown = (event) => {
    if (event.keyCode === 13) {
      this.handleOnClickSearch()
    }
  }

  handleOnClickSearch = () => {
    this.props.handleOnSearchContentChange(true)
  }

  render() {
    const {
      button,
      className,
    } = this.props
    const {
      show,
      searchContent,
    } = this.state
    const containerClassName = (
      (show === null && `${className} ${styles.container}`) ||
      (show === true && `${className} ${styles.container} ${styles.expandSearchToolBar}`) ||
      (show === false && `${className} ${styles.container} ${styles.shrinkSearchToolBar}`) || ''
    )
    const contentClassName = show ? `${styles.content} ${styles.contentZIndex}` : `${styles.content}`
    const iClassName = (
      (show === true && `${styles.iAnimation}`) ||
      (show === false && `${styles.iAntiAnimation}`) || ''
    )

    return (
      <div className={containerClassName}>
        <div className={contentClassName}>
          <i className={iClassName}><button onClick={this.handleOnClickSearch} /></i>
          {show && <div className={styles.inputWrap}>
            <input
              type="text"
              value={searchContent}
              autoFocus
              placeholder="请输入想要检索的内容"
              onChange={this.handleOnSearchContentChange}
              onKeyDown={this.handleOnKeyDown}
            />
          </div>}
        </div>
        <button className={styles.showStateButton} onClick={this.handleOnShowState} />
        {show && button && <div className={styles.rightButton}>{button}</div>}
      </div>
    )
  }
}

export default SearchToolBar
