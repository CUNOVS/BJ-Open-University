/**
 * @author Lowkey
 * @date 2019/02/26 11:00:23
 * @Description:
 */
import React from 'react';
import propTypes from 'prop-types';
import { routerRedux } from 'dva/router';
import { getOffsetTopByBody, getLocalIcon, getImages } from 'utils';
import InnerHtml from 'components/innerhtml';
import Checkbox from 'components/checkbox';
import styles from './index.less';

const PrefixCls = 'lessonitem';

const LessonItem = (props) => {
  const { modname, name, modicon, description, url, uservisible, instance, id, state, tracking } = props.data,
    handlerCourseClick = ({ modname, title = '' }) => {
      if (modname === 'homework') {
        props.dispatch(routerRedux.push({
          pathname: '/homeworkdetails',
          query: {
            name: title,
          },
        }));
      } else if (modname === 'pdf') {
        // cnOpen(url);
        props.dispatch(routerRedux.push({
          pathname: '/readpdf',
          query: {
            name: title,
          },
        }));
      } else if (modname === 'video') {
        props.dispatch(routerRedux.push({
          pathname: '/video',
          query: {
            name: title,
          },
        }));
      } else if (modname === 'huodong') {
        props.dispatch(routerRedux.push({
          pathname: '/forum',
          query: {
            name: title,
          },
        }));
      }
    },
    handlerCheckboxClick = (e) => {
      e.stopPropagation();
    };
  if (modname !== 'label') {
    return (
      <div className={styles[`${PrefixCls}-outer`]}>
        <div className={styles[`${PrefixCls}-outer-top`]}>
          <div className={styles[`${PrefixCls}-outer-top-icon`]}>
            <img src={getImages(modicon)} alt="" />
          </div>
          <div className={styles[`${PrefixCls}-outer-top-content`]}>
            <div className={styles[`${PrefixCls}-outer-top-content-title`]}>
              {name}
            </div>
            {
              tracking > 0
                ?
                <div className={styles[`${PrefixCls}-outer-top-content-check`]}>
                  <Checkbox state={state} tracking={tracking} handlerClick={handlerCheckboxClick} />
                </div>
                : ''
            }
          </div>
        </div>
        {description ? <div className={styles[`${PrefixCls}-outer-describe`]}>
          <div dangerouslySetInnerHTML={{ __html: description }} />
        </div> : ''}
      </div>
    );
  } else if (modname === 'label') {
    return (
      <InnerHtml data={description} />
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
