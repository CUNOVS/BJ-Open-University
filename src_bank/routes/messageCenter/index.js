import React from 'react';
import Nav from 'components/nav';
import { connect } from 'dva';
import { List, Badge, Icon, Tabs } from 'antd-mobile';
import ReactDOM from 'react-dom';
import { handlerChangeRouteClick } from 'utils/commonevents';
import { messageListRow } from 'components/row';
import { getImages, getLocalIcon, getOffsetTopByBody } from 'utils';
import InnerHtml from 'components/innerhtml';
import styles from './index.less';


const PrefixCls = 'messageCenter',
  Item = List.Item;

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

  getMessage = (data) => (
    <div className={styles[`${PrefixCls}-message`]} style={{ height: this.state.height }}>
      <div className={styles[`${PrefixCls}-title`]}>
        <div className={styles[`${PrefixCls}-title-content`]}><Icon type={getLocalIcon('/WKCjob/duihuakuang.svg')} />通知列表
        </div>
        <div style={{ color: this.state.color }}
             onClick={this.Click.bind(this, this.state.sign)}
             className={styles[`${PrefixCls}-title-content`]}
        >全部标记为已读<Icon type={getLocalIcon('/WKCjob/xuanze.svg')} />
        </div>
      </div>
      <List className={styles[`${PrefixCls}-content`]}>
        {data.map((data, index) => (
          <Item className={styles[`${PrefixCls}-messagelist`]}
                onClick={handlerChangeRouteClick.bind(null, 'noticeDetails', { name: '测验' }, this.props.dispatch)}
          >
            <div className={styles[`${PrefixCls}-messagelist-title`]}>{data.name}</div>
            <div className={styles[`${PrefixCls}-messagelist-details`]}><InnerHtml data={data.details} /></div>
            <div className={styles[`${PrefixCls}-messagelist-date`]}>{data.data}</div>
          </Item>
        ))}
      </List>
    </div>
  );

  getSysMessage = (data) => (
    <div className={styles[`${PrefixCls}-sys`]} style={{ height: this.state.height }}>
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
          <Item onClick={handlerChangeRouteClick}>
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

  getTalkMessage = (list) => (
    <div className={styles[`${PrefixCls}-talk`]} style={{ height: this.state.height }}>
      <div className={styles[`${PrefixCls}-title`]}>
        <div className={styles[`${PrefixCls}-title-content`]}>
          <Icon type={getLocalIcon('/WKCjob/duihuakuang.svg')} />
          通知列表
        </div>
        <div style={{ color: this.state.color }}
             onClick={this.Click.bind(this, this.state.sign)}
             className={styles[`${PrefixCls}-title-content`]}
        >全部标记为已读<Icon type={getLocalIcon('/WKCjob/xuanze.svg')} />
        </div>
      </div>
      <div className={styles[`${PrefixCls}-content`]}>
        {list && list.map((item, i) => {
          return messageListRow(item, handlerChangeRouteClick, this.props.dispatch);
        })}
      </div>
    </div>
  );

  heti = (data) => {
    {
      data.length == 0 ? this.nan.bind(this) :
        this.content.bind(this, data);
    }
  };

  render () {
    const { messageList, talkList, count: { messageCount, newsCount, noticeCount }, selectIndex = 0 } = this.props.messageCenter,
      onTabsChange = (tabs, index) => {
        this.props.dispatch({
          type: `${PrefixCls}/updateState`,
          payload: {
            selectIndex: index,
          },
        });
        if (index === 1) {
          this.props.dispatch({
            type: `${PrefixCls}/queryTalkMessage`,
          });
        }
      };
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
          page={selectIndex}
          onChange={onTabsChange}
          tabBarInactiveTextColor="#b7b7b7"
          tabBarUnderlineStyle={{ border: '1px solid #22609c' }}
          tabs={[
            { title: <Badge text={`${noticeCount > 0 ? noticeCount : ''}`}>课程活动</Badge> },
            { title: <Badge text={`${newsCount > 0 ? newsCount : ''}`}>消息</Badge> },
            { title: <Badge>系统通知</Badge> },
          ]}
        >
          {cnIsArray(messageList) && this.getMessage.bind(this, messageList)}
          {cnIsArray(talkList) && this.getTalkMessage.bind(this, talkList)}
          <div>2</div>
        </Tabs>
      </div>
    );
  }
}

export default connect(({ messageCenter }) => ({
  messageCenter,
}))(MessageCenter);
