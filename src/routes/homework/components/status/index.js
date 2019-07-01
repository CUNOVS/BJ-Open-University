/**
 * @author Lowkey
 * @date 2019/04/02 14:39:52
 * @Description:
 */
import React from 'react';
import { Icon, WhiteSpace, Tabs, Button, WingBlank, List, Modal } from 'components';
import CnBadge from 'components/cnBadge';
import TitleBox from 'components/titlecontainer';
import { handlerChangeRouteClick } from 'utils/commonevents';
import { getCommonDate, getLocalIcon, getSurplusDay, getImages } from 'utils';
import FeedBack from '../feedkack';
import SelfFiles from '../selfFiles';
import styles from './index.less';

const alert = Modal.alert;
const PrefixCls = 'status',
  tabs = [
    { title: '提交的作业' },
    { title: '成绩' },
  ],
  getSubmitStatus = (status) => {
    switch (status) {
      case 'new' :
        return <CnBadge text="没有提交作业" background="#f34e14" />;
      case 'draft' :
        return <CnBadge text="草稿(未提交)" background="#ec9c00" />;
      case 'submitted' :
        return <CnBadge text="已提交" background="#1eb259" />;
      case 'marked' :
        return <CnBadge text="已评分" background="#1eb259" />;
      case 'reonpened' :
        return <CnBadge text="已开启重交" background="#ff9a1b" />;
      default :
        return <CnBadge text="未知" background="#ff9a1b" />;
    }
  },

  getStyle = (type, data, timemodified = 0) => {
    if (type === 'submitted') {
      if (data * 1000 < new Date() && data > timemodified) {
        return { color: '#1eb259' };
      } else if (data * 1000 < new Date() && data < timemodified) {
        return { color: '#f34e14' };
      }
      return null;
    }
    return null;
  },

  getGradeStatus = (status) => {
    switch (status) {
      case 'inmarking' :
        return <CnBadge text="评分中" background="#ff9a1b" />;
      case 'draft' :
        return <CnBadge text="草稿(未提交)" background="#ec9c00" />;
      case 'readyforreview' :
        return <CnBadge text="已评分" background="#1eb259" />;
      case 'inreview' :
        return <CnBadge text="正在检查评分结果" background="#ff9a1b" />;
      case 'readyforrelease' :
        return <CnBadge text="准备公布评分" background="#ff9a1b" />;
      case 'released' :
        return <CnBadge text="已公布评分" background="#1eb259" />;
      case 'graded' :
        return <CnBadge text="已评分" background="#1eb259" />;
      case 'notgraded' :
        return <CnBadge text="未评分" background="#f34e14" />;
      default :
        return <CnBadge text="未评分" background="#f34e14" />;
    }
  };
const Status = (props) => {
  const { submitStatus, gradingstatus, duedate = 0, cutoffdate = 0, allowsubmissionsfromdate = 0, timemodified = 0, submitDataType, grade = {}, fileIdPrefix, canedit, cansubmit, } = props,
    handlerSubmit = (id) => {
      props.dispatch({
        type: 'homework/sendAssing',
        payload: {
          assignmentid: id
        }
      });
    },
    showModal = (id) => {
      alert('提交', '本作业一旦提交，您将不能再作任何修改', [
        { text: '取消', onPress: () => console.log() },
        { text: '提交', onPress: () => handlerSubmit(id) },
      ]);
    };
  return (
    <div className={styles[`${PrefixCls}-status`]} >
      <div className={styles[`${PrefixCls}-status-head`]} >
        <div className={styles[`${PrefixCls}-status-head-left`]} >
          <span ><Icon type="down" color="#22609c" /></span >
          <span >提交状态</span >
        </div >
        <div className={styles[`${PrefixCls}-status-head-right`]} >
          <span >{getSubmitStatus(submitStatus)}</span >
          <span >{getGradeStatus(gradingstatus)}</span >
        </div >
      </div >
      {
        gradingstatus === 'graded'
          ? <Tabs
            tabs={tabs}
            initialPage={0}
            tabBarInactiveTextColor="#b7b7b7"
            tabBarUnderlineStyle={{ border: '1px solid #22609c' }}
          >
            <div >
              {submitStatus !== 'new'
                ? <SelfFiles data={submitDataType} dispatch={props.dispatch} />
                :
                ''
              }
              <WhiteSpace />
              {
                duedate > 0 ?
                  <div className={styles[`${PrefixCls}-status-time`]} >
                    <span >
                      <Icon type={getLocalIcon('/components/enddate.svg')} size="xs" />
                      <span >截止时间</span >
                    </span >
                    <span >{getCommonDate(duedate)}</span >
                  </div >
                  :
                  null
              }
              {
                duedate > 0 ?
                  <div className={styles[`${PrefixCls}-status-time`]} >
                    <span >
                      <Icon type={getLocalIcon('/components/surplus.svg')} size="xs" />
                      <span >剩余时间</span >
                    </span >
                    {getSurplusDay(duedate, submitStatus, timemodified)}
                  </div >
                  :
                  null
              }
              <div className={styles[`${PrefixCls}-status-time`]} >
                <span ><Icon type={getLocalIcon('/components/modify.svg')} size="xs" /><span >最后修改</span ></span >
                <span >{submitStatus !== 'new' ? getCommonDate(timemodified) : '-'}</span >
              </div >
              <WhiteSpace size="lg" />
              <WingBlank >
                {
                  canedit ?
                    <Button
                      type="primary"
                      onClick={(e) => (handlerChangeRouteClick(
                        'homeworkadd',
                        { assignId: props.assignId },
                        props.dispatch, e))}
                    >
                      {submitStatus === 'new' ? '添加提交' : '编辑提交的作业'}
                    </Button >
                    :
                    null
                }
                <WhiteSpace size="lg" />
                {
                  cansubmit ?
                    <Button
                      type="warning"
                      onClick={(e) => showModal(props.assignId)}
                    >
                      {submitStatus === 'new' ? '添加提交' : '编辑提交的作业'}
                    </Button >
                    :
                    null

                }
              </WingBlank >
            </div >

            <div className={styles.feedback} >
              <div >
                <TitleBox title="最终成绩" sup="" />
                <div className={styles.grade} >{grade.gradefordisplay}</div >
              </div >
              <FeedBack data={grade.feedbackplugins} fileIdPrefix={fileIdPrefix} />
              <TitleBox title="评分人" sup="" />
              <List className={styles[`${PrefixCls}-list`]} >
                <List.Item
                  arrow="horizontal"
                  thumb={getImages(grade.gradeUser.avatar, 'user')}
                  multipleLine
                  onClick={(e) => {
                    if (grade.gradeUserId) {
                      handlerChangeRouteClick('userpage', { userid: grade.gradeUserId }, props.dispatch, e);
                    }
                  }}
                >
                  {grade.gradeUser.fullname}
                  <List.Item.Brief >{getCommonDate(grade.timemodified)}</List.Item.Brief >
                </List.Item >
              </List >
            </div >
          </Tabs >
          :
          <div >
            {submitStatus !== 'new'
              ?
              <SelfFiles data={submitDataType} fileIdPrefix={fileIdPrefix} dispatch={props.dispatch} />
              :
              ''
            }
            <WhiteSpace />
            {
              duedate > 0 ?
                <div className={styles[`${PrefixCls}-status-time`]} >
                  <span >
                    <Icon type={getLocalIcon('/components/enddate.svg')} size="xs" />
                    <span >截止时间</span >
                  </span >
                  <span >{getCommonDate(duedate)}</span >
                </div >
                :
                null
            }
            {
              duedate > 0 ?
                <div className={styles[`${PrefixCls}-status-time`]} >
                  <span ><Icon type={getLocalIcon('/components/surplus.svg')} size="xs" /><span >剩余时间</span ></span >
                  <span
                    style={getStyle(submitStatus, duedate, timemodified)}
                  > {getSurplusDay(duedate, submitStatus, timemodified)}
                  </span >
                </div >
                :
                null
            }
            <div className={styles[`${PrefixCls}-status-time`]} >
              <span ><Icon type={getLocalIcon('/components/modify.svg')} size="xs" /><span >最后修改</span ></span >
              <span >{submitStatus !== 'new' ? getCommonDate(timemodified) : '-'}</span >
            </div >
            <WhiteSpace size="lg" />
            <WingBlank >
              {
                canedit ?
                  <Button
                    type="primary"
                    onClick={(e) => (handlerChangeRouteClick(
                      'homeworkadd',
                      { assignId: props.assignId },
                      props.dispatch, e))}
                  >
                    {submitStatus === 'new' ? '添加提交' : '编辑提交的作业'}
                  </Button >
                  :
                  null
              }
              <WhiteSpace size="lg" />
              {
                cansubmit ?
                  <Button
                    type="warning"
                    onClick={(e) => showModal(props.assignId)}
                  >
                    {submitStatus === 'new' ? '添加提交' : '编辑提交的作业'}
                  </Button >
                  :
                  null

              }
            </WingBlank >
          </div >
      }
    </div >
  );
};
export default Status;
