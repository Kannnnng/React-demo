import React, { PropTypes } from 'react'
import RaisedButton from 'material-ui/RaisedButton'
import styles from './styles'

function CoursewarePreview(props) {
  const { img, coursewareName, playCourseware } = props
  return (
    <div className={styles.coursewarePreview}>
      {coursewareName}
      <img src={img} alt='' className={styles.img} />
      <div style={{ textAlign: 'center' }}>
        {playCourseware && <RaisedButton
          label='播放课件'
          labelColor='#FFF'
          backgroundColor='#3B9E46'
          style={{ width: 128 }}
          onTouchTap={playCourseware}
        />}
      </div>
    </div>
  )
}

CoursewarePreview.propTypes = {
  img: PropTypes.string,
  coursewareName: PropTypes.string,
  playCourseware: PropTypes.func,
}

export default CoursewarePreview
