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
      if (validated != true) {
        console.log("unvalidated");
        return res.json(validated)
      } else {
        console.log("validated");
        return res.json({test:'E'})
      }
    });
};
