/**
 *
 * Example
 *
 */

import React from 'react'
import PropTypes from 'prop-types'
import FlatButton from 'material-ui/FlatButton'
import FontIcon from 'material-ui/FontIcon'
import IconButton from 'material-ui/IconButton'
// import { normalize, schema } from 'normalizr'
import BlackCover from 'components/QuestionPreviewBoard/BlackCover'
import CountDown from 'components/CountDown'
import DiscussionBottomToolBar from 'components/DiscussionBottomToolBar'
import DiscussionHeader from 'components/DiscussionHeader'
import DiscussionPicPreview from 'components/DiscussionPicModeElement/DiscussionPicPreview'
import DiscussionPicModeElement from 'components/DiscussionPicModeElement'
import {
  GoBack,
  GoLeft,
  GoRight,
} from 'components/QuestionPreviewBoard/Mess'
import RoundProgressBar from 'components/RoundProgressBar'
import QuestionPreviewBoard from 'components/QuestionPreviewBoard'
import SelectLibrary from 'components/SelectLibrary'
import SearchToolBar from 'components/SearchToolBar'
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
    showSelectLibrary: false,
  }

  handleOnClickCountDownStartButton = () => {
    this.setState({ countDownStart: !this.state.countDownStart })
  }

  handleOnShowSelectLibrary = () => {
    this.setState({ showSelectLibrary: true })
  }

  handleOnCloseSelectLibrary = () => {
    this.setState({ showSelectLibrary: false })
  }

  render() {
    const {

    } = this.props
    const {
      countDownStart,
      showSelectLibrary,
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
            title={MockData.CountDown.title}
            button={<FlatButton
              label={countDownStart ? '暂停' : '开始'}
              primary
              onClick={this.handleOnClickCountDownStartButton}
            />}
            start={countDownStart}
            limit={MockData.CountDown.limit}
          />
          <DiscussionPicModeElement
            avatar={MockData.DiscussionPicModeElement.avatar}
            name={MockData.DiscussionPicModeElement.name}
            picture={MockData.DiscussionPicModeElement.picture}
            handleOnClick={() => { console.log('你点击了一张图片消息') }}
          />
          <RoundProgressBar
            display={MockData.RoundProgressBar.display}
            percent={MockData.RoundProgressBar.percent}
            color={MockData.RoundProgressBar.color}
            width={MockData.RoundProgressBar.width}
          />
          <IconButton
            onClick={this.handleOnShowSelectLibrary}
            tooltip={'打开题库选择器'}
            style={{ backgroundColor: 'red', borderRadius: '5px' }}
          >
            <FontIcon
              className={'fa fa-folder-open-o'}
              color={'#FFF'}
            />
          </IconButton>
        </div>
        <div style={{ marginTop: '20px' }}>
          <StudentManagement
            groupList={MockData.StudentManagement.groupList}
          />
        </div>
        <div className={styles.blackCoverComponent}>
          <BlackCover
            topLeftButton={<GoBack
              handleOnClick={() => { console.log('你点击了返回按钮') }}
            />}
            middleLeftButton={<GoLeft
              handleOnClick={() => { console.log('你点击了前进按钮') }}
            />}
            middleRightButton={<GoRight
              handleOnClick={() => { console.log('你点击了后退') }}
            />}
          >
            <DiscussionPicPreview
              avatar={MockData.DiscussionPicPreview.avatar}
              content={MockData.DiscussionPicPreview.content}
              date={MockData.DiscussionPicPreview.date}
              id={MockData.DiscussionPicPreview.id}
              isAgree={MockData.DiscussionPicPreview.isAgree}
              name={MockData.DiscussionPicPreview.name}
              pictures={MockData.DiscussionPicPreview.pictures}
            />
          </BlackCover>
        </div>
        <div style={{ marginTop: '20px' }}>
          <SelectLibrary
            open={showSelectLibrary}
            data={MockData.SelectLibrary.data}
            handleOnClickClose={this.handleOnCloseSelectLibrary}
            handleOnSelectLibrary={(id) => () => (console.log(`你选择了 ID 为 ${id} 的题库`))}
          />
        </div>
        {/* <div>
          <QuestionPreviewBoard
            open
            data
            comments
            questionContent
            questionAnswer
            answerAnalysis
            handleOnClickGoBack
            handleOnClickPrev
            handleOnClickNext
            handleOnClickEdit
            handleOnClickClone
            handleOnClickCopy
            handleOnClickMove
            handleOnClickDelete
          />
        </div>*/}
        <div style={{ paddingTop: '180px', backgroundColor: '#463333' }}>
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
        <SearchToolBar style={{ zIndex: '1000' }} />
      </div>
    )
  }
}
