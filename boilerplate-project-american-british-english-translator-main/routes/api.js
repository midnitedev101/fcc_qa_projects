'use strict';

const Translator = require('../components/translator.js');

module.exports = function (app) {
  
  const translator = new Translator();

  app.route('/api/translate')
    .post((req, res) => {
      // console.log('\x1b[36m%s\x1b[0m', text, locale);
      if (!(req.body).hasOwnProperty('locale') || !(req.body).hasOwnProperty('text')) {
        return res.json({ error: 'Required field(s) missing' });
      } else {
        const {text,locale} = req.body;
        if (text.length == 0) {
          // console.log("no text");
          return res.json({ error: 'No text to translate' });
        }
        else if (locale == 'american-to-british' || locale == 'british-to-american') {
          // console.log(translator.dictionaryLookup(locale, text));
          return res.json({ text: text, translation: translator.dictionaryLookup(locale, text) });
        }
        else {
          return res.json({ error: 'Invalid value for locale field' });
        }
        
      }
    });
};
