/* // Create tower 'A'
let towerA = new Tower('a');
console.log(`Position of towerA is ${towerA.getPosition()}`);

//Create tower 'B'
let towerB = new Tower('b');
console.log(`Position of towerb is ${towerB.getPosition()}`);

//Create tower 'C'
let towerC = new Tower('c');
console.log(`Position of towerc is ${towerC.getPosition()}`);

//Create disc1 
let disc1 = new Disc(50, 'red');
console.log(`The width and color of disc1 are '${disc1.getWidth()}' and '${disc1.getColor()}'`);
console.log(disc1);

//Create disc2 
let disc2 = new Disc(40);
console.log(`The width of disc2 is ${disc2.getWidth()}`);

//Create disc3
let disc3 = new Disc(30);
console.log(`The width of disc3 is ${disc3.getWidth()}`);

//Add discs 1,2, and 3 to towerA 
towerA.addDisc(disc1); 
towerA.addDisc(disc2);
towerA.addDisc(disc3);

// Display discs on towerA
console.log(towerA.displayDiscs());

// Remove a disc from towerA
towerA.removeDisc();

// Remove a disc from towerA
towerA.removeDisc();

// Display discs on towerA
console.log(towerA.displayDiscs()); */

let gameBoard = new Gameboard(3);

// Move a disc from tower A to tower C
gameBoard.moveDisc(gameBoard.getTower('A'), gameBoard.getTower('C'));
console.log("isWinner === " + gameBoard.isWinner() + ", number of moves = " + 
gameBoard.getNumberOfMoves());

// Move the 2nd disc from tower A to tower B
gameBoard.moveDisc(gameBoard.getTower('A'), gameBoard.getTower('B'));
console.log("isWinner === " + gameBoard.isWinner() + ", number of moves = " + 
gameBoard.getNumberOfMoves());

// Move the disc from tower C to tower B
gameBoard.moveDisc(gameBoard.getTower('C'), gameBoard.getTower('B'));
console.log("isWinner === " + gameBoard.isWinner() + ", number of moves = " + 
gameBoard.getNumberOfMoves());

// Move the 3rd disc from tower A to tower C
gameBoard.moveDisc(gameBoard.getTower('A'), gameBoard.getTower('C'));
console.log("isWinner === " + gameBoard.isWinner() + ", number of moves = " + 
gameBoard.getNumberOfMoves());

// Move the top disc from tower B to tower A
gameBoard.moveDisc(gameBoard.getTower('B'), gameBoard.getTower('A'));
console.log("isWinner === " + gameBoard.isWinner() + ", number of moves = " + 
gameBoard.getNumberOfMoves());

// Move the top disc from tower B to tower C
gameBoard.moveDisc(gameBoard.getTower('B'), gameBoard.getTower('C'));
console.log("isWinner === " + gameBoard.isWinner() + ", number of moves = " + 
gameBoard.getNumberOfMoves());
console.log("Winning time = " + gameBoard.getWinningTime());

// Move the top disc from tower A to tower C
gameBoard.moveDisc(gameBoard.getTower('A'), gameBoard.getTower('C'));
console.log("isWinner === " + gameBoard.isWinner() + ", number of moves = " + 
gameBoard.getNumberOfMoves());
console.log("Winning time = " + gameBoard.getWinningTime());













