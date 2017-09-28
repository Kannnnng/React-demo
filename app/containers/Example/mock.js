import Mock from 'mockjs'

export default Mock.mock({
  'attendeeCount|100': 1,
  'messageCount|100': 1,
  'groupList|5': [
    {
      name: '@CTITLE(3)小组',
      'id|+1': 10000,
      color: '@UPPER("@COLOR")',
      'students|10': [
        {
          'studentId|+1': 20000,
          'messageCount|0-10': 1,
        },
      ],
    },
  ],
  'studentGroupList|5': {
    '10001|100': [
      {
        'id|+1': 20000,
        name: '@CNAME',
        avatar: Mock.Random.image('100x100', '#894FC4', '#FFF', 'png', 'avatar'),
        'messagesCount|0-10': 1,
      },
    ],
    '10002|5-20': [
      {
        'id|+1': 20000,
        name: '@CNAME',
        avatar: Mock.Random.image('100x100', '#894FC4', '#FFF', 'png', 'avatar'),
        'messagesCount|0-10': 1,
      },
    ],
    '10003|5-20': [
      {
        'id|+1': 20000,
        name: '@CNAME',
        avatar: Mock.Random.image('100x100', '#894FC4', '#FFF', 'png', 'avatar'),
        'messagesCount|0-10': 1,
      },
    ],
    '10004|5-20': [
      {
        'id|+1': 20000,
        name: '@CNAME',
        avatar: Mock.Random.image('100x100', '#894FC4', '#FFF', 'png', 'avatar'),
        'messagesCount|0-10': 1,
      },
    ],
    '10005|5-20': [
      {
        'id|+1': 20000,
        name: '@CNAME',
        avatar: Mock.Random.image('100x100', '#894FC4', '#FFF', 'png', 'avatar'),
        'messagesCount|0-10': 1,
      },
    ],
  },
})
