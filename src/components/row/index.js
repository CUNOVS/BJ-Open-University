import styles from './index.less';
import React from 'react';
import { List, Icon, Progress, Badge } from 'antd-mobile';
import Status from 'components/status';
import CnBadge from 'components/cnBadge';
import { getErrorImg, getImages, getLocalIcon } from 'utils';

const lessonImg = require('../../themes/images/linshi/lessonBg.jpg');
const closeImg = require('../../themes/images/linshi/lessonBg2.jpg');
const PrefixCls = 'row',
  Item = List.Item,
  Brief = Item.Brief;

module.exports = {
  /**
   * @author Lowkey
   * @date 2018/11/08 13:53:04
   * @Description:课程列表
   */
  commonRow: ({ image, title, price = '0', people }, onClick) => {
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


  contactsRow: (Click, index) => {
    // 联系人列表
    return (
      <List className={styles[`${PrefixCls}-contacts`]}>
        <Item
          thumb={getImages('', 'user')}
          arrow="horizontal"
          onClick={() => {
          }}
        >曹雪芹</Item>
      </List>
    );
  },

  taskRow: (click) => {
    //任务列表
    return (
      <div className={styles[`${PrefixCls}-task`]} onClick={click}>
        <div className={styles[`${PrefixCls}-task-top`]}>
          <div className={styles[`${PrefixCls}-task-top-title`]}>
            <span><Icon type={getLocalIcon('/lessontype/icon.svg')} /></span>
            <span>儿童学习与发展</span>
          </div>
          <div className={styles[`${PrefixCls}-task-top-time`]}>
            <span><Icon type={getLocalIcon('/row/time.svg')} color='#ff9a1b' size='xs' /></span>
            <span style={{ color: '#ff9a1b' }}>05月28日</span>
          </div>
        </div>
        <div className={styles[`${PrefixCls}-task-content`]}>
          作业（第一周）：设计幼儿园班级户外体育活动（10分，考勤活动）
        </div>
      </div>
    );
  },
  taskLessonRow: (click) => {
    //全部任务列表
    return (
      <div className={styles[`${PrefixCls}-tasklesson`]} onClick={click}>
        <div className={styles[`${PrefixCls}-tasklesson-img`]}>
          <img src={lessonImg} alt="" />
        </div>
        <div className={styles[`${PrefixCls}-tasklesson-content`]}>
          <div className={styles[`${PrefixCls}-tasklesson-content-title`]}>3-6岁儿童学习与发展</div>
          <div className={styles[`${PrefixCls}-tasklesson-content-teacher`]}>责任教师：彭海蕾</div>
          <div className={styles[`${PrefixCls}-tasklesson-content-time`]}>结课日期：12月31日</div>
        </div>
      </div>
    );
  },
  closeLessonRow: (onClick) => {
    //已开课程列表
    return (
      <div className={styles[`${PrefixCls}-closelesson`]} onClick={onClick}>
        <div className={styles[`${PrefixCls}-closelesson-img`]}>
          <img src={closeImg} alt="" />
        </div>
        <div className={styles[`${PrefixCls}-closelesson-content`]}>
          <div className={styles[`${PrefixCls}-closelesson-content-title`]}>EM1C002 特许经营导论</div>
          <div className={styles[`${PrefixCls}-closelesson-content-teacher`]}>责任教师：李刚</div>
          <div className={styles[`${PrefixCls}-closelesson-content-info`]}>
            <div style={{ color: '#1eb259' }}>考勤：合格</div>
            <div style={{ color: '#1eb259' }}>成绩：86分</div>
          </div>
        </div>
      </div>
    );
  },

  openingLessonRow: (onClick,onProgressClick) => {
    //已开课程列表
    return (
      <div className={styles[`${PrefixCls}-openinglessonout`]} onClick={onClick}>
        <div className={styles[`${PrefixCls}-openinglesson`]}>
          <div className={styles[`${PrefixCls}-openinglesson-img`]}>
            <img src={lessonImg} alt="" />
          </div>
          <div className={styles[`${PrefixCls}-openinglesson-content`]}>
            <div className={styles[`${PrefixCls}-openinglesson-content-title`]}>3-6岁儿童学习与发展</div>
            <div className={styles[`${PrefixCls}-openinglesson-content-teacher`]}>责任教师：彭海蕾</div>
            <div className={styles[`${PrefixCls}-openinglesson-content-time`]}>结课日期：12月31日</div>
            <div className={styles[`${PrefixCls}-openinglesson-content-type`]}>
              <div className={styles[`${PrefixCls}-openinglesson-content-type-ending`]}>终</div>
              <div className={styles[`${PrefixCls}-openinglesson-content-type-attendance`]}>勤</div>
            </div>
          </div>
        </div>
        <div className={styles[`${PrefixCls}-openinglessonout-progress`]}
        onClick={onProgressClick}
        >
          <div className={styles[`${PrefixCls}-openinglessonout-progress-left`]}>
            <Progress percent={40} position="normal" appearTransition />
          </div>
          <div className={styles[`${PrefixCls}-openinglessonout-progress-right`]}>
            40分
          </div>
        </div>
      </div>
    );
  },
  achievementRow: (onClick) => {
    // 成绩列表
    return (
      <div className={styles[`${PrefixCls}-achievement`]} onClick={onClick}>
        <div className={styles[`${PrefixCls}-achievement-img`]}>
          <img src={getImages()} alt="" />
        </div>
        <div className={styles[`${PrefixCls}-achievement-content`]}>
          <div className={styles[`${PrefixCls}-achievement-content-title`]}>3-6岁儿童学习与发展</div>
          <div className={styles[`${PrefixCls}-achievement-content-teacher`]}>责任教师：彭海蕾</div>
          <div className={styles[`${PrefixCls}-achievement-content-info`]}>
            <Status />
            <div style={{ color: '#1eb259' }}>课程总分：86分</div>
          </div>
        </div>
      </div>
    );
  },
  achievementDetailsRow: (onClick) => {
    return (
      <div onClick={onClick}>
        <div className={styles[`${PrefixCls}-achievementdetails`]}>
          <div className={styles[`${PrefixCls}-achievementdetails-top`]}>
            <div className={styles[`${PrefixCls}-achievementdetails-top-left`]}>
              <span><Icon type={getLocalIcon('/temporary/homework.svg')} /></span>
              <span>参与集体教学活动</span>
            </div>
            <Status content='考勤活动' />
          </div>
          <div className={styles[`${PrefixCls}-achievementdetails-bottom`]}>
            <div className={styles[`${PrefixCls}-achievementdetails-bottom-total`]}>总分：10</div>
            <div className={styles[`${PrefixCls}-achievementdetails-bottom-my`]}>我的得分：5.80</div>
          </div>
        </div>
        <div className={styles[`${PrefixCls}-achievementdetails`]}>
          <div className={styles[`${PrefixCls}-achievementdetails-top`]}>
            <div className={styles[`${PrefixCls}-achievementdetails-top-left`]}>
              <span><Icon type={getLocalIcon('/temporary/homework.svg')} /></span>
              <span>设计幼儿园中班谈话活动</span>
            </div>
            <Status content='考勤活动' />
          </div>
          <div className={styles[`${PrefixCls}-achievementdetails-bottom`]}>
            <div className={styles[`${PrefixCls}-achievementdetails-bottom-total`]}>总分：10</div>
            <div className={styles[`${PrefixCls}-achievementdetails-bottom-my`]}>我的得分：9.870</div>
          </div>
        </div>
        <div className={styles[`${PrefixCls}-achievementdetails`]}>
          <div className={styles[`${PrefixCls}-achievementdetails-top`]}>
            <div className={styles[`${PrefixCls}-achievementdetails-top-left`]}>
              <span><Icon type={getLocalIcon('/temporary/homework.svg')} /></span>
              <span>设计一个集体美术活动</span>
            </div>
            <Status content='考勤活动' />
          </div>
          <div className={styles[`${PrefixCls}-achievementdetails-bottom`]}>
            <div className={styles[`${PrefixCls}-achievementdetails-bottom-total`]}>总分：10</div>
            <div className={styles[`${PrefixCls}-achievementdetails-bottom-my`]}>我的得分：8.80</div>
          </div>
        </div>
        <div className={styles[`${PrefixCls}-achievementdetails`]}>
          <div className={styles[`${PrefixCls}-achievementdetails-top`]}>
            <div className={styles[`${PrefixCls}-achievementdetails-top-left`]}>
              <span><Icon type={getLocalIcon('/temporary/homework.svg')} /></span>
              <span>设计幼儿园中班科学活动</span>
            </div>
            <Status content='考勤活动' />
          </div>
          <div className={styles[`${PrefixCls}-achievementdetails-bottom`]}>
            <div className={styles[`${PrefixCls}-achievementdetails-bottom-total`]}>总分：10</div>
            <div className={styles[`${PrefixCls}-achievementdetails-bottom-my`]}>我的得分：7.00</div>
          </div>
        </div>
      </div>
    );
  },
  teachersRow: (onClick) => {
    // 老师列表
    return (
      <div className={styles[`${PrefixCls}-teachers`]} onClick={onClick}>
        <div className={styles[`${PrefixCls}-teachers-img`]}>
          <img src={getImages('', 'user')} alt="" />
        </div>
        <div className={styles[`${PrefixCls}-teachers-content`]}>
          <div className={styles[`${PrefixCls}-teachers-content-top`]}>
            <div className={styles[`${PrefixCls}-teachers-content-top-title`]}>
              李志
            </div>
            <div className={styles[`${PrefixCls}-teachers-content-top-type`]}>
              责任教师
            </div>
          </div>
          <div className={styles[`${PrefixCls}-teachers-content-bottom`]}>
            <div className={styles[`${PrefixCls}-teachers-content-bottom-lesson`]}>
              手动阀手动阀
            </div>
            <div className={styles[`${PrefixCls}-teachers-content-bottom-button`]}>
              发消息
            </div>
          </div>
        </div>
      </div>
    );
  },
  groupRow: (onClick) => {
    // 小组
    return (
      <Item extra="成员：5" align="top" multipleLine onClick={onClick}>
        16、17级学前高起本班 <Brief>3-6岁儿童学习与发展</Brief>
      </Item>
    );
  },

  groupListRow: (onClick) => {
    // 小组成员列表
    return (
      <div className={styles[`${PrefixCls}-groupList`]} onClick={onClick}>
        <div className={styles[`${PrefixCls}-groupList-img`]}>
          <img src={getImages('', 'user')} alt="" />
        </div>
        <div className={styles[`${PrefixCls}-groupList-content`]}>
          <div className={styles[`${PrefixCls}-groupList-content-top`]}>
            <div className={styles[`${PrefixCls}-groupList-content-top-title`]}>
              李志
            </div>
            <div className={styles[`${PrefixCls}-groupList-content-top-type`]}>
              责任教师
            </div>
          </div>
          <div className={styles[`${PrefixCls}-groupList-content-bottom`]}>
            <div className={styles[`${PrefixCls}-groupList-content-bottom-button`]}>
              发消息
            </div>
          </div>
        </div>
      </div>
    );
  },

  attendanceRow: (onClick) => {
    //考勤列表
    return (
      <div className={styles[`${PrefixCls}-attendance`]} onClick={onClick}>
        <div className={styles[`${PrefixCls}-attendance-img`]}>
          <img src={getImages()} alt="" />
        </div>
        <div className={styles[`${PrefixCls}-attendance-content`]}>
          <div className={styles[`${PrefixCls}-attendance-content-title`]}>EM1C002 特许经营导论</div>
          <div className={styles[`${PrefixCls}-attendance-content-teacher`]}>结课日期：2018.12.31</div>
          <div className={styles[`${PrefixCls}-attendance-content-info`]}>
            <Status />
          </div>
        </div>
      </div>
    );
  },
  forum: (data, Click) => {
    return (
      data && data.map((data) => (
        <List>
          <Item className={styles[`${PrefixCls}-topic`]} onClick={Click}>
            <div className={styles[`${PrefixCls}-topic-title`]}>
              <div>
                <CnBadge text={`${data.stick}`} background="#f34e14" color="#fff" />
                <div className={styles[`${PrefixCls}-topic-title-text`]}>话题: {data.title}</div>
              </div>
              <div>
                <Icon type={getLocalIcon(`/WKCjob/xiaoxi.svg`)} />{data.number}
              </div>
            </div>
            <div className={styles[`${PrefixCls}-topic-info`]}>
              <img src={getImages('', '')} size='xxs' style={{ marginRight: '10px' }} />
              <div className={styles[`${PrefixCls}-topic-info-content`]}>
                <div>
                  <div>{data.name}</div>
                  <div>{data.time}</div>
                </div>
                <div>
                  <div>帖子: {data.sun}</div>
                  <div>{data.class}</div>
                </div>
              </div>
            </div>
          </Item>
        </List>
      ))
    );
  },
  forumDetails: (data, Click) => {
    return (
      data && data.map((data) => (
        <List>
          <Item className={styles[`${PrefixCls}-forumDetails`]}>
            <div className={styles[`${PrefixCls}-forumDetails-info`]}>
              <img src={getImages('', '')} style={{ marginRight: '10px' }} />
              <div>{data.name}</div>
            </div>

            <div className={styles[`${PrefixCls}-forumDetails-content`]}>{data.content}</div>

            <div className={styles[`${PrefixCls}-forumDetails-title`]}>
              <div>{data.time}</div>
              <div>
                <Icon type={getLocalIcon(`/WKCjob/xiaoxi.svg`)} />回复
              </div>
            </div>

            {data.reply ? (<div onClick={Click}>查看回复</div>) : ''}
          </Item>
        </List>
      ))
    );
  },


};

