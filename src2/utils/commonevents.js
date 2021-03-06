import { routerRedux } from 'dva/router';
import { Modal, Toast } from 'components';
import { doDecode, cookie, config, userToken, downLoadFile } from 'utils';

const { userTag: { userid, usertoken } } = config,
  { _cg } = cookie;

const handlerLessonListClick = ({ id = '' }, dispatch) => {
  dispatch(routerRedux.push({
    pathname: '/lessondetails',
    query: {
      courseid: id,
      userid: _cg(userid),
    },
  }));
};
const handleGridClick = ({ route = '', text = '' }, dispatch) => {
  dispatch(routerRedux.push({
    pathname: `/${route}`,
    query: {
      name: `${text}`,
    },
  }));
};
// id : 模块内id(cmid) , instance : 主键id  , name : 名称 , contents : 文件时才用到。
const handlerCourseClick = (params, courseid, dispatch) => {
  const { modname = '', modulename = '', name = '', id = '', instance = '', httpurl = '', contents = [{}] } = params,
    targets = {};
  if ((modname || modulename) === 'resource') {
    const {
      fileurl: fileUrl = '', mimetype: mimeType = '', filename: fileName = '', fileIdPrefix = '', fileCallbak = () => {
      }
    } = contents[0];
    if (fileUrl !== '') {
      const downloadProgress = (text = 0) => {
        if (dispatch) {
          dispatch({
            type: 'app/updateState',
            payload: {
              downloadProgress: text
            }
          });
        } else {
          fileCallbak(text !== 0);
        }
      };
      downloadProgress('下载中...');
      cnGetOrDownAndOpenFile({
        fileName: `${fileIdPrefix !== '' ? fileIdPrefix : courseid}_${fileName}`,
        fileUrl: `${fileUrl}${fileUrl.indexOf('?') === -1 ? '?' : '&'}token=${userToken()}`,
        mimeType
      }, (e) => {
        downloadProgress();
        Toast.info('正在打开文件...');
      }, (error) => {
        downloadProgress();
        let msg = '';
        if (error.message) {
          msg = error.message;
        } else if (error.body) {
          msg = JSON.parse(error.body).error;
        }
        Toast.offline(msg || '发生未知错误。');
      });
      return;
    }
  }
  switch ((modname || modulename)) {
    case 'page':
      targets.pathname = '/page';
      targets.param = {
        pageid: instance,
        modname: modname || modulename
      };
      break;
    case 'forum':
      targets.pathname = '/forum';
      targets.param = {
        forumid: instance,
        modname: modname || modulename
      };
      break;
    case 'quiz':
      targets.pathname = '/quiz';
      targets.param = {
        quizid: instance,
        modname: modname || modulename
      };
      break;
    case 'assign':
      targets.pathname = '/homework';
      targets.param = {
        assignId: instance,
        modname: modname || modulename
      };
      break;
    case 'resource':
      if (Object.keys(contents[0]).length > 0) {
        break;
      }
      targets.pathname = 'lessondetails/queryResource';
    case 'url':
      let { pathname: targetPathname = 'lessondetails/queryUrl' } = targets;
      targets.pathname = targetPathname;
      targets.notRoute = true;
      targets.param = {
        dispatch,
        modname: modname || modulename
      };
      break;
    case 'svp':
    case 'superclass':
      let regExps = [],
        { url: scUrl = '', name: scName = '', chapter_id: chapterid = '' } = params;
      targets.pathname = '/superclass';
      if (chapterid !== '') {
        targets.param = {
          chapterid,
          name: scName,
          modname: modname || modulename
        };
      } else if (scUrl && (regExps = /\\?ch=([^&]+)(?:.*)layout=([^&]+)/.exec(scUrl)) && regExps.length > 1) {
        targets.param = {
          ch: regExps[1],
          layout: regExps[2],
          name: scName,
          modname: modname || modulename
        };
      } else {
        delete targets.pathname;
        Toast.offline(`因参数丢失，无法使用${(modname || modulename)}类型标签，请使用PC端打开。`);
      }
      break;
    case 'httpurl':
      cnOpen(httpurl);
      return;
    case 'feedback':
      targets.pathname = '/feedback';
      targets.param = {
        id: instance,
        modname: modname || modulename
      };
      break;
    default:
      if ((modname || modulename) !== '') {
        Toast.offline(`暂不支持${(modname || modulename)}类型标签，请使用PC端打开。`);
      }
  }
  const { pathname = '', param = {}, notRoute = false } = targets;
  if (pathname !== '') {
    const payload = {
      name,
      cmid: id,
      courseid,
      instance,
      ...param
    };
    if (notRoute === true) {
      dispatch({
        type: pathname,
        payload
      });
    } else {
      dispatch(routerRedux.push({
        pathname,
        query: payload,
      }));
    }
  }
};

const handlerGradeItemClick = ({ itemType = '', name = '', id = '', courseid = '', instance = '' }, dispatch) => {
  handlerCourseClick({ modulename: itemType, id, instance }, courseid, dispatch);
};

const handlerTagAHrefParseParam = (params, courseid, dispatch) => {
  const { modname = '' } = params;
  if (modname !== '') {
    let targetParams = '';
    if (modname === 'resource') {
      const {
        fileurl = '', mimetype = '', filename = '', fileIdPrefix = '', href = '', id = '', callback: fileCallbak = () => {
        }, ...otherParams
      } = params;
      if (id === '' && (fileurl !== '' || filename !== '')) {
        targetParams = {
          contents: [{
            fileurl: fileurl || href, mimetype, filename, fileIdPrefix, fileCallbak
          }],
          ...otherParams
        };
      }
    }
    handlerCourseClick(targetParams !== '' ? targetParams : params, courseid, dispatch);
  } else {
    Toast.offline('需要查看的标签类型不能为空。');
  }
};

const handleElementTagAClick = (el, courseId = '', dispatch) => {
  let hrefParam = el.getAttribute('hrefParam'),
    notHasError = false;
  if (hrefParam) {
    let params = JSON.parse(hrefParam),
      { href = '' } = params;
    if ((notHasError = (href && courseId)) !== '') {
      handlerTagAHrefParseParam(params, courseId, dispatch);
    }
  }
  if (!!hrefParam && !notHasError) Toast.offline(`${courseId !== '' ? '标签解析失败' : '未能查找到课程'}，请使用PC端打开。`);
};

const handlerDivInnerHTMLClick = (e, courseId, dispatch) => {
  switch (e.target.tagName) {
    case 'A':
      handleElementTagAClick(e.target, courseId, dispatch);
      break;
    case 'SPAN':
      let targetEl = e.target.parentElement,
        counts = 0;
      do {
        if (targetEl.tagName === 'A') {
          break;
        }
        targetEl = targetEl.parentElement;
      } while (targetEl != null && counts++ < 10);

      if (targetEl != null && targetEl.tagName === 'A') {
        handleElementTagAClick(targetEl, courseId, dispatch);
      }
      break;
    default:
  }
};

const handlerChangeRouteClick = (path = '', data = {}, dispatch, e) => {
  e && e.stopPropagation();
  dispatch(routerRedux.push({
    pathname: `/${path}`,
    query: data,
  }));
};
const handlerMessageClick = ({ type = 1, state, id }, data = {}, dispatch, e) => {
  if (type === 1) {
    dispatch(routerRedux.push({
      pathname: '/medalList',
      query: data,
    }));
  } else if (type === 2) {
    dispatch(routerRedux.push({
      pathname: '/homework',
      query: data,
    }));
  }
  if (state === 'unread') {
    dispatch({
      type: 'messageCenter/readNotice',
      payload: {
        messageids: id
      }
    });
  }
};
const repalceLoaclFileName = (srcName, targetName) => {
  if (cnIsDefined(srcName) && cnIsDefined(targetName)) {
    return srcName.replace(/.+?\.([^\.]+?)$/, `${targetName}.$1`);
  }
  return srcName;
};

module.exports = {
  handlerCourseClick,
  handlerLessonListClick,
  handlerGradeItemClick,
  handlerMessageClick,
  handleGridClick,
  handlerChangeRouteClick,
  handlerDivInnerHTMLClick,
  handleElementTagAClick,
  handlerTagAHrefParseParam,
};
