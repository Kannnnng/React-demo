/**
 *
 * DiscussionBottomToolBar
 *
 */

import React from 'react'
import PropTypes from 'prop-types'
import lodash from 'lodash'
import RaisedButton from 'material-ui/RaisedButton'
import IconButton from 'material-ui/IconButton'
import FontIcon from 'material-ui/FontIcon'
import { cosCurve } from 'utils/constants'
import DiscussionBottomToolBarTips from './DiscussionBottomToolBarTips'
import StudentDiscussionAvatar from './StudentDiscussionAvatar'
import styles from './styles.scss'

function smoothScrolling(
  _context,
  target,
  delta,
  timer,
  count,
  deltaSum,
) {
  const context = _context
  if (delta > 0) {
    /* 在正向滑动的时候，Chrome 浏览器 DOM 元素属性 scrollLeft 与很小的正数相加的时候没反应 */
    /* 只好手动将正常滑动的滑动数值在原来的基础之上增加 100 */
    context[deltaSum] = context[deltaSum] > 0 ?
      (context[deltaSum] + delta + 100) :
      (delta + 100)
  } else {
    context[deltaSum] = context[deltaSum] > 0 ?
      (delta) :
      (context[deltaSum] + delta)
  }
  window.cancelAnimationFrame(context[timer])
  context[count] = 0
  context[deltaSum] = (
    (context[deltaSum] > 1000 && 1000) ||
    (context[deltaSum] < -1000 && -1000) ||
    (context[deltaSum])
  )
  context[timer] = window.requestAnimationFrame(function fn() {
    if (context[count] > 99) {
      window.cancelAnimationFrame(context[timer])
      context[count] = 0
      context[deltaSum] = 0
    } else {
      context[target].scrollBy(context[deltaSum] * cosCurve[context[count]], 0)
      context[count] += 1
      context[timer] = window.requestAnimationFrame(fn)
    }
  })
}

export default class DiscussionBottomToolBar extends React.PureComponent {

  static propTypes = {
    attendeeCount: PropTypes.number,
    messageCount: PropTypes.number,
    groupList: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        name: PropTypes.string,
        color: PropTypes.string,
        studentInfo: PropTypes.arrayOf(
          PropTypes.shape({
            studentId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
            messageCount: PropTypes.number,
          }),
        ),
      }),
    ),
    studentGroupList: PropTypes.objectOf(
      PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
          name: PropTypes.string,
          avatar: PropTypes.string,
          messagesCount: PropTypes.number,  // 该学生所发送的讨论总数
        }),
      ),
    ),  // 按照小组分好了的学生列表信息
    handleOnClickSettingButton: PropTypes.func,
    handleOnClickExportButton: PropTypes.func,
    handleOnOnlyShowOneStudentOrGroup: PropTypes.func,
    style: PropTypes.object,
  }

  static defaultProps = {
    attendeeCount: 0,
    messageCount: 0,
    groupList: [],
    // groupList: [
    //   {
    //     id: 0,
    //     name: '',
    //     color: 'red',
    //     studentInfo: [
    //       {
    //         studentId: 0,
    //         messagesCount: 0,
    //       },
    //     ],
    //   },
    // ],
    studentGroupList: {},
    // studentGroupList: {
    //   0: [
    //     {
    //       id: 0,
    //       name: '',
    //       avatar: '',
    //       messagesCount: 0,
    //     },
    //   ],
    // },
    handleOnClickSettingButton: () => {},
    handleOnClickExportButton: () => {},
    handleOnOnlyShowOneStudentOrGroup: () => {},
    style: {},
  }

  constructor(props) {
    super(props)

    this.shouldRerender = false
    this.wheelCenterAreaTimer = null
    this.wheelCenterAreaCount = 0
    this.wheelCenterAreaDeltaSum = 0
    this.wheelSelectPanelBodyTimer = null
    this.wheelSelectPanelBodyCount = 0
    this.wheelSelectPanelBodyDeltaSum = 0
  }

  state = {
    centerAreaStyle: null,
    checkedGroupId: null,
    checkedStudentId: null,
    onlyShowOneGroupId: null,
    showSelectPanel: false,
    showBottomToolBarTips: false,
  }

  componentDidMount() {
    if (this.centerArea.scrollWidth > this.centerArea.clientWidth) {
      window.setTimeout(() => {
        this.setState({ centerAreaStyle: { justifyContent: 'flex-start' } })  // eslint-disable-line
      }, 10)
    }
  }

  componentWillReceiveProps(nextProps) {
    if (lodash.get(nextProps, 'groupList.length') !== lodash.get(this.props, 'groupList.length')) {
      this.shouldRerender = true
    }
  }

  componentDidUpdate() {
    if (this.shouldRerender) {
      this.shouldRerender = false
      window.setTimeout(() => {
        if (this.centerArea.scrollWidth > this.centerArea.clientWidth) {
          this.setState({ centerAreaStyle: { justifyContent: 'flex-start' } })  // eslint-disable-line
        } else {
          this.setState({ centerAreaStyle: null })  // eslint-disable-line
        }
      }, 10)
    }
  }

  handleOnClickGroupButton = (value) => () => {
    this.setState({
      checkedGroupId: value,
      showSelectPanel: true,
      showBottomToolBarTips: false,
    })
  }

  handleOnClickOnlyShowOneGroup = () => {
    this.setState({
      checkedStudentId: null,
      onlyShowOneGroupId: this.state.checkedGroupId,
      showSelectPanel: false,
      showBottomToolBarTips: true,
    })
    this.props.handleOnOnlyShowOneStudentOrGroup('group', this.state.checkedGroupId)
  }

  handleOnClickCloseSelectPanel = () => {
    if (this.state.onlyShowOneGroupId || this.state.checkedStudentId) {
      this.setState({ showBottomToolBarTips: true })
    }
    this.setState({ showSelectPanel: false })
  }

  handleOnClickAvatar = (value) => () => {
    this.setState({
      checkedStudentId: value,
      showSelectPanel: false,
      showBottomToolBarTips: true,
    })
    this.props.handleOnOnlyShowOneStudentOrGroup('student', value)
  }

  handleOnClickCancel = () => {
    this.setState({
      checkedStudentId: null,
      onlyShowOneGroupId: null,
      showBottomToolBarTips: false,
    })
    this.props.handleOnOnlyShowOneStudentOrGroup(false)
  }

  /* 将默认的上下滚动改为左右滚动 */
  handleOnWheelCenterArea = (event) => {
    smoothScrolling(
      this,
      'centerArea',
      event.deltaY,
      'wheelCenterAreaTimer',
      'wheelCenterAreaCount',
      'wheelCenterAreaDeltaSum',
    )
  }

  /* 将默认的上下滚动改为左右滚动 */
  handleOnWheelSelectPanelBody = (event) => {
    smoothScrolling(
      this,
      'selectPanelBody',
      event.deltaY,
      'wheelSelectPanelBodyTimer',
      'wheelSelectPanelBodyCount',
      'wheelSelectPanelBodyDeltaSum',
    )
  }

  render() {
    const {
      attendeeCount,
      messageCount,
      groupList,
      studentGroupList,
      style,
    } = this.props
    const {
      centerAreaStyle,
      checkedGroupId,
      checkedStudentId,
      onlyShowOneGroupId,
      showSelectPanel,
      showBottomToolBarTips,
    } = this.state

    const groupListIsEmpty = lodash.isEmpty(groupList)
    const checkedGroup = groupListIsEmpty ? null : groupList.find((value) => value.id === checkedGroupId)  // eslint-disable-line
    const checkedGroupStudentList = groupListIsEmpty ? null : studentGroupList[checkedGroupId]
    const bottomToolBarTipsType = (checkedStudentId && 'student') || (checkedGroupId && 'group') || undefined

    let bottomToolBarTipsInfo = {}
    if (checkedStudentId) {
      lodash.find(studentGroupList, (value) => {
        bottomToolBarTipsInfo = value.find((item) => item.id === checkedStudentId)
        return bottomToolBarTipsInfo !== undefined
      })
    } else if (onlyShowOneGroupId) {
      bottomToolBarTipsInfo = groupList.find((value) => onlyShowOneGroupId === value.id)
    }

    return (
      <div className={styles.container} style={style}>
        <div className={styles.leftArea}>
          <FontIcon className='fa fa-child' />
          <span>{attendeeCount}</span>
          <i className={styles.chat} />
          <span>{messageCount}</span>
        </div>
        <div
          className={styles.centerArea}
          ref={(node) => { this.centerArea = node }}
          style={centerAreaStyle}
          onWheel={this.handleOnWheelCenterArea}
        >
          {lodash.map(groupList, ((value) => (
            <div
              key={value.id}
              className={styles.groupButtonContainer}
              style={checkedGroupId === value.id ? { backgroundColor: 'rgba(255, 36, 22, 0.1)' } : null}
            >
              <RaisedButton
                label={'label'}
                labelStyle={{ display: 'none' }}
                className={styles.groupButton}
                backgroundColor={value.color}
                buttonStyle={{ height: '24px', lineHeight: '1' }}
                onClick={this.handleOnClickGroupButton(value.id)}
              />
            </div>
          )))}
        </div>
        <div className={styles.rightArea}>
          <div className={styles.setting}>
            <RaisedButton
              label={'label'}
              labelStyle={{ display: 'none' }}
              className={styles.settingButton}
              backgroundColor={'transparent'}
              buttonStyle={{ height: '100%', lineHeight: '0', padding: '0 5px' }}
              overlayStyle={{ fontSize: '0', lineHeight: '1' }}
              onClick={this.props.handleOnClickSettingButton}
            >
              <FontIcon className='fa fa-sliders' />
              <span>{'配置'}</span>
            </RaisedButton>
          </div>
          <div className={styles.export}>
            <RaisedButton
              label={'label'}
              labelStyle={{ display: 'none' }}
              className={styles.exportButton}
              backgroundColor={'transparent'}
              buttonStyle={{ height: '100%', lineHeight: '0', padding: '0 5px' }}
              overlayStyle={{ fontSize: '0', lineHeight: '1' }}
              onClick={this.props.handleOnClickExportButton}
            >
              <FontIcon className='fa fa-external-link' />
              <span>{'导出'}</span>
            </RaisedButton>
          </div>
        </div>
        <div className={styles.selectPanel} style={showSelectPanel ? null : { top: '0', height: '0' }}>
          <div className={styles.selectPanelHeader}>
            {checkedGroup && <div className={styles.groupName}>
              <span style={{ backgroundColor: `${checkedGroup.color}` }} />
              <span>{` ${checkedGroup.name} (${lodash.get(checkedGroup, 'students.length')}人)`}</span>
            </div>}
            <div className={styles.selectPanelTitle}>
              <span />
              <button onClick={this.handleOnClickOnlyShowOneGroup}>{'只看本组发言'}</button>
            </div>
            <div className={styles.closeButton}>
              <IconButton
                onClick={this.handleOnClickCloseSelectPanel}
                tooltip={'关闭面板'}
                tooltipPosition={'bottom-left'}
                style={{ padding: '0', width: '24px', height: '24px' }}
              >
                <FontIcon className='fa fa-times' color='#FFF' />
              </IconButton>
            </div>
          </div>
          <div
            className={styles.selectPanelBody}
            ref={(node) => { this.selectPanelBody = node }}
            onWheel={this.handleOnWheelSelectPanelBody}
          >
            {lodash.map(checkedGroupStudentList, ((value) => (
              <StudentDiscussionAvatar
                key={value.id}
                id={value.id}
                name={value.name}
                avatar={value.avatar}
                messagesCount={value.messagesCount}
                handleOnClickAvatar={this.handleOnClickAvatar}
              />
            )))}
          </div>
        </div>
        <DiscussionBottomToolBarTips
          type={bottomToolBarTipsType}
          name={bottomToolBarTipsInfo.name}
          avatar={bottomToolBarTipsInfo.avatar || bottomToolBarTipsInfo.color}
          messagesCount={bottomToolBarTipsInfo.messagesCount}
          handleOnClickCancel={this.handleOnClickCancel}
          style={showBottomToolBarTips ? null : { top: '-45px' }}
        />
      </div>
    )
  }
}
