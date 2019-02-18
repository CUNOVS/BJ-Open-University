module.exports = {
  name: 'BJOU-APP',
  baseURL: 'http://www.myals.gov.cn:9000',
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
  },
};
