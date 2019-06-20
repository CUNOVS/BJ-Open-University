import { parse } from 'qs';
import modelExtend from 'dva-model-extend';
import { UploadFile } from 'services/forum';
import { addHomeWork } from 'services/resource';
import { model } from 'models/common';
import { userTag } from 'utils/config';
import { _cg } from 'utils/cookie';
import { Toast } from 'components';

const { usertoken } = userTag;

export default modelExtend(model, {
  namespace: 'homeworkadd',
  state: {
    itemid: 0,
    animating: false
  },
  effects: {
    * uploadFile ({ payload }, { call, put, select }) {
      const { fileList, value } = payload;
      let formData = new FormData();
      for (let i = 0; i < fileList.length; i++) {
        const { itemid } = yield select(_ => _.homeworkadd);
        formData.append('file', fileList[i]);
        formData.append('token', _cg(usertoken));
        formData.append('itemid', itemid);
        formData.append('filearea', 'draft');
        const response = yield call(UploadFile, formData);
        formData = new FormData();
        if (response) {
          yield put({
            type: 'updateState',
            payload: {
              itemid: response[0].itemid
            }
          });
        }
        if (i === fileList.length - 1) {
          yield put({
            type: 'AddHomework',
            payload: {
              ...value,
              filemanager: response[0].itemid
            }
          });
        }
      }
    },
    * AddHomework ({ payload }, { call, put, select }) {
      const { success, message = '提交失败' } = yield call(addHomeWork, payload);
      if (success) {
        yield put({ type: 'goBack' });
        Toast.success('提交成功');
        yield put({
          type: 'updateState',
          payload: {
            animating: false
          }
        });
      } else {
        yield put({
          type: 'updateState',
          payload: {
            animating: false
          }
        });
        Toast.error(message);
      }
    }
    ,
  }
})
;
