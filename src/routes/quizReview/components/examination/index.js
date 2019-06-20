import React from 'react';
import { Card, WhiteSpace } from 'components';
import Choose from 'components/quizType/choose';
import Essay from 'components/quizType/essay';
import Match from 'components/quizType/match';
import Multianswer from 'components/quizType/multianswer';
import ShortAnswer from 'components/quizType/shortanswer';
import Gapselect from 'components/quizType/gapselect';
import styles from './index.less';

class Examination extends React.Component {
  constructor (props) {
    super(props);

  }

  componentWillMount () {

  }

  componentDidMount () {

  }

  getQuestion = (item) => {
    if (item.type === 'truefalse' || item.type === 'multichoice') {
      return <Choose answer={item.choose} type="review" />;
    } else if (item.type === 'essay') {
      return <Essay answer={item.choose} type="review" />;
    } else if (item.type === 'shortanswer') {
      return <ShortAnswer answer={item.choose} type="review" />;
    } else if (item.type === 'match') {
      return <Match answer={item.choose} type="review" />;
    } else if (item.type === 'multianswer') {
      return <Multianswer answer={item.html} type="review" />;
    } else if (item.type === 'gapselect') {
      return <Gapselect answer={item.html} type="review" />;
    }
  };

  render () {
    const { questions } = this.props;
    return (
      <div >
        {
          questions.map((item, i) => {
            const { title = '', state = '', grade = '', qtext = '', prompt = '' } = item.info;
            return (
              <Card key={i} className={styles.gard} >
                <Card.Header
                  title={title}
                  extra={
                    <div className={styles.state} >
                      <span >{state}</span >
                      <span >{grade}</span >
                    </div >
                  }
                />
                <Card.Body >
                  {item.type !== 'gapselect' && <div className={styles.question} >{qtext}</div >}
                  <div className={styles.prompt} >{prompt}</div >
                  <WhiteSpace size="lg" />
                  {this.getQuestion(item)}
                </Card.Body >
              </Card >
            );
          })
        }
      </div >
    );
  }
}

export default Examination;
