'use strict';

const SudokuSolver = require('../controllers/sudoku-solver.js');

module.exports = function (app) {
  
  let solver = new SudokuSolver();

  app.route('/api/check')
    .post((req, res) => {

    });
    
  app.route('/api/solve')
    .post((req, res) => {
      const puzzle = req.body;
      const solver = new SudokuSolver;
      const validated = solver.validate(puzzle);
      if (!validated) {
        console.log({ error: 'Expected puzzle to be 81 characters long' })
        return res.json(validated)
        
      } else {

      }
    });
};