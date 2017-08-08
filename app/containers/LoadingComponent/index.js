import React from 'react'
import PropTypes from 'prop-types'
import Loading from 'components/Loading'
import styles from './styles'

function LoadingComponent(props) {
  if (props.isLoading) {
    /* 加载中 */
    if (props.timedOut) {
      /* 加载超时 */
      return (
        <div>
          {'加载超时！'}
        </div>
      )
    } else if (props.pastDelay) {
      /* 加载中 */
      return (
        <div className={styles.container}>
          <Loading />
        </div>
      )
    }
    /* 不是以上两种状态，则表明状态没有发生变化，因此不需要返回任何数据，页面也不需要发生改变 */
    return null
  } else if (props.error) {
    /* 加载失败 */
    console.error('组件加载失败，错误信息如下：', props.error)  // eslint-disable-line
    return null
  }
  /* 按理来说不应该发生这种情况，但是还是返回 null 防止发生意外 */
  return null
}

LoadingComponent.propTypes = {
  isLoading: PropTypes.bool,
  timedOut: PropTypes.bool,
  pastDelay: PropTypes.bool,
  error: PropTypes.object,
}

export default LoadingComponent
