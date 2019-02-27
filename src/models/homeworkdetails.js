import { parse } from 'qs';
import modelExtend from 'dva-model-extend';
import { getLocalIcon } from 'utils';
import { model } from 'models/common';

const data = [
    { title: '评分状态', state: '未评分' },
    { title: '截至时间', state: '2018年10月30日' },
    { title: '剩余时间', state: '4天13小时' },
    { title: '最后修改', state: '2018年12月30日' },
  ],
  content = `<div>请你任选小班/中班/大班阶段的儿童，设计一个不少于300字的班级户外体育活动的方案并进行指导，
					如果有条件可以在幼儿园实践你设计的活动,并根据时间效果改进活动设计.</div>
					<div style={{textIndent:'2rem'}}>(参考视频:打扮健康活动<彩虹森林>)</div>
					<h3>活动设计必须包含的几个方面并满足相应要求</h3>
					<h3>活动目标</h3>
						<div>1.结合<纲要>中小,中,大班年龄特点</div>
						<div>2.结合健康领域的目标设计要求</div>
						<div>3.明确本次活动的重点</div>
					<h3>活动准备</h3>
          <div>1. 物质准备：环境、材料</div>
          <div>2. 经验准备：结合幼儿的已有学习或知识经验</div>
          <h3>活动过程</h3>
           <div>1. 合理控制和调节幼儿在体育活动中的负荷量</div>
          <div>3. 活动设计现实可行</div>
          <div>4. 尽可能设计一个与其他学科整合的体育活动（可酌情加分）</div>
          <div>4. 尽可能设计一个与其他学科整合的体育活动（可酌情加分）</div>
          <h3>作业提交要求：</h3>
           <p>1. 文件格式：提交作业的文件格式只能是Word文档，即.doc或.docx文档。如果上传的作业为多个文档，请将所有文档放在按要求命名的文件夹中，以压缩文件形式上传。</p>
           <p>2. 文件大小：上传的作业不能超过10M。</p>
           <p>3. 作业命名规则：所上传作业文件的命名规则为“学号+姓名+作业名称”。</p>
          `,
  title = {
    title: '设计幼儿园班级户外体育活动',
    fraction: '10分',
    type: '考勤活动',
    week: '第一周',
  };

export default modelExtend(model, {
  namespace: 'homeworkdetails',
  state: {
    data: [],
    content: {},
    title: {},
  },
  subscriptions: {
    setupHistory ({ dispatch, history }) {
      history.listen(({ pathname, query, action }) => {
        if (pathname === '/homeworkdetails') {
          dispatch({
            type: 'queryMessage',
          });
        }
      });
    },
  },
  effects: {
    * queryMessage ({ payload }, { call, put, select }) {
      yield put({
        type: 'updateState',
        payload: {
          data: data,
          content: content,
          title: title,
        },
      });
    },
  },

});
