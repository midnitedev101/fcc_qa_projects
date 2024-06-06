'use strict';

const Translator = require('../components/translator.js');

module.exports = function (app) {
  
  const translator = new Translator();

  app.route('/api/translate')
    .post((req, res) => {
      const {text,locale} = req.body;
      console.log(text, locale);
      if (!text) {
        return { error: 'No text to translate' };
      }
      if (!locale || locale !== 'american-to-british' || locale !== 'british-to-american') {
        return { error: 'Invalid value for locale field' };
      }
    });
};
