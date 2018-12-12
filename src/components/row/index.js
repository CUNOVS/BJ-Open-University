import styles from './index.less';
import React from 'react';
import { List, Badge, Icon, Progress, Button } from 'antd-mobile';
import { getErrorImg, getImages, getLocalIcon } from 'utils';

import Rate from 'rc-rate';
import '../../../node_modules/rc-rate/assets/index.css';

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
            <Icon style={{ verticalAlign: 'middle' }}
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
  gradeRow: (data) => {
    /**
     * @author Lowkey
     * @date 2018/10/26
     * @Description: 课程评价列表
     */
    const { userIcon, userName, rate, createDate, content } = data;
    return (<div className={styles[`${PrefixCls}-grade-outer`]}>
      <div className={styles[`${PrefixCls}-grade-outer-info`]}>
        <div className={styles[`${PrefixCls}-grade-outer-info-left`]}>
          <img src={getImages(userIcon, '')} alt="" />
          <span>{userName}</span>
        </div>
        <div className={styles[`${PrefixCls}-grade-outer-info-right`]}>
          <Rate style={{ fontSize: '14px' }} disabled defaultValue={rate} />
          <span>{createDate}</span>
        </div>
      </div>
      <div className={styles[`${PrefixCls}-grade-outer-content`]}>
        {content}
      </div>
    </div>);
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
  chapterTRow: ({ title, time, yep, id }, onClick) => {
    /**
     WKC 课程作业完成情况列表
     */
    return (
      <div key={id} className={styles[`${PrefixCls}-chapter-outer`]}>
        <div className={styles[`${PrefixCls}-chapter-outer-left`]}>
          <span>
            <Icon style={{ verticalAlign: 'middle' }}
                  type={getLocalIcon('/row/video.svg')}
            />
          </span>
          <span className={styles[`${PrefixCls}-chapter-outer-left-title`]}>
            {title}
          </span>
        </div>
        {
          yep ? <div className={styles[`${PrefixCls}-chapter-outer-right-W`]} style={{ background: 'dodgerblue' }}>
            {time}
          </div> : <div className={styles[`${PrefixCls}-chapter-outer-right-W`]} style={{ background: 'red' }}>
            {time}
          </div>
        }

      </div>
    );
  },
  myNoteRow: (data) => {
    /**
     * @author Lowkey
     * @date 2018/11/06 11:47:01
     * @Description: 课程笔记列表
     */
    const { title, createDate, contents, lesson } = data;
    return (
      <div className={styles[`${PrefixCls}-mynote-outer`]}>
        <div className={styles[`${PrefixCls}-mynote-outer-title`]}>{title}</div>
        <span>{lesson}</span>
        <div className={styles[`${PrefixCls}-mynote-outer-content`]}>{contents}</div>
      </div>
    );
  },
  rateRow: (data, onClick) => {
    /**
     * @author Lowkey
     * @date 2018/11/08 15:20:01
     * @Description:评分列表
     */
    const { image, time, title, price, people } = data;
    return (
      <div className={styles[`${PrefixCls}-rate`]} onClick={onClick}>
        <div className={styles[`${PrefixCls}-rate-imgbox`]}>
          <img src={data.image} alt="" />
          <div className={styles[`${PrefixCls}-rate-imgbox-mask`]}>
            {`已学:${data.time}`}
          </div>
        </div>
        <div className={styles[`${PrefixCls}-rate-info`]}>
          <div className={styles[`${PrefixCls}-rate-info-title`]}>{data.title}</div>
          <div className={styles[`${PrefixCls}-rate-info-box`]}>
            <div className={styles[`${PrefixCls}-rate-info-box-item`]}>
              <span><Icon type={getLocalIcon('/components/rmb.svg')} size="xxs" /></span>
              <span>{data.price}</span>
            </div>
            <div className={styles[`${PrefixCls}-rate-info-box-item`]}>
              <span><Icon type={getLocalIcon('/components/people.svg')} size="xxs" /></span>
              <span>{data.people}</span>
            </div>
          </div>
          <div>
            <span>评分：</span>
            <Rate style={{ fontSize: '16px' }} disabled defaultValue={4} />
          </div>
        </div>
      </div>
    );
  },
  noticeRow: (data, Click) => {
    return (
      <div className={styles[`${PrefixCls}-tongzhi`]} onClick={Click}>
        {/*<div className={styles[`${PrefixCls}-tongzhi-div1`]}>*/}
          {/*<img src={data.images} style={{ width: '70%', marginLeft: '0.1rem' }} />*/}
        {/*</div>*/}
        <div className={styles[`${PrefixCls}-tongzhi-div2`]}>
          <p className={styles[`${PrefixCls}-tongzhi-div2-p1`]}>{data.title}</p>
          <p className={styles[`${PrefixCls}-tongzhi-div2-p2`]} style={{ margin: '5px 0 0 0' }}>{data.content}</p>
          <p className={styles[`${PrefixCls}-tongzhi-div2-p3`]} style={{ margin: '5px 0 0 0' }}>{data.date}</p>
        </div>
      </div>
    );
  },


};

