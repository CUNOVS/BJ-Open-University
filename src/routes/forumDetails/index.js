import React from 'react';
import PropTypes from 'prop-types';
import Nav from 'components/nav';
import { connect } from 'dva';
import { Badge, Icon, List, Layout, NoticeBar } from 'components';
import Enclosure from 'components/enclosure';
import { getImages, getLocalIcon, getCommonDate } from 'utils';
import InnerHtml from 'components/innerhtml';
import TitleBox from 'components/titlecontainer';
import { handlerChangeRouteClick, handlerDivInnerHTMLClick } from 'utils/commonevents';
import ReactDOM from 'react-dom';
import { forumDetailsRow } from 'components/row';
import { routerRedux } from 'dva/router';
import styles from './index.less';

const PrefixCls = 'forumDetails';
const { BaseLine } = Layout;

class ForumDetails extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      height: 0,
    };
  }

  componentWillMount () {
    document.documentElement.scrollTop = 0;
  }

  componentDidMount () {


  }

  Click = (name) => {
    this.props.dispatch(routerRedux.push({
      pathname: '/replyAll',
      query: {
        name: { name },
      },
    }));
  };

  handleDivClick = (e) => {
    handlerDivInnerHTMLClick(e, 'courseid', this.props.dispatch);
  };

  render () {
    const { names = '' } = this.props.location.query;
    const { parent, replyList } = this.props.forumDetails;
    const { data: { maxattachments, maxbytes } } = this.props.forum;
    return (
      <div>
        <Nav title={names} dispatch={this.props.dispatch}/>
        {parent.canreply ? '' : <NoticeBar mode="closable" icon={null}>话题已被冻结，不再接受新回复</NoticeBar>}
        <div className={styles[`${PrefixCls}-master`]}>
          <div className={styles[`${PrefixCls}-master-man`]}>
            <img src={getImages(parent.userpictureurl, '')}/>
            <span>
              <span className={styles[`${PrefixCls}-master-man-username`]}>{parent.userfullname}</span>
              <span className={styles[`${PrefixCls}-master-man-time`]}>{getCommonDate(parent.created)}</span>
            </span>
          </div>
          <div>
            <InnerHtml data={parent.message} handleClick={this.handleDivClick} />
            {
              parent.attachments !== '' ?
                <Enclosure data={parent.attachments}/>
                :
                null
            }
          </div>
          {parent.canreply ? <div onClick={handlerChangeRouteClick.bind(null, 'sendForum', {
            maxattachments,
            maxbytes,
            id: parent.id,
            subject: parent.subject,
            type: 'reply',
          }, this.props.dispatch)}
          >
            <Icon type={getLocalIcon('/components/xiaoxi.svg')}/>回复
          </div> : null}
        </div>
        <TitleBox title="回复" sup=""/>
        <List>
          {
            cnIsArray(replyList) && replyList.length > 0 ?
              replyList.map(item => forumDetailsRow(item, handlerChangeRouteClick, this.props.dispatch, maxattachments, maxbytes))
              :
              null
          }
        </List>
        <BaseLine/>
      </div>
    );
  }
}


export default connect(({ forumDetails, forum }) => ({
  forumDetails,
  forum
}))(ForumDetails);
