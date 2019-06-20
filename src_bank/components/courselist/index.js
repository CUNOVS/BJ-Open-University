/**
 * @author Lowkey
 * @date 2018/10/25
 * @Description: 课程列表
 */
import React from 'react';
import PropTypes from 'prop-types';
import styles from './index.less';
import { List, Accordion } from 'components';
import LessonItem from 'components/lessonitem';
import { chapterRow } from 'components/row';

const PrefixCls = 'courselist';

const CourseList = (props) => (
  <div className={styles[`${PrefixCls}-outer`]}>
    <Accordion defaultActiveKey={(props.activityIndex - 1).toString()}
               className={styles[`${PrefixCls}-accordion`]}
               onChange={props.handlerChange}
    >
      {
        cnIsArray(props.data) && props.data.map((d, i) => {
          return (<Accordion.Panel header={d.name} key={i}>
            {d.modules && d.modules.map((p, i) => {
              return (
                <LessonItem key={p.id} data={p} dispatch={props.dispatch} courseid={props.courseid} />
              );
            })}
          </Accordion.Panel>);
        })
      }
    </Accordion>
  </div>
);

CourseList.propTypes = {
  data: PropTypes.array.isRequired,
  handlerChange: PropTypes.func.isRequired,
};

CourseList.defaultProps = {
  data: [],
};
export default CourseList;
