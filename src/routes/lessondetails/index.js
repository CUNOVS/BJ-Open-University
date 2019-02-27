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
import TitleBox from 'components/titlecontainer';
import { Tabs, WhiteSpace, Badge, Icon, Toast } from 'components';
import LessonItem from 'components/lessonitem';
import Introduction from 'components/introduction';
import CourseList from 'components/courselist';
import InnerHtml from 'components/innerhtml';
import ReactDOM from 'react-dom';
import { myNoteRow } from 'components/row';
import { getOffsetTopByBody, getLocalIcon } from 'utils';
import { handlerChangeRouteClick } from 'utils/commonevents';
import Photo from 'components/photo';
import pic from './pic.jpg';
import Photoheader from 'components/photoheader';
import PhotoBox from 'components/photobox';

const PrefixCls = 'lessondetails';
const tabs = [
    { title: <Badge>课程导学</Badge> },
    { title: <Badge>课程学习</Badge> },
  ],
  section0 = [
    {
      listType: 'list',
      icon: <Icon type={getLocalIcon('/lessontype/pdf.svg')} />,
      title: '点击阅读课程大纲',
      type: 'pdf',
    },
    {
      listType: 'list',
      icon: <Icon type={getLocalIcon('/lessontype/pdf.svg')} />,
      title: '课程团队介绍',
      type: 'pdf',
    },
    {
      listType: 'list',
      icon: <Icon type={getLocalIcon('/lessontype/huodong.svg')} />,
      title: '谈天说地——同学们自己的地盘!',
      type: 'huodong',
    },
    {
      listType: 'list',
      icon: <Icon type={getLocalIcon('/lessontype/video.svg')} />,
      title: '1《指南》制定的背景、目的和作用',
      type: 'video',
    },
    {
      listType: 'list',
      icon: <Icon type={getLocalIcon('/lessontype/video.svg')} />,
      title: '2《指南》中关于幼儿教育内容结构框架',
      type: 'video',
    },
  ],
  row = [
    {
      section: '4月23日 - 04月29日',
      part: [
        {
          listType: 'html',
          title: '<div><p><span style="font-family: 微软雅黑; color: #993300; font-size: 14px;"><strong>第一周：<b>3-6岁儿童健康领域的学习与发展</b><br></strong></span></p><p><strong>学习目标<br></strong></p><p><span style="font-size: small; font-family: 微软雅黑;">1.1 熟知幼儿健康领域的发展目标.重点描述幼儿基本动作的分类、基本要素以及掌握基本动作的活动目标和活动价值,熟知基本动作练习过程中的指导建议；</span><br><span style="font-size: small; font-family: 微软雅黑;">1.2 解释各年龄班体育游戏活动能力的发展和体育游戏的特点；</span><br><span style="font-size: small; font-family: 微软雅黑;">1.3 例举选编体育游戏的要求；</span><br><span style="font-size: small; font-family: 微软雅黑;">1.4 设计和组织基本的体育活动；</span><br><span style="font-size: small; font-family: 微软雅黑;">1.5 分析体育活动负荷量的控制和调节的方法；</span></p></div>',
        },
        {
          listType: 'html',
          title: '<p><span style="font-family: 微软雅黑;"><strong>重点难点解析</strong></span></p>',
        },
        {
          listType: 'list',
          icon: <Icon type={getLocalIcon('/lessontype/pdf.svg')} />,
          title: '知识点1:《3—6岁儿童学习与发展指南》',
          type: 'pdf',
        },
        {
          listType: 'list',
          icon: <Icon type={getLocalIcon('/lessontype/pdf.svg')} />,
          title: '知识点2：健康教育活动的组织与实施',
          type: 'pdf',
        },
        {
          listType: 'list',
          icon: <Icon type={getLocalIcon('/lessontype/pdf.svg')} />,
          title: '知识点3：学前儿童体育活动',
          type: 'pdf',
        },
        {
          listType: 'html',
          title: '<p><span style="font-family: 微软雅黑;"><strong>专家课堂</strong></span></p>',
        },
        {
          listType: 'list',
          icon: <Icon type={getLocalIcon('/lessontype/test.svg')} />,
          title: '视频1：幼儿园体育活动（上）',
          type: 'video',
        },
        {
          listType: 'list',
          icon: <Icon type={getLocalIcon('/lessontype/video.svg')} />,
          title: '视频2：幼儿园体育活动（下）',
          type: 'video',
        },
        {
          listType: 'list',
          icon: <Icon type={getLocalIcon('/lessontype/video.svg')} />,
          title: '视频3：《指南》指导下的幼儿园区域体育环境创设与指导（上）',
          type: 'video',
        },
        {
          listType: 'list',
          icon: <Icon type={getLocalIcon('/lessontype/video.svg')} />,
          title: '视频4：《指南》指导下的幼儿园区域体育环境创设与指导（下）',
          type: 'video',
        },
        {
          listType: 'html',
          title: '<p><span style="font-family: 微软雅黑;"><strong>学习活动</strong></span></p>',
        },
        {
          listType: 'list',
          icon: <Icon type={getLocalIcon('/lessontype/huodong.svg')} />,
          title: '活动1.1：评价幼儿健康成长状况（3分，考勤活动）',
          type: 'huodong',
        },
        {
          listType: 'list',
          icon: <Icon type={getLocalIcon('/lessontype/huodong.svg')} />,
          title: '活动1.2：体弱儿和肥胖儿的体育活动组织（2分，考勤活动）',
          type: 'huodong',
        },
        {
          listType: 'list',
          icon: <Icon type={getLocalIcon('/lessontype/test.svg')} />,
          title: '活动1.3：测验（2分，考勤活动）',
          type: 'test',
        },
      ],
    },
    {
      section: '4月30日 - 05月6日',
      part: [
        {
          listType: 'html',
          title: '<div><p><span style="font-family: 微软雅黑; color: #993300; font-size: 14px;"><strong>第二周：<b>3-6岁儿童语言领域的学习与发展</b><br></strong></span></p><p><strong>学习目标<br></strong></p><div class="no-overflow"><p class="AssignmentsLevel1"><span style="font-family: 微软雅黑;">2.1 概括学前儿童的语言是如何获得和发展的;</span></p>\n' +
            '<p class="AssignmentsLevel1"><span style="font-family: 微软雅黑;">2.2 阐述学前儿童语言教育目标的制定依据;</span></p>\n' +
            '<p class="AssignmentsLevel1"><span style="font-family: 微软雅黑;">2.3 说明学前儿童语言教育的实施途径;</span></p>\n' +
            '<p class="AssignmentsLevel1"><span style="font-family: 微软雅黑;">2.4 设计和组织基本的语言教育活动;</span></p>\n' +
            '<p class="AssignmentsLevel1"><span style="font-family: 微软雅黑;">2.5 评价学前儿童语言教育活动;</span></p></div></div>',
        },
        {
          listType: 'html',
          title: '<p><span style="font-family: 微软雅黑;"><strong>重点难点解析</strong></span></p>',
        },
        {
          listType: 'list',
          icon: <Icon type={getLocalIcon('/lessontype/pdf.svg')} />,
          title: '知识点1：学前儿童的语言的获得和发展',
          type: 'pdf',
        },
        {
          listType: 'list',
          icon: <Icon type={getLocalIcon('/lessontype/pdf.svg')} />,
          title: '知识点3：学前儿童语言教育的实施途径',
          type: 'pdf',
        },
        {
          listType: 'list',
          icon: <Icon type={getLocalIcon('/lessontype/pdf.svg')} />,
          title: '知识点3：学前儿童体育活动',
          type: 'pdf',
        },
        {
          listType: 'list',
          icon: <Icon type={getLocalIcon('/lessontype/pdf.svg')} />,
          title: '知识点4：基本的语言教育活动的设计和组织',
          type: 'pdf',
        },
        {
          listType: 'html',
          title: '<p><span style="font-family: 微软雅黑;"><strong>专家课堂</strong></span></p>',
        },
        {
          listType: 'list',
          icon: <Icon type={getLocalIcon('/lessontype/video.svg')} />,
          title: '视频1：3-6岁儿童语言领域的学习与发展（上）',
          type: 'video',
        },
        {
          listType: 'list',
          icon: <Icon type={getLocalIcon('/lessontype/video.svg')} />,
          title: '视频2：3-6岁儿童语言领域的学习与发展（下）',
          type: 'video',
        },
        {
          listType: 'html',
          title: '<p><span style="font-family: 微软雅黑;"><strong>学习活动</strong></span></p>',
        },
        {
          listType: 'list',
          icon: <Icon type={getLocalIcon('/lessontype/huodong.svg')} />,
          title: '活动2.1：分享语言教育活动案例（2分，考勤活动）',
          type: 'huodong',
        },
        {
          listType: 'list',
          icon: <Icon type={getLocalIcon('/lessontype/huodong.svg')} />,
          title: '活动2.2：案例分析（3分，考勤活动）',
          type: 'huodong',
        },
        {
          listType: 'list',
          icon: <Icon type={getLocalIcon('/lessontype/test.svg')} />,
          title: '活动2.3：设计一个语言教育活动目标（3分，考勤活动）',
          type: 'test',
        },
        {
          listType: 'html',
          title: '<p><span style="font-family: 微软雅黑;"><strong>本周作业</strong></span></p>',
        },
        {
          listType: 'list',
          icon: <Icon type={getLocalIcon('/lessontype/homework.svg')} />,
          title: '作业（第二周）：设计幼儿园中班谈话活动（10分，考勤活动）',
          type: 'homework',
        },
      ],
    },
    {
      section: '05月7日 - 05月13日',
      part: [],
    },
    {
      section: '05月14日 - 05月20日',
      part: [],
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
      height: cnhtmlHeight - currentHeight - 20,
      tabOffset: getOffsetTopByBody(tabs),
    });
  }

  render () {
    const { name = '' } = this.props.location.query;
    const handlerChange = (key) => {
        if (key.join() * 1 > 1) {
          Toast.fail('该课程还未开放');
        }
      },
      props = {
        height: this.state.height,
      };
    return (
      <div className={styles[`${PrefixCls}-outer`]}>
        <Photoheader dispatch={this.props.dispatch} />
        <PhotoBox bg={pic} master="彭海蕾" tutor="韩世梅"
                  attendanceClick={handlerChangeRouteClick.bind(null, 'attendancedetails', { name: '考勤详情' }, this.props.dispatch)} />
        <div className={styles[`${PrefixCls}-tagbox`]}>
          <Tabs
            tabs={tabs}
            ref={el => this.tabs = el}
            tabBarActiveTextColor='#22609c'
            tabBarInactiveTextColor="#b7b7b7"
            tabBarUnderlineStyle={{ border: '1px solid #22609c' }}
            initialPage={1}
            onChange={(tab, index) => {
              console.log('onChange', index, tab);
            }}
            onTabClick={(tab, index) => {
              console.log('onTabClick', index, tab);
            }}
          >
            <div ref={el => this.vl = el} className={styles[`${PrefixCls}-lessonInfo`]}
                 style={{ height: this.state.height }}>
              <WhiteSpace size='xs' />
              <div className={styles[`${PrefixCls}-lessonInfo-title`]}>20180903 3-6岁儿童学习与发展</div>
              <TitleBox title='课程简介' sup='' />
              <Introduction />
              <WhiteSpace size='xs' />
              <TitleBox title='考勤要求' sup='' />
              <InnerHtml
                data='要求学生在每周周日晚12点之前登陆学习平台完成所有学习活动，如果有两周不能按时完成活动，则视为自动退课，退课的学生不计成绩。如果因特殊事由无法按时登陆平台完成学习活动，可以及时向辅导老师请假，但每人只有一次请假机会。' />
              <div>
                {cnIsArray(section0) && section0.map((data, i) => {
                  return <LessonItem data={data} dispatch={this.props.dispatch}/>;
                })}
              </div>
            </div>
            <div style={{ height: this.state.height }}>
              <CourseList data={row} dispatch={this.props.dispatch} handlerChange={handlerChange} />
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
