import React from 'react';
import PropTypes from 'prop-types';
import Nav from 'components/nav';
import { connect } from 'dva';
import { Icon, List, Layout } from 'components';
import { getImages, getLocalIcon } from 'utils';
import { handlerChangeRouteClick } from 'utils/commonevents';
import TitleBox from 'components/titlecontainer';
import { forumDetailsRow } from 'components/row';
import styles from './index.less';

const { BaseLine } = Layout;

class ReplyAll extends React.Component {

  getChildren = (arr, child) => {
    return arr.filter(item => child.includes(item.id.toString()));
  };

  render () {
    const { data = {} } = this.props.forumDetails, { name, items } = this.props.location.query;
    const children = items.split(',');

    return (
      <div style={{ height: '100vh', background: 'white' }} >
        <Nav title={`回复${name}`} dispatch={this.props.dispatch} />
        <div >
          <TitleBox title="回复" sup="" />
          <List >
            {
              cnIsArray(this.getChildren(data, children)) && this.getChildren(data, children).length > 0 ?
                this.getChildren(data, children)
                  .map(item => forumDetailsRow(item, handlerChangeRouteClick, this.props.dispatch))
                :
                <BaseLine />
            }
          </List >
          <BaseLine />
        </div >
      </div >
    );
  }
}


export default connect(({ replyAll, forumDetails, }) => ({
  replyAll,
  forumDetails
}))(ReplyAll);
