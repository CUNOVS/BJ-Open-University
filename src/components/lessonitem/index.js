/**
 * @author Lowkey
 * @date 2019/02/26 11:00:23
 * @Description:
 */
import React from 'react';
import PropTypes from 'prop-types';
import { List } from 'antd-mobile';
import { routerRedux } from 'dva/router';
import { getOffsetTopByBody, getLocalIcon } from 'utils';
import InnerHtml from 'components/innerhtml';
import styles from './index.less';

const Item = List.Item;
const LessonItem = (props) => {

  const { icon, title, type, listType = 'list' } = props.data,
    handlerCourseClick = ({ type, title = '' }) => {
      if (type === 'homework') {
        props.dispatch(routerRedux.push({
          pathname: '/homeworkdetails',
          query: {
            name: title,
          },
        }));
      } else if (type === 'pdf') {
        // cnOpen(url);
        props.dispatch(routerRedux.push({
          pathname: '/readpdf',
          query: {
            name: title,
          },
        }));
      } else if (type === 'video') {
        props.dispatch(routerRedux.push({
          pathname: '/video',
          query: {
            name: title,
          },
        }));
      } else if (type === 'huodong') {
        props.dispatch(routerRedux.push({
          pathname: '/forum',
          query: {
            name: title,
          },
        }));
      }
    };

  if (listType === 'list') {
    return (
      <div className={styles.outer}>
        <Item
          thumb={icon}
          onClick={handlerCourseClick.bind(null, props.data)}
        ><span>{title}</span></Item>
      </div>
    );
  } else if (listType === 'html') {
    return (
      <div className={styles.label}><InnerHtml data={title} /></div>
    );
  }
};
LessonItem.defaultProps = {
  icon: '',
  title: '课件',
  type: 'pdf',

};
LessonItem.propTypes = {};
export default LessonItem;
