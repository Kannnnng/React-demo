import React from 'react'
import PropTypes from 'prop-types'
import styles from './index.scss'

function Button({
  icon,
  className,
  handleOnClick,
}) {
  return (
    <button
      className={className}
      onClick={handleOnClick}
    >
      {icon}
    </button>
  )
}

Button.propTypes = {
  icon: PropTypes.element,
  className: PropTypes.string,
  handleOnClick: PropTypes.func,
}

export function GoBack({
  handleOnClick,
}) {
  return (
    <Button
      icon={}
      className={}
      handleOnClick={}
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
    <button
      className={styles.MessGoBackButton}
      onClick={handleOnClick}
    >
      <i />
    </button>
  )
}

GoBack.propTypes = {
  handleOnClick: PropTypes.func,
}

