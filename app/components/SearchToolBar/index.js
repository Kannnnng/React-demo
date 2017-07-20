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
  }

  state = {
    show: false,
  }

  handleOnShowState = () => {
    const {
      show,
    } = this.state
    this.setState({ show: !show })
    this.props.handleOnShowState(show ? 'open' : 'close')
  }

  render() {
    const {
      button,
      handleOnShowState,
      handleOnSearchContentChange,
    } = this.props
    const {
      show,
    } = this.state
    const containerStyle = show ? {
      width: 'calc(100% - 240px)',
      right: '0',
      bottom: '0',
      borderRadius: '4px',
      boxShadow: '0 8px 8px 0 rgba(0, 0, 0, 0.24), 0 0 8px 0 rgba(0, 0, 0, 0.12)',
    } : {}
    const contentStyle = show ? {
      justifyContent: 'flex-start',
      zIndex: '100',
    } : {}
    const iStyle = show ? {
      marginLeft: '24px',
    } : {}
    const buttonStyle = show ? {
      zIndex: '0',
    } : {}


    return (
      <div
        className={styles.container}
        style={containerStyle}
      >
        <div
          className={styles.content}
          style={contentStyle}
        >
          <i style={iStyle} />
          {show && <input type="text" placeholder="请输入想要检索的内容" />}
        </div>
        <button
          onClick={this.handleOnShowState}
          style={buttonStyle}
        />
      </div>
    )
  }
}

export default SearchToolBar
