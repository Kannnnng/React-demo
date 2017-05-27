import React from 'react'
import PropTypes from 'prop-types'
import {
  AppBar,
  Drawer,
  List,
  ListItem,
  Snackbar,
} from 'material-ui'
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

    return (
      // <div className={`${styles.container} animated bounceInDown`}>
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
      </div>
    )
  }
}

export default Home
