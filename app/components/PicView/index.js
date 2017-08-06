/**
*
* PicView
*
*/

import React from 'react'
import PropTypes from 'prop-types'
import { forEach } from 'lodash'
import styles from './styles'

class PicView extends React.Component {
  static propTypes = {
    src: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
    currentIndex: PropTypes.number,
    closePicView: PropTypes.func,
  }

  constructor(props) {
    super(props)
    this.state = {
      currentIndex: this.props.currentIndex || 0,
    }
  }

  componentWillReceiveProps(nextProps) {
    const { currentIndex } = nextProps
    if (currentIndex && currentIndex !== this.props.currentIndex) {
      this.setState({ currentIndex })
    }
  }

  onTouchStart = (e) => {
    const startPoint = e.changedTouches[0].clientX
    this.setState({ startPoint })
  }

  onTouchEnd = (e) => {
    const endPoint = e.changedTouches[0].clientX
    const { currentIndex } = this.state
    const max = this.props.src.length
    if (endPoint - this.state.startPoint < -50) {
      const newIndex = currentIndex + 1 >= max ? currentIndex : currentIndex + 1
      this.setState({ currentIndex: newIndex })
    }
    if (endPoint - this.state.startPoint > 50) {
      const newIndex = currentIndex - 1 < 0 ? 0 : currentIndex - 1
      this.setState({ currentIndex: newIndex })
    }
  }

  setupIcons() {
    const icons = []
    const { currentIndex } = this.state
    for (let i = 0; i < this.props.src.length; i += 1) {
      icons.push(
        <div
          key={i}
          className={styles.icon}
          style={{ opacity: i === currentIndex ? 1 : 0.45 }}
        />,
      )
    }
    return icons
  }

  gallaryRender(src) {
    const images = []
    const { currentIndex } = this.state
    forEach(src, (img, i) => {
      images.push(
        <img
          key={i}
          alt=""
          src={img}
          style={{ left: `${-(currentIndex) + i}00%` }}
          className={styles.scrollImages}
          onTouchStart={this.onTouchStart}
          onTouchEnd={this.onTouchEnd}
        />,
      )
    })
    return (<div className={styles.imageBox}>{images}</div>)
  }

  render() {
    return (
      <div className={styles.picView}>
        <button className={styles.closeBtn} onClick={this.props.closePicView} />
        {this.gallaryRender(this.props.src)}
        <div className={styles.iconsBox}>{this.setupIcons()}</div>
      </div>
    )
  }
}

export default PicView
