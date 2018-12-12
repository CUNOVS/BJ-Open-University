import modelExtend from 'dva-model-extend';
import { model } from 'models/common';

const head = {
  images: require('../themes/images/banner/banner1.png'),
  head: '题目',
  conect: '内容',
  date: '2018-11-16',
};
const concent = '<div class="lemma-summary" label-module="lemmaSummary">\n' +
  '<div class="para" label-module="para">泰勒·斯威夫特（Taylor Swift），1989年12月13日出生于美国<a target="_blank" href="/item/%E5%AE%BE%E5%A4%95%E6%B3%95%E5%B0%BC%E4%BA%9A%E5%B7%9E">宾夕法尼亚州</a>，<a target="_blank" href="/item/%E7%BE%8E%E5%9B%BD%E6%B5%81%E8%A1%8C%E9%9F%B3%E4%B9%90/12232873" data-lemmaid="12232873">美国流行音乐</a>、<a target="_blank" href="/item/%E4%B9%A1%E6%9D%91%E9%9F%B3%E4%B9%90/215469" data-lemmaid="215469">乡村音乐</a>创作型女歌手、音乐制作人、演员、慈善家。</div><div class="para" label-module="para">2006年发行首张录音室专辑《<a target="_blank" href="/item/%E6%B3%B0%E5%8B%92%C2%B7%E6%96%AF%E5%A8%81%E5%A4%AB%E7%89%B9/15286494" data-lemmaid="15286494">泰勒·斯威夫特</a>》，获<a target="_blank" href="/item/%E7%BE%8E%E5%9B%BD%E5%94%B1%E7%89%87%E4%B8%9A%E5%8D%8F%E4%BC%9A/3985669" data-lemmaid="3985669">美国唱片业协会</a>认证5倍白金唱片<sup class="sup--normal" data-sup="1">\n' +
  '[1]</sup><a class="sup-anchor" name="ref_[1]_15203161">&nbsp;</a>\n' +
  '。2008年发行第二张录音室专辑《<a target="_blank" href="/item/Fearless/155066" data-lemmaid="155066">Fearless</a>》，在美国<a target="_blank" href="/item/%E5%85%AC%E5%91%8A%E7%89%8C/2170154" data-lemmaid="2170154">公告牌</a>专辑榜上获11周冠军，是2009年全美最畅销专辑，认证7倍白金唱片<sup class="sup--normal" data-sup="2">\n' +
  '[2]</sup><a class="sup-anchor" name="ref_[2]_15203161">&nbsp;</a>\n' +
  '，专辑获<a target="_blank" href="/item/%E7%AC%AC52%E5%B1%8A%E6%A0%BC%E8%8E%B1%E7%BE%8E%E5%A5%96/12813907" data-lemmaid="12813907">第52届格莱美奖</a>年度专辑，使泰勒成为获此奖项的最年轻歌手， <sup class="sup--normal" data-sup="3">\n' +
  '[3]</sup><a class="sup-anchor" name="ref_[3]_15203161">&nbsp;</a>\n' +
  '也是获奖最多的乡村音乐专辑<sup class="sup--normal" data-sup="4">\n' +
  '[4]</sup><a class="sup-anchor" name="ref_[4]_15203161">&nbsp;</a>\n' +
  '。</div><div class="para" label-module="para">2010年发行第三张录音室专辑《<a target="_blank" href="/item/Speak%20Now">Speak Now</a>》，单曲《<a target="_blank" href="/item/Mean">Mean</a>》获2座格莱美奖。同年获<a target="_blank" href="/item/%E5%88%9B%E4%BD%9C%E4%BA%BA%E5%90%8D%E4%BA%BA%E5%A0%82/6013209" data-lemmaid="6013209">创作人名人堂</a>哈尔·戴维星光奖<sup class="sup--normal" data-sup="5">\n' +
  '[5]</sup><a class="sup-anchor" name="ref_[5]_15203161">&nbsp;</a>\n' +
  '。2012年发行第四张录音室专辑《<a target="_blank" href="/item/Red">Red</a>》<sup class="sup--normal" data-sup="6">\n' +
  '[6]</sup><a class="sup-anchor" name="ref_[6]_15203161">&nbsp;</a>\n' +
  '。2013年11月获第47届<a target="_blank" href="/item/%E4%B9%A1%E6%9D%91%E9%9F%B3%E4%B9%90%E5%8D%8F%E4%BC%9A%E5%A5%96/16835063" data-lemmaid="16835063">乡村音乐协会奖</a>巅峰奖 <sup class="sup--normal" data-sup="7">\n' +
  '[7]</sup><a class="sup-anchor" name="ref_[7]_15203161">&nbsp;</a>\n' +
  '。2014年发行第五张专辑《<a target="_blank" href="/item/1989">1989</a>》<sup class="sup--normal" data-sup="8">\n' +
  '[8]</sup><a class="sup-anchor" name="ref_[8]_15203161">&nbsp;</a>\n' +
  '，发行首周在美国售出128.7万张为近12年最高纪录，专辑也是2014年全美最畅销专辑<sup class="sup--normal" data-sup="9">\n' +
  '[9]</sup><a class="sup-anchor" name="ref_[9]_15203161">&nbsp;</a>\n' +
  '，在全球售出超过1000万张<sup class="sup--normal" data-sup="10">\n' +
  '[10]</sup><a class="sup-anchor" name="ref_[10]_15203161">&nbsp;</a>\n' +
  '。专辑获<a target="_blank" href="/item/%E7%AC%AC58%E5%B1%8A%E6%A0%BC%E8%8E%B1%E7%BE%8E%E5%A5%96/19030486" data-lemmaid="19030486">第58届格莱美奖</a>年度专辑，使泰勒成为格莱美首位两次获得此奖项的女歌手；同年11月获<a target="_blank" href="/item/%E7%AC%AC42%E5%B1%8A%E5%85%A8%E7%BE%8E%E9%9F%B3%E4%B9%90%E5%A5%96/16199223" data-lemmaid="16199223">第42届全美音乐奖</a>迪克·克拉克成就奖<sup class="sup--normal" data-sup="11">\n' +
  '[11]</sup><a class="sup-anchor" name="ref_[11]_15203161">&nbsp;</a>\n' +
  '；12月入围《<a target="_blank" href="/item/%E6%97%B6%E4%BB%A3/1944848" data-lemmaid="1944848">时代</a>》年度人物<sup class="sup--normal" data-sup="12">\n' +
  '[12]</sup><a class="sup-anchor" name="ref_[12]_15203161">&nbsp;</a>\n' +
  '。</div><div class="para" label-module="para">2015年4月获第50届<a target="_blank" href="/item/%E4%B9%A1%E6%9D%91%E9%9F%B3%E4%B9%90%E5%AD%A6%E9%99%A2%E5%A5%96/3801059" data-lemmaid="3801059">乡村音乐学院奖</a>50周年里程碑奖<sup class="sup--normal" data-sup="13-14">\n' +
  '[13-14]</sup><a class="sup-anchor" name="ref_[13-14]_15203161">&nbsp;</a>\n' +
  '；5月，成为<a target="_blank" href="/item/2015%E7%A6%8F%E5%B8%83%E6%96%AF%E5%85%A8%E7%90%83%E6%9D%83%E5%8A%BF%E5%A5%B3%E6%80%A7%E6%A6%9C/17627343" data-lemmaid="17627343">2015福布斯全球权势女性榜</a>上榜最年轻女性<sup class="sup--normal" data-sup="15-17">\n' +
  '[15-17]</sup><a class="sup-anchor" name="ref_[15-17]_15203161">&nbsp;</a>\n' +
  '。2016年登顶《福布斯》全球百大名人榜榜首<sup class="sup--normal" data-sup="18">\n' +
  '[18]</sup><a class="sup-anchor" name="ref_[18]_15203161">&nbsp;</a>\n' +
  '。</div><div class="para" label-module="para">2017年发行第六张录音室专辑《<a target="_blank" href="/item/reputation/22093111" data-lemmaid="22093111">reputation</a>》，美国首周销量123.8万张，使她成为唯一一位拥有四张首周百万销量专辑的歌手<sup class="sup--normal" data-sup="19">\n' +
  '[19]</sup><a class="sup-anchor" name="ref_[19]_15203161">&nbsp;</a>\n' +
  '。同年被《时代周刊》选为年度人物<sup class="sup--normal" data-sup="20">\n' +
  '[20]</sup><a class="sup-anchor" name="ref_[20]_15203161">&nbsp;</a>\n' +
  '。</div>\n' +
  '</div>';

const defualtComments = [
  {
    userPhoto: 'https://ss2.baidu.com/6ONYsjip0QIZ8tyhnq/it/u=625620857,52644579&fm=173&app=25&f=JPEG?w=353&h=360&s=F7B5E46C4EA09766006CEC13030050CB',
    name: '李云龙',
    date: '2018.10.29',
    contents: '二营长把老子的意大利炮扛出来',
    items: [{
      userPhoto: 'http://dingyue.nosdn.127.net/mAw6jpJ9OXrM5gVXbTixHR5WvVIuNL00Qi5ydtqPFe6Jz1539050129689.jpeg',
      name: '二营长',
      rname: '李云龙',
      date: '2018.10.30',
      contents: '报告团长只剩炊事班的意大利面了',
      id: '1',
    }],
    id: '1',
  },
  {
    userPhoto: '',
    name: '缝小肛',
    date: '2018.10.29',
    contents: '我学了一节课，考上了清华你们呢？',
    items: [],
    id: '2',
    num: 0,
  },
];

export default modelExtend(model, {
  namespace: 'noticedetails',
  state: {
    currentComments: [],
    head: {},
    concent: '',
  },
  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen(({ pathname, action, query }) => {
        if (pathname === `/noticedetails`) {
          dispatch({
            type: 'query',
          });
        }
      });
    },
  },
  effects: {
    * query ({ payload }, { call, put, select }) {
      yield put({
        type: 'updateState',
        payload: {
          currentComments: defualtComments,
          head: head,
          concent: concent,
        },
      });
    },
  },
});
