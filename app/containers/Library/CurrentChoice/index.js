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
import ImmutablePropTypes from 'react-immutable-proptypes'
import Checkbox from 'material-ui/Checkbox'
import Chip from 'material-ui/Chip'
import FlatButton from 'material-ui/FlatButton'
import IconButton from 'material-ui/IconButton'
import Popover from 'material-ui/Popover'
import Menu from 'material-ui/Menu'
import MenuItem from 'material-ui/MenuItem'
import SearchSvg from 'material-ui/svg-icons/action/search'
import GoRightSvg from 'material-ui/svg-icons/navigation/chevron-right'
import GoLeftSvg from 'material-ui/svg-icons/navigation/chevron-left'
import {
  immutableObjectEmpty,
  immutableArrayEmpty,
} from 'utils/constants'
import styles from './styles'

export default class CurrentChoice extends React.PureComponent {
  static propTypes = {
    /* 当前设置的筛选条件，immutable 数组 */
    /* 使用数组的原因是需要有显示顺序，显示效果类似于 全部 > 章节 > 搜索 > 手动选择 */
    conditions: ImmutablePropTypes.list.isRequired,
    /* 教师本人的所有课程，immutable 对象 */
    courses: ImmutablePropTypes.map.isRequired,
    /* 教师本人参与的所有课程组，immutable 对象 */
    courseGroups: ImmutablePropTypes.map.isRequired,
    /* 教师本人的所有课堂，immutable 对象 */
    classrooms: ImmutablePropTypes.map.isRequired,
    /* 当前选择的课程、课程组或课堂所包含的章节信息，immutable 数组 */
    /* 使用数组的原因是需要根据章节的 rank 属性按顺序显示 */
    chapters: ImmutablePropTypes.list.isRequired,
    /* 当前是否已经选择了至少一个题目、组卷或课件 */
    isSelectedQuestionItemsEmpty: PropTypes.bool.isRequired,
    /* 当前是否将符合过滤条件的题目、组卷和课件全部选择了 */
    isSelectAll: PropTypes.bool.isRequired,
    /* 取消某一选择限制条件 */
    handleOnClickCancel: PropTypes.func.isRequired,
    /* 复制到课程、课程组或课堂 */
    handleOnClickCopyTarget: PropTypes.func.isRequired,
    /* 选择某一章节作为筛选条件 */
    handleOnClickChapter: PropTypes.func.isRequired,
    /* 点击搜索按钮时被触发 */
    handleOnClickSearch: PropTypes.func.isRequired,
    /* 点击全选按钮时被触发 */
    handleOnClickSelectAll: PropTypes.func.isRequired,
  }

  static defaultProps = {
    conditions: immutableArrayEmpty,
    courses: immutableObjectEmpty,
    courseGroups: immutableObjectEmpty,
    classrooms: immutableObjectEmpty,
    isSelectedQuestionItemsEmpty: true,
    isSelectAll: false,
    handleOnClickCancel: () => () => {},
    handleOnClickCopyTarget: () => {},
    handleOnClickChapter: () => () => {},
    handleOnClickSearch: () => {},
    handleOnClickSelectAll: () => {},
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
    this.searchInputElement.value = ''
  }

  handleOnClickCopyTarget = (value) => () => {
    this.setState({
      showCopyToList: false,
    })
    this.props.handleOnClickCopyTarget(value)
  }

  render() {
    const {
      conditions,
      courses,
      courseGroups,
      classrooms,
      chapters,
      isSelectedQuestionItemsEmpty,
      isSelectAll,
      handleOnClickCancel,
      handleOnClickChapter,
      handleOnClickSelectAll,
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
              {'全部'}
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
              disabled={isSelectedQuestionItemsEmpty}
              onClick={this.handleOnClickCopyToButton}
            />
            <Popover
              open={showCopyToList}
              anchorEl={copyToButtonElement}
              anchorOrigin={{horizontal: 'right', vertical: 'bottom'}}
              targetOrigin={{horizontal: 'right', vertical: 'top'}}
              onRequestClose={this.handleOnCloseCopyToList}
            >
              {!courses.isEmpty() && <Menu
                desktop
              >
                <MenuItem
                  anchorOrigin={{horizontal: 'left', vertical: 'top'}}
                  targetOrigin={{horizontal: 'right', vertical: 'top'}}
                  leftIcon={<GoLeftSvg />}
                  primaryText={'我的课程'}
                  menuItems={courses.map((value) => (
                    <MenuItem
                      key={value.get('id')}
                      anchorOrigin={{horizontal: 'left', vertical: 'top'}}
                      targetOrigin={{horizontal: 'right', vertical: 'top'}}
                      leftIcon={<GoLeftSvg />}
                      primaryText={value.get('name')}
                      menuItems={value.get('chapters').map((item) => (
                        <MenuItem
                          key={item.get('id')}
                          primaryText={item.get('name')}
                          onClick={this.handleOnClickCopyTarget({
                            targetId: value.get('id'),
                            chapterId: item.get('id'),
                            name: 'courses',
                          })}
                        />
                      )).toList().toJS()}
                    />
                  )).toList().toJS()}
                />
              </Menu>}
              {!courseGroups.isEmpty() && <Menu
                desktop
              >
                <MenuItem
                  anchorOrigin={{horizontal: 'left', vertical: 'top'}}
                  targetOrigin={{horizontal: 'right', vertical: 'top'}}
                  leftIcon={<GoLeftSvg />}
                  primaryText={'课程组'}
                  menuItems={courseGroups.map((value) => (
                    <MenuItem
                      key={value.get('groupId')}
                      anchorOrigin={{horizontal: 'left', vertical: 'top'}}
                      targetOrigin={{horizontal: 'right', vertical: 'top'}}
                      leftIcon={<GoLeftSvg />}
                      primaryText={value.get('groupName')}
                      menuItems={value.get('chapters').map((item) => (
                        <MenuItem
                          key={item.get('id')}
                          primaryText={item.get('name')}
                          onClick={this.handleOnClickCopyTarget({
                            targetId: value.get('library'),
                            chapterId: item.get('id'),
                            name: 'courseGroups',
                          })}
                        />
                      )).toList().toJS()}
                    />
                  )).toList().toJS()}
                />
              </Menu>}
              {!classrooms.isEmpty() && <Menu
                desktop
              >
                <MenuItem
                  anchorOrigin={{horizontal: 'left', vertical: 'top'}}
                  targetOrigin={{horizontal: 'right', vertical: 'top'}}
                  leftIcon={<GoLeftSvg />}
                  primaryText={'我的课堂'}
                  menuItems={classrooms.map((value) => (
                    <MenuItem
                      key={value.get('id')}
                      anchorOrigin={{horizontal: 'left', vertical: 'top'}}
                      targetOrigin={{horizontal: 'right', vertical: 'top'}}
                      leftIcon={<GoLeftSvg />}
                      primaryText={value.get('name')}
                      menuItems={value.get('chapters').map((item) => (
                        <MenuItem
                          key={item.get('id')}
                          primaryText={item.get('name')}
                          onClick={this.handleOnClickCopyTarget({
                            targetId: value.get('id'),
                            chapterId: item.get('id'),
                            name: 'classrooms',
                          })}
                        />
                      )).toList().toJS()}
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
            {/* chapters 在没有获取题目详情的时候也存在数据，但是没有题目、组卷和课件的信息 */}
            {/* 原因是获取课程、课程组和课堂列表时需要获取各自对应的章节供复制按钮使用 */}
            {/* 因此需要判断是否存在题目、组卷和课件的信息，防止出错 */}
            {chapters.map((value) => (
              <FlatButton
                key={value.get('id')}
                label={`${value.get('name')}(${
                  ((value.get('questions') && value.get('questions').size) || 0) +
                  ((value.get('quizzes') && value.get('quizzes').size) || 0) +
                  ((value.get('coursewares') && value.get('coursewares').size) || 0)
                })`}
                onClick={handleOnClickChapter({
                  id: value.get('id'),
                })}
              />
            )).toJS()}
          </div>
        </div>
        <div className={styles.search}>
          <div>{'搜索:'}</div>
          <input type='text' ref={(node) => {this.searchInputElement = node}} />
          <IconButton
            onClick={this.handleOnClickSearch}
            style={{ padding: '0', width: '24px', height: '24px' }}
          >
            <SearchSvg />
          </IconButton>
        </div>
        <div className={styles.selectAll}>
          <Checkbox
            checked={isSelectAll}
            label={'全选:'}
            labelPosition={'left'}
            labelStyle={{ whiteSpace: 'nowrap', marginTop: '6px', marginRight: '5px' }}
            iconStyle={{ marginTop: '3px' }}
            onCheck={handleOnClickSelectAll}
          />
        </div>
      </div>
    )
  }
}
