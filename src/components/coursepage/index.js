import React from 'react';
import PropTypes from 'prop-types';
import Nav from '../nav';
import { WhiteSpace } from 'components';
import { getTitle } from 'utils';
import { handleElementTagAClick, handlerDivInnerHTMLClick } from 'utils/commonevents';
import WxImageViewer from 'react-wx-images-viewer';
import styles from './index.less';

const PrefixCls = 'page';

class CoursePage extends React.Component {
  constructor (props) {
    super(props);
  }

  componentWillMount () {
    document.documentElement.scrollTop = document.body.scrollTop = 0;
  }

  componentWillUnmount () {

  }

  render () {
    const { propDatas, dispatch, pathname } = this.props;
    const { data: { content = '', cm = {}, name: pageName = '加载中...' }, isOpen = false, viewImages = [], viewImageIndex = -1, queryName = '' } = propDatas,
      { course: courseId = '' } = cm,
      getContents = () => {
        return {
          __html: content,
        };
      },
      handleDivClick = (e) => {
        if (e.target.tagName === 'IMG') {
          let src = e.target.src,
            curImageIndex = -1;
          if (src) {
            if ((curImageIndex = viewImages.indexOf(src)) !== -1) {
              dispatch({
                type: `${pathname}/updateState`,
                payload: {
                  isOpen: true,
                  viewImageIndex: curImageIndex,
                },
              });
            } else if (e.target.parentElement.tagName === 'A') {
              handleElementTagAClick(e.target.parentElement, courseId, dispatch);
            }
          }
        } else {
          handlerDivInnerHTMLClick(e, courseId, dispatch);
        }
      },
      onClose = () => {
        dispatch({
          type: `${pathname}/updateState`,
          payload: {
            isOpen: false,
          },
        });
      };

    return (

      <div>
        <Nav title={getTitle(queryName || pageName)} dispatch={dispatch}/>
        <div className={styles[`${PrefixCls}-outer`]}>
          <div className={styles[`${PrefixCls}-outer-title`]}>
            {queryName || pageName}
          </div>
          <WhiteSpace size="sm"/>
          <div className={styles[`${PrefixCls}-outer-content`]}>
            <div dangerouslySetInnerHTML={getContents()} onClick={handleDivClick}/>
          </div>
        </div>
        {
          isOpen && viewImageIndex !== -1 ?
            <WxImageViewer onClose={onClose} urls={viewImages} index={viewImageIndex}/> : ''
        }
      </div>
    );
  }
}

CoursePage.propTypes = {
  dispatch: PropTypes.func.isRequired,
  propDatas: PropTypes.object.isRequired,
  pathname: PropTypes.string.isRequired,
};

export default CoursePage;
