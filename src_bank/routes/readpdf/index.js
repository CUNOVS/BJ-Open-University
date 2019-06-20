/**
 * @author Lowkey
 * @date 2018/11/26 11:31:59
 * @Description:
 */
import React from 'react';
import PropTypes from 'prop-types';
import Nav from 'components/nav';
import { getLocalIcon } from 'utils';
import Loader from 'components/Loader';
import { connect } from 'dva';
import { WhiteSpace, WingBlank, Slider, Icon } from 'components';
import { Document, Page } from 'react-pdf/dist/entry.webpack';
import styles from './index.less';

const PrefixCls = 'readpdf';

class ReadPdf extends React.Component {
  constructor (props) {
    super(props);
  }

  state = {
    numPages: null,
    pageNumber: 1,
    isPageNumShow: false,
    scale: 1,
  };

  componentWillMount () {
    clearTimeout(this.timer);
  }

  componentDidMount () {

  }

  onDocumentLoadSuccess = ({ numPages }) => {
    this.setState({ numPages });
  };
  handlerTouchStart = () => {
    clearTimeout(this.timer);
    if (!this.state.isPageNumShow) {
      this.setState({
        isPageNumShow: true,
      });
    }
  };
  handlerTouchEnd = () => {
    this.timer = setTimeout(() => {
      this.setState({
        isPageNumShow: false,
      });
    }, 2000);
  };
  onScale = (num) => {
    this.setState({
      scale: num,
    });
  };
  handlerScaleDown = () => {
    this.setState({
      scale: Math.max(1, this.state.scale -= 0.5),
    });
  };
  handlerScaleUp = () => {
    this.setState({
      scale: Math.min(2.5, this.state.scale += 0.5),
    });
    console.log(this.state.scale);
  };

  render () {
    const { name = '' } = this.props.location.query;
    const { pageNumber, numPages } = this.state;
    return (
      <div className={styles[`${PrefixCls}-container`]}
        onTouchStart={this.handlerTouchStart}
        onTouchEnd={this.handlerTouchEnd}
      >
        <Nav title={name} hasShadow dispatch={this.props.dispatch} />
        <div style={{ display: this.state.isPageNumShow ? 'block' : 'none' }}>
          <div className={styles[`${PrefixCls}-silder-box`]}>
            <div className={styles[`${PrefixCls}-font-small`]} onClick={this.handlerScaleDown}>
              <Icon size="md" type={getLocalIcon('/buttons/scaledown.svg')} color="#fff" />
            </div>
            <div className={styles[`${PrefixCls}-font-big`]} onClick={this.handlerScaleUp}>
              <Icon size="md" type={getLocalIcon('/buttons/scaleup.svg')} color="#fff" />
            </div>
          </div>
        </div>
        <div className={styles[`${PrefixCls}-pdfcontent`]}>
          <Document
            file={require('./default.pdf')}
            loading={<Loader spinning />}
            onLoadSuccess={this.onDocumentLoadSuccess}
          >
            {Array.from(
              new Array(numPages),
              (el, index) => (
                <div className={styles[`${PrefixCls}-item`]}>
                  <Page
                    className={styles[`${PrefixCls}-page`]}
                    width={document.body.clientWidth * this.state.scale}
                    loading=""
                    pageNumber={pageNumber}
                  />
                  <WhiteSpace />
                  <p
                    className={styles[`${PrefixCls}-pageNum`]}
                    style={{ display: this.state.isPageNumShow ? 'block' : 'none' }}
                  >
                    {index + 1}/{numPages}
                  </p>
                </div>
              ),
            )}
          </Document>
        </div>
      </div>
    );
  }
}

ReadPdf.defaultProps = {};
ReadPdf.propTypes = {};

export default connect(({ readpdf }) => ({
  readpdf,
}))(ReadPdf);
