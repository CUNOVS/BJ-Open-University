/* eslint-disable indent,react/jsx-indent-props,react/jsx-max-props-per-line,react/jsx-closing-bracket-location */
import React, { Fragment } from 'react';
import { List, Icon, Progress, Button, Card, Badge, WhiteSpace } from 'antd-mobile';
import Enclosure from 'components/enclosure';
import CnBadge from 'components/cnBadge';
import {
  getErrorImg,
  getImages,
  getLocalIcon,
  getCommonDate,
  changeLessonDate,
  getTaskIcon,
  isToday,
  getMessageTime
} from 'utils';
import InnerHtml from 'components/innerhtml';
import classNames from 'classnames';
import styles from './index.less';
import Huise from '../attendancehead/huise.png';


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

  chapterRow: ({ title, time, id, type, }, onClick) => {
    /**
     * @author Lowkey
     * @date 2018/10/25
     * @Description: 课程播放列表
     */
    return (
      <div key={id} className={styles[`${PrefixCls}-chapter-outer`]} onClick={onClick} >
        <div className={styles[`${PrefixCls}-chapter-outer-left`]} >
          <span >
            <Icon
              style={{ verticalAlign: 'middle' }}
              type={type === 'video' ? getLocalIcon('/row/video.svg') : getLocalIcon('/row/homework.svg')}
            />
          </span >
          <span className={styles[`${PrefixCls}-chapter-outer-left-title`]} >
            {title}
          </span >
        </div >
        <div className={styles[`${PrefixCls}-chapter-outer-right`]} >
          {time}
        </div >
      </div >
    );
  },
  contactsRow: (data, Click, dispatch) => {
    // 联系人列表
    return (
      <List className={styles[`${PrefixCls}-contacts`]} >
        {cnIsArray(data) && data.map((item, i) => {
          return (
            <Item
              key={item.id}
              thumb={getImages(item.profileimageurlsmall, 'user')}
              arrow="horizontal"
              onClick={Click.bind(null, 'conversation', {
                fromuserid: item.id,
                name: item.fullname,
                avatar: item.profileimageurlsmall
              }, dispatch)}
            >
              {item.fullname}
            </Item >
          );
        })}
      </List >
    );
  },
  taskRow: (item, click, handDivClick) => {
    // 任务列表
    const { id, coursename, modulename, name, timestart, availabilityinfo = '' } = item;
    return (
      <div key={id} className={styles[`${PrefixCls}-task`]} onClick={availabilityinfo === '' ? click : null} >
        <div className={styles[`${PrefixCls}-task-title`]} >
          {coursename}
          <div className={styles[`${PrefixCls}-task-title-time`]} >
            <span style={{ color: isToday(timestart) ? '#e20f09' : '#ff9a1b' }} >
              {`截止时间：${changeLessonDate(timestart)}`}
            </span >
          </div >
        </div >
        <div className={styles[`${PrefixCls}-task-content`]} >
          <span ><Icon type={getLocalIcon(getTaskIcon(modulename))} size="xs" /></span >
          <span >{name}</span >
        </div >
        {availabilityinfo !== '' ?
          <div
            className={styles[`${PrefixCls}-task-available`]}
            dangerouslySetInnerHTML={{ __html: availabilityinfo }}
            onClick={handDivClick}
          /> : ''}
      </div >
    );
  },
  taskLessonRow: (item, click, dispatch) => {
    // 全部任务列表
    const { id, fullname, enddate, master, courseImage } = item;

    return (
      <div key={id} className={styles[`${PrefixCls}-tasklesson`]} onClick={click.bind(null, item, dispatch)} >
        <div className={styles[`${PrefixCls}-tasklesson-title`]} >{fullname}</div >
        <div className={styles[`${PrefixCls}-tasklesson-container`]} >
          <div className={styles[`${PrefixCls}-tasklesson-img`]}
               style={{ backgroundImage: `url(${getImages(courseImage)})` }} >
          </div >
          <div className={styles[`${PrefixCls}-tasklesson-content`]} >
            <div className={styles[`${PrefixCls}-tasklesson-content-teacher`]} >{`责任教师：${master.fullname}`}</div >
            <div
              className={styles[`${PrefixCls}-tasklesson-content-time`]} >{`结课日期：${changeLessonDate(enddate)}`}</div >
          </div >
        </div >
      </div >
    );
  },
  closeLessonRow: (item) => {
    // 已开课程列表
    const { fullname, master, id, graderaw = 0, attendance = {}, courseImage = '' } = item,
      { stat = 0 } = attendance;
    return (
      <div key={id} className={styles[`${PrefixCls}-closelesson`]} >
        <div className={styles[`${PrefixCls}-closelesson-title`]} >{fullname}</div >
        <div className={styles[`${PrefixCls}-closelesson-container`]} >
          <div className={styles[`${PrefixCls}-closelesson-img`]}
               style={{ backgroundImage: `url(${getImages(courseImage)})` }} >
          </div >
          <div className={styles[`${PrefixCls}-closelesson-content`]} >
            <div className={styles[`${PrefixCls}-closelesson-content-teacher`]} >
              {`责任教师：${master.fullname}`}
            </div >
            <div className={styles[`${PrefixCls}-closelesson-content-info`]} >
              {stat ?
                <div style={{ color: '#1eb259' }} >考勤：达标</div >
                :
                <div style={{ color: '#f34e14' }} >考勤：未达标</div >
              }
              {
                <div style={{ color: isPass(graderaw) ? '#1eb259' : '#f34e14' }} >{`成绩：${graderaw}`}</div >
              }
            </div >
          </div >
        </div >
      </div >
    );
  },
  openingLessonRow: (item, onClick, onProgressClick, dispatch) => {
    // 已开课程列表
    const { fullname = '', graderaw = 0, id, master, enddate, isAttendance = false, hasFinalExam = false, courseImage } = item;
    return (
      <div key={id} className={styles[`${PrefixCls}-openinglessonout`]} onClick={onClick.bind(null, item, dispatch)} >
        <div className={styles[`${PrefixCls}-openinglessonout-title`]} >{fullname}</div >
        <div className={styles[`${PrefixCls}-openinglesson`]} >
          <div
            className={styles[`${PrefixCls}-openinglesson-img`]}
            style={{ backgroundImage: `url(${getImages(courseImage)})` }} >
          </div >
          <div className={styles[`${PrefixCls}-openinglesson-content`]} >
            <div className={styles[`${PrefixCls}-openinglesson-content-teacher`]} >{`责任教师：${master.fullname}`}</div >
            <div className={styles[`${PrefixCls}-openinglesson-content-time`]} >
              {`结课日期：${changeLessonDate(enddate)}`}
            </div >
            <div className={styles[`${PrefixCls}-openinglesson-content-type`]} >
              {hasFinalExam ?
                <div className={styles[`${PrefixCls}-openinglesson-content-type-ending`]} >终考课</div > : ''}
              {isAttendance ?
                <div className={styles[`${PrefixCls}-openinglesson-content-type-attendance`]} >考勤课</div > : ''}
            </div >
          </div >
        </div >
        <div className={styles[`${PrefixCls}-openinglessonout-progress`]}
             onClick={onProgressClick}
        >
          <div className={styles[`${PrefixCls}-openinglessonout-progress-left`]} >
            <Progress percent={Math.min(graderaw, 100)}
                      position="normal"
                      barStyle={{ borderColor: isPass(graderaw) ? '#1eb259' : '#f34e14' }}
                      appearTransition
            />
          </div >
          <div className={styles[`${PrefixCls}-openinglessonout-progress-right`]}
               style={{ color: isPass(graderaw) ? '#1eb259' : '#f34e14' }}
          >
            {`${graderaw}分`}
          </div >
        </div >
      </div >
    );
  },
  achievementRow: (item, onClick) => {
    const { fullname, id, enddate, courseImage, graderaw, openState } = item;
    // 成绩列表
    return (
      <div key={id} className={styles[`${PrefixCls}-achievement`]} onClick={openState === '0' ? onClick : null} >
        <div className={styles[`${PrefixCls}-achievement-title`]} >{fullname}</div >
        <div className={styles[`${PrefixCls}-achievement-container`]} >
          <div className={styles[`${PrefixCls}-courseImage`]}
               style={{ backgroundImage: `url(${getImages(courseImage)})` }} >
          </div >
          <div className={styles[`${PrefixCls}-achievement-content`]} >
            <div
              className={styles[`${PrefixCls}-attendanceRow-content-status`]} >{openState === '0' ? `结课日期：${changeLessonDate(enddate)}` : '已结束'}
            </div >
            <div className={styles[`${PrefixCls}-achievement-grade`]} >{`课程总得分：${graderaw}`}</div >
            <CnBadge
              text={isPass(graderaw) ? '合格' : '不合格'}
              background={isPass(graderaw) ? '#1eb259' : '#f34e14'}
              color="#fff"
              size="xs" />
          </div >
        </div >
        <WhiteSpace />
      </div >
    );
  },
  achievementDetailsRow: (item, onClick, dispatch) => {
    const { title = '', grade = '', id = '', itemType = '', grademax = '-', instance = '', enddate = '' } = item;
    return (
      <div
        key={id || (`${itemType}_${cnId()}`)}
        className={classNames(styles[`${PrefixCls}-achievementdetails`], { [styles.disabled]: id === '' })}
        onClick={id === '' ? '' : onClick.bind(null, item, dispatch)}
      >
        <div className={styles[`${PrefixCls}-achievementdetails-top`]} >
          <span ><Icon type={getLocalIcon(getTaskIcon(itemType))} size="xs" /></span >
          <span className={classNames({ [styles.disabled]: id === '' })} >{title}</span >
        </div >
        <div className={styles[`${PrefixCls}-achievementdetails-bottom`]} >
          <div className={styles[`${PrefixCls}-achievementdetails-bottom-total`]} >{`总分:${grademax}`}</div >
          <div
            className={classNames(styles[`${PrefixCls}-achievementdetails-bottom-my`], { [styles.disabled]: id === '' })} >{`我的得分:${grade}`}</div >
        </div >
        <div className={styles[`${PrefixCls}-achievementdetails-date`]} >
          {enddate > 0 ? `截止时间：${getCommonDate(enddate)}` : '截止时间:未设置'}
        </div >
      </div >
    );
  },
  teachersRow: (item, onClick, dispatch) => {
    // 老师列表
    const { fullname, id, master, mentors } = item;
    return (
      <div key={id} className={styles[`${PrefixCls}-teachers-outer`]} >
        <Card >
          <Card.Header
            title={fullname}
          />
          <Card.Body >
            {
              master.length > 0 ?
                <div >
                  {master.map((items) => (
                    <div key={items.id} className={styles[`${PrefixCls}-teachers`]}
                         onClick={onClick.bind(null, 'userpage', { userid: items.id }, dispatch)} >
                      <div className={styles[`${PrefixCls}-teachers-img`]} >
                        <img src={getImages(items.avatar, 'user')} alt="" />
                      </div >
                      <div className={styles[`${PrefixCls}-teachers-content`]} >
                        <div className={styles[`${PrefixCls}-teachers-content-top`]} >
                          <div className={styles[`${PrefixCls}-teachers-content-top-title`]} >
                            {items.fullname && (items.fullname.length < 10 ? items.fullname : items.fullname.substr(0, 9) + '...') || ''}
                          </div >
                          <div className={styles[`${PrefixCls}-teachers-content-top-type`]} >
                            责任教师
                          </div >
                        </div >
                        <div className={styles[`${PrefixCls}-teachers-content-bottom`]} >
                          <Button
                            onClick={onClick.bind(null, 'conversation', {
                              fromuserid: items.id,
                              name: items.fullname,
                              avatar: items.avatar
                            }, dispatch)}
                            type="primary"
                            inline
                            size="small"
                          >发消息</Button >
                        </div >
                      </div >
                    </div >
                  ))}
                </div >
                :
                null
            }
            {
              mentors.length > 0 ?
                <div >
                  {mentors.map((items) => (
                    <div key={items.id} className={styles[`${PrefixCls}-teachers`]}
                         onClick={onClick.bind(null, 'userpage', { userid: items.id }, dispatch)} >
                      <div className={styles[`${PrefixCls}-teachers-img`]} >
                        <img src={getImages(items.userData.avatar, 'user')} alt="" />
                      </div >
                      <div className={styles[`${PrefixCls}-teachers-content`]} >
                        <div className={styles[`${PrefixCls}-teachers-content-top`]} >
                          <div className={styles[`${PrefixCls}-teachers-content-top-title`]} >
                            {items.userData && items.userData.fullname}
                          </div >
                          <div className={styles[`${PrefixCls}-teachers-content-top-type`]} >
                            {items.roleData && items.roleData.roleName}
                          </div >
                        </div >
                        <div className={styles[`${PrefixCls}-teachers-content-bottom`]} >
                          <Button
                            onClick={onClick.bind(null, 'conversation', {
                              fromuserid: items.id,
                              name: items.userData.fullname,
                              avatar: items.userData && items.userData.avatar
                            }, dispatch)}
                            type="primary"
                            inline
                            size="small"
                          >发消息</Button >
                        </div >
                      </div >
                    </div >
                  ))}
                </div >
                :
                null
            }
          </Card.Body >
        </Card >
        <WhiteSpace size="lg" />
      </div >
    );
  },
  groupRow: (item, onClick) => {
    // 小组
    const { name, id, course } = item;
    return (
      <div key={id} >
        <Item arrow="horizontal" onClick={onClick} >
          {course}
          <Brief >{name}</Brief >
        </Item >
        <WhiteSpace />
      </div >
    );
  },
  groupListRow: (rowData, sectionID, rowID, onClick, dispatch) => {
    // 小组成员列表
    const { fullname, profileimageurl, id, roleName } = rowData;
    return (
      <div key={id} className={styles[`${PrefixCls}-groupList`]}
           onClick={onClick.bind(null, 'userpage', { userid: id }, dispatch)} >
        <div className={styles[`${PrefixCls}-groupList-img`]} >
          <img src={getImages(profileimageurl, 'user')} alt="" onError={(el => getErrorImg(el, 'user'))} />
        </div >
        <div className={styles[`${PrefixCls}-groupList-content`]} >
          <div className={styles[`${PrefixCls}-groupList-content-top`]} >
            <div className={styles[`${PrefixCls}-groupList-content-top-title`]} >
              {fullname}
            </div >
            <div className={styles[`${PrefixCls}-groupList-content-top-role`]} >
              {roleName}
            </div >
          </div >
          <div className={styles[`${PrefixCls}-groupList-content-bottom`]} >
            <Button
              onClick={onClick.bind(null, 'conversation', {
                fromuserid: id,
                name: fullname,
                avatar: profileimageurl
              }, dispatch)}
              type="primary"
              inline
              size="small"
            >
              发消息
            </Button >
          </div >
        </div >
      </div >
    );
  },
  attendanceRow: (item, onClick) => {
    // 考勤列表
    const { fullname, id, enddate, courseImage, attendance: { weekStat } } = item;
    return (
      <div key={id} className={styles[`${PrefixCls}-attendanceRow`]} onClick={onClick} >
        <div className={styles[`${PrefixCls}-attendanceRow-title`]} >{fullname}</div >
        <div className={styles[`${PrefixCls}-attendanceRow-container`]} >
          <div className={styles[`${PrefixCls}-courseImage`]}
               style={{ backgroundImage: `url(${getImages(courseImage)})` }} >
          </div >
          <div className={styles[`${PrefixCls}-attendanceRow-content`]} >
            <div className={styles[`${PrefixCls}-attendanceRow-content-status`]} >
              <span >本周考勤:</span >
              <CnBadge text={weekStat ? '达标' : '未达标'} background={weekStat ? '#1eb259' : '#f34e14'} color="#fff"
                       size="xs" />
            </div >
            <span
              className={styles[`${PrefixCls}-attendanceRow-content-time`]} >{`结课日期：${changeLessonDate(enddate)}`}</span >
          </div >
        </div >
        <WhiteSpace />
      </div >
    );
  },
  forumRow: (rowData, sectionID, rowID, onClick, dispatch, names, group) => {
    const getGroups = (groups = [], id) => {
      const groupById = groups.find(item => item.id === id);
      return groupById && groupById.name || '';
    };
    const { name, id, subject, pinned, userfullname, userpictureurl, message, created, discussion, groupid, numreplies, numunread = 0 } = rowData;
    const creatDate = new Date(created * 1000).toLocaleString('zh');
    return (
      <List.Item
        wrap
        key={id}
        className={styles[`${PrefixCls}-forum`]}
        onClick={onClick.bind(null, 'forumDetails', {
          discussionid: discussion,
          names,
        }, dispatch)}
      >
        <div className={styles[`${PrefixCls}-forum-user`]} >
          <img src={getImages(userpictureurl, 'user')} style={{ marginRight: '10px' }}
               onError={(el => getErrorImg(el, 'user'))} />
          <div className={styles[`${PrefixCls}-forum-user-info`]} >
            <div >
              <div >{userfullname}</div >
            </div >
            <div >
              {/*<div >{getGroups(group, groupid)}</div >*/}
              {/*<Badge text={numunread} />*/}
            </div >
          </div >
        </div >
        <div className={styles[`${PrefixCls}-forum-content`]} >
          {pinned ?
            <div style={{ marginRight: '8px' }} ><CnBadge text="置顶" background="#f34e14" color="#fff" size="xs" />
            </div > : ''}
          <div className={styles[`${PrefixCls}-forum-content-text`]} >{name}</div >
        </div >
        <div className={styles[`${PrefixCls}-forum-foot`]} >
          <div className={styles[`${PrefixCls}-forum-foot-message`]} >
            <Icon type={getLocalIcon('/components/xiaoxi.svg')} size="xs" />
            <span >{numreplies}</span >
          </div >
          <div className={styles[`${PrefixCls}-forum-foot-time`]} >
            {creatDate}
          </div >
        </div >
      </List.Item >
    );
  },
  forumAllRow: (item, handlerMoreClick, dispatch, maxattachments, maxbytes) => {
    const renderChild = (item, handlerMoreClick, dispatch, maxattachments, maxbytes) => {
      const { canreply, id, created, children = [], message, subject, userfullname, attachment = '', attachments } = item;
      return (
        <div key={id} className={styles[`${PrefixCls}-child`]} >
          <div className={styles[`${PrefixCls}-child-info`]} >
            <div >{userfullname}</div >
            <div >{getCommonDate(created)}</div >
          </div >
          <div className={styles[`${PrefixCls}-child-content`]} >
            <InnerHtml data={message} />
            {
              attachment !== '' ?
                <Enclosure key={id} data={attachments} />
                :
                null
            }
          </div >
          <div className={styles[`${PrefixCls}-child-describe`]} >
            {canreply ?
              <div className={styles[`${PrefixCls}-child-reply`]} >
                <Icon type={getLocalIcon('/components/xiaoxi.svg')} />
                <span style={{ marginLeft: '3px' }} onClick={handlerMoreClick.bind(null, 'sendForum', {
                  maxattachments,
                  maxbytes,
                  id,
                  subject,
                  type: 'reply',
                }, dispatch)} >{`回复(${children.length})`}</span >
              </div >
              :
              null}
          </div >
          {
            children.length > 0 ?
              <div className={styles[`${PrefixCls}-child-more`]}
                   onClick={handlerMoreClick.bind(null, 'replyAll', {}, dispatch)} >查看更多</div >
              :
              null
          }

        </div >
      );
    };
    const { canreply, id, created, children, message, subject, userfullname, userpictureurl, attachment = '', attachments } = item,
      silceArr = (num) => (children.slice(0, num));
    return (
      <Item wrap key={id} className={styles[`${PrefixCls}-forumDetails`]} onError={(el => getErrorImg(el, 'user'))} >
        <div className={styles[`${PrefixCls}-forumDetails-info`]} >
          <img src={getImages(userpictureurl, '')} style={{ marginRight: '10px' }} />
          <div >{userfullname}</div >
        </div >
        <div className={styles[`${PrefixCls}-forumDetails-content`]} >
          <InnerHtml data={message} />
          {
            attachment !== '' ?
              <Enclosure key={id} data={attachments} />
              :
              null
          }
        </div >
        <div className={styles[`${PrefixCls}-forumDetails-describe`]} >
          <div >{getCommonDate(created)}</div >
          {canreply ?
            <div className={styles[`${PrefixCls}-forumDetails-reply`]} >
              <Icon type={getLocalIcon('/components/xiaoxi.svg')} />
              <span style={{ marginLeft: '3px' }} onClick={handlerMoreClick.bind(null, 'sendForum', {
                maxattachments,
                maxbytes,
                id,
                subject,
                type: 'reply',
              }, dispatch)} >{`回复(${children.length})`}</span >
            </div >
            :
            null}
        </div >
        {children.length > 0 ?
          <div className={styles[`${PrefixCls}-forumDetails-children`]} >
            {silceArr(2)
              .map(item => renderChild(item, handlerMoreClick, dispatch, maxattachments, maxbytes))}
            {children.length > 0 ? <span >展开</span > : null}
          </div >
          : null}
      </Item >
    );
  },
  messageListRow: (rowData, sectionID, rowID, onClick, dispatch) => {
    const { avatar, details, smallmessage, timecreated, userName, useridfrom, unread } = rowData;
    // 通知列表
    return (
      <div key={useridfrom} className={styles[`${PrefixCls}-message`]}
           onClick={onClick.bind(null, 'conversation', {
             fromuserid: useridfrom,
             name: userName,
             avatar,
             unread,
           }, dispatch)} >
        <Badge dot={unread} >
          <div className={styles[`${PrefixCls}-message-img`]} >
            <img src={getImages(avatar, 'user')} alt="" onError={(el => getErrorImg(el, 'user'))} />
          </div >
        </Badge >
        <div className={styles[`${PrefixCls}-message-content`]} >
          <div className={styles[`${PrefixCls}-message-content-top`]} >
            <div className={styles[`${PrefixCls}-message-content-top-title`]} >
              {userName}
            </div >
            <div className={styles[`${PrefixCls}-message-content-top-date`]} >
              {getMessageTime(timecreated)}
            </div >
          </div >
          <div className={styles[`${PrefixCls}-message-content-details`]} >
            {smallmessage}
          </div >
        </div >
      </div >
    );
  },
  commentsRow: (item, onClick, dispatch) => {
    const { content, fullname, userid, time, id } = item;
    return (
      <Card
        key={id}
        style={{ marginBottom: '10px' }}
        onClick={onClick.bind(null, 'userpage', { userid }, dispatch)}
      >
        <Card.Header
          title={fullname}
          extra={time}
        />
        <Card.Body >
          <InnerHtml data={content} />
        </Card.Body >
      </Card >
    );
  },
  messageRow: (rowData, sectionID, rowID, onClick, dispatch, userid) => {
    const { id, jumping = true, cmid, state, name, timecreated } = rowData;
    return (
      <List.Item
        key={id}
        wrap
        arrow={jumping ? 'horizontal' : null}
        className={styles[`${PrefixCls}-messagelist`]}
        onClick={
          jumping ?
            onClick.bind(null, rowData, {
              cmid,
              userid,
            }, dispatch)
            :
            null
        }
      >
        <div className={styles[`${PrefixCls}-messagelist-details`]} >
          {state === 'unread' ? <Badge text={'未读'} style={{ marginRight: 12 }} /> : null}
          {name}
        </div >
        <div className={styles[`${PrefixCls}-messagelist-date`]} >{getCommonDate(timecreated)}</div >
      </List.Item >
    );
  },
  sysNoticeRow: (rowData, sectionID, rowID, onClick, dispatch) => {
    const { noticeId, noticeTitle, noticeContent, noticeCrateDate } = rowData;
    return (
      <List.Item
        key={noticeId}
        wrap
        className={styles[`${PrefixCls}-messagelist`]}
        onClick={onClick.bind(null, 'details', {
          name: '通知详情',
          type: 'detailsText',
          content: noticeContent
        }, dispatch)}
      >
        <div className={styles[`${PrefixCls}-messagelist-details`]} >
          {/*{state === 'unread' ? <Badge text={'未读'} style={{ marginRight: 12 }} /> : null}*/}
          {noticeTitle}
        </div >
        <div className={styles[`${PrefixCls}-messagelist-date`]} >{getCommonDate(noticeCrateDate / 1000)}</div >
      </List.Item >
    );
  },
  opinionRow: (rowData, onClick, dispatch) => {
    const { submitType, submitDate, submitContent, currentStatus, opinionId } = rowData;
    return (
      <List.Item
        key={opinionId}
        wrap
        arrow="horizontal"
        className={styles[`${PrefixCls}-messagelist`]}
        onClick={onClick.bind(null, 'opiniondetails', {
          name: '我的反馈',
          id: opinionId,
        }, dispatch)}
      >
        <div className={styles[`${PrefixCls}-messagelist-details`]} >
          {/*{state === 'unread' ? <Badge text={'未读'} style={{ marginRight: 12 }} /> : null}*/}
          {submitType}
        </div >
        <div className={styles[`${PrefixCls}-messagelist-date`]} >{getCommonDate(submitDate / 1000)}</div >
      </List.Item >
    );
  },

};

