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
          path: 'closed',
          getComponent (nextState, cb) {
            require.ensure([], (require) => {
              registerModel(app, require('models/closed'));
              cb(null, require('routes/closed/'));
            }, 'closed');
          },
        },
        {
          path: 'opening',
          getComponent (nextState, cb) {
            require.ensure([], (require) => {
              registerModel(app, require('models/opening'));
              cb(null, require('routes/opening/'));
            }, 'opening');
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
          path: 'lessondetails',
          getComponent (nextState, cb) {
            require.ensure([], (require) => {
              registerModel(app, require('models/lessondetails'));
              cb(null, require('routes/lessondetails/'));
            }, 'lessondetails');
          },
        },
        {
          path: 'superclass',
          getComponent (nextState, cb) {
            require.ensure([], (require) => {
              registerModel(app, require('models/superClass'));
              cb(null, require('routes/superClass/'));
            }, 'superclass');
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
          path: 'homeworkadd',
          getComponent (nextState, cb) {
            require.ensure([], (require) => {
              registerModel(app, require('models/homeworkadd'));
              cb(null, require('routes/homeworkadd/'));
            }, 'homeworkadd');
          },
        },
        {
          path: 'homepage',
          getComponent (nextState, cb) {
            require.ensure([], (require) => {
              registerModel(app, require('models/homepage'));
              cb(null, require('routes/homepage/'));
            }, 'homepage');
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
          path: 'contacts',
          getComponent (nextState, cb) {
            require.ensure([], (require) => {
              registerModel(app, require('models/contacts'));
              cb(null, require('routes/contacts/'));
            }, 'contacts');
          },
        },
        {
          path: 'messageCenter',
          getComponent (nextState, cb) {
            require.ensure([], (require) => {
              registerModel(app, require('models/messageCenter'));
              cb(null, require('routes/messageCenter/'));
            }, 'messageCenter');
          },
        },
        {
          path: 'medalList',
          getComponent (nextState, cb) {
            require.ensure([], (require) => {
              registerModel(app, require('models/medalList'));
              cb(null, require('routes/medalList/'));
            }, 'medalList');
          },
        },
        {
          path: 'medal',
          getComponent (nextState, cb) {
            require.ensure([], (require) => {
              registerModel(app, require('models/medal'));
              cb(null, require('routes/medal/'));
            }, 'medal');
          },
        },
        {
          path: 'achievement',
          getComponent (nextState, cb) {
            require.ensure([], (require) => {
              registerModel(app, require('models/achievement'));
              cb(null, require('routes/achievement/'));
            }, 'achievement');
          },
        },
        {
          path: 'achievementdetails',
          getComponent (nextState, cb) {
            require.ensure([], (require) => {
              registerModel(app, require('models/achievementdetails'));
              cb(null, require('routes/achievementdetails/'));
            }, 'achievementdetails');
          },
        },
        {
          path: 'teachers',
          getComponent (nextState, cb) {
            require.ensure([], (require) => {
              registerModel(app, require('models/teachers'));
              cb(null, require('routes/teachers/'));
            }, 'teachers');
          },
        },
        {
          path: 'group',
          getComponent (nextState, cb) {
            require.ensure([], (require) => {
              registerModel(app, require('models/group'));
              cb(null, require('routes/group/'));
            }, 'group');
          },
        },
        {
          path: 'groupdetails',
          getComponent (nextState, cb) {
            require.ensure([], (require) => {
              registerModel(app, require('models/groupdetails'));
              cb(null, require('routes/groupdetails/'));
            }, 'groupdetails');
          },
        },
        {
          path: 'attendance',
          getComponent (nextState, cb) {
            require.ensure([], (require) => {
              registerModel(app, require('models/attendance'));
              cb(null, require('routes/attendance/'));
            }, 'attendance');
          },
        },
        {
          path: 'attendancedetails',
          getComponent (nextState, cb) {
            require.ensure([], (require) => {
              registerModel(app, require('models/attendancedetails'));
              cb(null, require('routes/attendancedetails/'));
            }, 'attendancedetails');
          },
        },
        {
          path: 'forum',
          getComponent (nextState, cb) {
            require.ensure([], (require) => {
              registerModel(app, require('models/forum'));
              cb(null, require('routes/forum/'));
            }, 'forum');
          },
        },
        {
          path: 'forumDetails',
          getComponent (nextState, cb) {
            require.ensure([], (require) => {
              registerModel(app, require('models/forumDetails'));
              cb(null, require('routes/forumDetails/'));
            }, 'forumDetails');
          },
        },
        {
          path: 'sendForum',
          getComponent (nextState, cb) {
            require.ensure([], (require) => {
              registerModel(app, require('models/sendForum'));
              cb(null, require('routes/sendForum/'));
            }, 'sendForum');
          },
        },
        {
          path: 'replyAll',
          getComponent (nextState, cb) {
            require.ensure([], (require) => {
              registerModel(app, require('models/replyAll'));
              cb(null, require('routes/replyAll/'));
            }, 'replyAll');
          },
        },
        {
          path: 'userpage',
          getComponent (nextState, cb) {
            require.ensure([], (require) => {
              registerModel(app, require('models/userpage'));
              cb(null, require('routes/userpage/'));
            }, 'userpage');
          },
        },
        {
          path: 'conversation',
          getComponent (nextState, cb) {
            require.ensure([], (require) => {
              registerModel(app, require('models/conversation'));
              cb(null, require('routes/conversation/'));
            }, 'conversation');
          },
        },
        {
          path: 'page',
          getComponent (nextState, cb) {
            require.ensure([], (require) => {
              registerModel(app, require('models/page'));
              cb(null, require('routes/page/'));
            }, 'page');
          },
        },
        {
          path: 'quiz',
          getComponent (nextState, cb) {
            require.ensure([], (require) => {
              registerModel(app, require('models/quiz'));
              cb(null, require('routes/quiz/'));
            }, 'quiz');
          },
        },
        {
          path: 'quizDetails',
          getComponent (nextState, cb) {
            require.ensure([], (require) => {
              registerModel(app, require('models/quizDetails'));
              cb(null, require('routes/quizDetails/'));
            }, 'quizDetails');
          },
        },
        {
          path: 'quizReview',
          getComponent (nextState, cb) {
            require.ensure([], (require) => {
              registerModel(app, require('models/quizReview'));
              cb(null, require('routes/quizReview/'));
            }, 'quizReview');
          },
        },
        {
          path: 'quizComplete',
          getComponent (nextState, cb) {
            require.ensure([], (require) => {
              registerModel(app, require('models/quizComplete'));
              cb(null, require('routes/quizComplete/'));
            }, 'quizComplete');
          },
        },
        {
          path: 'details',
          getComponent (nextState, cb) {
            require.ensure([], (require) => {
              registerModel(app, require('models/details'));
              cb(null, require('routes/details/'));
            }, 'details');
          },
        },
        {
          path: 'url',
          getComponent (nextState, cb) {
            require.ensure([], (require) => {
              registerModel(app, require('models/url'));
              cb(null, require('routes/url/'));
            }, 'url');
          },
        },
        {
          path: 'feedback',
          getComponent (nextState, cb) {
            require.ensure([], (require) => {
              registerModel(app, require('models/feedback'));
              cb(null, require('routes/feedback/'));
            }, 'feedback');
          },
        },
        {
          path: 'feedbackdetails',
          getComponent (nextState, cb) {
            require.ensure([], (require) => {
              registerModel(app, require('models/feedbackdetails'));
              cb(null, require('routes/feedbackdetails/'));
            }, 'feedbackdetails');
          },
        },
        {
          path: 'feedbackresult',
          getComponent (nextState, cb) {
            require.ensure([], (require) => {
              registerModel(app, require('models/feedbackresult'));
              cb(null, require('routes/feedbackresult/'));
            }, 'feedbackresult');
          },
        },
        {
          path: 'feedbackresultdetails',
          getComponent (nextState, cb) {
            require.ensure([], (require) => {
              registerModel(app, require('models/feedbackresult'));
              cb(null, require('routes/feedbackresultdetails/'));
            }, 'feedbackresultdetails');
          },
        },
        {
          path: 'test',
          getComponent (nextState, cb) {
            require.ensure([], (require) => {
              cb(null, require('routes/test/'));
            }, 'test');
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

  return (
    <Router history={history} routes={routes} />
  );
};

Routers.propTypes = {
  history: PropTypes.object,
  app: PropTypes.object,
};

export default Routers;
