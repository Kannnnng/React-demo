import React from 'react'
import PropTypes from 'prop-types'
import {
  AppBar,
  Drawer,
  List,
  ListItem,
  Snackbar,
} from 'material-ui'
import SelectLibrary from 'components/SelectLibrary'
import styles from './index.scss'

class Home extends React.Component {
  static propTypes = {
    history: PropTypes.object,
  }

  constructor(props) {
    super(props)

    this.state = {
      openCatalog: false,
      openSnackbar: false,
      snackbarMessage: '',
      /* 下面是仅供测试用的 state */
      start: true,
      limit: 300,
      /* 上面是仅供测试用的 state */
    }

    this.data = [
      {
        libraryId: '59561842279b042a29de5c90', // 题库ID
        libraryName: '神经网络题库神经网络题库神经网络题库神经网络题库', // 题库名称
        ownerImage: 'https://www.teachermate.com.cn/legacy/assets/images/cover/cover_002.jpg', // 题库创建者头像
        cover: 'https://www.teachermate.com.cn/legacy/assets/images/cover/cover_012.jpg', // 题库封面
        questionNumber: 122, // 题目数量
        quizNumber: 16, // 组卷数量
        coursewareNumber: 31, // 课件数量
        accountId: 3, // 题目创建者ID
        hasJoin: false,
      },
      {
        libraryId: '59561842279b042a29de5c91',
        libraryName: '神经网络题库2',
        ownerImage: 'https://www.teachermate.com.cn/legacy/assets/images/cover/cover_002.jpg',
        cover: 'https://www.teachermate.com.cn/legacy/assets/images/cover/cover_011.jpg',
        questionNumber: 136,
        quizNumber: 16,
        coursewareNumber: 32,
        accountId: 4,
        hasJoin: true,
      },
      {
        libraryId: '59561842279b042a29de5c92',
        libraryName: '神经网络题库2',
        ownerImage: 'https://www.teachermate.com.cn/legacy/assets/images/cover/cover_002.jpg',
        cover: 'https://www.teachermate.com.cn/legacy/assets/images/cover/cover_011.jpg',
        questionNumber: 136,
        quizNumber: 16,
        coursewareNumber: 32,
        accountId: 4,
        hasJoin: true,
      },
    ]
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
      <div className={`${styles.container}`}>
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
        />
        <SelectLibrary
          open
          data={this.data}
          handleOnSelectLibrary={(value) => () => console.log(value, 123)}
        />
      </div>
    )
  }
}

export default Home
