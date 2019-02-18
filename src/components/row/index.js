import styles from './index.less';
import React from 'react';
import { List, Badge, Icon, Progress, Button } from 'antd-mobile';
import { getErrorImg, getImages, getLocalIcon } from 'utils';

const PrefixCls = 'row',
  Item = List.Item,
  Brief = Item.Brief;

module.exports = {
  /**
   * @author Lowkey
   * @date 2018/11/08 13:53:04
   * @Description:课程列表
   */
  commonRow: ({ image, title, price="0", people }, onClick) => {
    return (
      <div className={styles[`${PrefixCls}-common`]}>
        <Item
          thumb={image}
          multipleLine
          wrap
          onClick={onClick}
        >
          <span className={styles[`${PrefixCls}-common-title`]}> {title}</span>
          <div className={styles[`${PrefixCls}-common-info`]}>
            <div className={styles[`${PrefixCls}-common-info-box`]}>
              <span><Icon type={getLocalIcon('/components/rmb.svg')} size="xxs" /></span>
              <span>{price}</span>
            </div>
            <div className={styles[`${PrefixCls}-common-info-box`]}>
              <span><Icon type={getLocalIcon('/components/people.svg')} size="xxs" /></span>
              <span>{people}</span>
            </div>
          </div>
        </Item>
      </div>
    );
  },

  chapterRow: ({ title, time, id, type }, onClick) => {
    /**
     * @author Lowkey
     * @date 2018/10/25
     * @Description: 课程播放列表
     */
    return (
      <div key={id} className={styles[`${PrefixCls}-chapter-outer`]} onClick={onClick}>
        <div className={styles[`${PrefixCls}-chapter-outer-left`]}>
          <span>
            <Icon
              style={{ verticalAlign: 'middle' }}
              type={type === 'video' ? getLocalIcon('/row/video.svg') : getLocalIcon('/row/homework.svg')}
            />
          </span>
          <span className={styles[`${PrefixCls}-chapter-outer-left-title`]}>
            {title}
          </span>
        </div>
        <div className={styles[`${PrefixCls}-chapter-outer-right`]}>
          {time}
        </div>
      </div>
    );
  },


  progressRow: (data, onClick) => {
    /* WKC 课程列表进度条版 */
    return (
      <div className={styles[`${PrefixCls}-progre-item`]} onClick={onClick}>
        <div className={styles[`${PrefixCls}-progre-imgbox`]}>
          <img src={data.image} alt="" />
          <div className={styles[`${PrefixCls}-progre-imgbox-mask`]}>
            {`已学:${data.time}`}
          </div>
        </div>
        <div className={styles[`${PrefixCls}-progre-info`]}>
          <div className={styles[`${PrefixCls}-progre-info-title`]}>{data.title}</div>
          <div className={styles[`${PrefixCls}-progre-info-preview`]}>{`上次学习：${data.preview}`}</div>
        </div>
      </div>
    );
  },
  homeworkRow: (data, Click, index) => {
    /* WKC 课程列表进度条版 */
    return (
      <List className={styles[`${PrefixCls}-homework`]}>
        {
          data && data.map((data) => {
            return (<div className={styles[`${PrefixCls}-homework-item`]} onClick={Click.bind(this)}>
              <div className={styles[`${PrefixCls}-homework-item-imgbox`]}>
                <img src={data.image} alt="" />
              </div>
              <div className={styles[`${PrefixCls}-homework-item-info`]}>
                <div className={styles[`${PrefixCls}-homework-item-info-title`]}>{data.title}</div>
                <div className={styles[`${PrefixCls}-homework-item-info-progress`]}>
                  <div>{`已学${data.time}%`}</div>
                  <Progress
                    percent={data.time}
                    position="normal"
                    unfilled={true}
                    appearTransition />
                </div>
              </div>
            </div>);
          })
        }
      </List>
    );
  },





};

