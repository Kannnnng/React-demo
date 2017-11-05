import Mock from 'mockjs'

export default Mock.mock({
  CurrentChoice: {
    'conditions|0-3': [
      {
        'name|+1': [
          'chapter',
          'search',
          'select',
        ],
        value: '@CTITLE()',
      }
    ],
  },
})
