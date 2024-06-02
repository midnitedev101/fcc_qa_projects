class SudokuSolver {

  validate(puzzleString) {
    const allowedChars = /[^\d.]/g
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
    row_hashmap = {}
  }

  checkColPlacement(puzzleString, row, column, value) {
    col_hashmap = {}
  }

  checkRegionPlacement(puzzleString, row, column, value) {
    
  }

  solve(puzzleString) {
    
  }
}

module.exports = SudokuSolver;
