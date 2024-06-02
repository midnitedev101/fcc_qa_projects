class SudokuSolver {

  validate(puzzleString) {
    if (puzzleString['puzzle'].length == 0) {
      return { error: 'Required field missing' };
    } else if (puzzleString['puzzle'].length != 81) {
      return { error: 'Expected puzzle to be 81 characters long' };
    } else if (puzzleString['puzzle'].includes('1')) {
      return { error: 'Expected puzzle to be 81 characters long' };
    } else {
      return true;
    }
  }

  checkRowPlacement(puzzleString, row, column, value) {

  }

  checkColPlacement(puzzleString, row, column, value) {

  }

  checkRegionPlacement(puzzleString, row, column, value) {

  }

  solve(puzzleString) {
    
  }
}

module.exports = SudokuSolver;

