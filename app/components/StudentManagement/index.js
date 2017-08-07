/**
*
* StudentManagement
*
*/

import React from 'react'
import PropTypes from 'prop-types'
import StudentInfomation from 'components/StudentInfomation'
import StudentCardContainer from 'components/StudentCardContainer'
import StudentManagementSidebar from 'components/StudentManagementSidebar'
import {
  getStudentFromGroupList,
} from './helper'
import styles from './styles'

export default class StudentManagement extends React.PureComponent {
  static propTypes = {
    groupList: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string,
      studentList: PropTypes.arrayOf(PropTypes.object),
    })),
  }

  static defaultProps = {
    groupList: [{ name: '', studentList: [{}] }],
  }

  state = {
    clickedGroup: null,
    showStudentInfomation: false,
    studentInfomation: {},
  }

  handleOnClickEditGroup = () => {
    console.log('你点击了小组编辑按钮')  // eslint-disable-line
  }

  handleOnClickGroup = (value) => () => {
    if (value === 'all') {
      this.setState({ clickedGroup: null })
    } else {
      this.setState({ clickedGroup: value })
    }
    this.setState({ showStudentInfomation: false })
  }

  handleOnClickCard = (value) => () => {
    const {
      groupList,
    } = this.props
    this.setState({
      showStudentInfomation: true,
      studentInfomation: getStudentFromGroupList(groupList, value),
    })
  }

  handleOnCloseCard = () => {
    this.setState({ showStudentInfomation: false })
  }

  render() {
    const {
      groupList,
    } = this.props
    const {
      clickedGroup,
      showStudentInfomation,
      studentInfomation,
    } = this.state
    const contentClass = `${styles.content} ${showStudentInfomation ? styles.contentHidden : ''}`

    return (
      <div className={styles.container}>
        <StudentManagementSidebar
          groupList={groupList}
          handleOnClickEditGroup={this.handleOnClickEditGroup}
          handleOnClickGroup={this.handleOnClickGroup}
        />
        <div className={contentClass}>
          {groupList.map((value, index) => {
            if ((clickedGroup !== null && clickedGroup === index) || clickedGroup === null) {
              return (
                <StudentCardContainer
                  key={value.name}
                  title={value.name}
                  color={value.color}
                  studentList={value.studentList}
                  handleOnClickCard={this.handleOnClickCard}
                />
              )
            }
            return null
          })}
          <StudentInfomation
            open={showStudentInfomation}
            avatar={studentInfomation.avatar}
            name={studentInfomation.name}
            nickName={studentInfomation.nickName}
            gender={studentInfomation.gender}
            school={studentInfomation.school}
            college={studentInfomation.college}
            className={studentInfomation.className}
            studentId={studentInfomation.studentId}
            order={studentInfomation.order}
            birthday={studentInfomation.birthday}
            location={studentInfomation.location}
            introduction={studentInfomation.introduction}
            education={studentInfomation.education}
            job={studentInfomation.job}
            email={studentInfomation.email}
            QQ={studentInfomation.QQ}
            phone={studentInfomation.phone}
            handleOnClickClose={this.handleOnCloseCard}
          />
        </div>
      </div>
    )
  }
}
