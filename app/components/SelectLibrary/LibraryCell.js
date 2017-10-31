import React from 'react'
import PropTypes from 'prop-types'
import FlatButton from 'material-ui/FlatButton'
import defaultClassCover from 'images/defaultClass.png'
import styles from './styles'

export default function LibraryCell({
  libraryId,
  libraryName,
  cover,
  questionNumber,
  quizNumber,
  coursewareNumber,
  hasJoin,
  className,
  handleOnSelectLibrary,
}) {
  const containerClassName = `${styles.LibraryCellContainer} ${className || ''}`
  const coverStyle = { backgroundImage: `url(${cover || defaultClassCover})` }

  return (
    <div className={containerClassName}>
      <div className={styles.cover} style={coverStyle} />
      <div className={styles.LibraryCellContent}>
        <div className={styles.name}>
          <span>{libraryName}</span>
        </div>
        <div className={styles.libraryData}>
          <i className={styles.question} />
          <span>{questionNumber}</span>
          <i className={styles.quiz} />
          <span>{quizNumber}</span>
          <i className={styles.courseware} />
          <span>{coursewareNumber}</span>
        </div>
      </div>
      <FlatButton
        label={hasJoin ? '已加入' : '加入'}
        disabled={hasJoin}
        onClick={handleOnSelectLibrary(libraryId)}
        style={{ height: '100%', color: hasJoin ? 'rgba(0, 0, 0, 0.26)' : '#3B9E46' }}
      />
    </div>
  )
}

LibraryCell.propTypes = {
  libraryId: PropTypes.string,
  libraryName: PropTypes.string,
  cover: PropTypes.string,
  questionNumber: PropTypes.number,
  quizNumber: PropTypes.number,
  coursewareNumber: PropTypes.number,
  hasJoin: PropTypes.bool,
  className: PropTypes.string,
  handleOnSelectLibrary: PropTypes.func,
}
