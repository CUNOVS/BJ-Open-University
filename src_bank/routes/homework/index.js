/**
 * @author Lowkey
 * @date 2019/02/28 11:58:51
 * @Description: 修改 wkc
 */
import React from 'react';
import Nav from 'components/nav';
import { connect } from 'dva';
import { Button, WingBlank, List, WhiteSpace } from 'components';
import { getImages, getErrorImg, getLocalIcon, changeLessonData } from 'utils';
import Enclosure from './components/enclosure';
import Status from './components/status';
import { ContentSkeleton } from 'components/skeleton';
import styles from './index.less';
import Introduction from 'components/introduction';

const PrefixCls = 'homework';

@connect(({ homework, loading }) => ({ // babel装饰器语法糖
  homework,
  loading: loading.effects[`${PrefixCls}/queryHomework`],
}))
class Homework extends React.Component {
  constructor (props) {
    super(props);
    this.state = {};
  }

  componentDidMount () {

  }

  render () {
    const { name } = this.props.location.query,
      { data, comments = [] } = this.props.homework,
      { loading } = this.props,
      { assignmentsName, coursesName, intro = '', introattachments } = data;
    console.log(loading)
    return (
      <div>
        <Nav title={name}
             dispatch={this.props.dispatch}
             hasShadow
        />
        {loading ? <ContentSkeleton /> : <div>
          <div className={styles[`${PrefixCls}-top`]}>
            <div className={styles[`${PrefixCls}-top-title`]}>{assignmentsName}</div>
            <div className={styles[`${PrefixCls}-top-course`]}>
              {coursesName}
            </div>
          </div>
          {intro !== '' && !loading ? <Introduction data={intro} /> : ''}
          <Enclosure data={introattachments} />
          <List>
            <List.Item arrow="horizontal" extra={`评论(${comments.length})`} multipleLine onClick={() => {
            }}>
              作业备注
            </List.Item>
          </List>
          <Status {...data} /></div>}

      </div>
    );
  }
}


export default Homework;
