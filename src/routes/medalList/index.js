import React from 'react';
import PropTypes from 'prop-types';
import Nav from 'components/nav';
import { connect } from 'dva';
import ReactDOM from 'react-dom';
import { Icon, List } from 'antd-mobile';
import { getImages, getLocalIcon } from 'utils';
import styles from './index.less';
import { routerRedux } from 'dva/router';

const PrefixCls = 'medalList',
  Item = List.Item;


class MedalList extends React.Component {
  constructor (props) {
    super(props);
  }  

    medalPage = (name) => {
    	this.props.dispatch(routerRedux.push({
    		pathname: '/medal',
    		query: {
    			name
    		}
    	}));
    }

    render () {
    	const { name } = this.props.location.query,
    		{ data } = this.props.medalList;
      return (
        <div>
          <Nav title={name} dispatch={this.props.dispatch} />
          {data.map((data, index) => (
            <div onClick={this.medalPage.bind(this, `${data.title}`)}>
              <div className={styles[`${PrefixCls}-disan`]}>
                <div className={styles[`${PrefixCls}-disan-diyi`]}>
                  <img src={data.image} style={{}} />
                  <div className={styles[`${PrefixCls}-disan-dier`]}>
                    <div>{data.title}</div>
                    <div>获得时间:{data.time}</div>
                  </div>
                </div>
                <Icon type="right" size="lg" color="#108ee9" />
              </div>
            </div>                	
	                ))}
        </div>
      );
    }s
}


export default connect(({ medalList }) => ({
  medalList
}))(MedalList);
