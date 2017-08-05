export function getStudentFromGroupList(
  groupList,
  id,
) {
  for (let i = 0, len = groupList.length; i < len; i += 1) {
    for (let j = 0, length = groupList[i].studentList.length; j < length; j += 1) {
      if (groupList[i].studentList[j].id === id) {
        return groupList[i].studentList[j]
      }
    }
  }

  return null
}
