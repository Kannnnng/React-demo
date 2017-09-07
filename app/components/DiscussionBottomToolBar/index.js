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
import StudentDiscussionAvatar from './StudentDiscussionAvatar'
import DiscussionBottomToolBarTips from './DiscussionBottomToolBarTips'
import styles from './styles'

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
    style: PropTypes.object,
  }

  static defaultProps = {
    attendeeCount: 0,
    messageCount: 0,
    groupList: [
      {
        id: 0,
        name: '',
        color: 'red',
        studentInfo: [
          {
            studentId: 0,
            messagesCount: 0,
          },
        ],
      },
    ],
    studentGroupList: {
      0: [
        {
          id: 0,
          name: '',
          avatar: '',
          messagesCount: 0,
        },
      ],
    },
    handleOnClickSettingButton: () => {},
    handleOnClickExportButton: () => {},
    style: {},
  }

  constructor(props) {
    super(props)

    this.shouldRerender = false
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
    window.setTimeout(() => {
      if (this.centerArea.scrollWidth > this.centerArea.clientWidth) {
        this.setState({ centerAreaStyle: { justifyContent: 'flex-start' } })  // eslint-disable-line
      }
    }, 10)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.groupList.length !== this.props.groupList.length) {
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
  }

  handleOnClickCancel = () => {
    this.setState({
      checkedStudentId: null,
      onlyShowOneGroupId: null,
      showBottomToolBarTips: false,
    })
  }

  handleOnWheel = (event) => {
    this.centerArea.scrollLeft += event.deltaY
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
    const checkedGroup = groupList.find((value) => value.id === checkedGroupId) || {}
    const checkedGroupStudentList = studentGroupList[checkedGroupId] || []
    const bottomToolBarTipsType = (checkedStudentId && 'student') || (checkedGroupId && 'group') || undefined

    let bottomToolBarTipsInfo = {}

    if (checkedStudentId) {
      lodash.find(studentGroupList, (value) => {
        bottomToolBarTipsInfo = value.find((item) => item.id === checkedStudentId)
        return bottomToolBarTipsInfo !== undefined
      })
    } else if (onlyShowOneGroupId) {
      bottomToolBarTipsInfo = groupList.find((value) => onlyShowOneGroupId === value.id)
      bottomToolBarTipsInfo.messagesCount = bottomToolBarTipsInfo.studentInfo.reduce((result, value) => result + value.messagesCount, 0)  // eslint-disable-line
    }

    return (
      <div className={styles.container} style={style}>
        <div className={styles.leftArea}>
          <FontIcon className="fa fa-child" />
          <span>{attendeeCount}</span>
          <i className={styles.chat} />
          <span>{messageCount}</span>
        </div>
        <div
          className={styles.centerArea}
          ref={(node) => { this.centerArea = node }}
          style={centerAreaStyle}
          onWheel={this.handleOnWheel}
        >
          {groupList.map((value) => (
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
          ))}
        </div>
        <div className={styles.rightArea}>
          <div className={styles.setting}>
            <RaisedButton
              label={'label'}
              labelStyle={{ display: 'none' }}
              className={styles.settingButton}
              backgroundColor={'transparent'}
              buttonStyle={{ height: '100%', lineHeight: '0' }}
              overlayStyle={{ fontSize: '0', lineHeight: '1' }}
              onClick={this.props.handleOnClickSettingButton}
            >
              <FontIcon className="fa fa-sliders" />
              <span>{'配置'}</span>
            </RaisedButton>
          </div>
          <div className={styles.export}>
            <RaisedButton
              label={'label'}
              labelStyle={{ display: 'none' }}
              className={styles.exportButton}
              backgroundColor={'transparent'}
              buttonStyle={{ height: '100%', lineHeight: '0' }}
              overlayStyle={{ fontSize: '0', lineHeight: '1' }}
              onClick={this.props.handleOnClickExportButton}
            >
              <FontIcon className="fa fa-external-link" />
              <span>{'导出'}</span>
            </RaisedButton>
          </div>
        </div>
        <div className={styles.selectPanel} style={showSelectPanel ? null : { top: '0', height: '0' }}>
          <div className={styles.selectPanelHeader}>
            <div className={styles.groupName}>
              <span style={{ backgroundColor: `${checkedGroup.color}` }} />
              <span>{` ${checkedGroup.name} (${lodash.get(checkedGroup, 'studentInfo.length')}人)`}</span>
            </div>
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
                <FontIcon className="fa fa-times" color="#FFF" />
              </IconButton>
            </div>
          </div>
          <div className={styles.selectPanelBody}>
            {checkedGroupStudentList.map((value) => (
              <StudentDiscussionAvatar
                key={value.id}
                id={value.id}
                name={value.name}
                avatar={value.avatar}
                messagesCount={value.messagesCount}
                handleOnClickAvatar={this.handleOnClickAvatar}
              />
            ))}
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
