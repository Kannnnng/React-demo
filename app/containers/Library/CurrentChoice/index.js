/**
 *
 * Name: CurrentChoice
 * Date: 2017-11-05 19:35:05
 * Description: 显示当前选择或搜索的条件
 * Author: Einskang
 * Organization: HUST
 *
 */

import React from 'react'
import PropTypes from 'prop-types'
import Chip from 'material-ui/Chip'
import FlatButton from 'material-ui/FlatButton'
import Popover from 'material-ui/Popover'
import Menu from 'material-ui/Menu'
import MenuItem from 'material-ui/MenuItem'
import GoRightSvg from 'material-ui/svg-icons/navigation/chevron-right'
import styles from './styles'

export default class Pagination extends React.PureComponent {
  static propTypes = {
    conditions: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
        value: PropTypes.string.isRequired,
      })
    ).isRequired,
    handleOnClickCancel: PropTypes.func.isRequired,
  }

  static defaultProps = {
    conditions: [],
    handleOnClickCancel: () => () => {},
  }

  state = {
    copyToButtonElement: null,
    showCopyToList: false,
  }

  handleOnClickCopyToButton = (event) => {
    this.setState({
      showCopyToList: true,
      copyToButtonElement: event.currentTarget,
    })
  }

  handleOnCloseCopyToList = () => {
    this.setState({
      showCopyToList: false,
    })
  }

  render() {
    const {
      conditions,
      handleOnClickCancel,
    } = this.props
    const {
      copyToButtonElement,
      showCopyToList,
    } = this.state

    return (
      <div className={styles.container}>
        <div className={styles.conditions}>
          <Chip>
            {'所有分类'}
          </Chip>
          {conditions.map((value) => [
            <GoRightSvg
              key={`svg-${value.name}`}
            />,
            <Chip
              key={value.name}
              onRequestDelete={handleOnClickCancel(value.name)}
            >
              {value.value}
            </Chip>,
          ])}
        </div>
        <div>
          <FlatButton
            label={'复制到'}
            onClick={this.handleOnClickCopyToButton}
          />
          <Popover
            open={showCopyToList}
            anchorEl={copyToButtonElement}
            anchorOrigin={{horizontal: 'right', vertical: 'bottom'}}
            targetOrigin={{horizontal: 'right', vertical: 'top'}}
            onRequestClose={this.handleOnCloseCopyToList}
          >
            <Menu>
              <MenuItem primaryText={'123'} />
              <MenuItem primaryText={'123'} />
              <MenuItem primaryText={'123'} />
            </Menu>
          </Popover>
        </div>
      </div>
    )
  }
}
