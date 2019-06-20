/* WKC
2018.10.11 17:52 */
/**
 * @author Lowkey
 * @date 2019/2/18
 * @Description:
 */
import React from 'react';
import styles from './index.less';
import { connect } from 'dva';
import { Tabs, WhiteSpace, Badge, Icon, Toast, PullToRefresh } from 'components';
import TitleBox from 'components/titlecontainer';
import LessonItem from 'components/lessonitem';
import Introduction from 'components/introduction';
import CourseList from 'components/courselist';
import InnerHtml from 'components/innerhtml';
import ReactDOM from 'react-dom';
import { getOffsetTopByBody, getLocalIcon, getImages } from 'utils';
import { handlerChangeRouteClick } from 'utils/commonevents';
import Photoheader from 'components/photoheader';
import PhotoBox from 'components/photobox';
import NoContent from 'components/nocontent';

const PrefixCls = 'lessondetails';
const tabs = [
  { title: <Badge>课程导学</Badge> },
  { title: <Badge>课程学习</Badge> },
];

@connect(({ lessondetails, loading, app }) => ({ // babel装饰器语法糖
  lessondetails,
  loading: loading.effects['lessondetails/queryDetails'],
  app,
}))

class LessonDetails extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      pullHeight: cnhtmlHeight,
    };
  }

  componentWillMount () {
    document.documentElement.scrollTop = 0;
  }

  componentDidMount () {
    this.timer = setTimeout(() => {
      const hei = this.state.pullHeight - getOffsetTopByBody(ReactDOM.findDOMNode(this.ptr));
      this.setState({
        pullHeight: hei,
      });
    }, 300);
  }

  componentWillUnmount () {
    clearTimeout(this.timer);
  }

  render () {
    const { courseid = '' } = this.props.location.query,
      { pathname } = this.props.location,
      { data: { id = '', name = '', summary = '', summaryformat = 1, master = {}, tutor = {}, lessonImage, guide, resources, activityIndex }, refreshing, selectIndex = 0 } = this.props.lessondetails,
      { users: { userid } } = this.props.app,
      props = {
        courseid,
        dispatch: this.props.dispatch,
      };
    const handlerChange = (key) => {

      },
      onRefresh = () => {
        this.props.dispatch({
          type: `${PrefixCls}/updateState`,
          payload: {
            refreshing: true,
          },
        });
        this.props.dispatch({
          type: `${PrefixCls}/queryDetails`,
          payload: {
            userid,
            courseid,
          },
        });
      };
    return (
      <div className={styles[`${PrefixCls}-outer`]}>
        <Photoheader dispatch={this.props.dispatch} />
        <PhotoBox
          bg={getImages(lessonImage)}
          master={master.fullname}
          tutor={tutor.fullname}
          attendanceClick={handlerChangeRouteClick.bind(null, 'attendancedetails', { name: '考勤详情' }, this.props.dispatch)}
        />
        <div className={styles[`${PrefixCls}-tagbox`]}>
          <Tabs
            tabs={tabs}
            tabBarActiveTextColor="#22609c"
            tabBarInactiveTextColor="#b7b7b7"
            tabBarUnderlineStyle={{ border: '1px solid #22609c' }}
            // initialPage={activityIndex > 0 ? 1 : 0}
            page={selectIndex}
            onChange={(tab, index) => {
              this.props.dispatch({
                type: `${PrefixCls}/updateState`,
                payload: {
                  selectIndex: index,
                },
              });
            }}
          >
           <div className={styles[`${PrefixCls}-tagbox-item`]}>
             <PullToRefresh
               damping={60}
               ref={el => this.ptr = el}
               style={{
                 height: this.state.pullHeight,
                 overflow: 'auto',
               }}
               indicator={{ deactivate: '上拉可以刷新' }}
               refreshing={refreshing}
               onRefresh={onRefresh}
             >
               {this.props.loading ?
                 <NoContent />
                 :
                 <div className={styles[`${PrefixCls}-lessonInfo`]}>
                   <WhiteSpace size="xs" />
                   <div className={styles[`${PrefixCls}-lessonInfo-title`]}>{name}</div>
                   {
                     summaryformat ?
                       <div>
                         <TitleBox title="课程简介" sup="" />
                         <Introduction data={summary} />
                       </div>
                       :
                       ''
                   }
                   <WhiteSpace size="xs" />
                   <TitleBox title="考勤要求" sup="" />
                   <InnerHtml />
                   <WhiteSpace size="lg" />
                   <div>
                     {cnIsArray(guide) && guide.map((data, i) => {
                       return <LessonItem key={data.id} data={data} {...props} />;
                     })}
                   </div>
                 </div>}
             </PullToRefresh>
           </div>
            <PullToRefresh
              damping={60}
              style={{
                height: this.state.pullHeight,
                overflow: 'auto',
              }}
              indicator={{ deactivate: '上拉可以刷新' }}
              refreshing={refreshing}
              onRefresh={onRefresh}
            >
              {this.props.loading ?
                <NoContent />
                : <div>
                  <CourseList
                    data={resources}
                    activityIndex={activityIndex}
                    {...props}
                    handlerChange={handlerChange}
                  />
                </div>}
            </PullToRefresh>
          </Tabs>
        </div>
      </div>
    );
  }
}

export default LessonDetails;
