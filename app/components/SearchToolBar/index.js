import React from 'react'
import PropTypes from 'prop-types'
import styles from './index.scss'

class SearchToolBar extends React.PureComponent {
  static propTypes = {
    button: PropTypes.element,
    handleOnShowState: PropTypes.func,
    handleOnSearchContentChange: PropTypes.func,
  }

  static defaultProps = {
    handleOnShowState: () => {},
    handleOnSearchContentChange: () => {},
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
    this.setState({ show: false })
    this.props.handleOnSearchContentChange(true)
  }

  render() {
    const {
      button,
    } = this.props
    const {
      show,
      searchContent,
    } = this.state
    const containerClassName = (
      (show === null && `${styles.container}`) ||
      (show === true && `${styles.container} ${styles.expandSearchToolBar}`) ||
      (show === false && `${styles.container} ${styles.shrinkSearchToolBar}`)
    )
    const contentStyle = show ? {
      zIndex: 100,
    } : {}
    const iClassName = (
      (show === true && `${styles.iAnimation}`) ||
      (show === false && `${styles.iAntiAnimation}`)
    )

    return (
      <div className={containerClassName}>
        <div className={styles.content} style={contentStyle}>
          <i className={iClassName}><button onClick={this.handleOnClickSearch} /></i>
          {show && <input
            type="text"
            value={searchContent}
            placeholder="请输入想要检索的内容"
            onChange={this.handleOnSearchContentChange}
            onKeyDown={this.handleOnKeyDown}
          />}
        </div>
        <button className={styles.showStateButton} onClick={this.handleOnShowState} />
        {show && button && <div className={styles.rightButton}>{button}</div>}
      </div>
    )
  }
}

export default SearchToolBar
