import React from 'react';
import { connect } from 'dva';
import { Loader, Card, List, Radio, Checkbox, Button, WhiteSpace, WingBlank } from 'components';
import Choose from './component/choose';
import Essay from './component/essay';
import Match from './component/match';
import ShortAnswer from './component/shortanswer';
import styles from './index.less';


@connect(({ quizDetails, loading }) => ({ // babel装饰器语法糖
  quizDetails,
  loading,
}))

class Examination extends React.Component {
  constructor (props) {
    super(props);
    this.state = {};

  }

  componentWillMount () {

  }

  componentDidMount () {

  }

  getQuestion = (obj) => {
    if (obj.type === 'choose') {
      return <Choose answer={obj.item} />;
    } else if (obj.type === 'essay') {
      return <Essay />;
    } else if (obj.type === 'shortanswer') {
      return <ShortAnswer />;
    } else if (obj.type === 'match') {
      return <Match answer={obj.item} />;
    }
  };

  getButton = (questions) => {
    return (
      <div>
        {
          questions.length > 0 && questions[0].slot === 1
            ?
            <WingBlank> <Button type="primary">下一步</Button></WingBlank>
            :
            <div className={styles.button}>
              <Button type="primary" inline>上一步</Button>
              <Button type="primary" inline>下一步</Button>
            </div>
        }
      </div>
    );
  };

  render () {

    const { data: { questions = [] }, info: { title, state, grade, qtext, prompt }, answer = {} } = this.props.quizDetails;
    return (
      <div>
        <Card>
          <Card.Header
            title={title}
            extra={
              <div className={styles.state}>
                <span>{state}</span>
                <span>{grade}</span>
              </div>
            }
          />
          <Card.Body>
            <div className={styles.question}>{qtext}</div>
            <div className={styles.prompt}>{prompt}</div>
            <WhiteSpace size="lg" />
            {this.getQuestion(answer)}
          </Card.Body>
        </Card>
        <WhiteSpace size="lg" />
        <WhiteSpace size="lg" />
        <WhiteSpace size="lg" />
        {this.getButton(questions)}
      </div>
    );
  }
}

export default Examination;
