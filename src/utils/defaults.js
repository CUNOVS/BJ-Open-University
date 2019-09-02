const defaultTabBars = [{
  title: '首页',
  key: 1,
  icon: require('themes/images/ntabr/home.png'),
  selectedIcon: require('themes/images/ntabr/home-o.png'),
  route: '/',
}, {
  title: '在开课程',
  key: 2,
  icon: require('themes/images/ntabr/openning.png'),
  selectedIcon: require('themes/images/ntabr/openning-o.png'),
  route: '/opening',
}, {
  title: '已开课程',
  key: 3,
  icon: require('themes/images/ntabr/end.png'),
  selectedIcon: require('themes/images/ntabr/end-o.png'),
  route: '/closed',
}, {
  title: '我的',
  key: 4,
  icon: require('themes/images/ntabr/mine.png'),
  selectedIcon: require('themes/images/ntabr/mine-o.png'),
  route: '/mine',
},
];

const resource = {
  resource: '文件',
  label: '标签',
  url: '网页地址',
  page: '网页',
  forumng: '北开讨论区',
  forum: '讨论区',
  quiz: '测验',
  assign: '作业',
  svp: 'SVP学伴视频',
  feedback: '反馈',
  superclassplayer: '超级播放系统',
  bjoupage: '互动网页',
  folder: '文件夹',
  scorm: 'SCORM课件',
  ouwiki: 'OU维基',
  book: '图书',
  mindmap: '思维导图',
  data: '数据库',
  choice: '投票',
  lesson: '程序教学',
  chat: '聊天',
  wiki: 'Wiki协作',
  glossary: '词汇表',
  survey: '调查问卷',
  workshop: '互动评价',
  lti: '外部工具'
};


export default { defaultTabBars, resource };
