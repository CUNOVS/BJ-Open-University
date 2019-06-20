/**
 * @author Lowkey
 * @date 2019/02/28 11:58:51
 * @Description: 修改 wkc
 */
import React from 'react';
import Nav from 'components/nav';
import { connect } from 'dva';
import { Button, WingBlank, List, WhiteSpace } from 'components';
import { getImages, getErrorImg, getLocalIcon, changeLessonDate } from 'utils';
import Introduction from 'components/introduction';
import { ContentSkeleton } from 'components/skeleton';
import { handlerChangeRouteClick } from 'utils/commonevents';
import Enclosure from 'components/enclosure';
import Status from './components/status';
import styles from './index.less';

const PrefixCls = 'homework';

@connect(({ homework, loading }) => ({ // babel装饰器语法糖
  homework,
  loading: loading.effects[`${PrefixCls}/queryHomework`],
}))
class Homework extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      startTime: 0
    };
  }

  componentDidMount () {
    const { courseid = '', cmid = '', type = 'mod', modname } = this.props.location.query;
    this.setState(() => ({
      startTime: new Date()
    }));
    this.props.dispatch({
      type: 'app/logApi',
      payload: {
        assesstime: new Date().getTime(),
        courseid,
        cmid,
        type,
        modname
      }
    });
  }

  componentWillUnmount () {
    const { courseid = '', cmid = '' } = this.props.location.query;
    this.props.dispatch({
      type: 'app/accessTime',
      payload: {
        startedat: this.state.startTime.getTime(),
        endedat: new Date().getTime(),
        courseid,
        cmid,

      }
    });
  }

  render () {
    const { name, assignId, cmid } = this.props.location.query,
      { data, comments } = this.props.homework,
      { loading } = this.props,
      { assignmentsName, coursesName, intro = '', introattachments, coursesId: courseid = '' } = data;
    return (
      <div >
        <Nav
          title={name || assignmentsName}
          dispatch={this.props.dispatch}
          hasShadow
        />
        {
          loading ? <ContentSkeleton /> : <div >
            <div className={styles[`${PrefixCls}-top`]} >
              <div className={styles[`${PrefixCls}-top-title`]} >{assignmentsName}</div >
              <div className={styles[`${PrefixCls}-top-course`]} >
                {coursesName}
              </div >
            </div >
            {intro !== '' && !loading ?
              <Introduction data={intro} dispatch={this.props.dispatch} courseid={courseid} /> : ''}
            <Enclosure data={introattachments} fileIdPrefix={`${courseid}_${cmid}`} />
            <List >
              <List.Item
                arrow="horizontal"
                extra={`评论(${comments.length})`}
                multipleLine
                onClick={
                  comments.length > 0 ?
                    (e) => handlerChangeRouteClick(
                      'details',
                      {
                        name: '评论',
                        type: 'comments',
                      },
                      this.props.dispatch,
                      e)
                    :
                    null
                }
              >
                作业备注
              </List.Item >
            </List >
            <Status {...data} assignId={assignId} fileIdPrefix={`${courseid}_${cmid}`} dispatch={this.props.dispatch} />
          </div >
        }

      </div >
    );
  }
}


export default Homework;
