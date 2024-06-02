class SudokuSolver {

  validate(puzzleString) {
    if (puzzleString['puzzle'].length != 81) {
      return { error: 'Expected puzzle to be 81 characters long' };
    } else if (!puzzleString['puzzle']) {
      echo "hiya"
      return { error: 'Required field missing' };
    }
    return true;
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

