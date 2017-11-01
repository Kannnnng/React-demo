import Mock from 'mockjs'
import moment from 'moment'

export default Mock.mock({
  DiscussionHeader: {
    title: '@CTITLE()',
    checkedTab: /speakContent|keyWord|Pics/,
    'isDiscussionOpening|1': true,
  },
  CountDown: {
    title: '倒计时组件',
    'limit|1000-5000': 1,
  },
  DiscussionPicModeElement: {
    avatar: Mock.Random.dataImage('100x100', 'avatar'),
    name: '@CNAME()',
    picture: Mock.Random.dataImage('100x100', 'picture'),
  },
  RoundProgressBar: {
    display: '进度显示器',
    'percent|0-100': 1,
    color: '@COLOR()',
    'width|5-20': 1,
  },
  StudentManagement: {
    'groupList|3': [
      {
        name: '@CTITLE(3)',
        color: '@UPPER(@COLOR)',
        'studentList|5': [
          {
            key: '@GUID()',
            id: '@GUID()',
            name: '@CNAME()',
            avatar: Mock.Random.dataImage('100x100', 'avatar'),
            studentId: '@ID()',
            nickName: '@CTITLE()',
            'gender|1': [1, 2],
            school: '@CTITLE()大学',
            college: '@CTITLE()学院',
            className: '@CTITLE(3)班',
            order: /\d{3}/,
            birthday: '@DATE()',
            location: '@PROVINCE()',
            introduction: '@CPARAGRAPH()',
            education: /小学|初中|高中|大学|硕士|博士|博后/,
            job: /开发|设计|后端|前端|美工|教师|工人|学生|教授|傻逼/,
            email: '@EMAIL()',
            QQ: /[1-9]{9}/,
            phone: /(139|131|138|152|155|186)\d{8}/,
            status: /late|skipClasses/,
          },
        ],
      },
    ],
  },
  DiscussionPicPreview: {
    avatar: Mock.Random.dataImage('100x100', 'avatar'),
    content: '@CPARAGRAPH()',
    date: '@TIME()',
    id: '@GUID()',
    'isAgree|1': true,
    name: '@CNAME()',
    pictures: [
      Mock.Random.dataImage('100x100', 'picture'),
    ],
  },
  SelectLibrary: {
    'data|5-8': [
      {
        libraryId: '@GUID()',
        libraryName: '@CTITLE()题库',
        cover: Mock.Random.dataImage('100x100', 'cover'),
        'questionNumber|1-100': 1,
        'quizNumber|1-100': 1,
        'coursewareNumber|1-100': 1,
        'hasJoin|1': true,
      }
    ],
  },
  QuestionPreviewBoard: {
    'comments|3-5': [
      {
        id: '@GUID()',
        name: '@CNAME()',
        avatar: Mock.Random.dataImage('100x100', 'avatar'),
        createTime: `${moment().format('YYYY-MM-DD')} @TIME()`,
        'like|0-100': 1,
        comment: '@CSENTENCE()',
      }
    ],
    questionContent: {
      content: `<p>这是一段测试文本<span>这是一个行内元素</span><img src="${Mock.Random.dataImage('100x100', 'picture')}" alt="" /></p>`,  // eslint-disable-line
      title: {
        'pattern|1-6': 1,
        'difficulty|1-5': 1,
        serialNumber: /[A-Z]\d{5}/,
      },
    },
    questionAnswer: {
      answer: {
        easyWrongOption: /A?B?C?D?/,
        'hasCorrectness|1': true,
        'answerCount|0-100': 1,
        'studentCount|0-100': 1,
        'correctRate|0-100': 1,
        'referenceCount|0-100': 1,
        'usageCount|0-100': 1,
        'correctAnswer|1': true,
        'strict|1': true,
        'isRequired|1': true,
        'limit|0-100': 1,
        items: () => {
          const correctAnswerIndex = Math.floor(Math.random() * 4)
          const result = []
          for (let index = 0; index < 4; index++) {
            result.push({
              id: '@GUID()',
              content: '@TITLE()',
              correctAnswer: index === correctAnswerIndex,
              'myAnswer|1': true,
              'attaches|1-3': [
                Mock.Random.dataImage('100x100', 'picture'),
              ],
              isCorrect: () => this.myAnswer === this.correctAnswer,
            })
          }
          return result
        },
        'isAllCorrect|1': true,
      },
      'isAnswerOpen|1': true,
      'isAnswered|1': true,
      'canAnswer|1': true,
      pattern: '@../questionContent/title/pattern',
      'subQuestionIndex|0-1000': 1,
      id: '@GUID()',
      'limit|0-100': 1,
      serialNumber: '@../questionContent/title/serialNumber',
      difficulty: '@../questionContent/title/difficulty',
      'oddTime|0-100': 1,
    },
    answerAnalysis: {
      data: {
        'labels|3-5': [
          {
            id: '@GUID()',
            text: '@CSENTENCE()',
          },
        ],
        review: '@CSENTENCE()',
      },
      'isAnswered|1': true,
      'isAnswerOpen|1': true,
      'canAnswer|1': true,
      'subQuestionIndex|0-1000': 1,
    },
  },
  DiscussionBottomToolBar: {
    'attendeeCount|100': 1,
    'messageCount|100': 1,
    'groupList|5': [
      {
        name: '@CTITLE(3)小组',
        'id|+1': 10000,
        color: '@UPPER(@COLOR)',
        'students|10': [
          {
            'studentId|+1': 20000,
            'messageCount|0-10': 1,
          },
        ],
      },
    ],
    'studentGroupList|5': {
      '10000|5-20': [
        {
          'id|+1': 20000,
          name: '@CNAME()',
          avatar: Mock.Random.dataImage('100x100', 'avatar'),
          'messagesCount|0-10': 1,
        },
      ],
      '10001|5-20': [
        {
          'id|+1': 20000,
          name: '@CNAME()',
          avatar: Mock.Random.dataImage('100x100', 'avatar'),
          'messagesCount|0-10': 1,
        },
      ],
      '10002|5-20': [
        {
          'id|+1': 20000,
          name: '@CNAME()',
          avatar: Mock.Random.dataImage('100x100', 'avatar'),
          'messagesCount|0-10': 1,
        },
      ],
      '10003|5-20': [
        {
          'id|+1': 20000,
          name: '@CNAME()',
          avatar: Mock.Random.dataImage('100x100', 'avatar'),
          'messagesCount|0-10': 1,
        },
      ],
      '10004|5-20': [
        {
          'id|+1': 20000,
          name: '@CNAME()',
          avatar: Mock.Random.dataImage('100x100', 'avatar'),
          'messagesCount|0-10': 1,
        },
      ],
    },
  },
})
