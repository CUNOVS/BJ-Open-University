import React from 'react';
import PropTypes from 'prop-types';
import Nav from 'components/nav';
import { connect } from 'dva';
import { List, Layout } from 'components';
import styles from './index.less';

const PrefixCls = 'homeworklist';
const { BaseLine } = Layout;

class HomeworkList extends React.Component {
  constructor (props) {
    super(props);
  }

  render () {
    const { name = '' } = this.props.location.query,
      { row } = this.props.homeworklist;
    return (
      <div>
        <Nav title={name} dispatch={this.props.dispatch} />
        <div className={styles[`${PrefixCls}-outer`]}>
          {
            row && row.map((data, i) => {
              return (
                <div>
                  <div className={styles[`${PrefixCls}-section`]}>{data.section}</div>
                  <div className={styles[`${PrefixCls}-part`]}>
                    {
                      data.part && data.part.map((item, i) => {
                        return (<div className={styles[`${PrefixCls}-part-item`]}>
                          <div>{item.title}</div>
                          <div className={styles[`${PrefixCls}-part-item-status`]}>{item.status}</div>
                        </div>);
                      })
                    }
                  </div>
                </div>
              );
            })
          }
        </div>
        <BaseLine />
      </div>
    );
  }
}

export default connect(({ homeworklist }) => ({
  homeworklist,
}))(HomeworkList);
