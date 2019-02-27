/* global window */

import React from 'react';
import { Carousel } from 'antd-mobile';
import styles from './index.less';

const PrefixCls = 'banner';

class Banner extends React.Component {
  state = {
    data: [],
    slideIndex: 0,
    isLoad: false,
  };
  
  componentWillMount () {
  
  }
  
  render () {
    const { slideIndex } = this.state,
      bannerDatas = this.props.bannerDatas;
    return (
      <div className={styles[`${PrefixCls}-outer`]} style={{ clear: 'both' }}>
        <Carousel
          className="space-carousel"
          selectedIndex={slideIndex}
          autoplayInterval={5000}
          autoplay
          infinite
          dotStyle={{
            background: '#fff',
            opacity: '0.5',
            width: '12px',
            height: '2px',
            borderRadius: '0',
          }}
          dotActiveStyle={{
            background: '#fff',
            width: '12px',
            height: '2px',
            borderRadius: '0',
          }}
        >
          {bannerDatas && bannerDatas.map((data, i) => (
            <div
              className={styles[`${PrefixCls}-image`]}
              key={`a_${i}`}
              onClick={this.props.handleClick.bind(null, data)}
            >
              <img
                ref={el => this.banner = el}
                src={data}
                alt=""
                style={{ width: '100%', verticalAlign: 'top' }}
                onLoad={() => {
                  if (!this.state.isLoad) {
                    this.setState({
                      isLoad: true,
                    });
                    window.dispatchEvent(new Event('resize'));
                  }
                }}
              />
            </div>
          ))}
        </Carousel>
      </div>
    );
  }
}

export default Banner;
