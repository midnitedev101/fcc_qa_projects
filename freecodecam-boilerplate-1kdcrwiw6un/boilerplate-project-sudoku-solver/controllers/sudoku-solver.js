class SudokuSolver {

  constructor() {
    this.allowedChars = /[^\d.]/g
  }
  validate(puzzleString) {
    // const allowedChars = /[^\d.]/g
    if (puzzleString['puzzle'].length == 0) {
      return { error: 'Required field missing' };
    } else if (this.allowedChars.test(puzzleString['puzzle'])) {
      return { error: 'Invalid characters in puzzle' };
    } else if (puzzleString['puzzle'].length != 81) {
      return { error: 'Expected puzzle to be 81 characters long' };
    } else {
      return { success: 'Puzzle passes validation'};
    }
  }

  // checkRowPlacement(puzzleString, row, column, value) {
    checkRowPlacement(board, row, value) {
    // Row has the unique (row-clash)
    console.log("Row check about to start.");
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
            return false;
        }
    }
    console.log("Row placement is valid.");
    return true;
  }

  checkColPlacement(board, col, value) {
    // Column has the unique numbers (column-clash)
    // if (!this.allowedChars.test(value)) {
    //   return false;
    // }
    console.log("Column check about to start.");
    for(let r = 0; r < 9; r++)
      {
            
          // Check if the number
          // we are trying to
          // place is already present in
          // that column, return false;
          if (board[r][col] == value)
          {
              return false;
          }
      }
      console.log("Column placement is valid.");
      return true;
  }

  checkRegionPlacement(board, row, col, value) {
    console.log("Region check about to start.");
    console.log(row, col, value);
    let sqrt = Math.floor(Math.sqrt(board.length));
    console.log("sqrt: ", sqrt)
    let startRow = row - row % sqrt;
    console.log("startRow: ", startRow)
    let startCol = col - col % sqrt;
    console.log("startCol: ", startCol)

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
              return false;
          }
      }
    }
    console.log("Region placement is valid.");
    return true;
  }

  solve(puzzleString) {
    console.log("Puzzle solution about to start");
    console.log(puzzleString['puzzle']);
    // console.log(puzzleString['puzzle']);

    const board = [];
    puzzleString['puzzle'].match(/.{1,9}/g).forEach((m) => board.push(m.split("")));  // Split string into array of equal lengths (9 chars)
    console.log(board);

    let row = -1;
    let col = -1;
    let isEmpty = true;
    for(let i = 0; i < 9; i++)
    {
        for(let j = 0; j < 9; j++)
        {
            console.log(board[i][j]);
            if (board[i][j] == '.')
            {
                console.log("It's an available spot: ", i, j)
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
            console.log("Board is not empty")
            break;
        }
    }

    // No empty space left
    if (isEmpty)
    {
        console.log("Board is empty. No space left to include value.");
        return true;
        // return puzzleString['puzzle'];
    }

    

    // Else for each-row backtrack
    for(let num = 1; num <= board.length; num++)
    {
        // if (isSafe(board, row, col, num))
        if (this.checkRowPlacement(board,row,num) && this.checkColPlacement(board,col,num) && this.checkRegionPlacement(board,row,col,num))
        {
            console.log("About to place");
            board[row][col] = `${num}`;
            const updatedBoard = board.join("").replace(/,/g, "");
            puzzleString['puzzle'] = updatedBoard;
            console.log("updated board");
            console.log(puzzleString['puzzle']);
            if (this.solve(puzzleString))
            {
                console.log("success");
                // return true;
                return puzzleString['puzzle'];
            }
            else
            {
                  
                // Replace it
                board[row][col] = '.';
            }
        }
    }
      return false;
  }

}

module.exports = SudokuSolver;

