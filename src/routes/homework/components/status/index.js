/**
 * @author Lowkey
 * @date 2019/04/02 14:39:52
 * @Description:
 */
import { Icon, WhiteSpace, Tabs, Button, WingBlank, List } from 'components';
import CnBadge from 'components/cnBadge';
import InnerHtml from 'components/innerhtml';
import TitleBox from 'components/titlecontainer';
import FeedBack from '../feedkack';
import { getCommonData, getLocalIcon, getSurplusDay, getImages } from 'utils';
import SelfFiles from '../selfFiles';
import styles from './index.less';

const PrefixCls = 'status',
  tabs = [
    { title: '提交的作业' },
    { title: '成绩' },
  ],
  getSubmitStatus = (status) => {
    switch (status) {
      case 'new' :
        return <CnBadge text="没有提交作业" background="#f34e14" />;
        break;
      case 'draft' :
        return <CnBadge text="草稿(未提交)" background="#f34e14" />;
        break;
      case 'submitted' :
        return <CnBadge text="已提交" background="#1eb259" />;
        break;
      case 'marked' :
        return <CnBadge text="已评分" background="#1eb259" />;
        break;
      case 'reonpened' :
        return <CnBadge text="已开启重交" background="#ff9a1b" />;
        break;
      default :
        return <CnBadge text="未知" background="#ff9a1b" />;
    }
  },

  getGradeStatus = (status) => {
    switch (status) {
      case 'inmarking' :
        return <CnBadge text="评分中" background="#ff9a1b" />;
        break;
      case 'draft' :
        return <CnBadge text="草稿(未提交)" background="#f34e14" />;
        break;
      case 'readyforreview' :
        return <CnBadge text="已评分" background="#1eb259" />;
        break;
      case 'inreview' :
        return <CnBadge text="正在检查评分结果" background="#ff9a1b" />;
        break;
      case 'readyforrelease' :
        return <CnBadge text="准备公布评分" background="#ff9a1b" />;
        break;
      case 'released' :
        return <CnBadge text="已公布评分" background="#1eb259" />;
        break;
      case 'graded' :
        return <CnBadge text="已评分" background="#1eb259" />;
        break;
      case 'notgraded' :
        return <CnBadge text="未评分" background="#f34e14" />;
        break;
      default :
        return <CnBadge text="未评分" background="#f34e14" />;
    }
  },
  getButton = (type) => {
    if (type === 'new') {
      return '添加提交';
    } else if (type === 'submitted') {
      return '编辑提交的作业';
    }
  };
const Status = (props) => {
  const { submitStatus, gradingstatus, duedate, timemodified = 0, submitDataType, grade = {} } = props;
  return (
    <div className={styles[`${PrefixCls}-status`]}>
      <div className={styles[`${PrefixCls}-status-head`]}>
        <div className={styles[`${PrefixCls}-status-head-left`]}>
          <span><Icon type="down" color="#22609c" /></span>
          <span>提交状态</span>
        </div>
        <div className={styles[`${PrefixCls}-status-head-right`]}>
          <span>{getSubmitStatus(submitStatus)}</span>
          <span>{getGradeStatus(gradingstatus)}</span>
        </div>
      </div>
      {
        gradingstatus === 'graded'
          ?
          <Tabs tabs={tabs}
                initialPage={0}
                tabBarInactiveTextColor="#b7b7b7"
                tabBarUnderlineStyle={{ border: '1px solid #22609c' }}
          >
            <div>
              {submitStatus !== 'new'
                ?
                <SelfFiles data={submitDataType} />
                :
                ''
              }
              <WhiteSpace />
              <div className={styles[`${PrefixCls}-status-time`]}>
        <span>
          <Icon type={getLocalIcon('/components/enddate.svg')} size="xs" />
          <span>截止时间</span>
        </span>
                <span>{getCommonData(duedate)}</span>
              </div>
              <div className={styles[`${PrefixCls}-status-time`]}>
                <span><Icon type={getLocalIcon('/components/surplus.svg')} size="xs" /><span>剩余时间</span></span>
                <span>{getSurplusDay(duedate)}</span>
              </div>
              <div className={styles[`${PrefixCls}-status-time`]}>
                <span><Icon type={getLocalIcon('/components/modify.svg')} size="xs" /><span>最后修改</span></span>
                <span>{timemodified ? getCommonData(timemodified) : '-'}</span>
              </div>
              <WhiteSpace size="lg" />
              <WingBlank>
                <Button type="primary">{getButton(submitStatus)}</Button>
              </WingBlank>
            </div>

            <div>
              <div>
                <TitleBox title="最终成绩" sup="" />
                <InnerHtml data={grade.gradefordisplay} />
              </div>
              <FeedBack data={grade.feedbackplugins} />
              <TitleBox title="评分人" sup="" />
              <List className={styles[`${PrefixCls}-list`]}>
                <List.Item
                  arrow="horizontal"
                  thumb={getImages(grade.gradeUser.avatar, 'user')}
                  multipleLine
                  onClick={() => {
                  }}
                >
                  {grade.gradeUser.userName}
                  <List.Item.Brief>{getCommonData(grade.timemodified)}</List.Item.Brief>
                </List.Item>
              </List>
            </div>
          </Tabs>
          :
          <div>
            {submitStatus !== 'new'
              ?
              <SelfFiles data={submitDataType} />
              :
              ''
            }
            <WhiteSpace />
            <div className={styles[`${PrefixCls}-status-time`]}>
        <span>
          <Icon type={getLocalIcon('/components/enddate.svg')} size="xs" />
          <span>截止时间</span>
        </span>
              <span>{getCommonData(duedate)}</span>
            </div>
            <div className={styles[`${PrefixCls}-status-time`]}>
              <span><Icon type={getLocalIcon('/components/surplus.svg')} size="xs" /><span>剩余时间</span></span>
              <span>{getSurplusDay(duedate)}</span>
            </div>
            <div className={styles[`${PrefixCls}-status-time`]}>
              <span><Icon type={getLocalIcon('/components/modify.svg')} size="xs" /><span>最后修改</span></span>
              <span>{timemodified ? getCommonData(timemodified) : '-'}</span>
            </div>
            <WhiteSpace size="lg" />
            <WingBlank>
              <Button type="primary">{getButton(submitStatus)}</Button>
            </WingBlank>
          </div>
      }
    </div>
  );
};
export default Status;
