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

  state = {
    checkedGroupId: null,
    showSelectPanel: false,
  }

  handleOnClickGroupButton = (value) => () => {
    this.setState({
      checkedGroupId: value,
      showSelectPanel: true,
    })
  }

  handleOnClickOnlyShowOneGroup = () => {
    console.log('你点击了只显示本组发言按钮')  // eslint-disable-line
  }

  handleOnClickCloseSelectPanel = () => {
    console.log('你点击了关闭小组选择面板按钮')  // eslint-disable-line
    this.setState({ showSelectPanel: false })
  }

  handleOnClickAvatar = (value) => () => {
    console.log('你点击了 ID 为' + value + '的学生头像')  // eslint-disable-line
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
      checkedGroupId,
      showSelectPanel,
    } = this.state
    const checkedGroup = groupList.find((value) => value.id === checkedGroupId) || {}
    const checkedGroupStudentList = studentGroupList[checkedGroupId] || []

    return (
      <div className={styles.container} style={style}>
        <div className={styles.leftArea}>
          <FontIcon className="fa fa-child" />
          <span>{attendeeCount}</span>
          <i className={styles.chat} />
          <span>{messageCount}</span>
        </div>
        <div className={styles.centerArea}>
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
              <span>{` ${checkedGroup.name} (${lodash.get(checkedGroup, 'studentIds.length')}人)`}</span>
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
          type={'student'}
          name={'YSK'}
          avatar={'https://www.teachermate.com.cn/legacy/assets/images/cover/cover_003.jpg'}
          messagesCount={34}
          handleOnClickCancel={() => { console.log('测试1') }}
        />
      </div>
    )
  }
}
