// Unit test and function tests based on: https://github.com/SaintPeter/fcc-qa-american-british-trans-refactor/blob/master/tests/2_functional-tests.js
const chai = require('chai');
const chaiHttp = require('chai-http');
const assert = chai.assert;
const server = require('../server.js');

chai.use(chaiHttp);

let Translator = require('../components/translator.js');

suite('Functional Tests', () => {
    test('POST with text and locale fields populated', done => { 
        const text = "Mangoes are my favorite fruit.";
        const locale = 'american-to-british';
        const output = {
          text: text, 
          translation: 'Mangoes are my <span class="highlight">favourite</span> fruit.'
        };
        chai.request(server)
          .post('/api/translate/')
          .send({text, locale})
          .end((err, res) => {
            assert.property(res.body, "text");
            assert.equal(res.body.text, output.text);
            assert.property(res.body, 'translation');
            assert.equal(res.body.translation, output.translation);
            done();
          })
      });

      test('POST with text and invalid locale', done => {
        const text = "Mangoes are my favorite fruit.";
        const locale = 'french-to-english';
        const error = { error: 'Invalid value for locale field' };
        chai.request(server)
          .post('/api/translate/')
          .send({text, locale})
          .end((err, res) => {
            assert.property(res.body, 'error');
            assert.equal(res.body.error, error.error);
            done();
          });
      });
  
      test('POST with missing text field', done => {
        const locale = "american-to-british";
        const error = { error: 'Required field(s) missing' }
        chai.request(server)
          .post('/api/translate')
          .send({locale})
          .end((err, res) => {
            assert.property(res.body, 'error');
            assert.equal(res.body.error, error.error);
            done();
          });
      });
      
      test('POST with missing locale field', done => {
        const text = "freeCodeCamp rocks!";
        const error = { error: 'Required field(s) missing' }
        chai.request(server)
          .post('/api/translate')
          .send({text})
          .end((err, res) => {
            assert.property(res.body, 'error');
            assert.equal(res.body.error, error.error);
            done();
          })
        
      });
      
      test('POST with missing text', done => {
        const text = "";
        const locale = "american-to-british";
        const error = { error: 'No text to translate' }
        
        chai.request(server)
          .post('/api/translate')
          .send({text, locale})
          .end((err, res) => {
            assert.property(res.body, 'error');
            assert.equal(res.body.error, error.error);
            done();
          });
      });
  
      test('POST with text that needs no translation', done => {
        const text = "John Desmarc is bald.";
        const locale = "british-to-american"
        const output = {
          text: text, 
          translation: "Everything looks good to me!"
          }
        chai.request(server)
          .post('/api/translate')
          .send({text, locale})
          .end((err, res) => {
            assert.property(res.body, 'text');
            assert.property(res.body, 'translation');
            assert.equal(res.body.text, output.text);
            assert.equal(res.body.translation, output.translation);
            done();
          })
      });
});
