import React from 'react';
import PropTypes from 'prop-types';
import Nav from 'components/nav';
import { connect } from 'dva';
import { Icon } from 'antd-mobile';
import { getImages, getLocalIcon } from 'utils';
import styles from './index.less';
import { routerRedux } from 'dva/router';

const PrefixCls = 'medalList';

class MedalList extends React.Component {
  constructor (props) {
    super(props);
  }

  medalPage = (name, id) => {
    this.props.dispatch(routerRedux.push({
      pathname: '/medal',
      query: {
        name,
        id,
      },
    }));
  };

  render () {
    const { name } = this.props.location.query,
      { data } = this.props.medalList;
    return (
      <div>
        <Nav title={name} dispatch={this.props.dispatch} />
        {data.map((item) => (
          <div key={item.id} onClick={this.medalPage.bind(this, `${item.name}`, item.id)}>
            <div className={styles[`${PrefixCls}-disan`]}>
              <div className={styles[`${PrefixCls}-disan-diyi`]}>
                <img src={getImages(item.badgeurl, '')} style={{}} />
                <div className={styles[`${PrefixCls}-disan-dier`]}>
                  <div>{item.name}</div>
                  <div>获得时间:{item.startDate}</div>
                </div>
              </div>
              <Icon type="right" size="lg" color="#108ee9" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  s;
}


export default connect(({ medalList, loading }) => ({
  medalList,
  loading,
}))(MedalList);
