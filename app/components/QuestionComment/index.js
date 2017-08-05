import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import defaultAvatar from 'images/yeoman.png'
import styles from './styles.scss'

require('moment/locale/zh-cn')

class QuestionComment extends React.PureComponent {
  static propTypes = {
    title: PropTypes.element,  // 评论部分最顶上的标题元素
    comments: PropTypes.array,  // 评论信息列表
    data: PropTypes.object,  // 当前登录教师信息
    thinking: PropTypes.string,  // 出题思路
  }

  static defaultProps = {
    comments: [],
    data: {},
    thinking: '',
  }

  constructor(props) {
    super(props)

    moment().locale('zh-cn')
  }

  state = {
    thinking: '',
    image: undefined,
    comment: '',
  }

  handleOnClickLike = (value) => () => {
    /* value 为评论被点赞的教师的 ID */
  }

  handleOnClickEllipses = () => {
    /* 点击右上角垂直的三个点所要执行的操作 */
  }

  handleOnClickAddLink = () => {
    /* 点击添加链接所要执行的操作 */
  }

  handleOnAddImages = (event) => {
    const file = event.target.files[0]
    this.setState({ image: file })
    // const reader = new FileReader()  // eslint-disable-line
    // reader.readAsDataURL(file)
    // reader.onload = (_event) => {
    //   console.log(_event.target.result, 123)
    // }
  }

  handleOnInputThinking = (event) => {
    this.setState({ thinking: event.target.value })
  }

  handleOnClickSave = () => {
    /* 点击发送按钮所要执行的操作 */
  }

  handleOnAddComment = (event) => {
    this.setState({ comment: event.target.value })
  }

  renderCommentList() {
    const {
      comments,
    } = this.props
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
            <span>
              {moment(value.createTime).fromNow()}
            </span>
            <div>
              <button onClick={this.handleOnClickLike(value.id)}><i /></button>
              <button onClick={this.handleOnClickEllipses}><i /></button>
            </div>
          </div>
          <div className={styles.bottomTitle}>
            {value.comment}
          </div>
        </div>
      </li>
    ))
  }

  renderCommentInput() {
    const {
      data,
    } = this.props
    const {
      comment,
    } = this.state
    const contentClass = `${styles.content} ${styles.addComment}`
    return (
      <li key={data.id} className={styles.commentInputListItem}>
        <div className={styles.avatar} style={{ backgroundImage: `url(${data.avatar || defaultAvatar})` }} />
        <div className={contentClass}>
          <input
            type="text"
            placeholder="添加评论"
            onChange={this.handleOnAddComment}
            value={comment}
          />
        </div>
        <div className={styles.attached}>
          <input
            type="file"
            accept="image/gif,image/jpeg,image/jpg,image/png,image/svg;capture=camera"
            onChange={this.handleOnAddImages}
          />
          <i />
          <button onClick={this.handleOnClickAddLink}><i /></button>
        </div>
        <button className={styles.saveComment} onClick={this.handleOnClickSave}>{'发送'}</button>
      </li>
    )
  }

  render() {
    const {
      title,
      thinking: thinkingFromProps,
    } = this.props
    const {
      thinking: thinkingFromState,
    } = this.state

    return (
      <div className={styles.container}>
        {title && <div className={styles.title}>
          {title}
        </div>}
        <div className={styles.thinkingTitle}>
          {'出题思路'}
        </div>
        {thinkingFromProps ? (
          <div className={styles.thinkingText}>
            {thinkingFromProps}
          </div>
        ) : (
          <div className={styles.thinkingInput}>
            <input
              type="text"
              placeholder="描述出题思路更易于其他老师理解您这道题的用法"
              onChange={this.handleOnInputThinking}
              value={thinkingFromState}
            />
          </div>
        )}
        <ul className={styles.commentList}>
          {this.renderCommentList()}
          {this.renderCommentInput()}
        </ul>
      </div>
    )
  }
}

export default QuestionComment
