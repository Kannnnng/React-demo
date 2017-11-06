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
import IconButton from 'material-ui/IconButton'
import Popover from 'material-ui/Popover'
import Menu from 'material-ui/Menu'
import MenuItem from 'material-ui/MenuItem'
import SearchSvg from 'material-ui/svg-icons/action/search'
import GoRightSvg from 'material-ui/svg-icons/navigation/chevron-right'
import GoLeftSvg from 'material-ui/svg-icons/navigation/chevron-left'
import styles from './styles'

export default class CurrentChoice extends React.PureComponent {
  static propTypes = {
    /* immutable 对象 */
    conditions: PropTypes.object.isRequired,
    /* immutable 对象 */
    courses: PropTypes.object.isRequired,
    /* immutable 对象 */
    courseGroups: PropTypes.object.isRequired,
    /* immutable 对象 */
    classroom: PropTypes.object.isRequired,
    /* 章节信息 */
    chapters: PropTypes.object.isRequired,
    /* 取消某一选择限制条件 */
    handleOnClickCancel: PropTypes.func.isRequired,
    /* 复制到课程、课程组或课堂 */
    handleOnClickCopyTarget: PropTypes.func.isRequired,
    /* 点击筛选条件中的章节时被触发 */
    handleOnClickChapter: PropTypes.func.isRequired,
    handleOnClickSearch: PropTypes.func.isRequired,
  }

  static defaultProps = {
    conditions: [],
    courses: {},
    courseGroups: {},
    classroom: {},
    handleOnClickCancel: () => () => {},
    handleOnClickCopyTarget: () => () => {},
    handleOnClickChapter: () => () => {},
    handleOnClickSearch: () => {},
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

  handleOnClickSearch = () => {
    this.props.handleOnClickSearch({
      value: this.searchInputElement.value,
    })
  }

  render() {
    const {
      conditions,
      courses,
      courseGroups,
      classroom,
      chapters,
      handleOnClickCancel,
      handleOnClickCopyTarget,
      handleOnClickChapter,
    } = this.props
    const {
      copyToButtonElement,
      showCopyToList,
    } = this.state

    return (
      <div className={styles.container}>
        <div className={styles.topToolBar}>
          <div className={styles.conditions}>
            <Chip>
              {'所有分类'}
            </Chip>
            {conditions.map((value) => [
              <GoRightSvg
                key={`svg-${value.get('name')}`}
              />,
              <Chip
                key={value.get('name')}
                onRequestDelete={handleOnClickCancel({
                  name: value.get('name'),
                })}
              >
                {value.get('value')}
              </Chip>,
            ]).toJS()}
          </div>
          <div>
            <FlatButton
              label={'复制到'}
              disabled={
                courses.isEmpty() &&
                courseGroups.isEmpty() &&
                classroom.isEmpty()
              }
              onClick={this.handleOnClickCopyToButton}
            />
            <Popover
              open={showCopyToList}
              anchorEl={copyToButtonElement}
              anchorOrigin={{horizontal: 'right', vertical: 'bottom'}}
              targetOrigin={{horizontal: 'right', vertical: 'top'}}
              onRequestClose={this.handleOnCloseCopyToList}
            >
              {!courses.isEmpty() && <Menu>
                <MenuItem
                  anchorOrigin={{horizontal: 'left', vertical: 'top'}}
                  targetOrigin={{horizontal: 'right', vertical: 'top'}}
                  leftIcon={<GoLeftSvg />}
                  primaryText={'我的课程'}
                  menuItems={courses.map((value) => (
                    <MenuItem
                      key={value.get('id')}
                      primaryText={value.get('name')}
                      onClick={handleOnClickCopyTarget({
                        id: value.get('id'),
                        name: 'course',
                      })}
                    />
                  )).toList().toJS()}
                />
              </Menu>}
              {!courseGroups.isEmpty() && <Menu>
                <MenuItem
                  anchorOrigin={{horizontal: 'left', vertical: 'top'}}
                  targetOrigin={{horizontal: 'right', vertical: 'top'}}
                  leftIcon={<GoLeftSvg />}
                  primaryText={'课程组'}
                  menuItems={courses.map((value) => (
                    <MenuItem
                      key={value.get('id')}
                      primaryText={value.get('name')}
                      onClick={handleOnClickCopyTarget({
                        id: value.get('id'),
                        name: 'courseGroup',
                      })}
                    />
                  )).toList().toJS()}
                />
              </Menu>}
              {!classroom.isEmpty() && <Menu>
                <MenuItem
                  anchorOrigin={{horizontal: 'left', vertical: 'top'}}
                  targetOrigin={{horizontal: 'right', vertical: 'top'}}
                  leftIcon={<GoLeftSvg />}
                  primaryText={'我的课堂'}
                  menuItems={courses.map((value) => (
                    <MenuItem
                      key={value.get('id')}
                      primaryText={value.get('name')}
                      onClick={handleOnClickCopyTarget({
                        id: value.get('id'),
                        name: 'classroom',
                      })}
                    />
                  )).toList().toJS()}
                />
              </Menu>}
            </Popover>
          </div>
        </div>
        <div className={styles.chapter}>
          <div>{'章节:'}</div>
          <div>
            {chapters.map((value) => (
              <FlatButton
                key={value.get('id')}
                label={value.get('name')}
                onClick={handleOnClickChapter({
                  id: value.get('id'),
                })}
              />
            )).toJS()}
          </div>
        </div>
        <div className={styles.search}>
          <div>{'搜索'}</div>
          <input type='text' ref={(node) => {this.searchInputElement = node}} />
          <IconButton
            onClick={this.handleOnClickSearch}
          >
            <SearchSvg />
          </IconButton>
        </div>
      </div>
    )
  }
}
