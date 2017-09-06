import React from 'react'
import PropTypes from 'prop-types'
import AppBar from 'material-ui/AppBar'
import Drawer from 'material-ui/Drawer'
import List from 'material-ui/List/List'
import ListItem from 'material-ui/List/ListItem'
import Snackbar from 'material-ui/Snackbar/Snackbar'
// import StudentCardContainer from 'components/StudentCardContainer'
// import QuestionPreviewBoard from 'components/QuestionPreviewBoard'
// import StudentInfomation from 'components/StudentInfomation'
// import StudentManagementSidebar from 'components/StudentManagementSidebar'
// import StudentManagement from 'components/StudentManagement'
// import Loading from 'components/Loading'
// import Draggable from 'components/Draggable'
// import DiscusstionHeader from 'components/DiscusstionHeader'
import DiscussionBottomToolBar from 'components/DiscussionBottomToolBar'
// import {
  // studentList,
  // groupList,
  // questionContent,
  // questionAnswer,
  // answerAnalysis,
// } from './mock'
import styles from './styles'

class Home extends React.Component {

  static propTypes = {
    history: PropTypes.object,
  }

  state = {
    openCatalog: false,
    openSnackbar: false,
    snackbarMessage: '',
    /* 下面是仅供测试用的 state */
    /* 上面是仅供测试用的 state */
  }

  handleOnClickCatalog = () => {
    this.setState({ openCatalog: !this.state.openCatalog })
  }

  handleOnClickCatalogLeftIcon = () => {
    this.setState({
      openSnackbar: true,
      snackbarMessage: '直接选下面的就可以啦',
    })
  }

  handleOnClickCatalogList = (data) => () => {
    this.props.history.push(data)
  }

  handleOnCloseSnackbar = () => {
    this.setState({
      openSnackbar: false,
      snackbarMessage: '',
    })
  }

  render() {
    const {
      openCatalog,
      openSnackbar,
      snackbarMessage,
    } = this.state

    return (
      <div className={styles.container}>
        {/* <Loading
          progress={100}
        /> */}
        {/* <StudentManagement
          groupList={groupList}
        /> */}
        <div className={styles.centerBox}>
          <div className={styles.avatar} />
          <div
            className={styles.title}
          >
            <span
              className={styles.titleText}
              onTouchTap={this.handleOnClickCatalog}
            >
              Einskang
            </span>
          </div>
          <div className={styles.titleUnderLine} />
          <div className={styles.introduction}>
            这里是我的个人博客
          </div>
        </div>
        <Drawer
          containerClassName={styles.catalog}
          open={openCatalog}
          openSecondary
        >
          <AppBar
            title="目录"
            onLeftIconButtonTouchTap={this.handleOnClickCatalogLeftIcon}
          />
          <List>
            <ListItem
              primaryText="测试"
              onTouchTap={this.handleOnClickCatalogList('/test')}
            />
            <ListItem
              primaryText="个人介绍"
              onTouchTap={this.handleOnClickCatalogList('/pro')}
            />
            <ListItem
              primaryText="我的博客"
              onTouchTap={() => { window.location = 'https://kannnnng.github.io/Blog/' }}  //eslint-disable-line
            />
            <ListItem
              primaryText="2048小游戏"
              onTouchTap={this.handleOnClickCatalogList('/2048')}
            />
          </List>
        </Drawer>
        <Snackbar
          autoHideDuration={2000}
          contentStyle={{ textAlign: 'center' }}
          message={snackbarMessage}
          onRequestClose={this.handleOnCloseSnackbar}
          open={openSnackbar}
        />
        {/* <Draggable /> */}
        {/* <StudentManagementSidebar
          groupList={groupList}
          handleOnClickEditGroup={() => { console.log('测试') }}
        /> */}
        {/* <StudentCardContainer
          show
          title={'一年级一班'}
          studentList={studentList}
        /> */}
        {/* <StudentInfomation
          open
          avatar={'http://img95.699pic.com/photo/50035/0496.jpg_wh300.jpg'}
          name={'闫守康'}
          nickName={'木叶'}
          gender={2}
          school={'华中科技大学'}
          college={'电子信息与通信学院'}
          className={'通信工程1306班'}
          studentId={'U201313791'}
          order={'1'}
          birthday={'1994-07-17'}
          location={'湖北武汉'}
          introduction={'好好学习，天天向上'}
          education={'本科'}
          job={'学生'}
          email={'575664647@qq.com'}
          QQ={'575664647'}
          phone={'15527226921'}
          style={{ width: '756px', height: '1008px' }}
        /> */}
        {/* <DiscusstionHeader
          data={{}}
        /> */}
        <DiscussionBottomToolBar
          attendeeCount={110}
          messageCount={110}
          groupList={[
            {
              id: 1,
              name: '分组1',
              color: '#ff4520',
              studentIds: [
                5,
                6,
                7,
                8,
              ],
            },
            {
              id: 2,
              name: '分组2',
              color: '#f8e71c',
              studentIds: [
                9,
                10,
                11,
                12,
              ],
            },
            {
              id: 3,
              name: '分组2',
              color: '#00ccde',
              studentIds: [
                9,
                10,
                11,
                12,
              ],
            },
          ]}
          studentGroupList={{
            1: [
              {
                id: 1,
                name: '张1包',
                avatar: '',
                messagesCount: 1,
              },
              {
                id: 2,
                name: '张2包',
                avatar: 'https://www.teachermate.com.cn/legacy/assets/images/cover/cover_005.jpg',
                messagesCount: 2,
              },
              {
                id: 3,
                name: '张3包',
                avatar: '',
                messagesCount: 3,
              },
              {
                id: 4,
                name: '张4包',
                avatar: '',
                messagesCount: 4,
              },
              {
                id: 5,
                name: '张5包',
                avatar: 'https://www.teachermate.com.cn/legacy/assets/images/cover/cover_005.jpg',
                messagesCount: 5,
              },
              {
                id: 6,
                name: '张6包',
                avatar: 'https://www.teachermate.com.cn/legacy/assets/images/cover/cover_005.jpg',
                messagesCount: 0,
              },
            ],
          }}
          style={{ top: '300px' }}
        />
      </div>
    )
  }
}

export default Home
