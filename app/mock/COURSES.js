global.COURSES = [
  {
    id: 0,
    name: '子路由1',
    grade: 'B',
    announcements: [
      {
        id: 0,
        title: '路由1里面的模块',
        body: '可以通过数据生成'
      }
    ],
    assignments: [
      {
        id: 0,
        title: '路由1',
        body: '修改的官方路由列子',
        grade: 'N/A'
      }
    ]

  },

  {
    id: 1,
    name: '路由2',
    grade: 'A-',
    announcements: [
      {
        id: 0,
        title: '路由2修改的官方',
        body: '其实路由很简单'
      }
    ],
    assignments: [
      {
        id: 0,
        title: '子节点路由的子节点',
        body: '其实应用中不会嵌套这么深',
        grade: '80%'
      },
      {
        id: 1,
        title: '路由',
        body: '前端为何这么复杂，早知道写java去了',
        grade: '95%'
      }
    ]
  }
]
