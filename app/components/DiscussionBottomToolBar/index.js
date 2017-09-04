/**
 *
 * DiscussionBottomToolBar
 *
 */

import React from 'react'
import PropTypes from 'prop-types'
import RaisedButton from 'material-ui/RaisedButton'
import FontIcon from 'material-ui/FontIcon'
import styles from './styles'

export default class DiscussionBottomToolBar extends React.PureComponent {
  static propTypes = {
    attendeeCount: PropTypes.number,
    messageCount: PropTypes.number,
    groupList: PropTypes.array,
  }

  static defaultProps = {
    attendeeCount: 0,
    messageCount: 0,
    groupList: [],
  }

  state = {
    checkedGroupId: null,
  }

  handleOnClickGroupButton = (value) => () => {
    this.setState({ checkedGroupId: value })
  }

  handleOnClickSettingButton = () => {
    console.log('你点击了设置按钮')  // eslint-disable-line
  }

  handleOnClickExportButton = () => {
    console.log('你点击了导出按钮')  // eslint-disable-line
  }

  render() {
    const {
      attendeeCount,
      messageCount,
      groupList,
    } = this.props
    const {
      checkedGroupId,
    } = this.state

    return (
      <div className={styles.container}>
        <div className={styles.leftArea}>
          <FontIcon className="fa fa-child" />
          <span>{attendeeCount}</span>
          <i className={styles.chat} />
          <span>{messageCount}</span>
        </div>
        <div className={styles.centerArea}>
          {groupList.map((value) => (
            <div
              className={styles.groupButtonContainer}
              style={checkedGroupId === value.id ? { backgroundColor: 'rgba(255, 36, 22, 0.1)' } : null}
            >
              <RaisedButton
                key={value.id}
                label={''}
                className={styles.groupButton}
                backgroundColor={value.color}
                buttonStyle={{ height: '24px', lineHeight: '24px' }}
                onClick={this.handleOnClickGroupButton(value.id)}
              />
            </div>
          ))}
        </div>
        <div className={styles.rightArea}>
          <div className={styles.setting}>
            <RaisedButton
              label={''}
              className={styles.settingButton}
              backgroundColor={'transparent'}
              buttonStyle={{ height: '100%', lineHeight: '0' }}
              overlayStyle={{ fontSize: '0', lineHeight: '1' }}
              onClick={this.handleOnClickSettingButton}
            >
              <FontIcon className="fa fa-sliders" />
              <span>{'配置'}</span>
            </RaisedButton>
          </div>
          <div className={styles.export}>
            <RaisedButton
              label={''}
              className={styles.exportButton}
              backgroundColor={'transparent'}
              buttonStyle={{ height: '100%', lineHeight: '0' }}
              overlayStyle={{ fontSize: '0', lineHeight: '1' }}
              onClick={this.handleOnClickExportButton}
            >
              <FontIcon className="fa fa-external-link" />
              <span>{'导出'}</span>
            </RaisedButton>
          </div>
        </div>
      </div>
    )
  }
}
