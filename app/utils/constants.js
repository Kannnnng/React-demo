import { fromJS } from 'immutable'

/* 单题题目类型，分别为单选、多选、判断、填空、简答、题组 */
export const questionPattern = {
  singleSelection: 1,
  multipleChoice: 2,
  judge: 3,
  fillInTheBlanks: 4,
  shortAnswer: 5,
  group: 6,
}

/* 26 个大写英文字母 */
export const letter = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']  // eslint-disable-line

/* 1 + cos(x) 函数在 [0, 𝛑] 每隔两个点一个值，之后删除相对较小的 13 个值，共 17 个函数值 */
export const cosCurve = [
  0.019801980198019802,
  0.01975803925349584,
  0.019626606442858307,
  0.01940884837303904,
  0.019106697880081697,
  0.018722836873152158,
  0.01826067252972292,
  0.01772430705322466,
  0.017118501261598133,
  0.01644863232993715,
  0.015720646062301717,
  0.01494100411634031,
  0.014116626649159135,
  0.013254830893517738,
  0.012363266209553017,
  0.011449846188517137,
  0.010522678411181322,
]

/* immutable 数据结构中的空对象  */
export const immutableObjectEmpty = fromJS({})

/* immutable 数据结构中的空数组  */
export const immutableArrayEmpty = fromJS([])

/* 目前支持的课件对应的名称和图标 */
export const coursewareAssets = {
  pdf: {
    text: 'PDF',
    icon: require('images/pdf.png'),
  },
  ppt: {
    text: 'POWERPOINT',
    icon: require('images/ppt.png'),
  },
  doc: {
    text: 'WORD',
    icon: require('images/word.png'),
  },
  docx: {
    text: 'WORD',
    icon: require('images/word.png'),
  },
  xls: {
    text: 'EXCEL',
    icon: require('images/excel.png'),
  },
  xlsx: {
    text: 'EXCEL',
    icon: require('images/excel.png'),
  },
  wps: {
    text: 'WPS文字',
    icon: require('images/wpsWord.png'),
  },
  et: {
    text: 'WPS表格',
    icon: require('images/wpsExcel.png'),
  },
  dps: {
    text: 'WPS演示',
    icon: require('images/wpsPPT.png'),
  },
  rtf: {
    text: 'PDF',
    icon: require('images/rtf.png'),
  },
}
