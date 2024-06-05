// Backtracking algorithm inspiration: https://www.geeksforgeeks.org/sudoku-backtracking-7/ and https://www.youtube.com/watch?v=6XDcvG2ZCRc
// Unit testing solutions based on: https://github.com/peterfknparker/boilerplate-project-sudoku-solver/blob/master/tests/2_functional-tests.js and https://www.youtube.com/watch?v=6XDcvG2ZCRc
// Test Hints: https://github.com/freeCodeCamp/freeCodeCamp/blob/main/curriculum/challenges/english/06-quality-assurance/quality-assurance-projects/sudoku-solver.md
class SudokuSolver {

  constructor() {
    this.allowedChars = /[^1-9.]/g
    // this.initialCheck = false
  }
  validate(puzzleString) {
    // console.log("begin validation");
    // const allowedChars = /[^\d.]/g
    // if (puzzleString['puzzle'].length == 0 || !puzzleString['puzzle']) {
    if (!puzzleString['puzzle']) {
      return { error: 'Required field missing' };
    } else if (this.allowedChars.test(puzzleString['puzzle'])) {
      return { error: 'Invalid characters in puzzle' };
    } else if (puzzleString['puzzle'].length != 81) {
      // console.log(JSON.stringify({ error: 'Expected puzzle to be 81 characters long' }));
      return { error: 'Expected puzzle to be 81 characters long' };
    } else {
      // return { success: 'Puzzle passes validation'};
      // console.log("true");
      // return true;
      return { valid: true };
    }
  }

  // checkRowPlacement(puzzleString, row, column, value) {
    checkRowPlacement(board, row, value) {
    // Row has the unique (row-clash)
    // console.log("Row check about to start.");
    // console.log(row, value);
    // console.log(this.allowedChars, value);
    // if (!this.allowedChars.test(value)) {
    //   return false;
    // }
    for(let d = 0; d < 9; d++)
    {
          
        // Check if the number we are trying to
        // place is already present in
        // that row, return false;
        if (board[row][d] == value)
        {
          // console.log("Row placement is invalid.");
          // console.log(board);
          return false;
        }
    }
    // console.log("Row placement is valid.");
    return true;
  }

  checkColPlacement(board, col, value) {
    // Column has the unique numbers (column-clash)
    // if (!this.allowedChars.test(value)) {
    //   return false;
    // }
    // console.log("Column check about to start.");
    // console.log(col, value);
    for(let r = 0; r < 9; r++)
      {
            
          // Check if the number
          // we are trying to
          // place is already present in
          // that column, return false;
          if (board[r][col] == value)
          {
            // console.log("Column placement is invalid.");
            // console.log(r, col, board[r][col], value);
              return false;
          }
      }
      // console.log("Column placement is valid.");
      return true;
  }

  checkRegionPlacement(board, row, col, value) {
    // console.log("Region check about to start.");
    let sqrt = Math.floor(Math.sqrt(board.length));
    // console.log("sqrt: ", sqrt)
    // console.log(sqrt, row, col, value);
    let startRow = row - row % sqrt;
    // console.log("startRow: ", startRow)
    let startCol = col - col % sqrt;
    // console.log("startCol: ", startCol)

    // if (!this.allowedChars.test(value)) {
    //   return false;
    // }

    for(let r = startRow; r < startRow + sqrt; r++)
    {
      for(let d = startCol;
              d < startCol + sqrt; d++)
      {
          if (board[r][d] == value)
          {
            // console.log("Region placement is invalid.", r, d, board[r][d]);
            return false;
          }
      }
    }
    // console.log("Region placement is valid.");
    return true;
  }

  solve(puzzleString) {
    // console.log(puzzleString);
    // console.log("Puzzle solution about to start");
    // console.log(puzzleString['puzzle']);
    // console.log(puzzleString['puzzle']);
    let _this = this;
    const validateResult = _this.validate(puzzleString);
    if (!validateResult['valid']) {
      return validateResult;
    }

    function doSolution(puzzleString) {
      const board = [];
      puzzleString['puzzle'].match(/.{1,9}/g).forEach((m) => board.push(m.split("")));  // Split string into array of equal lengths (9 chars)
      // console.log(board);
      // call initialBoardCheck for initial board evaluation (to detect viability of current board contents)
      
      // let boardCopy;
      // if (boardCopy == null && boardCopy != board) {
      //   console.log(boardCopy);
      //   boardCopy = JSON.parse(JSON.stringify(board));  // create deep copy 
      //   console.log("initial board check:", this.initialBoardCheck(boardCopy));
      // }

      let row = -1;
      let col = -1;
      let isEmpty = true;
      for(let i = 0; i < board.length; i++)
      {
          for(let j = 0; j < board.length; j++)
          {

              // console.log(board[i][j]);
              if (board[i][j] == '.')
              {
                  // console.log("It's an available spot: ", i, j)
                  row = i;
                  col = j;
  
                  // We still have some remaining
                  // missing values in Sudoku
                  isEmpty = false;
                  break;
              }
          }
          if (!isEmpty)
          {
              // console.log("Board is not empty")
              break;
          }
      }

      // No empty space left
      if (isEmpty)
      {
          // console.log("Board is empty. No space left to include value.");
          // console.log(board.join("").replace(/,/g, ""));

          if (!_this.checkFinalBoard(board)) {
            return false;  
            // return { error: 'Puzzle cannot be solved' };
          }

          // return true;  // original value based on https://www.geeksforgeeks.org/sudoku-backtracking-7/ (restore if testing does not work)
          // console.log(board.join("").replace(/,/g, ""));
          // return board.join("").replace(/,/g, "");
          return { solution: puzzleString['puzzle'] };  
      }

      
      // this.checkDuplicates(board)

      // Else for each-row backtrack
      for(let num = 1; num <= board.length; num++)
      {
          // if (isSafe(board, row, col, num))
          // Custom Method call: checkValidRegion()
          if (_this.checkRowPlacement(board,row,num) == true && _this.checkColPlacement(board,col,num) == true && _this.checkRegionPlacement(board,row,col,num) == true)
          {
              // console.log("About to place");
              board[row][col] = `${num}`;
              const updatedBoard = board.join("").replace(/,/g, "");
              puzzleString['puzzle'] = updatedBoard;
              // console.log("updated board");
              // console.log(puzzleString['puzzle']);
              if (doSolution(puzzleString))
              {
                  if (isEmpty)
                  {
                    if (!_this.checkFinalBoard(board)) {
                      return false;  
                    }
                  }
                  return { solution: puzzleString['puzzle'] };  
                  // return true;
              }
              else
              {
                    
                  // Replace it
                  // console.log("replaced")
                  board[row][col] = '.';
              }
          }
      }
      // console.log('puzzle not solved');
      // if (!this.checkFinalBoard(board)) {
      //   // return false;  
      //   return { error: 'Puzzle cannot be solved' };
      // }
      return false;
    }

    let solved = doSolution(puzzleString)
    if (solved) {
      if (solved['solution']) {
        return solved;
      } 
    } else {
      return { error: 'Puzzle cannot be solved' };
    }
  }

  checkFinalBoard(board) {
    // console.log(board);
    const string_digits = ["1","2","3","4","5","6","7","8","9"];
    for (let i = 0; i < board.length; i++) {
      // console.log(board[i]);
      // console.log(board[i].includes(['1','2','3','4','5','6','7','8','9']));
      // if (!board[i].includes(['1','2','3','4','5','6','7','8','9'])) {
      //   return false;
      // }
      for (let j = 0; j < board.length; j++) {
        // console.log(string_digits[i]);
        // console.log(board[i].includes(string_digits[j]));
        if (!board[i].includes(string_digits[j])) {
          return false;
        }
      }
    }
    return true;
  }

  // For Unit Tests
  checkCharLength(puzzleString) {
    if (puzzleString.length != 81) {
      // return false;
      return { error: 'Expected puzzle to be 81 characters long' };
    }
    return { valid: true };
  }

  checkValidChars(puzzleString) {
    if (/[^\d.]/g.test(puzzleString)) {
      return { error: 'Invalid characters in puzzle' };
    }
    return { valid: true };
  }

  checkRow(puzzleString, row, value) {
    const board = [];
    puzzleString.match(/.{1,9}/g).forEach((m) => board.push(m.split("")));
    for(let d = 0; d < 9; d++)
    {
      if (board[row][d] == value)
      {
        // console.log("Row placement is invalid.");
        // return false;
        return { valid: false, conflict: "row"};
      }
    }
    // console.log("Row placement is valid.");
    return { valid: true };
  }

  checkCol(puzzleString, col, value) {
    const board = [];
    puzzleString.match(/.{1,9}/g).forEach((m) => board.push(m.split("")));
    for(let r = 0; r < 9; r++)
      {
          if (board[r][col] == value)
          {
            // console.log("Col placement is invalid.");
            // return false;
            return { valid: false, conflict: "column"};
          }
      }
      // console.log("Col placement is valid.");
      return { valid: true };
  }

  checkRegion(puzzleString, row, col, value) {
    const board = [];
    puzzleString.match(/.{1,9}/g).forEach((m) => board.push(m.split("")));
    let sqrt = Math.floor(Math.sqrt(board.length));
    let startRow = row - row % sqrt;
    let startCol = col - col % sqrt;

    for(let r = startRow; r < startRow + sqrt; r++)
    {
      for(let d = startCol;
              d < startCol + sqrt; d++)
      {
          if (board[r][d] == value)
          {
            // console.log("Region placement is invalid.");
            // return false;
            return { valid: false, conflict: "region"};
          }
      }
    }
    // console.log("Region placement is valid.");
    return { valid: true };
  }

}

module.exports = SudokuSolver;

