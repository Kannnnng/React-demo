/**
 *
 * Name: Pagination
 * Date: 2017-11-05 10:32:22
 * Description: 分页组件
 * Author: Einskang
 * Organization: HUST
 *
 */

import React from 'react'
import PropTypes from 'prop-types'
import FlatButton from 'material-ui/FlatButton'
import IconButton from 'material-ui/IconButton'
import GoLeftSvg from 'material-ui/svg-icons/navigation/chevron-left'
import GoRightSvg from 'material-ui/svg-icons/navigation/chevron-right'
import styles from './styles'

export default class Pagination extends React.PureComponent {
  static propTypes = {
    total: PropTypes.number.isRequired,
    handleOnChange: PropTypes.func.isRequired,
  }

  state = {
    currentNumber: 1,
  }

  handleOnClick = (number) => () => {
    this.setState({ currentNumber: number })
    this.props.handleOnChange(number)
  }

  handleOnGoNext = () => {
    this.setState({ currentNumber: this.state.currentNumber + 1 })
    this.props.handleOnChange(this.state.currentNumber + 1)
  }

  handleOnGoPrev = () => {
    this.setState({ currentNumber: this.state.currentNumber - 1 })
    this.props.handleOnChange(this.state.currentNumber - 1)
  }

  handleOnGoPage = () => {
    const value = Number(this.inputElement.value)
    if (value > 0 && value <= this.props.total ) {
      this.setState({ currentNumber: value })
      this.props.handleOnChange(value)
    }
  }

  render() {
    const {
      total,
    } = this.props
    const {
      currentNumber,
    } = this.state
    const begin = total < 5 ? 1 : (
      /* 当前页面是第一页、第二页、第三页时 */
      ((currentNumber < 4) && 1) ||
      /* 当前页面是倒数第一页、第二页时 */
      ((currentNumber > total - 2) && total - 4) ||
      /* 当前页面处于中间页面时 */
      (currentNumber - 2)
    )
    const pageButtons = Array.from({
      length: total < 5 ? total : 5,
    }, (value, index) => {
      const number = begin + index
      return {
        number,
        isCurrent: number === currentNumber,
      }
    })

    return (
      <div className={styles.container}>
        <IconButton
          className={styles.pageButton}
          disabled={currentNumber <= 1}
          onClick={this.handleOnGoPrev}
        >
          <GoLeftSvg />
        </IconButton>
        {pageButtons.map((value) => (
          <FlatButton
            key={value.number}
            className={styles.pageButton}
            label={value.number}
            labelStyle={{ padding: '0' }}
            onClick={this.handleOnClick(value.number)}
            primary={value.isCurrent}
            style={{ border: value.isCurrent ? 'none' : 'solid 1px #E1E2E3' }}
          />
        ))}
        <IconButton
          className={styles.pageButton}
          disabled={currentNumber >= total}
          onClick={this.handleOnGoNext}
        >
          <GoRightSvg />
        </IconButton>
        <div className={styles.inputPage}>
          <div>{`共${total}页，跳转:`}</div>
          <div><input type='text' ref={(node) => (this.inputElement = node)} /></div>
          <FlatButton
            className={styles.pageButton}
            label={'Go'}
            labelStyle={{ padding: '0' }}
            onClick={this.handleOnGoPage}
          />
        </div>
      </div>
    )
  }
}
