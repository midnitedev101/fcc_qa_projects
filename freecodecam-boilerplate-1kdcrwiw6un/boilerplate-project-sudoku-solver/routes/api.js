'use strict';

const SudokuSolver = require('../controllers/sudoku-solver.js');

module.exports = function (app) {
  
  let solver = new SudokuSolver();

  app.route('/api/check')
    .post((req, res) => {
      // console.log(req.body);
      console.log("Check it")
      const {puzzle, coordinate, value} = req.body;
      console.log(puzzle, coordinate, value);
      const row = coordinate.split("")[0];
      const col = coordinate.split("")[1];
      let board = [];
      puzzle.match(/.{1,9}/g).forEach((m) => board.push(m.split("")));  // Split string into array of equal lengths (9 chars)
      // console.log(board);
      const row_legend = ["A","B","C","D","E","F","G","H","I"];
      const col_legend = ["1","2","3","4","5","6","7","8","9"];
      const row_index = row_legend.findIndex((row_val) => row == row_val);
      const col_index = col_legend.findIndex((col_val) => col == col_val);
      // console.log(solver.checkRowPlacement(board,row_index,value));
      // console.log(solver.checkColPlacement(board,col_index,value));
      // console.log(solver.checkRegionPlacement(board,row_index,col,value));
      const row_conflict = solver.checkRowPlacement(board,row_index,value);
      const col_conflict = solver.checkColPlacement(board,col_index,value);
      const region_conflict = solver.checkRegionPlacement(board,row_index,col_index,value);
      if (!row_conflict || !col_conflict || !region_conflict)
      {
        let conflict_string = [];
        if (!row_conflict) conflict_string.push("row");
        if (!col_conflict) conflict_string.push("column");
        if (!region_conflict) conflict_string.push("region");
        return res.json({ valid: false, conflict: conflict_string });
      } 
      else if (/[^\d.]/g.test(puzzle)) {
        return res.json({ error: 'Invalid characters in puzzle' });
      }
      else if (puzzle.length != 81) {
        return res.json({ error: 'Expected puzzle to be 81 characters long' });
      }
      else if (!puzzle || !coordinate || !value) {
        return res.json({ error: 'Required field(s) missing' });
      }
      else if (!/[A-I]/g.test(row) || !/[0-9]/g.test(col)) {
        return res.json({ error: 'Invalid coordinate'});
      }
      else if (Number(value) < 1 || Number(value) > 9) {
        return res.json({ error: 'Invalid value' });
      }
      else {
        return res.json({ valid: true });
      }
    });
    
  app.route('/api/solve')
    .post((req, res) => {
      const puzzle = req.body;
      // const solver = new SudokuSolver;
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
          // console.log(solved);
          return res.json({ error: 'Puzzle cannot be solved' });
        } else {
          // console.log("Puzzle is now solved")
          // console.log(solved);
          return res.json({ solution: solved });
        }
      }
    });
};
