import { routerRedux } from 'dva/router';
import { Modal } from 'components';
import { doDecode, cookie, config } from 'utils';

const { userTag: { userid } } = config,
  { _cg } = cookie;

const handlerLessonListClick = ({ id = '' }, dispatch) => {
  dispatch(routerRedux.push({
    pathname: 'lessondetails',
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
const handlerCourseClick = ({ modname = '', modulename = '', name = '', id, instance }, courseid, dispatch) => {
  if ((modname || modulename) === 'page') {
    dispatch(routerRedux.push({
      pathname: '/page',
      query: {
        name,
        pageid: instance,
        cmid: id,
        courseid,
      },
    }));
  } else if ((modname || modulename) === 'forum') {
    // cnOpen(url);
    dispatch(routerRedux.push({
      pathname: '/forum',
      query: {
        name,
        forumid: instance,
        cmid: id,
        courseid,
      },
    }));
  } else if ((modname || modulename) === 'quiz') {
    dispatch(routerRedux.push({
      pathname: '/quiz',
      query: {
        name,
        courseid,
        quizid: instance,

      },
    }));
  } else if ((modname || modulename) === 'assign') {
    dispatch(routerRedux.push({
      pathname: '/homework',
      query: {
        name,
        cmid: id,
        ssignId: instance,
        courseid,
      },
    }));
  } else if ((modname || modulename) === 'huodong') {
    dispatch(routerRedux.push({
      pathname: '/forum',
      query: {
        name,
      },
    }));
  }
};

const handlerGradeItemClick = ({ itemType = '', name = '', id }, courseid, cmid, dispatch) => {
  if (itemType === 'page') {
    dispatch(routerRedux.push({
      pathname: '/page',
      query: {
        name,
        pageid: id,
        cmid,
        courseid,
      },
    }));
  } else if (itemType === 'forum') {
    // cnOpen(url);
    dispatch(routerRedux.push({
      pathname: '/forum',
      query: {
        name,
        forumid: id,
        cmid,
        courseid,
      },
    }));
  } else if (itemType === 'quiz') {
    dispatch(routerRedux.push({
      pathname: '/quiz',
      query: {
        name,
        courseid,
        quizid: id,

      },
    }));
  } else if (itemType === 'assign') {
    dispatch(routerRedux.push({
      pathname: '/homework',
      query: {
        name,
        cmid,
        ssignId: id,
        courseid,
      },
    }));
  } else if (itemType === 'huodong') {
    dispatch(routerRedux.push({
      pathname: '/forum',
      query: {
        name,
      },
    }));
  }
};

const handlerChangeRouteClick = (path = '', data = {}, dispatch, e) => {
  e.stopPropagation();
  dispatch(routerRedux.push({
    pathname: path,
    query: data,
  }));
};

module.exports = {
  handlerCourseClick,
  handlerLessonListClick,
  handlerGradeItemClick,
  handleGridClick,
  handlerChangeRouteClick,
};
