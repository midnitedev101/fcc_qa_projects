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
      if (!validated['success']) {  // validation failed
        console.log("unvalidated");
        return res.json(validated)
      } else {  // validation was a success, proceed to solve sudoku puzzle
        // console.log("validated");
        // console.log(validated);
        // res.json(validated);
        const solved = solver.solve(puzzle)
        if (!solved) {
          return res.json({ error: 'Puzzle cannot be solved' });
        } else {
          return res.json({ solution: solved });
        }
      }
    });
};
