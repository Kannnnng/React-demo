/**
 *
 * Example
 *
 */

import React from 'react'
import PropTypes from 'prop-types'
import FlatButton from 'material-ui/FlatButton'
// import { normalize, schema } from 'normalizr'
import CountDown from 'components/CountDown'
import DiscussionBottomToolBar from 'components/DiscussionBottomToolBar'
import DiscussionHeader from 'components/DiscussionHeader'
// import DiscussionPicPreview from 'components/DiscussionPicModeElement/DiscussionPicPreview'
import StudentManagement from 'components/StudentManagement'
import MockData from './mock'
import styles from './styles'

// const studentGroupList = new schema.Array(new schema.Entity('studentGroupList'))

export default class Example extends React.Component {
  static propTypes = {

  }

  static defaultProps = {

  }

  state = {
    countDownStart: true,
  }

  handleOnClickCountDownStartButton = () => {
    this.setState({ countDownStart: !this.state.countDownStart })
  }

  render() {
    const {

    } = this.props
    const {
      countDownStart,
    } = this.state

    return (
      <div className={styles.container}>
        <div>
          <DiscussionHeader
            title={MockData.DiscussionHeader.title}
            checkedTab={MockData.DiscussionHeader.checkedTab}
            isDiscussionOpening={MockData.DiscussionHeader.isDiscussionOpening}
            handleOnToggleDiscussion={(event, status) => (console.log(`现在的讨论状态是${status ? '开启' : '关闭'}`))}
            handleOnGoBack={() => (console.log('你点击了返回按钮'))}
          />
        </div>
        <div className={styles.countDownComponent}>
          <CountDown
            title={'倒计时组件'}
            button={<FlatButton
              label={countDownStart ? '暂停' : '开始'}
              primary
              onClick={this.handleOnClickCountDownStartButton}
            />}
            start={countDownStart}
            limit={3000}
          />
        </div>
        <div style={{ marginTop: '20px' }}>
          <StudentManagement
            groupList={MockData.StudentManagement.groupList}
          />
        </div>
        <div style={{ marginTop: '180px' }}>
          <DiscussionBottomToolBar
            attendeeCount={MockData.DiscussionBottomToolBar.attendeeCount}
            messageCount={MockData.DiscussionBottomToolBar.messageCount}
            groupList={MockData.DiscussionBottomToolBar.groupList}
            studentGroupList={MockData.DiscussionBottomToolBar.studentGroupList}
            handleOnClickSettingButton={() => (console.log('你点击了设置按钮'))}
            handleOnClickExportButton={() => (console.log('你点击了导出按钮'))}
            handleOnOnlyShowOneStudentOrGroup={(type, id) => (
              console.log(`你点击了一个${type === 'student' ? '学生' : '小组'}，ID 为 ${id}`)
            )}
          />
        </div>
      </div>
    )
  }
}
