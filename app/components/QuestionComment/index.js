import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import defaultAvatar from 'images/yeoman.png'
import styles from './index.scss'

require('moment/locale/zh-cn')

class QuestionComment extends React.PureComponent {
  static propTypes = {
    comments: PropTypes.array,
    data: PropTypes.object,
  }

  constructor(props) {
    super(props)

    moment().locale('zh-cn')
  }

  state = {
    shouldShowLikeAndOther: false,
  }

  handleOnFocusCreateTime = () => {
    console.log(321)
    this.setState({ shouldShowLikeAndOther: true })
  }

  handleOnBlurCreateTime = () => {
    console.log(123)
    this.setState({ shouldShowLikeAndOther: false })
  }

  renderCommentList() {
    const {
      comments,
    } = this.props
    const {
      shouldShowLikeAndOther,
    } = this.state
    return comments.map((value) => (
      <li key={value.id}>
        <div className={styles.avatar} style={{ backgroundImage: `url(${value.avatar || defaultAvatar})` }} />
        <div className={styles.content}>
          <div className={styles.topTitle}>
            <div>
              <span>{value.name}</span>
              {value.like && <i />}
              {value.like && <span>{value.like}</span>}
            </div>
            {!shouldShowLikeAndOther && <span
              onMouseOver={this.handleOnFocusCreateTime}
            >
              {moment(Date.now()).fromNow()}
            </span>}
            {shouldShowLikeAndOther && <div>
              <div onMouseOut={this.handleOnBlurCreateTime} />
              <button><i /></button>
              <button><i /></button>
            </div>}
          </div>
          <div className={styles.bottomTitle}>
            {value.comment}
          </div>
        </div>
      </li>
    ))
  }

  render() {
    return (
      <div className={styles.container}>
        <div className={styles.thinkingTitle}>
          {'出题思路'}
        </div>
        <div className={styles.thinkingInput}>
          <input type="text" placeholder="描述出题思路更易于其他老师理解您这道题的用法" />
        </div>
        <ul className={styles.commentList}>
          {this.renderCommentList()}
        </ul>
      </div>
    )
  }
}

export default QuestionComment
