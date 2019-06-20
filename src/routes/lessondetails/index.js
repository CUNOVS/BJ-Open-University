/* WKC
2018.10.11 17:52 */
/**
 * @author Lowkey
 * @date 2019/2/18
 * @Description:
 */
import React from 'react';
import { connect } from 'dva';
import { Tabs, WhiteSpace, Badge, Icon, Toast } from 'components';
import TitleBox from 'components/titlecontainer';
import LessonItem from 'components/lessonitem';
import Introduction from 'components/introduction';
import CourseList from 'components/courselist';
import InnerHtml from 'components/innerhtml';
import ReactDOM from 'react-dom';
import Refresh from 'components/pulltorefresh';
import { getOffsetTopByBody, getLocalIcon, getImages } from 'utils';
import { handlerChangeRouteClick, handlerDivInnerHTMLClick } from 'utils/commonevents';
import Photoheader from 'components/photoheader';
import PhotoBox from 'components/photobox';
import NoContent from 'components/nocontent';
import styles from './index.less';

const PrefixCls = 'lessondetails';
const tabs = [
  { title: <Badge >课程导学</Badge > },
  { title: <Badge >课程学习</Badge > },
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
      startTime: 0
    };
  }

  componentWillMount () {
    document.documentElement.scrollTop = 0;
  }

  componentDidMount () {
    this.timer = setTimeout(() => {
      const hei = this.state.pullHeight - getOffsetTopByBody(ReactDOM.findDOMNode(this.ptr));
      this.setState(() => ({
        pullHeight: hei,
      }));
    }, 300);
    const { courseid = '', cmid = '', type = 'mod', modname } = this.props.location.query;
    this.setState(() => ({
      startTime: new Date()
    }));
    this.props.dispatch({
      type: 'app/logApi',
      payload: {
        assesstime: new Date().getTime(),
        courseid,
        cmid: '',
        type: 'course',
        modname: ''
      }
    });
  }

  componentWillUnmount () {
    clearTimeout(this.timer);
  }

  render () {
    const { courseid = '' } = this.props.location.query,
      { data: { name = '', summary = '', section0Summary = '', summaryformat = 1, master, tutor, courseImage, guide, resources, id = '', attendanceRule = '', attendance = {}, enddate, startdate, fullname }, refreshing, selectIndex = 0, scrollerTop, activityIndex } = this.props.lessondetails,
      { weekStat = 0 } = attendance,
      { users: { userid } } = this.props.app,
      dispatch = this.props.dispatch,
      props = {
        courseid,
        dispatch
      };
    const handlerChange = (key) => {
        // this.props.dispatch({
        //   type: `${PrefixCls}/updateState`,
        //   payload: {
        //     activityIndex: (args[args.length - 1]) * 1
        //   },
        // });
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
      },
      onScrollerTop = (top) => {
        if (typeof top !== 'undefined' && !isNaN(top * 1)) {
          this.props.dispatch({
            type: `${PrefixCls}/updateState`,
            payload: {
              scrollerTop: top,
            },
          });
        }
      },
      handDivClick = (e) => {
        e.stopPropagation();
        handlerDivInnerHTMLClick(e, courseid || id, dispatch);
      };
    return (
      <div className={styles[`${PrefixCls}-outer`]} >
        <Photoheader dispatch={this.props.dispatch} />
        <PhotoBox
          handlerChartClick={handlerChangeRouteClick}
          bg={getImages(courseImage)}
          master={master}
          tutor={tutor}
          dispatch={this.props.dispatch}
          state={weekStat}
          attendanceClick={handlerChangeRouteClick.bind(null, 'attendancedetails', {
            name: '考勤详情',
            courseid,
            enddate,
            startdate,
            fullname
          }, this.props.dispatch)}
        />
        <div className={styles[`${PrefixCls}-tagbox`]} >
          <Tabs
            tabs={tabs}
            tabBarActiveTextColor="#22609c"
            tabBarInactiveTextColor="#b7b7b7"
            tabBarUnderlineStyle={{ border: '1px solid #22609c' }}
            // initialPage={activityIndex > 0 ? 1 : 0}
            swipeable={false}
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
            <div className={styles[`${PrefixCls}-tagbox-item`]} >
              <Refresh
                refreshing={refreshing}
                onRefresh={onRefresh}
                onScrollerTop={onScrollerTop.bind(null)}
                scrollerTop={scrollerTop}
              >
                {this.props.loading && !refreshing ?
                  <NoContent />
                  :
                  <div className={styles[`${PrefixCls}-lessonInfo`]} >
                    <WhiteSpace size="xs" />
                    <div className={styles[`${PrefixCls}-lessonInfo-title`]} >{name}</div >
                    {
                      summaryformat && summary !== '' ?
                        <div >
                          <TitleBox title="课程简介" sup="" />
                          <Introduction data={summary} dispatch={this.props.dispatch} courseid={courseid} />
                        </div >
                        :
                        ''
                    }
                    <WhiteSpace size="xs" />
                    {
                      attendanceRule !== '' ?
                        <div >
                          <TitleBox title="考勤要求" sup="" />
                          <InnerHtml data={attendanceRule} />
                        </div >
                        :
                        null
                    }
                    <InnerHtml data={section0Summary} handleClick={handDivClick} />
                    <WhiteSpace size="lg" />
                    <div >
                      {cnIsArray(guide) && guide.map((data, i) => {
                        return <LessonItem key={data.id} data={data} {...props} />;
                      })}
                    </div >
                  </div >}
              </Refresh >
            </div >
            <Refresh
              refreshing={refreshing}
              onRefresh={onRefresh}
              onScrollerTop={onScrollerTop.bind(null)}
              scrollerTop={scrollerTop}
            >
              {this.props.loading && !refreshing ?
                <NoContent />
                : <div >
                  <CourseList
                    data={resources}
                    activityIndex={activityIndex}
                    {...props}
                    handlerChange={handlerChange}
                  />
                </div >}
            </Refresh >
          </Tabs >
        </div >
      </div >
    );
  }
}

export default LessonDetails;
