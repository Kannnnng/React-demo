import React from 'react'
import PropTypes from 'prop-types'
// import {
//   AppBar,
//   Drawer,
//   List,
//   ListItem,
//   Snackbar,
// } from 'material-ui'
// import StudentCardContainer from 'components/StudentCardContainer'
// import QuestionPreviewBoard from 'components/QuestionPreviewBoard'
// import StudentInfomation from 'components/StudentInfomation'
// import StudentManagementSidebar from 'components/StudentManagementSidebar'
import StudentManagement from 'components/StudentManagement'
import {
  // studentList,
  groupList,
  // questionContent,
  // questionAnswer,
  // answerAnalysis,
} from './Mock'
import styles from './styles.scss'

class Home extends React.Component {
  static propTypes = {
    history: PropTypes.object,
  }

  state = {
    // openCatalog: false,
    // openSnackbar: false,
    // snackbarMessage: '',
    /* 下面是仅供测试用的 state */
    showContainer: true,
    /* 上面是仅供测试用的 state */
  }

  // handleOnClickCatalog = () => {
  //   this.setState({ openCatalog: !this.state.openCatalog })
  // }

  // handleOnClickCatalogLeftIcon = () => {
  //   this.setState({
  //     openSnackbar: true,
  //     snackbarMessage: '直接选下面的就可以啦',
  //   })
  // }

  // handleOnClickCatalogList = (data) => () => {
  //   this.props.history.push(data)
  // }

  // handleOnCloseSnackbar = () => {
  //   this.setState({
  //     openSnackbar: false,
  //     snackbarMessage: '',
  //   })
  // }

  render() {
    // const {
    //   openCatalog,
    //   openSnackbar,
    //   snackbarMessage,
    // } = this.state

    return (
      <div className={`${styles.container}`}>
        <StudentManagement
          groupList={groupList}
        />
        {/* <div className={styles.centerBox}>
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
              primaryText="2048"
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
        /> */}
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
      </div>
    )
  }
}

export default Home
