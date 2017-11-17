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
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import IconButton from 'material-ui/IconButton'
import Popover from 'material-ui/Popover'
import Menu from 'material-ui/Menu'
import MenuItem from 'material-ui/MenuItem'
import Toggle from 'material-ui/Toggle'
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
    isSelectedCurrentQuestionItemsEmpty: PropTypes.bool.isRequired,
    /* 当前是否将符合过滤条件的题目、组卷和课件全部选择了 */
    isSelectAll: PropTypes.bool.isRequired,
    /* 需要用户确定哪些章节需要整体拷贝（带章节信息） */
    needDecideCopyEntireChapterList: ImmutablePropTypes.list,
    /* 当前用户决定整体复制的章节信息集合 */
    decidedCopyEntireChapterList: ImmutablePropTypes.map,
    /* 当前选中的题目、组卷和课件的总数与被选择作为筛选条件的章节中所包含的题目、组卷和课件的总数 */
    /* 是否相等，以此标示是否将整个章节信息（包含章节信息和题目、组卷、课件等）全部复制到指定位置 */
    isCopyEntireChapter: PropTypes.bool.isRequired,
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
    /* 点击显示选中的课程、课程组或课堂中的所有题目、组卷和课件 */
    handleOnClickShowAllQuestionItems: PropTypes.func.isRequired,
    /* 点击显示当前所有选中的题目、组卷和课件 */
    handleOnClickShowAllSelectedQuestionItems: PropTypes.func.isRequired,
    /* 当某一个需要全部复制到指定位置的章节被选中时触发 */
    handleOnSelectNeedCopyEntireChapter: PropTypes.func.isRequired,
  }

  static defaultProps = {
    conditions: immutableArrayEmpty,
    courses: immutableObjectEmpty,
    courseGroups: immutableObjectEmpty,
    classrooms: immutableObjectEmpty,
    isSelectedCurrentQuestionItemsEmpty: true,
    isSelectAll: false,
    needDecideCopyEntireChapterList: immutableArrayEmpty,
    decidedCopyEntireChapterList: immutableObjectEmpty,
    isCopyEntireChapter: false,
    handleOnClickCancel: () => () => {},
    handleOnClickCopyTarget: () => {},
    handleOnClickChapter: () => () => {},
    handleOnClickSearch: () => {},
    handleOnClickSelectAll: () => {},
    handleOnClickShowAllQuestionItems: () => {},
    handleOnClickShowAllSelectedQuestionItems: () => {},
    handleOnSelectNeedCopyEntireChapter: () => () => {},
  }

  state = {
    copyMethod: 'copySelectedQuestionItems',
    copyToButtonElement: null,
    showCopyToList: false,
    showCopyMethodDialog: false,
  }

  handleOnClickCopyToButton = (event) => {
    const {
      needDecideCopyEntireChapterList,
    } = this.props
    /* 如果需要确认的章节列表不是空的，那么需要弹出对话框让用户确认哪些章节整体复制 */
    if (!needDecideCopyEntireChapterList.isEmpty()) {
      this.setState({
        showCopyMethodDialog: true,
        copyToButtonElement: event.currentTarget,
      })
    } else {
      this.setState({
        copyMethod: 'copySelectedQuestionItems',
        showCopyToList: true,
        copyToButtonElement: event.currentTarget,
      })
    }
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
    const {
      copyMethod,
    } = this.state
    this.setState({
      showCopyToList: false,
    })
    this.props.handleOnClickCopyTarget({
      ...value,
      copyMethod,
    })
  }

  handleOnDecideCopyMethod = ({ method }) => () => {
    this.setState({
      copyMethod: method,
      showCopyToList: true,
      showCopyMethodDialog: false,
    })
  }

  handleOnCloseCopyMethodDialog = () => {
    this.setState({
      showCopyMethodDialog: false,
    })
  }

  render() {
    const {
      conditions,
      courses,
      courseGroups,
      classrooms,
      chapters,
      isSelectedCurrentQuestionItemsEmpty,
      isSelectAll,
      needDecideCopyEntireChapterList,
      decidedCopyEntireChapterList,
      handleOnClickCancel,
      handleOnClickChapter,
      handleOnClickSelectAll,
      handleOnClickShowAllQuestionItems,
      handleOnClickShowAllSelectedQuestionItems,
      handleOnSelectNeedCopyEntireChapter,
    } = this.props
    const {
      copyMethod,
      copyToButtonElement,
      showCopyToList,
      showCopyMethodDialog,
    } = this.state

    /* 当前设置的筛选条件中是否含有已选择项 */
    const indexOfSelectInCondition = conditions.findIndex((value) => value.get('name') === 'select')

    return (
      <div className={styles.container}>
        <div className={styles.topToolBar}>
          <div className={styles.conditions}>
            <Chip
              onClick={handleOnClickShowAllQuestionItems}
            >
              {'全部'}
            </Chip>
            {/* 要求当教师选择了的 */}
            {conditions.map((value) => value.get('name') === 'select' ? (
              null
            ) : [
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
            <GoRightSvg
              style={indexOfSelectInCondition !== -1 ? undefined : { opacity: '0' }}
            />
            <Chip
              id={'questionItemShoppingCartTarget'}
              onClick={indexOfSelectInCondition === -1 ? undefined : handleOnClickShowAllSelectedQuestionItems}
              onRequestDelete={handleOnClickCancel({
                name: conditions.getIn([indexOfSelectInCondition, 'name']),
              })}
              style={indexOfSelectInCondition !== -1 ? undefined : { opacity: '0' }}
            >
              {`已选择(${conditions.getIn([indexOfSelectInCondition, 'value']) || 0})`}
            </Chip>
          </div>
          <div>
            <FlatButton
              label={'复制到'}
              disabled={isSelectedCurrentQuestionItemsEmpty}
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
                      leftIcon={copyMethod === 'copyEntireChapter' ? undefined : <GoLeftSvg />}
                      primaryText={value.get('name')}
                      menuItems={copyMethod === 'copyEntireChapter' ? (
                        undefined
                      ) : (
                        value.get('chapters').map((item) => (
                          <MenuItem
                            key={item.get('id')}
                            primaryText={item.get('name')}
                            onClick={this.handleOnClickCopyTarget({
                              targetId: value.get('id'),
                              targetChapterId: item.get('id'),
                              name: 'courses',
                            })}
                          />
                        )).toList().toJS()
                      )}
                      onClick={copyMethod === 'copySelectedQuestionItems' ? (
                        undefined
                      ) : (
                        this.handleOnClickCopyTarget({
                           targetId: value.get('id'),
                           name: 'courses',
                        })
                      )}
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
                      leftIcon={copyMethod === 'copyEntireChapter' ? undefined : <GoLeftSvg />}
                      primaryText={value.get('groupName')}
                      menuItems={copyMethod === 'copyEntireChapter' ? (
                        undefined
                      ) : (
                        value.get('chapters').map((item) => (
                          <MenuItem
                            key={item.get('id')}
                            primaryText={item.get('name')}
                            onClick={this.handleOnClickCopyTarget({
                              targetId: value.get('library'),
                              targetChapterId: item.get('id'),
                              name: 'courseGroups',
                            })}
                          />
                        )).toList().toJS()
                      )}
                      onClick={copyMethod === 'copySelectedQuestionItems' ? (
                        undefined
                      ) : (
                        this.handleOnClickCopyTarget({
                          targetId: value.get('library'),
                          name: 'courseGroups',
                        })
                      )}
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
                      leftIcon={copyMethod === 'copyEntireChapter' ? undefined : <GoLeftSvg />}
                      primaryText={value.get('name')}
                      menuItems={copyMethod === 'copyEntireChapter' ? (
                        undefined
                      ) : (
                        value.get('chapters').map((item) => (
                          <MenuItem
                            key={item.get('id')}
                            primaryText={item.get('name')}
                            onClick={this.handleOnClickCopyTarget({
                              targetId: value.get('id'),
                              targetChapterId: item.get('id'),
                              name: 'classrooms',
                            })}
                          />
                        )).toList().toJS()
                      )}
                      onClick={copyMethod === 'copySelectedQuestionItems' ? (
                        undefined
                      ) : (
                        this.handleOnClickCopyTarget({
                          targetId: value.get('id'),
                          name: 'classrooms',
                        })
                      )}
                    />
                  )).toList().toJS()}
                />
              </Menu>}
            </Popover>
          </div>
        </div>
        <fieldset className={styles.filter}>
          <legend>{'筛选'}</legend>
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
        </fieldset>
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
        <Dialog
          title={'请决定复制方式'}
          actions={[
            <FlatButton
              key={'closeDialog'}
              label={'关闭对话框'}
              onClick={this.handleOnCloseCopyMethodDialog}
            />,
            <FlatButton
              key={'copyEntireChapter'}
              label={'带章节信息'}
              primary
              onClick={this.handleOnDecideCopyMethod({
                method: 'copyEntireChapter',
              })}
            />,
            <FlatButton
              key={'copySelectedQuestionItems'}
              label={'仅复制选中项'}
              primary
              onClick={this.handleOnDecideCopyMethod({
                method: 'copySelectedQuestionItems',
              })}
            />,
          ]}
          open={showCopyMethodDialog}
          onRequestClose={this.handleOnCloseCopyMethodDialog}
        >
          {'您当前选择的项目中，下列章节中的项目被全部选中，请选择哪些章节需要整体复制到指定位置'}
          {needDecideCopyEntireChapterList.map((value) => (
            <Toggle
              key={value.get('id')}
              label={value.get('name')}
              onToggle={handleOnSelectNeedCopyEntireChapter({
                id: value.get('id'),
              })}
              toggled={decidedCopyEntireChapterList.has(value.get('id'))}
            />
          )).toJS()}
        </Dialog>
      </div>
    )
  }
}
