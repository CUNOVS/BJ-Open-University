const cheerio = require('cheerio');


module.exports = {

  getQuizInfo: (html) => {
    const $ = cheerio.load(html);
    const obj = {};
    obj.title = `${$('.no')
      .text()}`;
    obj.state = `${$('.state')
      .text()}`;
    obj.grade = `${$('.grade')
      .text()}`;
    obj.qtext = `${$('.qtext')
      .text()}`;
    obj.prompt = `${$('.prompt')
      .text()}`;

    return obj;
  },

  choiceQuestion: (html) => {
    const $ = cheerio.load(html);
    let items = [];
    if ($('.answer input[type="radio"]').length > 0) {
      $('.answer> div')
        .each((index, element) => {
          let answer = $('.answer label')
            .eq(index)
            .text();
          items.push({
            label: answer,
            value: $('.answer input[type="radio"]')
              .eq(index)
              .val(),
            checked: $('.answer input[type="radio"]')
              .eq(index)
              .prop('checked'),
            type: 'radio',
          });
        });
    } else if ($('.answer input[type="checkbox"]').length > 0) {
      $('.answer> div')
        .each((index, element) => {
          let answer = $('.answer label')
            .eq(index)
            .text();
          items.push({
            label: answer,
            value: $('.answer input[type="checkbox"]')
              .eq(index)
              .val(),
            checked: $('.answer input[type="checkbox"]')
              .eq(index)
              .prop('checked'),
            type: 'checkbox',
          });
        });
    }
    return items;
  },

  matchQuestion: (html) => {
    const $ = cheerio.load(html);
    let items = [],
      answer = [];
    $('.answer tbody >tr')
      .each((index, ele) => {

        $('.answer select')
          .eq(index)
          .children('option')
          .each((index, ele) => {
            answer.push({
              label: $('.answer select')
                .find('option')
                .eq(index)
                .text(),
              value: $('.answer select')
                .find('option')
                .eq(index)
                .val(),
            });
            console.log(answer)
          });
        items.push({
          question: $('.text')
            .eq(index)
            .text(),
          answer,

        });
      });
    console.log(items);
    return items;
  },

};
