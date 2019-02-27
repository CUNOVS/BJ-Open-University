import { routerRedux } from 'dva/router';
import { Modal } from 'components';
import { doDecode } from 'utils';


const handleLessonClick = (dispatch, { lessonType = 'free' }) => {
  dispatch(routerRedux.push({
    pathname: 'lessondetails',
    query: {
      lessonType,
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
const handleListClick = (data, dispatch) => {
  const { route = '', text = '' } = data;
  dispatch(routerRedux.push({
    pathname: `/${route}`,
    query: {
      name: `${text}`,
    },
  }));
};
const handlerChangeRouteClick = (path = '', data = {}, dispatch, e) => {
  /**
   * @author Lowkey
   * @date 2019/2/20 10:22:14
   * @Description: 跳转路由
   *
   */
  e.stopPropagation();
  dispatch(routerRedux.push({
    pathname: path,
    query: data,
  }));
};

module.exports = {
  handleListClick,
  handleLessonClick,
  handleGridClick,
  handlerChangeRouteClick,
};
