import React from 'react';
import { createForm } from 'rc-form';
import cheerio from 'cheerio';
import { Button, List, WhiteSpace, Picker } from 'components';
import styles from './index.less';

const PrefixCls = 'banner';

class Comp extends React.Component {
  onSubmit () {
    const fieldsValue = this.props.form.getFieldsValue(),
      result = {};
    for (let att in fieldsValue) {
      const value = fieldsValue[att];
      if (cnIsArray(value)) {
        value.map(v => {
          result[att] = v;
        });
      } else if (typeof value === 'object') {
        for (let attV in value) {
          result[attV] = value[attV];
        }
      } else {
        result[att] = value;
      }
    }
    console.log(result);
  }

  render () {
    const html = '<p>Complete the summaries of Jonas’s and Tye’s job below. Use the words in the box. Three are extra.<br>Jonas <span class="control group1"><select id="q271638_9_p1" class="select custom-select custom-select place1" name="q271638:9_p1"><option value="">选择...</option><option selected="selected" value="1">tiring</option><option value="2">mom</option><option value="3">interviews</option><option value="4">loves</option><option value="5">unusual</option><option value="6">hates</option><option value="7">famous</option><option value="8">punctual</option><option value="9">introduces</option><option value="10">moves</option><option value="11"> friend </option><option value="12">video</option></select> </span>&nbsp;singers and <span class="control group1"><select id="q271638_9_p2" class="select custom-select custom-select place2" name="q271638:9_p2"><option value="">选择...</option><option value="1">tiring</option><option value="2">mom</option><option value="3">interviews</option><option value="4">loves</option><option value="5">unusual</option><option value="6">hates</option><option value="7">famous</option><option value="8">punctual</option><option value="9">introduces</option><option value="10">moves</option><option value="11"> friend </option><option value="12">video</option></select> </span> music videos. He meets a lot of <span class="control group1"><select id="q271638_9_p3" class="select custom-select custom-select place3" name="q271638:9_p3"><option value="">选择...</option><option selected="selected" value="1">tiring</option><option value="2">mom</option><option value="3">interviews</option><option value="4">loves</option><option value="5">unusual</option><option value="6">hates</option><option value="7">famous</option><option value="8">punctual</option><option value="9">introduces</option><option value="10">moves</option><option value="11"> friend </option><option value="12">video</option></select> </span> people. That’s the good and bad part of the job. He <span class="control group1"><select id="q271638_9_p4" class="select custom-select custom-select place4" name="q271638:9_p4"><option value="">选择...</option><option value="1">tiring</option><option value="2">mom</option><option value="3">interviews</option><option value="4">loves</option><option value="5">unusual</option><option value="6">hates</option><option value="7">famous</option><option value="8">punctual</option><option value="9">introduces</option><option selected="selected" value="10">moves</option><option value="11"> friend </option><option value="12">video</option></select> </span> his job. He made a <span class="control group1"><select id="q271638_9_p5" class="select custom-select custom-select place5" name="q271638:9_p5"><option value="">选择...</option><option value="1">tiring</option><option value="2">mom</option><option value="3">interviews</option><option value="4">loves</option><option value="5">unusual</option><option selected="selected" value="6">hates</option><option value="7">famous</option><option value="8">punctual</option><option value="9">introduces</option><option value="10">moves</option><option value="11"> friend </option><option value="12">video</option></select> </span> to get this job.<br>Tye <span class="control group1"><select id="q271638_9_p6" class="select custom-select custom-select place6" name="q271638:9_p6"><option value="">选择...</option><option value="1">tiring</option><option value="2">mom</option><option value="3">interviews</option><option selected="selected" value="4">loves</option><option value="5">unusual</option><option value="6">hates</option><option value="7">famous</option><option value="8">punctual</option><option value="9">introduces</option><option value="10">moves</option><option value="11"> friend </option><option value="12">video</option></select> </span> cars from one place to another. You have to be <span class="control group1"><select id="q271638_9_p7" class="select custom-select custom-select place7" name="q271638:9_p7"><option value="">选择...</option><option value="1">tiring</option><option value="2">mom</option><option value="3">interviews</option><option value="4">loves</option><option value="5">unusual</option><option value="6">hates</option><option value="7">famous</option><option value="8">punctual</option><option value="9">introduces</option><option selected="selected" value="10">moves</option><option value="11"> friend </option><option value="12">video</option></select> </span> to do his job and it can be <span class="control group1"><select id="q271638_9_p8" class="select custom-select custom-select place8" name="q271638:9_p8"><option value="">选择...</option><option value="1">tiring</option><option value="2">mom</option><option value="3">interviews</option><option value="4">loves</option><option value="5">unusual</option><option value="6">hates</option><option value="7">famous</option><option value="8">punctual</option><option selected="selected" value="9">introduces</option><option value="10">moves</option><option value="11"> friend </option><option value="12">video</option></select> </span>. Tye’s <span class="control group1"><select id="q271638_9_p9" class="select custom-select custom-select place9" name="q271638:9_p9"><option value="">选择...</option><option value="1">tiring</option><option value="2">mom</option><option value="3">interviews</option><option value="4">loves</option><option selected="selected" value="5">unusual</option><option value="6">hates</option><option value="7">famous</option><option value="8">punctual</option><option value="9">introduces</option><option value="10">moves</option><option value="11"> friend </option><option value="12">video</option></select> </span> gave him the job.<br></p>';
    const { getFieldDecorator } = this.props.form;
    const getSelect = ({ id, value = '', items = [] }) =>
      (<div>{getFieldDecorator(id, {
        initialValue: value // 初始值
      })(
        <Picker data={items} cols={1}>
          <List.Item arrow="horizontal" wrap>{'请选择答案'}</List.Item>
        </Picker>
      )}
      </div>);
    const getContents = (html) => {
      const selectEls = cheerio('select', html),
        selectDatas = [];
      selectEls.map((index, node) => {
        let selectedValue = '',
          items = node.children.map((child, i) => {
            const { attribs: { selected = '', value = '' }, children = [] } = child;
            if (selected === 'selected') selectedValue = value;
            if (children.length > 0) {
              const label = value === '' ? '请选择' : children[0].data;
              return {
                label,
                value
              };
            }
          });
        selectDatas.push({
          id: node.attribs.id,
          value: selectedValue === '' ? '' : [selectedValue],
          items
        });
      });
      const tags = html.split(/<span[^>]*>.*?<\/span>/),
        getHtml = (text) => ({
          __html: text,
        });
      return tags.map((tag, index) => {
        const result = [];
        result.push(<div dangerouslySetInnerHTML={getHtml(tag.replace(/<[^(br)]>/, ''))} />);
        if (selectDatas.length > index) {
          result.push(getSelect(selectDatas[index]));
        }
        return result;
      });
    };
    return (
      <div className={styles[`${PrefixCls}-outer`]}>
        {getContents(html)}
        <WhiteSpace size="lg" />
        <Button
          type="primary"
          className="am-button-borderfix"
          onClick={this.onSubmit.bind(this)}
        >
          提交
        </Button>
      </div>
    );
  }
}

export default createForm()(Comp);
