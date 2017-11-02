import Mock, { Random } from 'mockjs'
import moment from 'moment'

export default Mock.mock({
  DiscussionHeader: {
    title: '@CTITLE()',
    checkedTab: /speakContent|keyWord|Pics/,
    isDiscussionOpening: Random.boolean(),
  },
  CountDown: {
    title: '倒计时组件',
    limit: Random.integer(1000, 5000),
  },
  DiscussionPicModeElement: {
    avatar: Random.dataImage('100x100', 'avatar'),
    name: '@CNAME()',
    picture: Random.dataImage('100x100', 'picture'),
  },
  RoundProgressBar: {
    display: '进度显示器',
    percent: Random.integer(0, 100),
    color: '@COLOR()',
    width: Random.integer(5, 20),
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
            avatar: Random.dataImage('100x100', 'avatar'),
            studentId: '@ID()',
            nickName: '@CTITLE()',
            gender: Random.integer(1, 2),
            school: '@CTITLE()大学',
            college: '@CTITLE()学院',
            className: '@CTITLE(3)班',
            order: Random.integer(0, 1000),
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
    avatar: Random.dataImage('100x100', 'avatar'),
    content: '@CPARAGRAPH()',
    date: '@TIME()',
    id: '@GUID()',
    isAgree: Random.boolean(),
    name: '@CNAME()',
    pictures: [
      Random.dataImage('100x100', 'picture'),
    ],
  },
  SelectLibrary: {
    'data|5-8': [
      {
        libraryId: '@GUID()',
        libraryName: '@CTITLE()题库',
        cover: Random.dataImage('100x100', 'cover'),
        questionNumber: Random.integer(1, 100),
        quizNumber: Random.integer(1, 100),
        coursewareNumber: Random.integer(1, 100),
        hasJoin: Random.boolean(),
      }
    ],
  },
  _QuestionPreviewBoard_pattern: Random.integer(1, 6),
  _QuestionPreviewBoard_difficulty: Random.integer(1, 5),
  _QuestionPreviewBoard_subQuestionIndex: Random.integer(0, 100),
  _QuestionPreviewBoard_serialNumber: /[A-Z]\d{5}/,
  QuestionPreviewBoard: {
    questionContent: {
      content: `<p>@CSENTENCE()<span>@CSENTENCE()</span><img src="${Random.dataImage('100x100', 'picture')}" alt="" /></p>`,  // eslint-disable-line
      title: {
        pattern: '@/_QuestionPreviewBoard_pattern',
        difficulty: '@/_QuestionPreviewBoard_difficulty',
        serialNumber: '@/_QuestionPreviewBoard_serialNumber',
      },
    },
    questionAnswer: {
      answer: {
        answerCount: Random.integer(0, 100),
        studentCount: Random.integer(0, 100),
        correctRate: Random.integer(0, 100),
        referenceCount: Random.integer(0, 100),
        usageCount: Random.integer(0, 100),
        easyWrongOption: /A?B?C?D?/,
        hasCorrectness: Random.boolean(),
        correctAnswer: Random.boolean(),
        strict: Random.boolean(),
        isRequired: Random.boolean(),
        limit: Random.integer(0, 100),
        items: function () {
          const correctAnswerIndex = Math.floor(Math.random() * 4)
          const result = []
          for (let index = 0; index < 4; index++) {
            result.push(Mock.mock({
              id: Random.guid(),
              content: Random.ctitle(),
              correctAnswer: index === correctAnswerIndex,
              myAnswer: Random.boolean(),
              'attaches|0-3': [
                Random.dataImage('100x100', 'picture'),
              ],
              isCorrect: function () {
                return this.myAnswer === this.correctAnswer
              },
            }))
          }
          return result
        },
        isAllCorrect: Random.boolean(),
      },
      isAnswerOpen: Random.boolean(),
      isAnswered: Random.boolean(),
      canAnswer: Random.boolean(),
      pattern: '@/_QuestionPreviewBoard_pattern',
      subQuestionIndex: '@/_QuestionPreviewBoard_subQuestionIndex',
      id: '@GUID()',
      limit: Random.integer(0, 100),
      serialNumber: '@/_QuestionPreviewBoard_serialNumber',
      difficulty: '@/_QuestionPreviewBoard_difficulty',
      oddTime: Random.integer(0, 100),
    },
    answerAnalysis: {
      data: {
        'labels|3-5': [
          {
            id: '@GUID()',
            text: '@CTITLE()',
          },
        ],
        review: '@CSENTENCE(20, 100)',
      },
      isAnswered: Random.boolean(),
      isAnswerOpen: Random.boolean(),
      canAnswer: Random.boolean(),
      subQuestionIndex: '@/_QuestionPreviewBoard_subQuestionIndex',
    },
    'comments|3-5': [
      {
        id: '@GUID()',
        name: '@CNAME()',
        avatar: Random.dataImage('100x100', 'avatar'),
        createTime: `${moment().format('YYYY-MM-DD')} @TIME()`,
        like: Random.integer(0, 100),
        comment: '@CSENTENCE()',
      }
    ],
  },
  DiscussionBottomToolBar: {
    attendeeCount: Random.integer(0, 100),
    messageCount: Random.integer(0, 100),
    'groupList|5': [
      {
        name: '@CTITLE(3)小组',
        'id|+1': 1000,
        color: '@UPPER(@COLOR)',
        students: Mock.mock({
          'default|5-20': [
            {
              'studentId|+1': 1000,
              'messageCount|0-10': 1,
            },
          ],
        }).default,
      },
    ],
    'studentGroupList|5': {
      '1000|5-20': [
        {
          'id|+1': 1000,
          name: '@CNAME()',
          avatar: Random.dataImage('100x100', 'avatar'),
          'messagesCount|0-100': 1,
        },
      ],
      '1001|5-20': [
        {
          'id|+1': 1000,
          name: '@CNAME()',
          avatar: Random.dataImage('100x100', 'avatar'),
          'messagesCount|0-100': 1,
        },
      ],
      '1002|5-20': [
        {
          'id|+1': 1000,
          name: '@CNAME()',
          avatar: Random.dataImage('100x100', 'avatar'),
          'messagesCount|0-100': 1,
        },
      ],
      '1003|5-20': [
        {
          'id|+1': 1000,
          name: '@CNAME()',
          avatar: Random.dataImage('100x100', 'avatar'),
          'messagesCount|0-100': 1,
        },
      ],
      '1004|5-20': [
        {
          'id|+1': 1000,
          name: '@CNAME()',
          avatar: Random.dataImage('100x100', 'avatar'),
          'messagesCount|0-100': 1,
        },
      ],
    },
  },
})
