/* global window */

import classnames from 'classnames';
import config from './config';
import request from './request';
import cookie from './cookie';
import defaultImg from 'themes/images/default/default.png';
import defaultUserIcon from 'themes/images/default/userIcon.png';
import defaultBg from 'themes/images/others/mineBg.png';
import formsubmit from './formsubmit';


const { userTag: { username, usertoken, userpower, userid, useravatar, usertype } } = config,
  { _cs, _cr, _cg } = cookie;
// 连字符转驼峰
String.prototype.hyphenToHump = function () {
  return this.replace(/-(\w)/g, (...args) => {
    return args[1].toUpperCase();
  });
};

// 驼峰转连字符
String.prototype.humpToHyphen = function () {
  return this.replace(/([A-Z])/g, '-$1')
    .toLowerCase();
};

// 日期格式化
const DateChange = function (format) {
  let date = new Date(format);
  let newDate = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
  return newDate;
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

const getImages = (path = '', type = 'defaultImg') => {
  if (path instanceof Blob || path.startsWith('blob:')) {
    return path;
  }
  if (path == '' || !path) {
    return type === 'defaultImg' ? defaultImg : defaultUserIcon;
  }
  return path.startsWith('http://') || path.startsWith('https://') ? path
    : (config.baseURL + (path.startsWith('/') ? '' : '/') + path);
};
/***
 * 用户信息默认背景图片
 * @param path
 * @returns {*}
 */
const getDefaultBg = (path = '') => {
  if (path instanceof Blob || path.startsWith('blob:')) {
    return path;
  }
  if (path == '' || !path) {
    return defaultBg;
  }
  return path.startsWith('http://') || path.startsWith('https://') ? path
    : (config.baseURL + (path.startsWith('/') ? '' : '/') + path);
};
const getErrorImg = (el) => {
  if (el && el.target) {
    el.target.src = defaultImg;
    el.target.onerror = null;
  }
};

const setLoginIn = ({ user_token, user_name, user_power, user_id, user_avatar, user_type }) => {
  _cs(username, user_name);
  _cs(userpower, user_power);
  _cs(usertoken, user_token);
  _cs(userid, user_id);
  _cs(useravatar, user_avatar);
  _cs(usertype, user_type);
  cnSetAlias(user_name, user_token);
};
const setLoginOut = () => {
  _cr(username);
  _cr(userpower);
  _cr(usertoken);
  _cr(userid);
  _cr(useravatar);
  _cr(usertype);
  cnDeleteAlias(_cg(username), _cg(usertoken));
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
/**
 * @param str 字符串
 * @returns {string}
 */

const postionsToString = ({ address = {}, latitude = '', longitude = '', radius = '' }) => JSON.stringify({
  address,
  latitude,
  longitude,
  radius,
});

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
  return title.length > 8 ? `${title.substring(0, 7)}...` : title;
};

const WKC = (i) => {
  return title.replace(/yep/, true);
};

/***
 *
 * @param arr 数组
 * @returns {*}
 * 数组求和
 */
const arrSum = (arr) => {
  if (arr.length > 0) {
    return arr.reduce(function (prev, curr, idx, arr) {
      return (prev * 100 + curr * 100) / 100;
    });
  } else {
    return 0;
  }

};

module.exports = {
  WKC,
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
  postionsToString,
  setLoginOut,
  replaceSystemEmoji,
  hasSystemEmoji,
  DateChange,
  getTitle,
  arrSum,
};
