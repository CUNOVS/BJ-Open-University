import React from 'react';
import Nav from 'components/nav';
import { connect } from 'dva';
import { Icon, List } from 'components';
import Introduction from 'components/introduction';
import { getImages } from 'utils';
import styles from './index.less';
import { forumRow } from 'components/row';
import ReactDOM from 'react-dom';
import { routerRedux } from 'dva/router';

const PrefixCls = 'forum';

class Forum extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      height: 0,
    };
  }

  componentDidMount () {
    const currentHeight = window.innerHeight,
      currentTop = ReactDOM.findDOMNode(this.lv).offsetTop;
    this.setState({
      height: currentHeight - currentTop,
    });
  }

  Click = ({ title = '刘静' }, pathname) => {
    this.props.dispatch(routerRedux.push({
      pathname: `/${pathname}`,
      query: {
        name: title,
      },
    }));
  };

  render () {
    const { name } = this.props.location.query,
      { data: { id, cmid, course, intro, discussions, groupid, numdiscussions = 0 } } = this.props.forum;
    return (
      <div>
        <Nav title={name} dispatch={this.props.dispatch} />
        <div className={styles[`${PrefixCls}-head`]}>
          <div className={styles[`${PrefixCls}-head-title`]}>
            {name}
          </div>
          <Introduction data={intro} />
        </div>
        <div style={{ height: this.state.height, background: 'white' }} ref={el => this.lv = el}>
          <div className={styles[`${PrefixCls}-title`]}>
            <div><Icon type="down" />{`话题(${numdiscussions})`}</div>
            <div style={{ color: '#1296db' }}>按用户查看帖子</div>
          </div>
          <List>
            {cnIsArray(discussions) && discussions.map((item) => {
              return forumRow(item, this.Click.bind(this, discussions, 'forumDetails'));
            })}
          </List>
        </div>
      </div>
    );
  }
}


export default connect(({ forum }) => ({
  forum,
}))(Forum);
