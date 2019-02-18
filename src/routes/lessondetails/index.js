/*WKC
2018.10.11 17:52*/
/**
 * @author Lowkey
 * @date 2019/2/18
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
import InnerHtml from 'components/innerhtml';
import ReactDOM from 'react-dom';
import { myNoteRow } from 'components/row';
import { getOffsetTopByBody, getLocalIcon } from 'utils';
import Photo from 'components/photo';
import pic from './pic.jpg';
import Photoheader from 'components/photoheader';
import PhotoBox from 'components/photobox';

const PrefixCls = 'lessondetails';
const tabs = [
    { title: <Badge>课程导学</Badge> },
    { title: <Badge>课程学习</Badge> },
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
      currentHeight = getOffsetTopByBody(element);
    console.log(currentHeight);
    this.setState({
      height: cnhtmlHeight - currentHeight,
      tabOffset: getOffsetTopByBody(tabs),
    });
  }

  render () {
    const { name = '' } = this.props.location.query;
    const handlerCourseClick = ({ type, title = '', url = '' }) => {
        if (type === 'homework') {
          this.props.dispatch(routerRedux.push({
            pathname: '/homeworkdetails',
            query: {
              name: '作业',
            },
          }));
        } else if (type === 'pdf') {
          // cnOpen(url);
          this.props.dispatch(routerRedux.push({
            pathname: '/readpdf',
            query: {
              name: title,
            },
          }));
        }
      },
      props = {
        height: this.state.height,
      };
    return (
      <div className={styles[`${PrefixCls}-outer`]}>
        <Photoheader dispatch={this.props.dispatch} />
        <PhotoBox bg={pic} />
        <div className={styles[`${PrefixCls}-tagbox`]}>
          <Tabs
            tabs={tabs}
            ref={el => this.tabs = el}
            tabBarActiveTextColor='#22609c'
            tabBarInactiveTextColor="#b7b7b7"
            tabBarUnderlineStyle={{ border: '1px solid #22609c' }}
            onChange={(tab, index) => {
              console.log('onChange', index, tab);
            }}
            onTabClick={(tab, index) => {
              console.log('onTabClick', index, tab);
            }}
          >
            <div className={styles[`${PrefixCls}-lessonInfo`]} style={{ height: this.state.height }}>
              <WhiteSpace size='xs' />
              <div className={styles[`${PrefixCls}-lessonInfo-title`]}>20180903 3-6岁儿童学习与发展</div>
              <TitleBox title='课程简介' sup='' />
              <Introduction />
              <WhiteSpace size='xs' />
              <TitleBox title='课程大纲' sup='' />
              <TitleBox title='考勤要求' sup='' />
              <InnerHtml
                data='要求学生在每周周日晚12点之前登陆学习平台完成所有学习活动，如果有两周不能按时完成活动，则视为自动退课，退课的学生不计成绩。如果因特殊事由无法按时登陆平台完成学习活动，可以及时向辅导老师请假，但每人只有一次请假机会。' />
              <TitleBox title="教师团队" sup="" />
              <Photo
                path="https://img-ph-mirror.nosdn.127.net/l4Sh6C4IheRcW92RS3ID4g==/6608871924468841382.jpg?imageView&quality=100&thumbnail=75y75"
                type="user" name="戴志欢" />
              <InnerHtml data='云知梦教学总监，中国PHP高效培训第一人，山西PHP和RHCA高端培训第一人，七年互联网开发经验，曾在香港电讯盈科、北大青鸟集团、山西远大教育等公司任职。曾获得Redhat
                RHCA构架师和RHCDS数据中心专家，在国内排名为40名左右，在全球排名为300名左右。' />
            </div>
            <div ref={el => this.vl = el} style={{ height: this.state.height, background: '#fff' }}>
              <CourseList data={row} handlerClick={handlerCourseClick} />
            </div>
          </Tabs>
        </div>
      </div>
    );
  }
}

export default connect(({ loading, lessondetails }) => ({
  loading,
  lessondetails,
}))(LessonDetails);
