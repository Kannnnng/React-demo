import React from 'react'
import PropTypes from 'prop-types'

function ItemLabel({ selected, correct, showMySelected, hasCorrectness, children }) {
  const style = {
    width: 24,
    height: 24,
    borderRadius: '50%',
    fontSize: '14px',
    color: '#666',
    lineHeight: '24px',
    textAlign: 'center',
    backgroundColor: 'white',
    border: 'solid 1px #b5bbbc',
  }
  if (correct) {
    style.color = 'white'
    style.backgroundColor = 'rgba(0, 150, 136, 0.7)'
    style.borderColor = '#009688'
  }
  if (showMySelected && selected) {
    style.borderColor = '#D0011B'
    style.borderWidth = '2px'
  }
  if (!hasCorrectness && selected) {
    style.color = 'white'
    style.backgroundColor = '#666'
    style.borderColor = '#333'
  }
  return (
    <div style={style}>{children}</div>
  )
}

ItemLabel.propTypes = {
  selected: PropTypes.bool,
  correct: PropTypes.bool,
  hasCorrectness: PropTypes.bool,
  showMySelected: PropTypes.bool,
  children: PropTypes.any,
}

export default ItemLabel
