module.exports = {
  name: 'ALS-APP',
  logo: '/logo.png',
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
