import React from 'react'
import PropTypes from 'prop-types'
import styles from './Mess.scss'

function Button({
  title,
  className,
  handleOnClick,
}) {
  return (
    <button
      className={className}
      onClick={handleOnClick}
    >
      <i />
      {title && <span>
        {title}
      </span>}
    </button>
  )
}

Button.propTypes = {
  title: PropTypes.string,
  className: PropTypes.string,
  handleOnClick: PropTypes.func,
}

export function GoBack({
  handleOnClick,
}) {
  return (
    <Button
      className={styles.goBackButton}
      handleOnClick={handleOnClick}
    />
  )
}

GoBack.propTypes = {
  handleOnClick: PropTypes.func,
}

export function GoLeft({
  handleOnClick,
}) {
  return (
    <Button
      className={styles.goLeftButton}
      handleOnClick={handleOnClick}
    />
  )
}

GoLeft.propTypes = {
  handleOnClick: PropTypes.func,
}

export function GoRight({
  handleOnClick,
}) {
  return (
    <Button
      className={styles.goRightButton}
      handleOnClick={handleOnClick}
    />
  )
}

GoRight.propTypes = {
  handleOnClick: PropTypes.func,
}

export function BottomToolBar({
  handleOnEdit,
  handleOnClone,
  handleOnCopy,
  handleOnMove,
  handleOnDelete,
}) {
  return (
    <div className={styles.bottomToolBarContainer}>
      {handleOnEdit && <Button
        title={'编辑'}
        className={styles.editButton}
        handleOnClick={handleOnEdit}
      />}
      {handleOnClone && <Button
        title={'克隆'}
        className={styles.cloneButton}
        handleOnClick={handleOnClone}
      />}
      {handleOnCopy && <Button
        title={'复制'}
        className={styles.copyButton}
        handleOnClick={handleOnCopy}
      />}
      {handleOnMove && <Button
        title={'移动'}
        className={styles.moveButton}
        handleOnClick={handleOnMove}
      />}
      {handleOnDelete && <Button
        title={'删除'}
        className={styles.deleteButton}
        handleOnClick={handleOnDelete}
      />}
    </div>
  )
}

BottomToolBar.propTypes = {
  handleOnEdit: PropTypes.func,
  handleOnClone: PropTypes.func,
  handleOnCopy: PropTypes.func,
  handleOnMove: PropTypes.func,
  handleOnDelete: PropTypes.func,
}

