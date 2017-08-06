import React from 'react'
import PropTypes from 'prop-types'
import defaultClassCover from 'images/default-class.png'
import styles from './styles'

export function LibraryCell({
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
  const joinClassName = `${styles.join} ${(hasJoin && styles.hasJoin) || ''}`

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
      <button
        className={joinClassName}
        onClick={handleOnSelectLibrary(libraryId)}
        disabled={hasJoin && 'disabled'}
      >
        {hasJoin ? '已加入' : '加入'}
      </button>
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
