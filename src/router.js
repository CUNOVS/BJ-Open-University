import React from 'react';
import PropTypes from 'prop-types';
import { Router } from 'dva/router';
import App from 'routes/app';

const registerModel = (app, model) => {
  if (!(app._models.filter(m => m.namespace === model.namespace).length === 1)) {
    app.model(model);
  }
};

const Routers = function ({ history, app }) {
  const routes = [
    {
      path: '/',
      component: App,
      getIndexRoute (nextState, cb) {
        require.ensure([], (require) => {
          registerModel(app, require('models/dashboard'));
          cb(null, { component: require('routes/dashboard/') });
        }, 'dashboard');
      },
      childRoutes: [
        {
          path: 'dashboard',
          getComponent (nextState, cb) {
            require.ensure([], (require) => {
              registerModel(app, require('models/dashboard'));
              cb(null, require('routes/dashboard/'));
            }, 'dashboard');
          },
        },
        {
          path: 'studyBase',
          getComponent (nextState, cb) {
            require.ensure([], (require) => {
              registerModel(app, require('models/studyBase'));
              cb(null, require('routes/studyBase/'));
            }, 'studyBase');
          },
        },
        {
          path: 'classify',
          getComponent (nextState, cb) {
            require.ensure([], (require) => {
              registerModel(app, require('models/classify'));
              cb(null, require('routes/classify/'));
            }, 'classify');
          },
        },
        {
          path: 'login',
          getComponent (nextState, cb) {
            require.ensure([], (require) => {
              registerModel(app, require('models/login'));
              cb(null, require('routes/login/'));
            }, 'login');
          },
        },
        {
          path: 'mine',
          getComponent (nextState, cb) {
            require.ensure([], (require) => {
              registerModel(app, require('models/mine'));
              cb(null, require('routes/mine/'));
            }, 'mine');
          },
        },
        {
          path: 'iframe',
          getComponent (nextState, cb) {
            require.ensure([], (require) => {
              cb(null, require('routes/iframe/'));
            }, 'iframe');
          },
        },
        {
          path: 'setup',
          getComponent (nextState, cb) {
            require.ensure([], (require) => {
              registerModel(app, require('models/setup'));
              cb(null, require('routes/setup/'));
            }, 'setup');
          },
        },
        {
          path: 'aboutus',
          getComponent (nextState, cb) {
            require.ensure([], (require) => {
              registerModel(app, require('models/aboutus'));
              cb(null, require('routes/aboutus/'));
            }, 'aboutus');
          },
        },
        {
          path: 'opinion',
          getComponent (nextState, cb) {
            require.ensure([], (require) => {
              registerModel(app, require('models/opinion'));
              cb(null, require('routes/opinion/'));
            }, 'opinion');
          },
        },
        {
          path: 'building',
          getComponent (nextState, cb) {
            require.ensure([], (require) => {
              registerModel(app, require('models/building'));
              cb(null, require('routes/building/'));
            }, 'building');
          },
        },
        {
          path: 'lesson',
          getComponent (nextState, cb) {
            require.ensure([], (require) => {
              registerModel(app, require('models/lesson'));
              cb(null, require('routes/lesson/'));
            }, 'lesson');
          },
        },
        {
          path: 'lessondetails',
          getComponent (nextState, cb) {
            require.ensure([], (require) => {
              registerModel(app, require('models/lessondetails'));
              cb(null, require('routes/lessondetails/'));
            }, 'lessondetails');
          },
        },
        {
          path: 'search',
          getComponent (nextState, cb) {
            require.ensure([], (require) => {
              registerModel(app, require('models/search'));
              cb(null, require('routes/search/'));
            }, 'search');
          },
        },
        {
          path: 'curriculum',
          getComponent (nextState, cb) {
            require.ensure([], (require) => {
              registerModel(app, require('models/curriculum'));
              cb(null, require('routes/curriculum/'));
            }, 'curriculum');
          },
        },
        {
          path: 'moreMessage',
          getComponent (nextState, cb) {
            require.ensure([], (require) => {
              registerModel(app, require('models/moreMessage'));
              cb(null, require('routes/moreMessage/'));
            }, 'moreMessage');
          },
        },
        {
          path: 'moreMessageItem',
          getComponent (nextState, cb) {
            require.ensure([], (require) => {
              registerModel(app, require('models/moreMessageItem'));
              cb(null, require('routes/moreMessageItem/'));
            }, 'moreMessageItem');
          },
        },
        {
          path: 'commentList',
          getComponent (nextState, cb) {
            require.ensure([], (require) => {
              registerModel(app, require('models/commentList'));
              cb(null, require('routes/commentList/'));
            }, 'commentList');
          },
        },
        {
          path: 'courses',
          getComponent (nextState, cb) {
            require.ensure([], (require) => {
              registerModel(app, require('models/courses'));
              cb(null, require('routes/courses/'));
            }, 'courses');
          },
        },
        {
          path: 'timetable',
          getComponent (nextState, cb) {
            require.ensure([], (require) => {
              registerModel(app, require('models/timetable'));
              cb(null, require('routes/timetable/'));
            }, 'timetable');
          },
        },
        {
          path: 'video',
          getComponent (nextState, cb) {
            require.ensure([], (require) => {
              registerModel(app, require('models/video'));
              cb(null, require('routes/video/'));
            }, 'video');
          },
        },
        {
          path: 'gradedetails',
          getComponent (nextState, cb) {
            require.ensure([], (require) => {
              registerModel(app, require('models/gradedetails'));
              cb(null, require('routes/gradedetails/'));
            }, 'gradedetails');
          },
        },
        {
          path: 'homework',
          getComponent (nextState, cb) {
            require.ensure([], (require) => {
              registerModel(app, require('models/homework'));
              cb(null, require('routes/homework/'));
            }, 'homework');
          },
        },
        {
          path: 'homeworklist',
          getComponent (nextState, cb) {
            require.ensure([], (require) => {
              registerModel(app, require('models/homeworklist'));
              cb(null, require('routes/homeworklist/'));
            }, 'homeworklist');
          },
        },
        {
          path: 'homeworkdetails',
          getComponent (nextState, cb) {
            require.ensure([], (require) => {
              registerModel(app, require('models/homeworkdetails'));
              cb(null, require('routes/homeworkdetails/'));
            }, 'homeworkdetails');
          },
        },
        {
          path: 'notetaking',
          getComponent (nextState, cb) {
            require.ensure([], (require) => {
              registerModel(app, require('models/notetaking'));
              cb(null, require('routes/notetaking/'));
            }, 'notetaking');
          },
        },
        {
          path: 'grade',
          getComponent (nextState, cb) {
            require.ensure([], (require) => {
              registerModel(app, require('models/grade'));
              cb(null, require('routes/grade/'));
            }, 'grade');
          },
        },
        {
          path: 'reply',
          getComponent (nextState, cb) {
            require.ensure([], (require) => {
              registerModel(app, require('models/reply'));
              cb(null, require('routes/reply/'));
            }, 'reply');
          },
        },
        {
          path: 'notelist',
          getComponent (nextState, cb) {
            require.ensure([], (require) => {
              registerModel(app, require('models/notelist'));
              cb(null, require('routes/notelist/'));
            }, 'notelist');
          },
        },
        {
          path: 'commonlist',
          getComponent (nextState, cb) {
            require.ensure([], (require) => {
              registerModel(app, require('models/commonlist'));
              cb(null, require('routes/commonlist/'));
            }, 'commonlist');
          },
        },
        {
          path: 'facechat',
          getComponent (nextState, cb) {
            require.ensure([], (require) => {
              registerModel(app, require('models/facechat'));
              cb(null, require('routes/facechat/'));
            }, 'facechat');
          },
        },
        {
          path: 'facechatdetails',
          getComponent (nextState, cb) {
            require.ensure([], (require) => {
              registerModel(app, require('models/facechatdetails'));
              cb(null, require('routes/facechatdetails/'));
            }, 'facechatdetails');
          },
        },
        {
          path: 'noticelist',
          getComponent (nextState, cb) {
            require.ensure([], (require) => {
              registerModel(app, require('models/noticelist'));
              cb(null, require('routes/noticelist/'));
            }, 'noticelist');
          },
        },
        {
          path: 'noticedetails',
          getComponent (nextState, cb) {
            require.ensure([], (require) => {
              registerModel(app, require('models/noticedetails'));
              cb(null, require('routes/noticedetails/'));
            }, 'noticedetails');
          },
        },
        {
          path: 'readpdf',
          getComponent (nextState, cb) {
            require.ensure([], (require) => {
              registerModel(app, require('models/readpdf'));
              cb(null, require('routes/readpdf/'));
            }, 'readpdf');
          },
        },
        {
          path: '*',
          getComponent (nextState, cb) {
            const { location: { pathname } } = nextState;
            if (pathname && /^\/(android).+?index\.html$/.exec(pathname)) {
              require.ensure([], (require) => {
                registerModel(app, require('models/dashboard'));
                cb(null, require('routes/dashboard/'));
              });
            }
          },
        },
      ],
    },
  ];

  return <Router history={history} routes={routes} />;
};

Routers.propTypes = {
  history: PropTypes.object,
  app: PropTypes.object,
};

export default Routers;
