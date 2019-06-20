import React from 'react';
import { choiceQuestion } from 'utils/analysis';
import { Loader } from 'components';

class Examination extends React.Component {
  constructor (props) {
    super(props);

  }

  componentWillMount () {

  }

  componentDidMount () {

  }

  render () {
    return (
      <div>
        {choiceQuestion('<div id="q1" class="que multichoice deferredfeedback notyetanswered"><div class="info"><h3 class="no">题目<span class="qno">1</span></h3><div class="state">还未回答</div><div class="grade">满分5.00</div><div class="questionflag editable" aria-atomic="true" aria-relevant="text" aria-live="assertive"><input type="hidden" name="q116:1_:flagged" value="0" /><input type="checkbox" id="q116:1_:flaggedcheckbox" name="q116:1_:flagged" value="1" /><input type="hidden" value="qaid=153&qubaid=116&qid=13&slot=1&checksum=3706f3e5adb06f3700dbb6f2d7462c3b&sesskey=OmK6i8ICtM&newstate=" class="questionflagpostdata" /><label id="q116:1_:flaggedlabel" for="q116:1_:flaggedcheckbox"><img src="http://192.168.0.203/moodle/theme/image.php/boost/core/1532507171/i/unflagged" alt="未标记" id="q116:1_:flaggedimg" /></label>\n' +
          '</div></div><div class="content"><div class="formulation clearfix"><h4 class="accesshide">题干</h4><input type="hidden" name="q116:1_:sequencecheck" value="1" /><div class="qtext"><p>选择题<br></p></div><div class="ablock"><div class="prompt">选择一项：</div><div class="answer"><div class="r0"><input type="radio" name="q116:1_answer" value="0" id="q116:1_answer0" /><label for="q116:1_answer0" class="m-l-1"><span class="answernumber">a. </span>3</label> </div>\n' +
          '<div class="r1"><input type="radio" name="q116:1_answer" value="1" id="q116:1_answer1" /><label for="q116:1_answer1" class="m-l-1"><span class="answernumber">b. </span>5</label> </div>\n' +
          '<div class="r0"><input type="radio" name="q116:1_answer" value="2" id="q116:1_answer2" /><label for="q116:1_answer2" class="m-l-1"><span class="answernumber">c. </span>1</label> </div>\n' +
          '</div></div></div></div></div>')}
      </div>
    );
  }
}

export default Examination;
