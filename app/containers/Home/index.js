import React from 'react'
import PropTypes from 'prop-types'
import {
  AppBar,
  Drawer,
  List,
  ListItem,
  Snackbar,
} from 'material-ui'
import CountDown from 'components/CountDown'
import RoundProgressBar from 'components/RoundProgressBar'
import SearchToolBar from 'components/SearchToolBar'
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

    const RoundProgressBarContent = (
      <div style={{ textAlign: 'center', color: '#FFF' }}>
        <div style={{ fontSize: '16px' }}>出勤</div>
        <div style={{ fontSize: '64px', marginTop: '12px' }}>24</div>
        <div style={{ fontSize: '20px' }}>18%</div>
      </div>
    )
    const countDownTitle = '签到开启于 2017.01.03 13:24:15\n限时5分钟，剩余'
    const countDownButton = (
      <button
        className={styles.countDownButton}
      >
        {'立即关闭'}
      </button>
    )

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
        <CountDown
          title={countDownTitle}
          button={countDownButton}
          start={this.state.start}
          limit={this.state.limit}
        />
        <RoundProgressBar
          display={RoundProgressBarContent}
          percent={75}
          style={{ position: 'absolute', left: '0', bottom: '0' }}
        />
        <SearchToolBar
          handleOnShowState={(value) => console.log(value)}  //eslint-disable-line
          handleOnSearchContentChange={(value) => console.log(value)}  //eslint-disable-line
        />
      </div>
    )
  }
}

export default Home
