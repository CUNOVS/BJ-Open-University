/**
 * @author Lowkey
 * @date 2018/11/15 10:14:59
 * @Description:讨论区布局
 */
import React from 'react';
import PropTypes from 'prop-types';
import { Icon } from 'components';
import { getLocalIcon } from 'utils';
import styles from './index.less';

const PrefixCls = 'card';

const Card = (props) => {
  return (
    <div className={styles[`${PrefixCls}-outer`]} onClick={props.handlerClick}>
      <div className={styles[`${PrefixCls}-outer-title`]}>{props.title}</div>
      <div className={styles[`${PrefixCls}-outer-content`]}>{props.content}</div>
      <div className={styles[`${PrefixCls}-outer-footer`]}>
        <div className={styles[`${PrefixCls}-outer-footer-date`]}>{props.createDate}</div>
        <div className={styles[`${PrefixCls}-outer-footer-info`]}>
          <div>
            <span><Icon type={getLocalIcon('/buttons/view.svg')} color="#666" /></span>
            <span>{props.view}</span>
          </div>
          <div>
            <span><Icon type={getLocalIcon('/buttons/reply.svg')} color="#666" /></span>
            <span>{props.review}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

Card.defaultProps = {
  title: '',
  content: '',
  view: '0',
  review: '0',
  createDate: '',
  handleClick: null,
};
Card.propTypes = {
  title: PropTypes.string,
  content: PropTypes.string,
  handlerClick: PropTypes.func.isRequired,
};

export default Card;
