/**
 * @author Lowkey
 * @date 2018/11/27 17:53:35
 * @Description:
 */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import styles from './Loader.less';

const Loader = ({ spinning }) => {
  return (
    <div className={classNames(styles.loader, { [styles.hidden]: !spinning })}>
      <div className={styles.text}>Loading...</div>
      <div className={styles.horizontal}>
        <div className={styles.circlesup}>
          <div className={styles.circle}></div>
          <div className={styles.circle}></div>
          <div className={styles.circle}></div>
          <div className={styles.circle}></div>
          <div className={styles.circle}></div>
        </div>
        <div className={styles.circlesdwn}>
          <div className={styles.circle}></div>
          <div className={styles.circle}></div>
          <div className={styles.circle}></div>
          <div className={styles.circle}></div>
          <div className={styles.circle}></div>
        </div>
      </div>
      <div className={styles.vertical}>
        <div className={styles.circlesup}>
          <div className={styles.circle}></div>
          <div className={styles.circle}></div>
          <div className={styles.circle}></div>
          <div className={styles.circle}></div>
          <div className={styles.circle}></div>
        </div>
        <div className={styles.circlesdwn}>
          <div className={styles.circle}></div>
          <div className={styles.circle}></div>
          <div className={styles.circle}></div>
          <div className={styles.circle}></div>
          <div className={styles.circle}></div>
        </div>
      </div>
    </div>

  );
};


Loader.propTypes = {
  spinning: PropTypes.bool,
};

export default Loader;
