import React from 'react'
import styles from './index.scss'

/* 压缩并合并数字板 */
function compressChessBoard(chessBoardLine) {
  const newChessBoardLine = chessBoardLine
  let hasMerged = false
  for (let index = 0, i = 0, len = newChessBoardLine.length; i < len; i++) {
    if (newChessBoardLine[i]) {
      if (i !== index) {
        newChessBoardLine[index] = newChessBoardLine[i]
        newChessBoardLine[i] = null
      }
      if (!hasMerged && newChessBoardLine[index - 1] === newChessBoardLine[index]) {
        newChessBoardLine[index - 1] += newChessBoardLine[index]
        newChessBoardLine[index] = null
        hasMerged = true
      } else {
        index++
      }
    }
  }
  return newChessBoardLine
}

class Game2048 extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      chessBoard: [2, null, 2, null, 2, null, null, null, 2, null, 2, null, 2, null, 2, 4],
    }
  }

  componentDidMount() {
    /* 为页面增加键盘按下事件侦听 */
    document.addEventListener('keydown', this.handleOnKeyDown)  //eslint-disable-line
  }

  componentWillUnmount() {
    /* 为页面移除键盘按下事件侦听 */
    document.removeEventListener('keydown', this.handleOnKeyDown)  //eslint-disable-line
  }

  handleOnClickReset = () => {
    this.setState({ chessBoard: [2, null, 2, null, 2, null, null, null, 2, null, 2, null, 2, null, 2, 4] })  //eslint-disable-line
  }

  handleOnKeyDown = (event) => {
    const chessBoard = this.state.chessBoard
    const newChessBoard = []
    let counter = null
    switch (event.code) {
      case 'ArrowUp':
        counter = 0
        while (counter < 4) {
          [
            newChessBoard[counter],
            newChessBoard[counter + 4],
            newChessBoard[counter + 8],
            newChessBoard[counter + 12],
          ] = compressChessBoard([
            chessBoard[counter],
            chessBoard[counter + 4],
            chessBoard[counter + 8],
            chessBoard[counter + 12],
          ])
          counter++
        }
        break
      case 'ArrowDown':
        counter = 12
        while (counter < 16) {
          [
            newChessBoard[counter],
            newChessBoard[counter - 4],
            newChessBoard[counter - 8],
            newChessBoard[counter - 12],
          ] = compressChessBoard([
            chessBoard[counter],
            chessBoard[counter - 4],
            chessBoard[counter - 8],
            chessBoard[counter - 12],
          ])
          counter++
        }
        break
      case 'ArrowLeft':
        counter = 0
        while (counter < 13) {
          [
            newChessBoard[counter],
            newChessBoard[counter + 1],
            newChessBoard[counter + 2],
            newChessBoard[counter + 3],
          ] = compressChessBoard([
            chessBoard[counter],
            chessBoard[counter + 1],
            chessBoard[counter + 2],
            chessBoard[counter + 3],
          ])
          counter += 4
        }
        break
      case 'ArrowRight':
        counter = 3
        while (counter < 16) {
          [
            newChessBoard[counter],
            newChessBoard[counter - 1],
            newChessBoard[counter - 2],
            newChessBoard[counter - 3],
          ] = compressChessBoard([
            chessBoard[counter],
            chessBoard[counter - 1],
            chessBoard[counter - 2],
            chessBoard[counter - 3],
          ])
          counter += 4
        }
        break
      default:
        break
    }

    /* 当 */
    const nullIndex = newChessBoard.reduce((total, value, index) => {
      if (!value) {
        total.push(index)
      }
      return total
    }, [])
    /* 将数字板上的随机一个空格处替换为数字 2 */
    newChessBoard[nullIndex[Math.round(Math.random() * nullIndex.length)]] = 2

    this.setState({ chessBoard: newChessBoard })
  }

  renderChessBoard() {
    return this.state.chessBoard.map((value, index) => <div className={styles.chessMan} key={index}><div className={styles.chessManText}>{value || ''}</div></div>)
  }

  render() {
    return (
      <div className={styles.container}>
        <button onClick={this.handleOnClickReset}>复原</button>
        <div className={styles.box}>
          {this.renderChessBoard()}
        </div>
      </div>
    )
  }
}

export default Game2048
