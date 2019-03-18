import Nav from 'components/nav';
import { connect } from 'dva';
import { List, Badge, Icon, Tabs } from 'antd-mobile';
import ReactDOM from 'react-dom';
import styles from './index.less';
import { handlerChangeRouteClick } from 'utils/commonevents';
import { getImages, getLocalIcon, handleBuildingClick, getOffsetTopByBody } from 'utils';


const PrefixCls = 'messageCenter',
  Item = List.Item;
const a = {
  A: '2',
  B: '',
  C: '3',
};
const data = [
    {
      type: false,
      title: 'Javascript设计模式解析',
      time: '2018.09.06',
      state: '测验已批改',
      content: '一周测验',
      achievement: '92分',
    }, {
      type: false,
      title: '高等数学',
      time: '2018.09.06',
      state: '作业已批改',
      content: '请完成以下题目',
      achievement: '62分',
    }, {
      type: true,
      time: '2018.09.06',
      name: '苏格拉底',
      content: '写得不错！',
    },
  ],
  dataI = [],
  dataII = [{
    content: '新的学期开始了,为了对大家在专业、课程方面的学习问题提供更加及时的辅导，我们特别推出了学科指同方议题们特别推出了学科指同方议题',
  }];


class MessageCenter extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      height: cnhtmlHeight,
      color: 'black',
      sign: true,
    };
  }

  componentDidMount () {
    const element = ReactDOM.findDOMNode(this.vl),
      currentHeight = element.offsetHeight,
      currentH = getOffsetTopByBody(ReactDOM.findDOMNode(this.vll));
    this.setState({
      height: cnhtmlHeight - currentHeight - currentH,
    });
  }

  Click = (sign) => {
    if (sign) {
      this.setState({
        color: '#1296db',
        sign: !this.state.sign,
      });
    } else {
      this.setState({
        color: 'black',
        sign: !this.state.sign,
      });
    }
  };

  content = (data) => (
    <div style={{ height: this.state.height }}>
      <div className={styles[`${PrefixCls}-title`]}>
        <div className={styles[`${PrefixCls}-title-content`]}><Icon type={getLocalIcon('/WKCjob/duihuakuang.svg')} />通知列表
        </div>
        <div style={{ color: this.state.color }}
          onClick={this.Click.bind(this, this.state.sign)}
          className={styles[`${PrefixCls}-title-content`]}
        >全部标记为已读<Icon type={getLocalIcon('/WKCjob/xuanze.svg')} />
        </div>
      </div>
      <List className={styles[`${PrefixCls}-zong`]}>
        {data.map((data, index) => (
          <Item onClick={handlerChangeRouteClick.bind(null, 'noticeDetails', { name: '测验' }, this.props.dispatch)}>
            {data.type ?
              (<div className={styles[`${PrefixCls}-reply`]}>
                <img src={getImages('', '')} />
                <div className={styles[`${PrefixCls}-reply-left`]}>
                  <div className={styles[`${PrefixCls}-reply-conten`]}>
                    <div>{data.name} 回复 你的贴子:</div>
                    <div style={{ display: 'inline-block' }}>{data.time}</div>
                  </div>
                  <div style={{ display: 'inline-block' }}
                    className={styles[`${PrefixCls}-reply-title`]}
                  >{data.content}</div>
                </div>
              </div>)
              :
              (<div>
                <div className={styles[`${PrefixCls}-school`]}>
                  <div style={{ display: 'inline-block' }}
                    className={styles[`${PrefixCls}-school-title`]}
                  >{data.title}</div>
                  <div className={styles[`${PrefixCls}-school-small`]}>{data.time}</div>
                </div>
                <div className={styles[`${PrefixCls}-school`]}>
                  <div className={styles[`${PrefixCls}-school-small`]}><Icon
                    style={{ width: '0.3rem', height: '0.3rem', marginRight: '0.2rem' }}
                    type={getLocalIcon('/WKCjob/duigou.svg')}
                  />{data.state}</div>
                </div>
                <div className={styles[`${PrefixCls}-school`]}>
                  <div className={styles[`${PrefixCls}-school-bott`]}>{data.content}</div>
                  <div className={styles[`${PrefixCls}-school-right`]}>成绩:{data.achievement}</div>
                </div>
              </div>)
            }
          </Item>
        ))}
      </List>
    </div>
  );

  contentII = (data) => (
    <div style={{ height: this.state.height }}>
      <div className={styles[`${PrefixCls}-title`]}>
        <div className={styles[`${PrefixCls}-title-content`]}><Icon type={getLocalIcon('/WKCjob/duihuakuang.svg')} />通知列表
        </div>
        <div style={{ color: this.state.color }}
          onClick={this.Click.bind(this, this.state.sign)}
          className={styles[`${PrefixCls}-title-content`]}
        >全部标记为已读<Icon type={getLocalIcon('/WKCjob/xuanze.svg')} />
        </div>
      </div>
      <List className={styles[`${PrefixCls}-zong`]}>
        {data.map((data, index) => (
          <Item>
            <div className={styles[`${PrefixCls}-reply`]}>
              <img src={getImages('', '')} />
              <div className={styles[`${PrefixCls}-reply-left`]}>
                <div style={{ fontSize: '0.28rem', color: 'black' }}>系统通知</div>
                <div className={styles[`${PrefixCls}-twoLine`]}>{data.content}</div>
              </div>
            </div>
          </Item>
        ))}
      </List>
    </div>
  );

  nan = () => (
    <div style={{ height: this.state.height }}>
      <div className={styles[`${PrefixCls}-title`]}>
        <div className={styles[`${PrefixCls}-title-content`]}><Icon type={getLocalIcon('/WKCjob/duihuakuang.svg')} />通知列表
        </div>
        <div style={{ color: this.state.color }}
          onClick={this.Click.bind(this, this.state.sign)}
          className={styles[`${PrefixCls}-title-content`]}
        >全部标记为已读<Icon type={getLocalIcon('/WKCjob/xuanze.svg')} />
        </div>
      </div>
      <div style={{
        color: '#8a8a8a',
        height: '70%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
      }}
      >
        <Icon type={getLocalIcon('/WKCjob/xiaoxi.svg')} style={{ width: '20%', height: '20%' }} />
        暂时没有新消息
      </div>
    </div>
  );

  heti = (data) => {
    console.log(data);
    {
      data.length == 0 ? this.nan.bind(this) :
        this.content.bind(this, data);
    }
  };

  render () {
    return (
      <div>
        <div ref={el => this.vl = el}>
          <Nav title="消息中心" dispatch={this.props.dispatch} />
        </div>
        <Tabs
          className={styles[`${PrefixCls}-tabs`]}
          style={{ height: this.state.height }}
          ref={el => this.vll = el}
          initialPage={0}
          onChange={(tab, index) => {
            console.log('onChange', index, tab);
          }}
          onTabClick={(tab, index) => {
            console.log('onTabClick', index, tab);
          }}
          tabBarInactiveTextColor="#b7b7b7"
          tabBarUnderlineStyle={{ border: '1px solid #22609c' }}
          tabs={[
            { title: <Badge text={`${a.A}`}>课程活动</Badge> },
            { title: <Badge text={`${a.B}`}>消息</Badge> },
            { title: <Badge text={`${a.C}`}>系统通知</Badge> },
          ]}
        >
          {data.length == 0 ? this.nan.bind(this) : this.content.bind(this, data)}

          {dataI.length == 0 ? this.nan.bind(this) : this.content.bind(this, data)}

          {dataII.length == 0 ? this.nan.bind(this) : this.contentII.bind(this, dataII)}
        </Tabs>
      </div>
    );
  }
}

export default connect(({ messageCenter }) => ({
  messageCenter,
}))(MessageCenter);
