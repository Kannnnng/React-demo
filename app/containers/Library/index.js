/**
 *
 * Name: Library
 * Date: 2017-11-03 10:31:39
 * Description: 题库页面
 * Author: Einskang
 * Organization: HUST
 *
 */

import React from 'react'
import PropTypes from 'prop-types'
import ImmutablePropTypes from 'react-immutable-proptypes'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { fromJS } from 'immutable'
import jQuery from 'jquery'
import Badge from 'material-ui/Badge'
import List from 'material-ui/List/List'
import ListItem from 'material-ui/List/ListItem'
import makeSelectable from 'material-ui/List/makeSelectable'
import GroupSvg from 'material-ui/svg-icons/action/group-work'
import HumanSvg from 'material-ui/svg-icons/action/accessibility'
import ClassroomSvg from 'material-ui/svg-icons/action/supervisor-account'
import SubDirectory from 'material-ui/svg-icons/navigation/subdirectory-arrow-right'
import Snackbar from 'material-ui/Snackbar'
import Pagination from 'components/Pagination'
import QuestionPreviewBoard from 'components/QuestionPreviewBoard'
import Loading from 'components/Loading'
import {
  questionPattern,
  immutableObjectEmpty,
} from 'utils/constants'
import CurrentChoice from './CurrentChoice'
import QuestionItem from './QuestionItem'
import * as acts from './actions'
import selector from './selector'
import styles from './styles'

const SelectableList = makeSelectable(List)

class Library extends React.PureComponent {
  static propTypes = {
    /* actions */
    actions: PropTypes.object.isRequired,
    /* 教师的基本信息 */
    myInfomation: ImmutablePropTypes.map,
    /* 教室本人的所有课程 */
    myCourses: ImmutablePropTypes.map,
    /* 教师本人参与的所有课程组 */
    myCourseGroups: ImmutablePropTypes.map,
    /* 教师本人的所有课堂 */
    myClassrooms: ImmutablePropTypes.map,
    /* 当前选择的课程、课程组或课堂所包含的章节信息 */
    selectedCollectionChapters: ImmutablePropTypes.list,
    /* 当前选择的课程、课程组或课堂所包含的知识点信息 */
    selectedCollectionLabels: ImmutablePropTypes.map,
    /* 当前选择的课程、课程组或课堂所包含的经过筛选条件筛选后的所有题目、组卷和课件 */
    selectedCollectionAllQuestionItems: ImmutablePropTypes.orderedMap,
    /* 当前选择的课程、课程组或课堂所包含的已经经过分页操作的题目、组卷和课件 */
    /* 已经经过分页操作，每页最多显示 10 个条目，因此该属性的 size 小于等于 10 */
    /* 因为要求最新创建的题目、组卷和课件在最前面，因此需要使用 orderedMap */
    selectedCollectionQuestionItems: ImmutablePropTypes.orderedMap,
    /* 当前设置的筛选条件 */
    /* 使用数组的原因是需要有显示顺序，显示效果类似于 全部 > 章节 > 搜索 > 手动选择 */
    filterConditions: ImmutablePropTypes.list,
    /* 经过分页操作以后，计算出的总页数 */
    totalPages: PropTypes.number.isRequired,
    /* 当前页码 */
    currentPageNumber: PropTypes.number.isRequired,
    /* 当前课程、课程组或课堂中选定的所有题目、组卷和课件集合，每个对象存有其 ID 和 name 属性 */
    selectedAllQuestionItems: ImmutablePropTypes.mapOf(
      ImmutablePropTypes.mapContains({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
      }),
      PropTypes.string.isRequired,
    ),
    /* 当前已经选择的题目、组卷和课件集合 */
    selectedCurrentQuestionItems: ImmutablePropTypes.mapOf(
      ImmutablePropTypes.mapContains({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
      }),
      PropTypes.string.isRequired,
    ),
    /* 当前要求显示预览效果的题目或组卷 */
    /* 课件的预览直接跳转至预览页面 */
    previewQuestionItem: ImmutablePropTypes.map,
    /* 异步请求的状态标志位 */
    status: ImmutablePropTypes.map,
    /* 需要用户确定哪些章节需要整体复制（带章节信息） */
    needDecideCopyEntireChapterList: ImmutablePropTypes.list,
    /* 当前用户决定整体复制的章节信息集合 */
    decidedCopyEntireChapterList: ImmutablePropTypes.map,
  }

  state = {
    selectableListValue: null,
    currentQuizPage: 1,
  }

  componentWillMount() {
    /* 获取教师本人的所有课程 */
    this.props.actions.getMyAllCoursesAction()
    /* 获取教师本人参与的所有课程组 */
    this.props.actions.getMyAllCourseGroupsAction()
    /* 获取教师本人的所有课堂 */
    this.props.actions.getMyAllClassroomsAction()
  }

  /* 当左侧被选中的项发生变化时触发 */
  handleOnSelectableListChange = (event, value) => {
    if (value === '我的课程' || value === '课程组' || !value) {
      this.props.actions.selectCourseOrCourseGroupOrClassroomAction(null)
    } else {
      const [name, id] = value.split('|')
      this.props.actions.selectCourseOrCourseGroupOrClassroomAction({
        id,
        name,
      })
      this.props.actions.initialGetQuestionsByIdStatusAction({
        status: 'doing',
        name,
      })
      switch (name) {
        case 'course':
          this.props.actions.getQuestionsByCourseIdAction({
            courseId: id,
          })
          break
        case 'courseGroup':
          this.props.actions.getQuestionsByCourseGroupIdAction({
            courseGroupId: id,
          })
          break
        case 'classroom':
          this.props.actions.getQuestionsByClassroomIdAction({
            classroomId: id,
          })
          break
        default:
          break
      }
    }
    this.setState({ selectableListValue: value })
  }

  /* 当底部页码发生变化时触发 */
  handleOnPageChange = (number) => {
    this.props.actions.pageNumberChangeAction({
      number,
    })
  }

  /* 取消某一个筛选条件 */
  handleOnClickCurrentChoiceCancel = ({ name }) => () => {
    this.props.actions.deleteConditionAction({
      name,
    })
  }

  /* 将选择好的题目、组卷和课件复制到指定位置 */
  handleOnClickCopyTarget = (value) => {
    this.props.actions.initialCopyQuestionItemToLibraryStatusAction({
      status: 'doing',
    })
    this.props.actions.copyQuestionItemToLibraryAction({
      ...value,
      /* 如果用户选择了将整个章节全部复制，那么可以不提供该章节中具体包含了哪些题目、组卷和课件 */
      /* 给一个空数组即可 */
      selectedQuestionItems: value.copyMethod === 'copyEntireChapter' ? (
        []
      ) : (
        this.props.selectedCurrentQuestionItems.toList().toJS()
      ),
      sourceChapter: value.copyMethod !== 'copyEntireChapter' ? (
        undefined
      ) : (
        this.props.selectedCollectionChapters.find((value) => (
          value.get('id') === this.props.filterConditions.getIn(['0', 'id'])
        )).toJS()
      ),
    })
  }

  /* 将某一章节作为筛选条件 */
  handleOnClickChapter = ({ id }) => () => {
    this.props.actions.selectChpaterAction({
      id,
    })
  }

  /* 利用搜索文本作为筛选条件 */
  handleOnClickSearch = ({ value }) => {
    this.props.actions.filterQuestionsBySearchAction({
      searchText: value,
    })
  }

  /* 预览某一题目或组卷 */
  handleOnClickQuestionItem = ({ id, name }) => () => {
    this.props.actions.previewQuestionItemAction({
      id,
      name,
    })
  }

  /* 选中某一题目、组卷或课件 */
  handleOnQuestionItemCheck = ({ id, name }) => (event, isChecked) => {
    const sourcePosition = event.currentTarget.getClientRects()[0]
    const targetPosition = jQuery('#questionItemShoppingCartTarget')[0].getClientRects()[0]
    if (isChecked) {
      jQuery('#questionItemShoppingCartTarget')
        .css({ opacity: '1' })
        .prev()
        .css({ opacity: '1' })
      /* 如果选中，则显示点击以后的类似“商品进入购物车”动画 */
      jQuery('#questionItemShoppingCartSource')
        .clone()
        .attr({
          id: 'questionItemShoppingCartSourceDuplicate',
        })
        .appendTo('body')
        .css({
          display: 'inline-block',
          top: `${sourcePosition.top + 12}px`,
          left: `${sourcePosition.left + 37}px`,
        })
        .animate({
          top: `${targetPosition.top + 10}px`,
          left: `${targetPosition.left + 45}px`,
        }, '350', () => {
          jQuery('#questionItemShoppingCartSourceDuplicate').remove()
          this.props.actions.selectQuestionItemAction({
            id,
            name,
            isChecked,
          })
        })
    } else {
      this.props.actions.selectQuestionItemAction({
        id,
        name,
        isChecked,
      })
    }
  }

  /* 查看组卷的下一道题目 */
  handleOnPreQuizPageInPreview = () => {
    this.setState({ currentQuizPage: this.state.currentQuizPage - 1 })
  }

  /* 查看组卷的上一道题目 */
  handleOnNextQuizPageInPreview = () => {
    this.setState({ currentQuizPage: this.state.currentQuizPage + 1 })
  }

  /* 关闭题目或组卷的预览 */
  handleOnClosePreviewQuestionItem = () => {
    this.setState({ currentQuizPage: 1 })
    this.props.actions.closePreviewQuestionItemAction()
  }

  handleOnAutoInitialStatus = ({ name }) => () => {
    const mapNameToInitialStatusAction = {
      copy: this.props.actions.initialCopyQuestionItemToLibraryStatusAction,
      course: this.props.actions.initialGetQuestionsByIdStatusAction,
      courseGroup: this.props.actions.initialGetQuestionsByIdStatusAction,
      classroom: this.props.actions.initialGetQuestionsByIdStatusAction,
    }
    mapNameToInitialStatusAction[name]({
      status: 'initial',
      name
    })
  }

  /* 点击筛选区全选按钮时被触发 */
  handleOnClickSelectAll = () => {
    const {
      selectedCollectionAllQuestionItems,
      selectedCurrentQuestionItems,
    } = this.props
    if (
      selectedCollectionAllQuestionItems.size === selectedCurrentQuestionItems.size &&
      selectedCurrentQuestionItems.size !== 0
    ) {
      this.props.actions.selectAllQuestionItemsAction({
        allQuestionItems: selectedCollectionAllQuestionItems.keySeq(),
        type: 'selectNothing',
      })
    } else {
      const allQuestionItems = selectedCollectionAllQuestionItems.reduce((result, value) => {
        if (value.get('isCourseware')) {
          return result.set(value.get('id'), fromJS({
            id: value.get('id'),
            name: 'courseware',
          }))
        } else if (value.get('isQuiz')) {
          return result.set(value.get('id'), fromJS({
            id: value.get('id'),
            name: 'quiz',
          }))
        }
        return result.set(value.get('id'), fromJS({
          id: value.get('id'),
          name: 'question',
        }))
      }, immutableObjectEmpty)
      this.props.actions.selectAllQuestionItemsAction({
        allQuestionItems,
        type: 'selectAll',
      })
    }
  }

  /* 点击显示选中的课程、课程组或课堂中的所有题目、组卷和课件 */
  handleOnClickShowAllQuestionItems = () => {
    this.props.actions.showAllQuestionItemsAction()
  }

  /* 点击显示当前所有选中的题目、组卷和课件 */
  handleOnClickShowAllSelectedQuestionItems = () => {
    this.props.actions.showAllSelectedQuestionItemsAction()
  }

  /* 当某一个需要全部复制到指定位置的章节被选中时触发 */
  handleOnSelectNeedCopyEntireChapter = ({ id }) => (event, isInputChecked) => {
    this.props.actions.selectNeedCopyEntireChapterAction({
      id,
      isSelected: isInputChecked,
    })
  }

  render() {
    const {
      myInfomation,
      myClassrooms,
      myCourses,
      myCourseGroups,
      selectedCollectionChapters,
      selectedCollectionLabels,
      selectedCollectionQuestionItems,
      filterConditions,
      totalPages,
      currentPageNumber,
      selectedAllQuestionItems,
      selectedCurrentQuestionItems,
      previewQuestionItem,
      status,
      needDecideCopyEntireChapterList,
      decidedCopyEntireChapterList,
    } = this.props
    const {
      selectableListValue,
      currentQuizPage,
    } = this.state

    return (
      <div className={styles.container}>
        <div className={styles.leftArea}>
          <SelectableList
            value={selectableListValue}
            onChange={this.handleOnSelectableListChange}
          >
            <ListItem
              primaryText={'我的课程'}
              leftIcon={<HumanSvg />}
              initiallyOpen={false}
              nestedItems={myCourses.map((value) => (
                <ListItem
                  key={value.get('id')}
                  leftIcon={<SubDirectory />}
                  value={`course|${value.get('id')}`}
                >
                  {!value.get('newCopyedQuestionItemNumbers') ? (
                    value.get('name')
                  ) : (
                    <Badge
                      badgeContent={value.get('newCopyedQuestionItemNumbers')}
                      badgeStyle={{ top: '-15px' }}
                      secondary
                      style={{
                        paddingTop: '0',
                        paddingBottom: '0',
                        paddingLeft: '0',
                      }}
                    >
                      {value.get('name')}
                    </Badge>
                  )}
                </ListItem>
              )).toList().toJS()}
              value={'我的课程'}
            />
            <ListItem
              primaryText={'课程组'}
              leftIcon={<GroupSvg />}
              initiallyOpen={false}
              nestedItems={myCourseGroups.map((value) => (
                <ListItem
                  key={value.get('groupId')}
                  leftIcon={<SubDirectory />}
                  value={`courseGroup|${value.get('groupId')}`}
                >
                  {!value.get('newCopyedQuestionItemNumbers') ? (
                    value.get('groupName')
                  ) : (
                    <Badge
                      badgeContent={value.get('newCopyedQuestionItemNumbers')}
                      badgeStyle={{ top: '-15px' }}
                      secondary
                      style={{
                        paddingTop: '0',
                        paddingBottom: '0',
                        paddingLeft: '0',
                      }}
                    >
                      {value.get('groupName')}
                    </Badge>
                  )}
                </ListItem>
              )).toList().toJS()}
              value={'课程组'}
            />
          </SelectableList>
          <SelectableList
            value={selectableListValue}
            onChange={this.handleOnSelectableListChange}
            style={{ borderTop: 'dashed 1px #666' }}
          >
            {myClassrooms.map((value) => (
              <ListItem
                key={value.get('id')}
                leftIcon={<ClassroomSvg />}
                value={`classroom|${value.get('id')}`}
              >
                {!value.get('newCopyedQuestionItemNumbers') ? (
                  value.get('name')
                ) : (
                  <Badge
                    badgeContent={value.get('newCopyedQuestionItemNumbers')}
                    badgeStyle={{ top: '-15px' }}
                    secondary
                    style={{
                      paddingTop: '0',
                      paddingBottom: '0',
                      paddingLeft: '0',
                    }}
                  >
                    {value.get('name')}
                  </Badge>
                )}
              </ListItem>
            )).toList().toJS()}
          </SelectableList>
        </div>
        <div className={styles.rightArea}>
          <div className={styles.functionalArea}>
            <CurrentChoice
              conditions={filterConditions}
              courses={myCourses}
              courseGroups={myCourseGroups}
              classrooms={myClassrooms}
              chapters={selectedCollectionChapters}
              isSelectedCurrentQuestionItemsEmpty={selectedAllQuestionItems.isEmpty()}
              isSelectAll={(
                selectedCollectionQuestionItems.size === selectedCurrentQuestionItems.size &&
                selectedCurrentQuestionItems.size !== 0
              )}
              needDecideCopyEntireChapterList={needDecideCopyEntireChapterList}
              decidedCopyEntireChapterList={decidedCopyEntireChapterList}
              isCopyEntireChapter={filterConditions.getIn(['0', 'number']) === selectedCurrentQuestionItems.size}
              handleOnClickCancel={this.handleOnClickCurrentChoiceCancel}
              handleOnClickCopyTarget={this.handleOnClickCopyTarget}
              handleOnClickChapter={this.handleOnClickChapter}
              handleOnClickSearch={this.handleOnClickSearch}
              handleOnClickSelectAll={this.handleOnClickSelectAll}
              handleOnClickShowAllQuestionItems={this.handleOnClickShowAllQuestionItems}
              handleOnClickShowAllSelectedQuestionItems={this.handleOnClickShowAllSelectedQuestionItems}
              handleOnSelectNeedCopyEntireChapter={this.handleOnSelectNeedCopyEntireChapter}
            />
          </div>
          <div className={styles.displayArea}>
            {selectedCollectionQuestionItems.map((value) => (
              <QuestionItem
                key={value.get('id')}
                id={value.get('id')}
                pattern={value.get('pattern')}
                difficulty={value.get('difficulty')}
                summary={value.get('isCourseware') ? ({
                  word: value.get('name'),
                  image: value.get('cover'),
                }) : (
                  value.get('isQuiz') ? ({
                    word: value.get('title'),
                  }) : (
                    value.get('summary').toJS()
                  )
                )}
                correctRate={parseInt(value.get('correct'), 10)}
                answerCount={parseInt(value.get('studentCount'), 10)}
                isQuiz={value.get('isQuiz')}
                isCourseware={value.get('isCourseware')}
                fileType={value.get('fileType')}
                isChecked={selectedAllQuestionItems.has(value.get('id'))}
                previewUrl={value.get('previewUrl')}
                handleOnClick={this.handleOnClickQuestionItem}
                handleOnQuestionItemCheck={this.handleOnQuestionItemCheck}
              />
            )).toList().toJS()}
            <Pagination
              total={totalPages}
              currentNumber={currentPageNumber}
              handleOnChange={this.handleOnPageChange}
            />
          </div>
        </div>
        {/* 题目预览 */}
        {!previewQuestionItem.isEmpty() && (
          <QuestionPreviewBoard
            open
            data={myInfomation.toJS()}
            comments={undefined}
            questionContent={{
              content: previewQuestionItem.getIn(['content', 'html']),
              title: previewQuestionItem.get('title'),
            }}
            questionAnswer={{
              pattern: previewQuestionItem.get('pattern'),
              answer: previewQuestionItem.get('pattern') === questionPattern.group ? (
                previewQuestionItem.get('subQuestions').toJS()
              ) : (!previewQuestionItem.get('isQuiz') ? {
                items: previewQuestionItem.get('items') ? (
                  previewQuestionItem.get('items').toJS()
                ) : undefined,
                correctAnswer: previewQuestionItem.get('correctAnswer'),
              } : undefined),
              img: previewQuestionItem.getIn(['answer', 'summary', 'image']),
              coursewareName: previewQuestionItem.get('name'),
              previewUrl: previewQuestionItem.get('previewUrl'),
            }}
            answerAnalysis={!previewQuestionItem.get('isQuiz') ? {
              data: {
                review: previewQuestionItem.getIn(['review', 'html']),
                labels: previewQuestionItem.get('labels') ? (
                  previewQuestionItem.get('labels').toJS()
                ) : undefined,
                questionId: previewQuestionItem.get('id'),
              }
            } : undefined}
            prePaperPage={this.handleOnPreQuizPageInPreview}
            nextPaperPage={this.handleOnNextQuizPageInPreview}
            subsInPaper={previewQuestionItem.get('subQuestions')}
            isPaper={previewQuestionItem.get('isQuiz')}
            paperTitle={previewQuestionItem.get('title')}
            isPreview
            allKnowledgePoint={selectedCollectionLabels}
            currentPaperPage={currentQuizPage}
            handleOnClickGoBack={this.handleOnClosePreviewQuestionItem}
          />
        )}
        {(
          status.get('copyQuestionItemToLibraryStatus') === 'doing' ||
          status.get('getQuestionsByCourseIdStatus') === 'doing' ||
          status.get('getQuestionsByCourseGroupIdStatus') === 'doing' ||
          status.get('getQuestionsByClassroomIdStatus') === 'doing'
        ) && (
          <div className={styles.loading}>
            <Loading
              text={'请稍等'}
            />
          </div>
        )}
        <div>
          <Snackbar
            autoHideDuration={2000}
            contentStyle={{ color: 'red', fontSize: '18px', textAlign: 'center' }}
            open={status.get('copyQuestionItemToLibraryStatus') === 'failed'}
            message={'复制失败'}
            onRequestClose={this.handleOnAutoInitialStatus({
              name: 'copy',
            })}
          />
          <Snackbar
            autoHideDuration={2000}
            contentStyle={{ color: 'red', fontSize: '18px', textAlign: 'center' }}
            open={status.get('getQuestionsByCourseIdStatus') === 'failed'}
            message={'获取课程中的题目失败'}
            onRequestClose={this.handleOnAutoInitialStatus({
              name: 'course',
            })}
          />
          <Snackbar
            autoHideDuration={2000}
            contentStyle={{ color: 'red', fontSize: '18px', textAlign: 'center' }}
            open={status.get('getQuestionsByCourseGroupIdStatus') === 'failed'}
            message={'获取课程组中的题目失败'}
            onRequestClose={this.handleOnAutoInitialStatus({
              name: 'courseGroup',
            })}
          />
          <Snackbar
            autoHideDuration={2000}
            contentStyle={{ color: 'red', fontSize: '18px', textAlign: 'center' }}
            open={status.get('getQuestionsByClassroomIdStatus') === 'failed'}
            message={'获取课堂中的题目失败'}
            onRequestClose={this.handleOnAutoInitialStatus({
              name: 'classroom',
            })}
          />
        </div>
        <Badge
          id={'questionItemShoppingCartSource'}
          badgeContent={''}
          badgeStyle={{ width: '12px', height: '12px' }}
          secondary
          style={{
            display: 'none',
            paddingTop: '0',
            paddingBottom: '0',
            paddingLeft: '0',
            lineHeight: '0',
            position: 'absolute',
            zIndex: '1000',
          }}
        />
      </div>
    )
  }
}

const mapStateToProps = () => {
  return selector
}

const mapDispatchToProps = (dispatch) => {
  const actions = {
    ...acts,
  }
  const actionMap = {
    actions: bindActionCreators(actions, dispatch)
  }
  return actionMap
}

export default connect(mapStateToProps, mapDispatchToProps)(Library)
