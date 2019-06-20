import styles from './index.less';
import React from 'react';
import { List, Icon, Progress, Button, Card, Badge } from 'antd-mobile';
import Status from 'components/status';
import CnBadge from 'components/cnBadge';
import { getErrorImg, getImages, getLocalIcon, changeLessonData, getTaskIcon, isToday, getMessageTime } from 'utils';

const lessonImg = require('../../themes/images/linshi/child.png');
const closeImg = require('../../themes/images/linshi/txjy.png');

const PrefixCls = 'row',
  Item = List.Item,
  Brief = Item.Brief;
const isPass = (grade) => {
  if (grade >= 60) {
    return true;
  }
  return false;
};
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
          onClick={Click}
        >曹雪芹</Item>
      </List>
    );
  },

  taskRow: (item, click) => {
    // 任务列表
    const { id, courseid, description, eventtype, format, instance, groupid, coursename, modulename, name, timestart } = item;
    return (
      <div key={id} className={styles[`${PrefixCls}-task`]} onClick={click}>
        <div className={styles[`${PrefixCls}-task-top`]}>
          <div className={styles[`${PrefixCls}-task-top-type`]}>
            成绩要求
          </div>
          <div className={styles[`${PrefixCls}-task-top-time`]}>
            <span><Icon type={getLocalIcon('/row/time.svg')}
                        color={isToday(timestart) ? '#f34e14' : '#ff9a1b'}
                        size="xxs"
            /></span>
            <span style={{ color: isToday(timestart) ? '#f34e14' : '#ff9a1b' }}>{changeLessonData(timestart)}</span>
          </div>
        </div>
        <div className={styles[`${PrefixCls}-task-title`]}>
          <span><Icon type={getLocalIcon(getTaskIcon(modulename))} /></span>
          <span>{coursename}</span>
        </div>
        <div className={styles[`${PrefixCls}-task-content`]}>
          {name}
        </div>
      </div>
    );
  },
  taskLessonRow: (item, click, dispatch) => {
    // 全部任务列表
    const { id, name, enddate, master, lessonImage } = item;
    return (
      <div key={id} className={styles[`${PrefixCls}-tasklesson`]} onClick={click.bind(null, item, dispatch)}>
        <div className={styles[`${PrefixCls}-tasklesson-img`]}>
          <img src={getImages(lessonImage)} alt="" />
        </div>
        <div className={styles[`${PrefixCls}-tasklesson-content`]}>
          <div className={styles[`${PrefixCls}-tasklesson-content-title`]}>{name}</div>
          <div className={styles[`${PrefixCls}-tasklesson-content-teacher`]}>{`责任教师：${master.fullname}`}</div>
          <div className={styles[`${PrefixCls}-tasklesson-content-time`]}>{`结课日期：${changeLessonData(enddate)}`}</div>
        </div>
      </div>
    );
  },
  closeLessonRow: (item) => {
    // 已开课程列表
    const { name, master, id, graderaw = 0, attendance = 0, lessonImage = '' } = item;
    return (
      <div key={id} className={styles[`${PrefixCls}-closelesson`]}>
        <div className={styles[`${PrefixCls}-closelesson-img`]}>
          <img src={getImages(lessonImage)} alt="" />
        </div>
        <div className={styles[`${PrefixCls}-closelesson-content`]}>
          <div className={styles[`${PrefixCls}-closelesson-content-title`]}>{name}</div>
          <div className={styles[`${PrefixCls}-closelesson-content-teacher`]}>
            {`责任教师：${master.fullname}`}
          </div>
          <div className={styles[`${PrefixCls}-closelesson-content-info`]}>
            {attendance ?
              <div style={{ color: '#1eb259' }}>考勤：达标</div>
              :
              <div style={{ color: '#f34e14' }}>考勤：未达标</div>
            }
            {
              <div style={{ color: isPass(graderaw) ? '#1eb259' : '#f34e14' }}>{`成绩：${graderaw}`}</div>
            }
          </div>
        </div>
      </div>
    );
  },

  openingLessonRow: (item, onClick, onProgressClick, dispatch) => {
    // 已开课程列表

    const { name = '', graderaw = 0, id, master, enddate, isEnding = 1, isAttendance = 1, lessonImage } = item;
    return (
      <div key={id} className={styles[`${PrefixCls}-openinglessonout`]} onClick={onClick.bind(null, item, dispatch)}>
        <div className={styles[`${PrefixCls}-openinglesson`]}>
          <div className={styles[`${PrefixCls}-openinglesson-img`]}>
            <img src={getImages(lessonImage)} alt="" />
          </div>
          <div className={styles[`${PrefixCls}-openinglesson-content`]}>
            <div className={styles[`${PrefixCls}-openinglesson-content-title`]}>{name}</div>
            <div className={styles[`${PrefixCls}-openinglesson-content-teacher`]}>{`责任教师：${master.fullname}`}</div>
            <div
              className={styles[`${PrefixCls}-openinglesson-content-time`]}>{`结课日期：${changeLessonData(enddate)}`}</div>
            <div className={styles[`${PrefixCls}-openinglesson-content-type`]}>
              {isEnding ? <div className={styles[`${PrefixCls}-openinglesson-content-type-ending`]}>终考课</div> : ''}
              {isAttendance ?
                <div className={styles[`${PrefixCls}-openinglesson-content-type-attendance`]}>考勤课</div> : ''}
            </div>
          </div>
        </div>
        <div className={styles[`${PrefixCls}-openinglessonout-progress`]}
             onClick={onProgressClick}
        >
          <div className={styles[`${PrefixCls}-openinglessonout-progress-left`]}>
            <Progress percent={graderaw}
                      position="normal"
                      barStyle={{ borderColor: isPass(graderaw) ? '#1eb259' : '#f34e14' }}
                      appearTransition
            />
          </div>
          <div className={styles[`${PrefixCls}-openinglessonout-progress-right`]}
               style={{ color: isPass(graderaw) ? '#1eb259' : '#f34e14' }}
          >
            {`${graderaw}分`}
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
          <img src={lessonImg} alt="" />
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
  achievementDetailsRow: (item, onClick, cmid = '', dispatch) => {
    const { title = '', grade = '', id = '', itemType = '', courseid = '' } = item;
    return (
      <div key={id} className={styles[`${PrefixCls}-achievementdetails`]}
           onClick={onClick.bind(null, item, courseid, cmid, dispatch)}>
        <div className={styles[`${PrefixCls}-achievementdetails-top`]}>
          <span><Icon type={getLocalIcon(getTaskIcon(itemType))} /></span>
          <span>{title}</span>
        </div>
        <div className={styles[`${PrefixCls}-achievementdetails-bottom`]}>
          <div className={styles[`${PrefixCls}-achievementdetails-bottom-total`]}>总分：10</div>
          <div className={styles[`${PrefixCls}-achievementdetails-bottom-my`]}>{`我的得分:${grade}`}</div>
        </div>
      </div>
    );
  },
  teachersRow: (item, onClick, dispatch) => {
    // 老师列表
    const { profileimageurl, fullname, id, mentors = [] } = item;
    return (
      <Card key={id}>
        <Card.Header
          title={fullname}
        />
        <Card.Body>
          {mentors.map((item) => (
            <div key={item.userid} className={styles[`${PrefixCls}-teachers`]}
                 onClick={onClick.bind(null, 'userpage', { userid: item.userid }, dispatch)}>
              <div className={styles[`${PrefixCls}-teachers-img`]}>
                <img src={getImages(item.profileimageurl, 'user')} alt="" />
              </div>
              <div className={styles[`${PrefixCls}-teachers-content`]}>
                <div className={styles[`${PrefixCls}-teachers-content-top`]}>
                  <div className={styles[`${PrefixCls}-teachers-content-top-title`]}>
                    {item.fullname}
                  </div>
                  {/*<div className={styles[`${PrefixCls}-teachers-content-top-type`]}>*/}
                  {/*责任教师*/}
                  {/*</div>*/}
                </div>
                <div className={styles[`${PrefixCls}-teachers-content-bottom`]}>
                  <Button
                    type="ghost"
                    inline
                    size="small"
                  >发消息</Button>
                </div>
              </div>
            </div>
          ))}
        </Card.Body>
      </Card>
      // <div key={userid} className={styles[`${PrefixCls}-teachers`]} onClick={onClick}>
      //   <div className={styles[`${PrefixCls}-teachers-img`]}>
      //     <img src={getImages(profileimageurl, 'user')} alt="" />
      //   </div>
      //   <div className={styles[`${PrefixCls}-teachers-content`]}>
      //     <div className={styles[`${PrefixCls}-teachers-content-top`]}>
      //       <div className={styles[`${PrefixCls}-teachers-content-top-title`]}>
      //         {fullname}
      //       </div>
      //       <div className={styles[`${PrefixCls}-teachers-content-top-type`]}>
      //         责任教师
      //       </div>
      //     </div>
      //     <div className={styles[`${PrefixCls}-teachers-content-bottom`]}>
      //       <div className={styles[`${PrefixCls}-teachers-content-bottom-lesson`]}>
      //         {}
      //       </div>
      //       <Button
      //         type="ghost"
      //         inline
      //         size="small"
      //       >发消息</Button>
      //     </div>
      //   </div>
      // </div>
    );
  },
  groupRow: (item, onClick) => {
    // 小组
    const { name, id, course } = item;
    return (
      <List key={id} className={styles[`${PrefixCls}-group`]}>
        <Item arrow="horizontal" onClick={onClick}>
          {course}
          <Brief>{name}</Brief>
        </Item>
      </List>
    );
  },

  groupListRow: (rowData, sectionID, rowID, onClick, dispatch) => {
    // 小组成员列表
    const { fullname, profileimageurl, id } = rowData;
    return (
      <div key={id} className={styles[`${PrefixCls}-groupList`]}
           onClick={onClick.bind(null, 'userpage', { userid: id }, dispatch)}>
        <div className={styles[`${PrefixCls}-groupList-img`]}>
          <img src={getImages(profileimageurl, 'user')} alt="" />
        </div>
        <div className={styles[`${PrefixCls}-groupList-content`]}>
          <div className={styles[`${PrefixCls}-groupList-content-top`]}>
            <div className={styles[`${PrefixCls}-groupList-content-top-title`]}>
              {fullname}
            </div>
          </div>
          <div className={styles[`${PrefixCls}-groupList-content-bottom`]}>
            <Button
              type="ghost"
              inline
              size="small"
            >发消息</Button>
          </div>
        </div>
      </div>
    );
  },

  attendanceRow: (onClick) => {
    // 考勤列表
    return (
      <div className={styles[`${PrefixCls}-attendance`]} onClick={onClick}>
        <div className={styles[`${PrefixCls}-attendance-img`]}>
          <img src={closeImg} alt="" />
        </div>
        <div className={styles[`${PrefixCls}-attendance-content`]}>
          <div className={styles[`${PrefixCls}-attendance-content-title`]}>EM1C002 特许经营导论</div>
          <div className={styles[`${PrefixCls}-attendance-content-time`]}>结课日期：2018.12.31</div>
          <div className={styles[`${PrefixCls}-attendance-content-info`]}>
            <Status content="达标" />
          </div>
        </div>
      </div>
    );
  },
  forumRow: (item, Click) => {
    const { name, id, subject, pinned, userfullname, userpictureurl, message, created, groupid, numreplies } = item;
    const creatDate = new Date(created * 1000).toLocaleString('zh');
    return (
      <Item className={styles[`${PrefixCls}-forum`]} key={id} onClick={Click}>
        <div className={styles[`${PrefixCls}-forum-user`]}>
          <img src={getImages(userpictureurl, 'user')} size="xxs" style={{ marginRight: '10px' }} />
          <div className={styles[`${PrefixCls}-forum-user-info`]}>
            <div>
              <div>{userfullname}</div>
            </div>
            <div>
              <div>小组</div>
            </div>
          </div>
        </div>
        <div className={styles[`${PrefixCls}-forum-content`]}>
          {pinned ? <CnBadge text="置顶" background="#f34e14" color="#fff" size="xs" /> : ''}
          <div className={styles[`${PrefixCls}-forum-content-text`]}>{name}</div>
        </div>
        <div className={styles[`${PrefixCls}-forum-foot`]}>
          <div className={styles[`${PrefixCls}-forum-foot-message`]}>
            <span><Icon type={getLocalIcon('/components/xiaoxi.svg')} /></span>
            <span>{numreplies}</span>
          </div>
          <div className={styles[`${PrefixCls}-forum-foot-time`]}>
            {creatDate}
          </div>
        </div>
      </Item>
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
                <Icon type={getLocalIcon('/WKCjob/xiaoxi.svg')} />回复
              </div>
            </div>

            {data.reply ? (<div onClick={Click}>查看回复</div>) : ''}
          </Item>
        </List>
      ))
    );
  },
  messageListRow: (item, onClick, dispatch) => {
    const { avatar, details, timecreated, userName, useridfrom, unread = false } = item;
    // 通知列表
    return (
      <div key={useridfrom} className={styles[`${PrefixCls}-message`]}
           onClick={onClick.bind(null, 'conversation', { useridfrom, name: userName }, dispatch)}>
        <Badge dot={unread}>
          <div className={styles[`${PrefixCls}-message-img`]}>
            <img src={getImages(avatar, 'user')} alt="" />
          </div>
        </Badge>
        <div className={styles[`${PrefixCls}-message-content`]}>
          <div className={styles[`${PrefixCls}-message-content-top`]}>
            <div className={styles[`${PrefixCls}-message-content-top-title`]}>
              {userName}
            </div>
            <div className={styles[`${PrefixCls}-message-content-top-date`]}>
              {getMessageTime(timecreated)}
            </div>
          </div>
          <div className={styles[`${PrefixCls}-message-content-details`]}>
            {details}
          </div>
        </div>
      </div>
    );
  },

};

