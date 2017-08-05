/**
*
* AnswerShortAnswer
*
*/

import React from 'react'
import PropTypes from 'prop-types'
// import {
//   CellBody,
//   Form,
//   FormCell,
//   TextArea,
// } from 'react-weui'
import lodash from 'lodash'
// import ImagesUploader from 'components/ImagesUploader'
import PicView from 'components/PicView'
import styles from './styles.scss'

function renderImg(data, handleOnShowPicView) {
  return lodash.reduce(data, (result, value, index) => (
    [
      ...result,
      (<button key={index} onClick={handleOnShowPicView(index)}>
        <img src={value} alt="" />
      </button>),
    ]
  ), [])
}

// function mapAttachesToFiles(attaches) {
//   return lodash.map(attaches, (url) => ({ url }))
// }

class AnswerShortAnswer extends React.PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      show: false,
      currentIndex: 0,
    }
  }

  handleOnShowPicView = (currentIndex) => () => {
    this.setState({
      show: true,
      currentIndex,
    })
  }


  handleOnClosePicView = () => {
    this.setState({ show: false })
  }

  render() {
    const {
      answer,
      limit,
      // gallery,
      canAnswer,
      // functions,
      flag,
      // maxCount,
      // textAreaPlaceHolder,
    } = this.props
    const {
      show,
      currentIndex,
    } = this.state
    if (!canAnswer) {
      return (
        <div>
          {flag && <div className={styles.limit} style={{ marginLeft: '12px' }}>
            {limit ? `答题要求：限${limit}字` : '不限字数'}
          </div>}
          {answer && <div className={styles.content}>
            {answer.content}
          </div>}
          {answer && <div className={styles.imgList}>
            {renderImg(
              answer.attaches,
              this.handleOnShowPicView,
            )}
          </div>}
          {show && answer && answer.attaches && <PicView
            src={answer.attaches}
            currentIndex={currentIndex}
            closePicView={this.handleOnClosePicView}
          />}
        </div>
      )
    }
    return {/* (
      <div style={{ position: 'relative' }}>
        {flag && <div className={styles.limit}>
          {limit ? `答题要求：限${limit}字` : '不限字数'}
        </div>}
        <Form className={styles.noBorder}>
          <FormCell>
            <CellBody>
              <TextArea
                className={styles.textArea}
                placeholder={textAreaPlaceHolder}
                rows="3"
                maxlength={limit || false}
                onChange={functions.handleOnClickAnswer()}
                value={answer ? (answer.content || '') : ''}
              />
            </CellBody>
          </FormCell>
        </Form>
        <div className={styles.imagesUploaderContainer}>
          <ImagesUploader
            className={styles.imagesUploader}
            files={mapAttachesToFiles(answer.attaches)}
            onUpload={functions.handleOnUpload()}
            onImageClick={functions.handleOnImageClick()}
            onCloseGallery={functions.handleOnCloseGallery()}
            onDeleteImage={functions.handleOnDeleteImage()}
            gallery={gallery}
            maxCount={maxCount}
          />
        </div>
      </div>
    ) */}
  }
}

AnswerShortAnswer.propTypes = {
  answer: PropTypes.object,
  canAnswer: PropTypes.bool,
  limit: PropTypes.number,
  // functions: PropTypes.object,
  // gallery: PropTypes.object,
  flag: PropTypes.bool,
  // maxCount: PropTypes.number,
  // textAreaPlaceHolder: PropTypes.string,
}

AnswerShortAnswer.defaultProps = {
  answer: {},
  // functions: {},
  flag: true,
  // maxCount: 6,
  // textAreaPlaceHolder: '',
}

export default AnswerShortAnswer
