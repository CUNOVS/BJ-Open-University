module.exports = {
  name: 'BJOU-APP',
  baseURL: 'http://192.168.0.62:8082',
  token: '7d73b2a3221646c15544d1a3904aeac3',
  userTag: {
    username: 'username',
    usertoken: 'KSESSIONID',
    userpower: 'userpower',
    userid: 'userid',
    useravatar: 'useravatar',
    usertype: 'usertype',
  },
  api: {
    LoginApi: '/login/login.jcp',
    userLogout: '/login/appLogout.jcp',
    GetLessonDetails: '/course',
  },
};
