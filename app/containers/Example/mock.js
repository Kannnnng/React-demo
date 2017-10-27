import Mock from 'mockjs'

export default Mock.mock({
  DiscussionBottomToolBar: {
    'attendeeCount|100': 1,
    'messageCount|100': 1,
    'groupList|5': [
      {
        name: '@CTITLE(3)小组',
        'id|+1': 10000,
        color: '@UPPER("@COLOR()")',
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
  DiscussionHeader: {
    title: '@CTITLE()',
    checkedTab: /speakContent|keyWord|Pics/,
    'isDiscussionOpening|1': true,
  },
})
