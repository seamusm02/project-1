console.log("Create 3 towers and assign them to positions 'A', 'B', and 'C'");
// Create tower 'A'
let towerA = new Tower('a');
// Create tower 'B'
let towerB = new Tower('b');
// Create tower 'C'
let towerC = new Tower('c');
console.log(towerA, towerB, towerC);
console.log("");

console.log("Create three discs with descending widths and different colors");
//Create disc1 
let disc1 = new Disc(50, 'red');
//Create disc2 
let disc2 = new Disc(40, 'blue');
//Create disc3
let disc3 = new Disc(30, 'green');
console.log(disc1, disc2, disc3);
console.log("");

//Add discs 1, 2, and 3 to towerA
console.log("Add discs 1, 2, and 3 to towerA");
towerA.addTopDisc(disc1); 
towerA.addTopDisc(disc2); 
towerA.addTopDisc(disc3);
console.log(towerA, towerB, towerC);
console.log(""); 

// Remove a disc from towerA
console.log("Remove a disc from towerA"); 
towerA.removeTopDisc();
console.log("Remove a disc from towerA"); 
towerA.removeTopDisc();
console.log(towerA);
console.log("");

console.log("Create a new gameboard with 3 discs");
let gameBoard = new Gameboard(3);
console.log(gameBoard);
console.log("");

console.log("Move the 3 discs in correct sequence from tower A to tower C...");
console.log("");

console.log("Move smallest disc from tower A to tower C");
gameBoard.moveDisc(gameBoard.getTower('A'), gameBoard.getTower('C'));
console.log("isWinner === " + gameBoard.isWinner() + ", number of moves = " + 
gameBoard.getNumberOfMoves());
console.log("");

console.log("Move medium disc from tower A to tower B");
gameBoard.moveDisc(gameBoard.getTower('A'), gameBoard.getTower('B'));
console.log("isWinner === " + gameBoard.isWinner() + ", number of moves = " + 
gameBoard.getNumberOfMoves());
console.log("");

console.log("Move smallest disc from tower C to tower B");
gameBoard.moveDisc(gameBoard.getTower('C'), gameBoard.getTower('B'));
console.log("isWinner === " + gameBoard.isWinner() + ", number of moves = " + 
gameBoard.getNumberOfMoves());
console.log("");

console.log("Move largest disc from tower A to tower C");
gameBoard.moveDisc(gameBoard.getTower('A'), gameBoard.getTower('C'));
console.log("isWinner === " + gameBoard.isWinner() + ", number of moves = " + 
gameBoard.getNumberOfMoves());
console.log("");

console.log("Move smallest disc from tower B to tower A");
gameBoard.moveDisc(gameBoard.getTower('B'), gameBoard.getTower('A'));
console.log("isWinner === " + gameBoard.isWinner() + ", number of moves = " + 
gameBoard.getNumberOfMoves());
console.log("");

console.log("Move medium disc from tower B to tower C");
gameBoard.moveDisc(gameBoard.getTower('B'), gameBoard.getTower('C'));
console.log("isWinner === " + gameBoard.isWinner() + ", number of moves = " + 
gameBoard.getNumberOfMoves());
console.log("");

console.log("Move smallest disc from tower A to tower C");
gameBoard.moveDisc(gameBoard.getTower('A'), gameBoard.getTower('C'));
console.log("isWinner === " + gameBoard.isWinner() + ", number of moves = " + 
gameBoard.getNumberOfMoves());
console.log("");

console.log("Winning time = " + gameBoard.getWinningTime());













