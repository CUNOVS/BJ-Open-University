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
const handlerCommonClick = (text = '', dispatch) => {
  /**
   * @author Lowkey
   * @date 2018/11/12 10:22:14
   * @Description: 跳转列表
   *
   */
  dispatch(routerRedux.push({
    pathname: `/commonlist`,
    query: {
      name: `${text}`,
    },
  }));
};

module.exports = {
  handleListClick,
  handleLessonClick,
  handleGridClick,
  handlerCommonClick,
};
