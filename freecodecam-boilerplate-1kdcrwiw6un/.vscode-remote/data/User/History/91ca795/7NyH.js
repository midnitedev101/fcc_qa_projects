class SudokuSolver {

  validate(puzzleString) {
    if (puzzleString['puzzle'].length != 81) {
      return false;
    } else if (!puzzleString['puzzle']) {
      
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

