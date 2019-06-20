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


export default { defaultTabBars };
