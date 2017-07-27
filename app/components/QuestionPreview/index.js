import React from 'react'
import PropTypes from 'prop-types'
import lodash from 'lodash'
import BlackCover from './BlackCover'
import { GoBack } from './Mess'
import styles from './index.scss'

class QuestionPreview extends React.Component {
  render() {
    return (
      <BlackCover
        topLeftButton={<GoBack handleOnClick={() => console.log(456)} />}
        topRightButton={<GoBack handleOnClick={() => console.log(123)} />}
      >
        {'123'}
      </BlackCover>
    )
  }
}

export default QuestionPreview
