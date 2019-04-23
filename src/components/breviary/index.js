/**
 * @author Lowkey
 * @date 2019/02/26 11:00:34
 * @Description:
 */
import React from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import styles from './index.less';
import { Icon } from 'components';
import InnerHtml from 'components/innerhtml';
import classNames from 'classnames';

const PrefixCls = 'breviary';

const Breviary = (props) => {

  return (
    <div className={styles[`${PrefixCls}-outer`]}>
      <div className={styles[`${PrefixCls}-outer-content`]}>
        <div><InnerHtml data={props.data} /></div>
      </div>
      <div className={styles[`${PrefixCls}-mask`]}>
        查看详情...
      </div>
    </div>
  );
};

Breviary.defaultProps = {
  data: '',
};
Breviary.propTypes = {};

export default Breviary;
