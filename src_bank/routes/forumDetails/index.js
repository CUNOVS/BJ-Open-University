import React from 'react';
import PropTypes from 'prop-types';
import Nav from 'components/nav';
import { connect } from 'dva';
import { Badge, Icon, List } from 'antd-mobile';
import { getImages, getLocalIcon } from 'utils';
import InnerHtml from 'components/innerhtml';
import styles from './index.less';
import { forum } from 'components/row';
import TitleBox from 'components/titlecontainer';
import ReactDOM from 'react-dom';
import { forumDetails } from 'components/row';
import { routerRedux } from 'dva/router';
import huifu from './huifu.svg';

const PrefixCls = 'forumDetails',
  Item = List.Item;
const data = [
  {
    reply: true,
    content: '写的不错！！',
    stick: '置顶',
    title: '关于我！',
    number: '2',
    name: '柏拉图',
    time: '2018年9月18日     20:00',
    sun: '2',
    class: '北京历史文化-18春学前本2班',
  },
];

class ForumDetails extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      height: 0,
    };
  }

  componentDidMount () {
    const currentHeight = window.innerHeight,
      currentTop = ReactDOM.findDOMNode(this.vl).offsetTop;
    console.log(currentTop);
    this.setState({
      height: currentHeight - currentTop,
    });
  }

  Click = (name) => {
    this.props.dispatch(routerRedux.push({
      pathname: '/replyAll',
      query: {
        name: { name },
      },
    }));
  };

  render () {
    const { name } = this.props.location.query;
    return (
      <div>
        <Nav title={name} dispatch={this.props.dispatch} />
        <div className={styles[`${PrefixCls}-master`]}>
          <div className={styles[`${PrefixCls}-master-man`]}>
            <img src={getImages('', '')} />
            评价幼儿健康成长状况
          </div>
          <div>发布于:2018.3.6</div>
          <div>
            <InnerHtml
              data='<p id="yui_3_17_2_1_1551169667928_28">本次观察对象为2岁10个月的男宝，具体观察情况如下：<br><b>1.身心状况方面孩子很健康</b><br><b>（1）具有健康体态</b><br>孩子身高90厘米，体重13公斤。<br><b>（2）情绪一般情况下较稳定</b><br>孩子性格调皮、脾气有时急躁，哭闹比较多。有时出现因不能满足要求而有负面情绪或哭闹情况下，可以在大人的安抚和引导下，经过一段时间情绪才能恢复平静。<br><b>（3）适应能力不够强</b><br>孩子在早教班需要家长陪同，配合老师时好时坏。在外出旅游则适应性较强，如遇到无法正常吃饭和睡觉的情况下，也可以适应和调整，换地儿入睡、排便并未受到影响。<br><br><b>2.动作发展比较协调</b><br><b>（1）动作较为协调</b><br>孩子有一定的运动能力，但是非常懒，一般情况总要求被抱；平衡能力比较强，能够走比较窄的地方；可以向不同身高的人抛球、接球；在开电动小汽车时，能够熟练掌握方向，但遇到紧急情况时，还不可以躲避或刹车。<br><b>（2）具有一定力量和耐力</b><br>可以搬将近5斤的重物，可以在单杠上吊20秒左右。<br><b>（3）手的动作灵活协调</b><br>孩子可以独立用勺吃饭，但一般不自己吃；能够用儿童剪按曲线进行剪纸。<br></p>'
            />
          </div>
          <div>
            <Icon type={getLocalIcon('/components/xiaoxi.svg')} />回复
          </div>
        </div>

        <div style={{ height: this.state.height, background: 'white' }} ref={el => this.vl = el}>
          <TitleBox title="回复" sup="" />
          {forumDetails(data, this.Click.bind(this, `${data.name}`))}
        </div>
      </div>
    );
  }
}


export default connect(({ forumDetails }) => ({
  forumDetails,
}))(ForumDetails);
