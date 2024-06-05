const chai = require('chai');
const assert = chai.assert;

const Solver = require('../controllers/sudoku-solver.js');
let solver;

const puzzleSamples = require('../controllers/puzzle-strings.js');

suite('Unit Tests', () => {
    solver = new Solver();
    suite("Entity Tests", function() {
        test("Logic handles a valid puzzle string of 81 characters", function(done) {
            // assert.equal(solver.checkCharLength('1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.'), true);
            let puzzleString = {'puzzle': '1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.'};
            // assert.equal(solver.validate(puzzleString), true);
            assert.deepEqual(solver.validate(puzzleString), { valid: true });
            done();
        });
        test("Logic handles a puzzle string with invalid characters (not 1-9 or .)", function(done) {
            // assert.deepEqual(solver.checkValidChars('1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16.a..926914.37.'), { error: 'Invalid characters in puzzle' });
            let puzzleString = {'puzzle': '1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16.a..926914.37.'};
            assert.deepEqual(solver.validate(puzzleString), { error: 'Invalid characters in puzzle' });
            done();
        });
        test("Logic handles a puzzle string that is not 81 characters in length", function(done) {
            // assert.deepEqual(solver.checkCharLength('1.5..2.84..63.12.8.2.3674.3.7.2..9.47...8..1..16....926914.37.'), { error: 'Expected puzzle to be 81 characters long' });
            let puzzleString = {'puzzle': '1.5..2.84..63.12.8.2.3674.3.7.2..9.47...8..1..16....926914.37.'};
            assert.deepEqual(solver.validate(puzzleString), { error: 'Expected puzzle to be 81 characters long' });
            done();
        });
        test("Logic handles a valid row placement", function(done) {
            // assert.equal(solver.checkRow('..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..', 0, 7), true);
            assert.deepEqual(solver.checkRow('..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..', 0, 7), { valid: true });
            done();
        });
        test("Logic handles an invalid row placement", function(done) {
            // assert.equal(solver.checkRow('..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..', 0, 9), false);
            assert.deepEqual(solver.checkRow('..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..', 0, 9), { valid: false, conflict: "row"});
            done();
        });
        test("Logic handles a valid column placement", function(done) {
            // assert.equal(solver.checkCol('..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..', 0, 3), true);
            let puzzleString = {'puzzle': '1.5..2.84..63.12.8.2.3674.3.7.2..9.47...8..1..16....926914.37.'};
            assert.deepEqual(solver.checkCol('..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..', 0, 7), { valid: true });
            done();
        });
        test("Logic handles an invalid column placement", function(done) {
            // assert.equal(solver.checkCol('..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..', 0, 5), false);
            assert.deepEqual(solver.checkCol('..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..', 0, 5), { valid: false, conflict: "column"});
            done();
        });
        test("Logic handles a valid region (3x3 grid) placement", function(done) {
            // assert.equal(solver.checkRegion('..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..', 4, 0, 7), true);
            assert.deepEqual(solver.checkRegion('..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..', 4, 0, 7), { valid: true });
            done();
        });
        test("Logic handles an invalid region (3x3 grid) placement", function(done) {
            // assert.equal(solver.checkRegion('..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..', 4, 0, 2), false);
            assert.deepEqual(solver.checkRegion('..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..', 4, 0, 2), { valid: false, conflict: "region"});
            done();
        });
        test("Valid puzzle strings pass the solver", function(done) {
            let puzzleString = {'puzzle': '1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.'};
            const input = { puzzle:'..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..'};
            const output = '769235418851496372432178956174569283395842761628713549283657194516924837947381625';
            // assert.equal(solver.solve(puzzleString), '135762984946381257728459613694517832812936745357824196473298561581673429269145378');
            // assert.equal(solver.solve(input), output);
            assert.deepEqual(solver.solve(puzzleString), { solution: '135762984946381257728459613694517832812936745357824196473298561581673429269145378' });
            assert.deepEqual(solver.solve(input), { solution: output });
            done();
        });
        test("Invalid puzzle strings fail the solver", function(done) {
            let puzzleString = {'puzzle': '125..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.'};
            // assert.equal(solver.solve(puzzleString), false);
            assert.deepEqual(solver.solve(puzzleString), { error: 'Puzzle cannot be solved' });
            done();
        });
        test("Solver returns the expected solution for an incomplete puzzle", function(done) {
            let puzzleString = {'puzzle': '.2..4..6...1....9......1....9...7..............3..4......4.....1.....2..3....8.5.'};
            // assert.equal(solver.solve(puzzleString), '527349168431286597689571324294137685715862439863954712952413876178695243346728951');
            assert.deepEqual(solver.solve(puzzleString), { solution: '527349168431286597689571324294137685715862439863954712952413876178695243346728951' });
            done();
        });
    });

});
