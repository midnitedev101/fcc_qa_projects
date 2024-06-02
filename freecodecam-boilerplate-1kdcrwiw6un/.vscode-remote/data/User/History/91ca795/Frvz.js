class SudokuSolver {

  validate(puzzleString) {
    const allowedChars = new RegExp("^[0-9.]$")
    if (puzzleString['puzzle'].length == 0) {
      return { error: 'Required field missing' };
    } else if (allowedChars.test(puzzleString['puzzle'])) {
      return { error: 'Invalid characters in puzzle' };
    } else if (puzzleString['puzzle'].length != 81) {
      return { error: 'Expected puzzle to be 81 characters long' };
    } else {
      return { success: 'Puzzle passes validation'};
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

