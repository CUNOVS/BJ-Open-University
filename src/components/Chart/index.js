// data-set 可以按需引入，除此之外不要引入别的包
import React from 'react';
import { Chart, Axis, Geom, Coord, Global, Tooltip } from 'bizgoblin';
// 下面的代码会被作为 cdn script 注入 注释勿删
// CDN START

const defs = [{
  dataKey: 'answertext',
  tickCount: 5,
}];

const formatLabel = (text, index, total) => {
  const textCfg = {};
  if (index === 0) {
    textCfg.textAlign = 'left';

  } else if (index === total - 1) {
    textCfg.textAlign = 'right';
  }
  return textCfg;
};

const label = {
  textStyle: {
    fill: '#000', // 文本的颜色
    fontSize: '18px', // 文本大小
  }
};

const getData = (data) => {
  const res = [];
  data.length > 0 && data.map(items => {
      const datas = cnDecode(items);
      if (datas.answertext) {
        res.push({
          answertext: datas.answertext,
          answercount: parseInt(datas.answercount)
        });
      }
    }
  );
  return res;
};

class Charts extends React.Component {
  render () {
    const { name, data } = this.props;
    return (
      <div >
        <div style={{ padding: '0 20px', fontSize: '16px' }} >{name}</div >
        <Chart width="100%" data={getData(data)} defs={defs} pixelRatio={window.devicePixelRatio * 2} >
          <Axis dataKey="answertext" label={label} grid={null} />
          <Axis dataKey="answercount" label={formatLabel} line={null} grid={Global._defaultAxis.grid} />
          <Coord transposed />
          <Tooltip />
          <Geom geom="interval" position="answertext*answercount" />
        </Chart >
      </div >
    );
  }
}

// CDN END
export default Charts;
