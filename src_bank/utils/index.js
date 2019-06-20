/* global window */

import classnames from 'classnames';
import defaultImg from 'themes/images/default/default.png';
import defaultUserIcon from 'themes/images/default/userIcon.png';
import defaultBg from 'themes/images/others/mineBg.png';
import config, { userTag } from './config';
import request from './request';
import cookie from './cookie';
import formsubmit from './formsubmit';


const { userTag: { username, usertoken, userpower, userid, useravatar } } = config,
  { _cs, _cr, _cg } = cookie,
  token = _cg(usertoken);
// 日期格式化
const DateChange = function () {
  let date = new Date();
  let week = '日一二三四五六'.charAt(date.getDay());
  let newDate = `今天是${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日 星期${week}`;
  return newDate;
};
/**
 *
 * @param date
 * @constructor
 */
const getCommonData = (date) => {
  if (date) {
    let currentDate = new Date();
    const currentYear = currentDate.getFullYear(),
      preDate = new Date(date * 1000),
      week = '日一二三四五六'.charAt(preDate.getDay()),
      year = preDate.getFullYear(),
      hour = preDate.getHours() < 10 ? `0${preDate.getHours()}` : preDate.getHours(),
      minutes = preDate.getMinutes() < 10 ? `0${preDate.getMinutes()}` : preDate.getMinutes(),
      seconds = preDate.getSeconds();
    return `${year}年${preDate.getMonth() + 1}月${preDate.getDate()}日 星期${week} ${hour}:${minutes}`;
  }
};
/**
 *
 * @param date
 * @constructor
 */
const changeLessonData = (date) => {
  if (date) {
    let currentDate = new Date();
    const currentYear = currentDate.getFullYear(),
      lessonDate = new Date(date * 1000),
      year = lessonDate.getFullYear();
    if (currentYear !== year) {
      return `${year}年${lessonDate.getMonth() + 1}月${lessonDate.getDate()}日`;
    }
    return `${lessonDate.getMonth() + 1}月${lessonDate.getDate()}日`;
  }
};
/**
 * 任务列表时间转换
 * @param date
 * @returns {string}
 */
const isToday = (date) => {
  if (date) {
    let currentDate = new Date();
    const lessonDate = new Date(date * 1000);
    if (currentDate.toDateString() === lessonDate.toDateString()) {
      return true;
    }
    return false;
  }
};

const getMessageTime = (timeValue) => {
  let time = timeValue * 1000;

  function formatDateTime (time) {
    let date = new Date(time);
    let y = date.getFullYear();
    let m = date.getMonth() + 1;
    m = m < 10 ? (`0${m}`) : m;
    let d = date.getDate();
    d = d < 10 ? (`0${d}`) : d;
    let h = date.getHours();
    h = h < 10 ? (`0${h}`) : h;
    let minute = date.getMinutes();
    let second = date.getSeconds();
    minute = minute < 10 ? (`0${minute}`) : minute;
    second = second < 10 ? (`0${second}`) : second;
    return `${y}-${m}-${d} ${h}:${minute}:${second}`;
  }

  // 判断传入日期是否为昨天
  function isYestday (time) {
    let date = (new Date()); // 当前时间
    let today = new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime(); // 今天凌晨
    let yestday = new Date(today - 24 * 3600 * 1000).getTime();
    return time < today && yestday <= time;
  }

  // 判断传入日期是否属于今年
  function isYear (time) {
    let takeNewYear = formatDateTime(new Date())
      .substr(0, 4); // 当前时间的年份
    let takeTimeValue = formatDateTime(time)
      .substr(0, 4); // 传入时间的年份
    return takeTimeValue === takeNewYear;
  }

  // 60000 1分钟
  // 3600000 1小时
  // 86400000 24小时
  // 对传入时间进行时间转换
  function timeChange (time) {
    let timeNew = Date.parse(new Date()); // 当前时间
    let timeDiffer = timeNew - time; // 与当前时间误差
    let returnTime = '';

    if (timeDiffer <= 60000) { // 一分钟内
      returnTime = '刚刚';
    } else if (timeDiffer > 60000 && timeDiffer < 3600000) { // 1小时内
      returnTime = `${Math.floor(timeDiffer / 60000)}分钟前`;
    } else if (timeDiffer >= 3600000 && timeDiffer < 86400000 && isYestday(time) === false) { // 今日
      returnTime = formatDateTime(time)
        .substr(11, 5);
    } else if (timeDiffer > 3600000 && isYestday(time) === true) { // 昨天
      returnTime = `昨天${formatDateTime(time)
        .substr(11, 5)}`;
    } else if (timeDiffer > 86400000 && isYestday(time) === false && isYear(time) === true) {	// 今年
      returnTime = formatDateTime(time)
        .substr(5, 11);
    } else if (timeDiffer > 86400000 && isYestday(time) === false && isYear(time) === false) { // 不属于今年
      returnTime = formatDateTime(time)
        .substr(0, 10);
    }

    return returnTime;
  }

  return timeChange(time);
};

const getSurplusDay = (data) => {
  const now = new Date();
  if (data * 1000 > now) {
    const time = data * 1000 - now;
    let days = time / 1000 / 60 / 60 / 24;
    let daysRound = Math.floor(days);
    let hours = time / 1000 / 60 / 60 - (24 * daysRound);
    let hoursRound = Math.floor(hours);
    let minutes = time / 1000 / 60 - (24 * 60 * daysRound) - (60 * hoursRound);
    let minutesRound = Math.floor(minutes);
    let seconds = time / 1000 - (24 * 60 * 60 * daysRound) - (60 * 60 * hoursRound) - (60 * minutesRound);
    return `${daysRound}天${hoursRound}小时${minutesRound}分钟`;
  } 
  return '已截止';
};

/**
 * @param   {String}
 * @return  {String}
 */

const queryURL = (name) => {
  let reg = new RegExp(`(^|&)${name}=([^&]*)(&|$)`, 'i');
  let r = window.location.search.substr(1)
    .match(reg);
  if (r != null) return decodeURI(r[2]);
  return null;
};

/**
 * 数组内查询
 * @param   {array}      array
 * @param   {String}    id
 * @param   {String}    keyAlias
 * @return  {Array}
 */
const queryArray = (array, key, keyAlias = 'key') => {
  if (!(array instanceof Array)) {
    return null;
  }
  const item = array.filter(_ => _[keyAlias] === key);
  if (item.length) {
    return item[0];
  }
  return null;
};
/**
 *
 * @param path
 * @param type 传一个任意字符串获取头像 默认为课程图片
 * @returns {*}
 */
const getImages = (path = '', type = 'defaultImg') => {
  if (path instanceof Blob || path.startsWith('blob:')) {
    return path;
  }
  if (path === '' || !path) {
    return type === 'defaultImg' ? defaultImg : defaultUserIcon;
  }
  return path.startsWith('http://') || path.startsWith('https://') ? `${path}?token=${token}`
    : (`${config.baseURL + (path.startsWith('/') ? '' : '/') + path}?token=${token}`);
};
/** *
 * 用户信息默认背景图片
 * @param path
 * @returns {*}
 */
const getDefaultBg = (path = '') => {
  if (path instanceof Blob || path.startsWith('blob:')) {
    return path;
  }
  if (path === '' || !path) {
    return defaultBg;
  }
  return path.startsWith('http://') || path.startsWith('https://') ? `${path}?token=${token}`
    : (config.baseURL + (path.startsWith('/') ? '' : '/') + path);
};
const getErrorImg = (el) => {
  if (el && el.target) {
    el.target.src = defaultImg;
    el.target.onerror = null;
  }
};

const setLoginIn = ({ user_token, user_name, user_pwd, user_id, user_avatar }) => {
  _cs(username, user_name);
  _cs(userpower, user_pwd);
  _cs(usertoken, user_token);
  _cs(userid, user_id);
  _cs(useravatar, user_avatar);
  cnSetAlias(user_name, user_token);
};
const setLoginOut = () => {
  _cr(username);
  _cr(userpower);
  _cr(usertoken);
  _cr(userid);
  _cr(useravatar);
  // cnDeleteAlias(_cg(username), _cg(usertoken));
};
const getLocalIcon = (icon) => {
  const regex = /\/([^\/]+?)\./g;
  let addIconName = [];
  if (icon.startsWith('/') && (addIconName = regex.exec(icon)) && addIconName.length > 1) {
    const addIcon = require(`svg/${icon.substr(1)}`);
    return `${addIconName[1]}`;
  }
  return icon;
};

/**
 *
 * @param el 当前元素
 * @returns {number} 父元素不是body时元素相对body的offsetTop
 */
const getOffsetTopByBody = (el) => {
  let offsetTop = 0;
  while (el && el.tagName !== 'BODY') {
    offsetTop += el.offsetTop;
    el = el.offsetParent;
  }
  return offsetTop;
};


const replaceSystemEmoji = (content) => {
  const ranges = [
    '\ud83c[\udf00-\udfff]',
    '\ud83d[\udc00-\ude4f]',
    '\ud83d[\ude80-\udeff]',
  ];
  return content.replace(new RegExp(ranges.join('|'), 'g'), '')
    .replace(/\[\/.+?\]/g, '');
};

const hasSystemEmoji = (content) => {
  const ranges = [
    '\ud83c[\udf00-\udfff]',
    '\ud83d[\udc00-\ude4f]',
    '\ud83d[\ude80-\udeff]',
  ];
  return content.match(new RegExp(ranges.join('|'), 'g'));
};
const getTitle = (title) => {
  return title.length > 17 ? `${title.substring(0, 16)}...` : title;
};

/**
 * 本地获取任务列表icon
 * @param type
 */
const getTaskIcon = (type) => {
  if (type === 'assign') {
    return '/lessontype/homework.svg';
  } else if (type === 'quiz') {
    return '/lessontype/test.svg';
  } else if (type === 'forum') {
    return '/lessontype/huodong.svg';
  }
  return '';
};


module.exports = {
  config,
  request,
  cookie,
  classnames,
  getErrorImg,
  getDefaultBg,
  getImages,
  queryURL,
  setLoginIn,
  queryArray,
  getOffsetTopByBody,
  timeStamp: () => (new Date()).getTime(),
  isEmptyObject: (obj) => Object.keys(obj).length === 0,
  getLocalIcon,
  formsubmit,
  setLoginOut,
  replaceSystemEmoji,
  hasSystemEmoji,
  DateChange,
  getTitle,
  changeLessonData,
  getTaskIcon,
  isToday,
  getMessageTime,
  getCommonData,
  getSurplusDay,
};
