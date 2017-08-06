import React from 'react'
import PropTypes from 'prop-types'
import IconButton from 'material-ui/IconButton'
import List from 'material-ui/List/List'
import ListItem from 'material-ui/List/ListItem'
import styles from './styles'

export default function StudentManagementSidebar({
  groupList,
  handleOnClickEditGroup,
  handleOnClickGroup,
}) {
  const allStudentsCount = groupList.reduce((result, value) => result + value.studentList.length, 0)
  return (
    <div className={styles.container}>
      <List>
        <ListItem
          primaryText={'全部学生'}
          leftIcon={<i className={styles.allStudents} />}
          rightIcon={<span className={styles.count}>{allStudentsCount}</span>}
          onTouchTap={handleOnClickGroup('all')}
        />
        <ListItem
          primaryText={'学生分组'}
          leftIcon={<i className={styles.studentGroups} />}
          rightIconButton={(
            <IconButton
              className={styles.editGroup}
              onTouchTap={handleOnClickEditGroup}
            >
              {'编辑'}
            </IconButton>
          )}
          initiallyOpen
          nestedItems={
            groupList.map((value, index) => (
              <ListItem
                key={value.name}
                primaryText={value.name}
                innerDivStyle={{ paddingLeft: '45px' }}
                leftIcon={<i className={styles.groupColor} style={{ backgroundColor: value.color }} />}
                rightIcon={<span className={styles.count}>{value.studentList.length}</span>}
                onTouchTap={handleOnClickGroup(index)}
              />
            ))
          }
        />
      </List>
    </div>
  )
}

StudentManagementSidebar.propTypes = {
  groupList: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    studentList: PropTypes.arrayOf(PropTypes.object),
  })),
  handleOnClickEditGroup: PropTypes.func,
  handleOnClickGroup: PropTypes.func,
}

StudentManagementSidebar.defaultProps = {
  groupList: [{ name: '', studentList: [{}] }],
  handleOnClickEditGroup: () => {},
  handleOnClickGroup: () => () => {},
}
