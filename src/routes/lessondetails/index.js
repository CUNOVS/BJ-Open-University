/*WKC
2018.10.11 17:52*/
/**
 * @author Lowkey
 * @date 2018/10/24
 * @Description:
 */
import React from 'react';
import styles from './index.less';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import TitleBox from 'components/titlecontainer';
import { Tabs, WhiteSpace, Badge, Icon, Toast } from 'components';
import Introduction from 'components/introduction';
import CourseList from 'components/courselist';
import LessonGrade from 'components/lessongrade';
import InnerHtml from 'components/innerhtml';
import NoContent from 'components/nocontent';
import Dialogue from 'components/discuss/dialogue';
import ReactDOM from 'react-dom';
import { myNoteRow } from 'components/row';
import { getOffsetTopByBody, getLocalIcon } from 'utils';
import AnimationButton from 'components/animationbutton';
import Photo from 'components/photo';
import video from './jquery.mp4';
import pic from './pic.jpg';
import Purchase from 'components/purchase';
import TransparentHeader from 'components/transparentheader';
import DiscussionArea from 'components/discussionarea';

const PrefixCls = 'lessondetails';
let content = '<p style="text-align: center;margin:0">\n' +
  '<span width="100%" poster="/pre.png" autobuffer="" controls="" src="http://www.myals.gov.cn:8088/526fe308-cd22-4c89-9afa-144c5de56bbe/526fe308-cd22-4c89-9afa-144c5de56bbe1.mp4">&nbsp;</span>\n' +
  '</p>';
const tabs = [
    { title: <Badge>详情</Badge> },
    { title: <Badge>章节</Badge> },
    { title: <Badge>评论</Badge> },
    { title: <Badge>笔记</Badge> },
  ],
  row = [
    {
      section: '第一章',
      part: [
        { title: 'Jquery基础课程01', time: '9:10', id: '1', type: 'video' },
        { title: 'Jquery基础课程02', time: '9:10', id: '2', type: 'video' },
        { title: 'Jquery基础课程03', time: '9:10', id: '3', type: 'video' },
      ],
    },
    {
      section: '第二章',
      part: [
        {
          title: '课程大纲',
          time: '',
          id: '0',
          type: 'pdf',
          url: 'https://raw.githubusercontent.com/mynane/PDF/ff4e1a0e52eb35bd91c13aaaf5715ea6bf09bfdc/Docker%20%E5%AE%9E%E8%B7%B5%20-%20v1.1.pdf',
        },
        { title: 'Jquery基础课程01', time: '9:10', id: '1', type: 'video' },
        { title: 'Jquery基础课程02', time: '9:10', id: '2', type: 'video' },
        { title: 'Jquery基础课程03', time: '9:10', id: '3', type: 'video' },
        { title: '课后作业', id: '4', type: 'homework' },
      ],
    },
  ];

class LessonDetails extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      height: cnhtmlHeight,
      tabOffset: 0,
    };
  }

  componentWillMount () {
    document.documentElement.scrollTop = 0;
  }

  componentDidMount () {
    const element = ReactDOM.findDOMNode(this.vl),
      tabs = ReactDOM.findDOMNode(this.tabs),
      video = ReactDOM.findDOMNode(this.video),
      currentHeight = getOffsetTopByBody(element);
    console.log(currentHeight);
    this.setState({
      height: cnhtmlHeight - currentHeight,
      tabOffset: getOffsetTopByBody(tabs),
    });

    video.onplay = () => {
      Toast.offline(checkConnection());
    };
  }

  render () {
    const { name = '', lessonType = 'free' } = this.props.location.query,
      { currentComments, note } = this.props.lessondetails;
    const getContents = () => {
        let str = 'video';
        let newContent = content.replace('span', str);
        return {
          __html: newContent,
        };
      },
      getvideo = () => {
        return (
          <video key={1}
                 ref={el => this.video = el}
                 width="100%"
                 preload="none"
                 poster={pic}
                 src={video}
                 controlsList="nodownload"
                 controls="controls"
          />
        );
      },
      handlerNoteClick = () => {
        this.props.dispatch(routerRedux.push({
          pathname: '/notetaking',
          query: {
            name: '记笔记',
          },
        }));
      },
      handlerDiscussClick = () => {
        this.props.dispatch(routerRedux.push({
          pathname: '/reply',
          query: {
            name: '评论',
          },
        }));
      },
      handlerCourseClick = ({ type, title = '', url = '' }) => {
        if (type === 'homework') {
          this.props.dispatch(routerRedux.push({
            pathname: '/homeworkdetails',
            query: {
              name: '作业',
            },
          }));
        } else if (type === 'pdf') {
          cnOpen(url);
          // this.props.dispatch(routerRedux.push({
          //   pathname: '/readpdf',
          //   query: {
          //     name: title,
          //   },
          // }));
        }
      },
      handlerPayClick = () => {
        this.props.dispatch(routerRedux.push({
          pathname: '/pay',
          query: {
            name: '支付',
          },
        }));
      },
      props = {
        handlerNoteClick,
        handlerDiscussClick,
        height: this.state.height,
      };
    return (
      <div className={styles[`${PrefixCls}-outer`]}>
        <TransparentHeader name={name} dispatch={this.props.dispatch} offset={this.state.tabOffset} />
        <div>
          {getvideo()}
        </div>
        <Tabs
          tabs={tabs}
          ref={el => this.tabs = el}
          onChange={(tab, index) => {
            console.log('onChange', index, tab);
          }}
          onTabClick={(tab, index) => {
            console.log('onTabClick', index, tab);
          }}
        >
          <div style={{ height: this.state.height }}>
            <LessonGrade dispatch={this.props.dispatch} />
            <WhiteSpace size='xs' />
            <TitleBox title="课程简介" sup="" />
            <Introduction />
            <WhiteSpace size='xs' />
            <TitleBox title="课程讲师" sup="" />
            <Photo
              path="https://img-ph-mirror.nosdn.127.net/l4Sh6C4IheRcW92RS3ID4g==/6608871924468841382.jpg?imageView&quality=100&thumbnail=75y75"
              type="user" name="戴志欢" />
            <div
              className={styles[`${PrefixCls}-teacher`]}>云知梦教学总监，中国PHP高效培训第一人，山西PHP和RHCA高端培训第一人，七年互联网开发经验，曾在香港电讯盈科、北大青鸟集团、山西远大教育等公司任职。曾获得Redhat
              RHCA构架师和RHCDS数据中心专家，在国内排名为40名左右，在全球排名为300名左右。
            </div>
          </div>
          <div ref={el => this.vl = el} style={{ height: this.state.height, background: '#fff' }}>
            <CourseList data={row} handlerClick={handlerCourseClick} />
          </div>
          <div className={styles[`${PrefixCls}-discuss`]} style={{ height: this.state.height, background: '#fff' }}>
            <div className={styles[`${PrefixCls}-discuss-area`]}>
              <DiscussionArea title="综合讨论区" />
              <DiscussionArea title="综合讨论区" />
              <DiscussionArea title="综合讨论区" />
            </div>
            <TitleBox title={`评论(${4})`} sup='' />
            <div>
              {currentComments && currentComments.map((data, i) => (
                <Dialogue key={i}  {...data} dispatch={this.props.dispatch} />
              ))}
            </div>
            {/*<NoContent/>*/}
          </div>
          <div className={styles[`${PrefixCls}-note`]} style={{ height: this.state.height }}>
            <div className={styles[`${PrefixCls}-note-container`]}>
              <h3>{note.title}</h3>
              <span>{note.createDate}</span>
              <div><InnerHtml data={note.contents} /></div>
            </div>
            {/*<NoContent/>*/}
          </div>
        </Tabs>
        {lessonType === 'free' ? <AnimationButton {...props} /> : ''}
        {lessonType !== 'free' ? <Purchase lessonType={lessonType} Click={handlerPayClick} /> : ''}
      </div>
    );
  }
}

export default connect(({ loading, lessondetails }) => ({
  loading,
  lessondetails,
}))(LessonDetails);
