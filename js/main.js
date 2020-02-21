/**
 * @file This is the entry point into the application
 */

/* Global Constants ***************************************************************************** */

const MAX_DISCS = 8;                       // Maximum number of game discs
const MIN_DISCS = 3;                       // Minimum number of game discs                  
const DISC_HEIGHT = 15;                    // Height of a disc in px
const TOWER_WIDTH  = 165;                  // Width of tower in px
const TOWER_COLUMN_HEIGHT = 135;           // Height of tower column in px
const TOWER_BASE_HEIGHT = DISC_HEIGHT - 5; // Height of tower base in px
const TOWER_HEIGHT = TOWER_COLUMN_HEIGHT + TOWER_BASE_HEIGHT; // Total height of tower in px

/* ********************************************************************************************** */

/* Browser Objects ****************************************************************************** */

// Buttons
let buttonDown = {};  // Up button increases the number of starting discs
let buttonUp = {};    // Down button decreases the number of starting discs
let buttonReset = {}; // Reset button initializes the game board
let buttonLog = {};   // Log button

// Towers
let towerADiv = {};
let towerBDiv = {};
let towerCDiv = {};

// discs
let discDiv1 = {};
let discDiv2 = {};
let discDiv3 = {};
let discDiv4 = {};
let discDiv5 = {};
let discDiv6 = {};
let discDiv7 = {};
let discDiv8 = {};

/* ********************************************************************************************** */

/* Game Logic Objects *************************************************************************** */

// Create three towers and set the first one as the initial tower
let towerA = new Tower("towerA", true,  TOWER_WIDTH, TOWER_HEIGHT, "DodgerBlue");
let towerB = new Tower("towerB", false, TOWER_WIDTH, TOWER_HEIGHT, "DodgerBlue");
let towerC = new Tower("towerC", false, TOWER_WIDTH, TOWER_HEIGHT, "DodgerBlue");

// Create the game disc objects
const disc1 = new Disc('disc1', 30,  DISC_HEIGHT, 'MediumTurquoise');
const disc2 = new Disc('disc2', 45,  DISC_HEIGHT, 'Indigo');
const disc3 = new Disc('disc3', 60,  DISC_HEIGHT, 'Green');
const disc4 = new Disc('disc4', 75,  DISC_HEIGHT, 'FireBrick');
const disc5 = new Disc('disc5', 90,  DISC_HEIGHT, 'DarkSalmon');
const disc6 = new Disc('disc6', 105, DISC_HEIGHT, 'DarkSlateGray');
const disc7 = new Disc('disc7', 120, DISC_HEIGHT, 'DeepPink');
const disc8 = new Disc('disc8', 135, DISC_HEIGHT, 'DarkSlateBlue');

// Game Board Object
let gameBoard = {};

// Game log object
let gameLog = [];

/* ********************************************************************************************** */

/**
 * Window onload
 */
window.onload = () => {

	// Retrieve the default game log array from local storage or an empty array if it doesn't exist
	gameLog = JSON.parse(localStorage.getItem("gameLog") || "[]");
};

reset(); // Start a new game

// Add event listeners to the buttons
buttonDown.addEventListener("click", decreaseDiscs);
buttonUp.addEventListener("click", increaseDiscs);
buttonReset.addEventListener("click", reset);
buttonLog.addEventListener("click", showLog);

// Add event listeners to the tower divs
towerADiv.addEventListener("click", function() {action(this);});
towerBDiv.addEventListener("click", function() {action(this);});
towerCDiv.addEventListener("click", function() {action(this);});

/**
 * Display the log
 */
function showLog() {
	let logWindow = window.open();
	let output = ""
		
	// dynamic html out to new window!
	output += `<!DOCTYPE html>`  +
				  `<html lang="en">` +
				  `<head>` +
	              `<meta charset="UTF-8" />` +
	              `<meta name="viewport" content="width=device-width, initial-scale=1.0" />` +
	              `<meta http-equiv="X-UA-Compatible" content="ie=edge" />` +
	              `<title>Towers of Hanoi - JavaScript Project</title>` +
	              `<style> table {font-size: 0.8em; width: 80%} th {text-align: left; height: 25px;}` +
	              `</style>` +
	              `</head>` +
	              `<body>` +
	              `<table>` +
	              `<tr>` +
	              `<th>Date - Time</th>` +
	              `<th>Number of Discs</th>` +
	              `<th>Moves To Win</th>` +
	              `<th>Your Moves</th>` +
	              `<th>Elapsed Time</th>` +
	              `<th>Status</th>` +
	              `</tr>`;
	              for (let line of gameLog) {
	            	  //output+= `${line}<br>`
	            	  output += '<tr>'
	            	  output += '<td>' + line.dateTime + '</td>'
	            	  output += '<td>' + line.numberOfDiscs + '</td>'
	            	  output += '<td>' + line.movesToWin + '</td>'
	            	  output += '<td>' + line.yourMoves + '</td>'
	            	  output += '<td>' + line.elapsedTime + '</td>'
	            	  output += '<td>' + line.status + '</td>'
	            	  output += '</tr>'
	              }                
	output +=    `</table>` +
	             `</body>`  +
                  `</html>`;

	// Save the log to local storage
	localStorage.setItem("gameLog", JSON.stringify(gameLog));
	
	logWindow.document.write(output);
}

/**
 * Action
 */
function action(towerDiv) {        	
	
	if (gameBoard.isWinner()) return; // Don't do anything, we already won
	
	let discSelected = false;
	let towerID = towerDiv.getAttribute("id");
	
	if (Object.entries(gameBoard.getSelectedDisc()).length > 0) {
		discSelected = true;
	}
	
	// Click : we are selecting a disc or a destination tower
	
	// Is game clock 0?
	// YES => we can only click on initial tower
	//     ===> start game clock   
	//     ===> set selected disc to top disc of initial tower
	//     ===> show the selected disc as rubberBand
	//     ===> show other legal towers as selectable with pulse
	if (gameBoard.getStartTime() === 0) {
		
		if (gameBoard.getTower(towerID).isInitial()) {
				
			gameBoard.setStartTime(Date.now());  // start game clock
			
			// set selected disc to top disc of initial tower
			gameBoard.setSelectedDisc(gameBoard.getTower(towerID).getTopDisc());
			
			// show the selected disc as rubberBand
			towerDiv.children[1].classList.add("animated", "rubberBand", "infinite");
			
			let statusDiv = document.querySelector("#status");
			statusDiv.textContent = "Game On!";
			statusDiv.classList.add("animated", "flash", "infinite");
			
			// show other legal towers as selectable with pulse
			for (let tower of gameBoard.getTowers()) {
				
				if (tower.getID() !== towerID) {
					
					let towerDiv = document.querySelector("#" + tower.getID());
					towerDiv.classList.add("animated", "pulse", "infinite");
				}
			}			
		}
	}
	
	// Is a disc selected?	
	// YES => 
	//        Did we click on a tower that is NOT the one with the selected disc?
	//        YES => 
	//            ===> check the tower for discs.  
	//                 if they have 0 discs or a top disc > than selected disc, then this is the 
	//                 destination tower
	//                  ===> move the selected disc to the destination tower
	//                  ===> Remove selectable pulse from other legal towers 
	//                  ===> remove the rubberBand from the selected disc
	//                  ===> clear the selectedDisc flag
	if (discSelected) {
		
		let selectedDiscID = gameBoard.getSelectedDisc().getID();
		let parentNode = document.querySelector(`#${selectedDiscID}`).parentNode;
		let parentNodeID = parentNode.getAttribute("id");
		
		if (towerID !== parentNodeID) {
			
			let currentTower = gameBoard.getTower(towerID);
			
			if (! currentTower.hasDisc() || 
				  currentTower.getTopDisc().getWidth() > gameBoard.getSelectedDisc().getWidth()) {
				
				// Set the source tower
				fromTower = gameBoard.getTower(parentNodeID)
								
				// Set the source tower div
				fromTowerDiv = document.querySelector(`#${parentNodeID}`);
				
				// Set the to tower div
				toTowerDiv = document.querySelector(`#${towerID}`);
								
				// move the disc on the gameboard object
				gameBoard.moveDisc(fromTower, currentTower) 
				
				// Set disc div 
				discDiv = document.querySelector(`#${selectedDiscID}`);
				
				// Add div to destination tower in browser
				addTopDiscDiv(toTowerDiv, discDiv);
				
				// Set source towers height to offset moving disc
				setTowerDivColumnHeight(fromTowerDiv)
				
				// Update the Your moves box
				let yourMoves = document.querySelector("#your-moves");
				yourMoves.textContent = "Your Moves: " + gameBoard.getNumberOfMoves();
				
				if (gameBoard.isWinner()) {
				
					gameBoard.setEndTime(Date.now());
					gameBoard.setGameLog();					
					gameLog.push(gameBoard.getGameLog());
					
					// Save the log to local storage
					localStorage.setItem("gameLog", JSON.stringify(gameLog));
						
					let winnerDiv = document.querySelector("#winner");
					winnerDiv.textContent = "You Win with " + gameBoard.getNumberOfMoves() + 
					                         " moves in " + gameBoard.getWinningTime() + "!";
					let statusDiv = document.querySelector("#status");
					statusDiv.textContent = "";
				}
								
				// Remove selectable pulse from other legal towers
				for (let tower of gameBoard.getTowers()) {
					
					let towerDiv = document.querySelector("#" + tower.getID());
					towerDiv.classList.remove("animated", "pulse", "infinite");
				}
				
				// remove the rubberBand from the selected disc
				discDiv.classList.remove("animated", "rubberBand", "infinite");
				
				// clear the selectedDisc flag
				gameBoard.setSelectedDisc({});
				
			}
			
		}
		// We selected the same tower that we just moved to so unselect it and stop other towers
		// from pulsing
		
		// Set disc div 
		discDiv = document.querySelector(`#${selectedDiscID}`);
		
		// remove the rubberBand from the selected disc
		discDiv.classList.remove("animated", "rubberBand", "infinite");
		
		// clear the selectedDisc flag
		gameBoard.setSelectedDisc({});
		
		// Remove selectable pulse from other legal towers
		for (let tower of gameBoard.getTowers()) {
			
			let towerDiv = document.querySelector("#" + tower.getID());
			towerDiv.classList.remove("animated", "pulse", "infinite");
		}
		
	}
	// No disc is selected
	// ===> check the tower for discs
	//     ===> if there are discs on the tower, select the top disc
	else {
		
		if (gameBoard.getTower(towerID).hasDisc()) {
			
			// set selected disc to top disc of initial tower
			gameBoard.setSelectedDisc(gameBoard.getTower(towerID).getTopDisc());
			
			// show the selected disc as rubberBand
			towerDiv.children[1].classList.add("animated", "rubberBand", "infinite");
			
			// show other legal towers as selectable with pulse
			for (let tower of gameBoard.getTowers()) {
				
				//if (tower.getID() !== towerID) {
													
					let towerDiv = document.querySelector("#" + tower.getID());
					
					// If a tower doesn't have a disc it is a legal move
					if (!tower.hasDisc()) {
						towerDiv.classList.add("animated", "pulse", "infinite");
					}
					else {
						// If a tower has a disc make sure it is larger than the selected disc
						if (tower.getTopDisc().getWidth() > gameBoard.getSelectedDisc().getWidth()) {
							towerDiv.classList.add("animated", "pulse", "infinite");
						}
					}
										
				//}					
			}			
		}		
	}

}

/**
 * Decrease the number of discs on the game board
 */
function decreaseDiscs() {
    
	if (gameBoard.getStartTime() > 0) {
		return; // Don't allow resetting discs while in a game
	}
	
	let numberOfDiscs = getNumberOfGameDiscs();
    let initialTower = {};
    let initialTowerDiv = {};

    for (let tower of gameBoard.getTowers()) { 
        if (tower.isInitial()) {
        	initialTower = tower;
        	initialTowerDiv = document.querySelector("#" + initialTower.getID());
         }
    }
    
    if (numberOfDiscs > MIN_DISCS) {
        
        switch (numberOfDiscs) {             
            
            case 4: 
                initialTower.removeBottomDisc(disc4);
                removeDiscDiv(initialTowerDiv, document.querySelector("#" + disc4.getID()));
                break;
             case 5: 
                initialTower.removeBottomDisc(disc5);
                removeDiscDiv(initialTowerDiv, document.querySelector("#" + disc5.getID()));
                break;
             case 6:
                initialTower.removeBottomDisc(disc6);
                removeDiscDiv(initialTowerDiv, document.querySelector("#" + disc6.getID()));
                break;
             case 7:
                initialTower.removeBottomDisc(disc7);
                removeDiscDiv(initialTowerDiv, document.querySelector("#" + disc7.getID()));
                break;
             case 8:
                initialTower.removeBottomDisc(disc8);
                removeDiscDiv(initialTowerDiv, document.querySelector("#" + disc8.getID()));
                break;
        }

        displayNumberOfGameDiscs(); // Display the number of discs on the initial tower
        displayMinimumMoves();      // Display the minimum number of moves to win         
     } 	
}

/**
 * Increase the number of discs on the game board
 */
function increaseDiscs() {
	
	if (gameBoard.getStartTime() > 0) return; // Don't allow resetting discs while in a game
	
	let initialTowerDiv = {};	
	
	let numberOfDiscs = getNumberOfGameDiscs();
    let initialTower = {};

    for (let tower of gameBoard.getTowers()) { 
        if (tower.isInitial()) {
        	initialTower = tower;
        	initialTowerDiv = document.querySelector("#" + initialTower.getID());
        }
    }

    // Only increase the number of discs on the initial tower if we have fewer than the maximum
    if (numberOfDiscs < MAX_DISCS) {
        
        switch (numberOfDiscs) {             
            
            // Update game object; Update browser display

            case 3: 
                initialTower.addBottomDisc(disc4); 
                addBottomDiscDiv(initialTowerDiv, discDiv4); 
                break;
            case 4: 
                initialTower.addBottomDisc(disc5);
                addBottomDiscDiv(initialTowerDiv, discDiv5);
                break;
            case 5: 
                initialTower.addBottomDisc(disc6);
                addBottomDiscDiv(initialTowerDiv, discDiv6);
                break;
            case 6: 
                initialTower.addBottomDisc(disc7);
                addBottomDiscDiv(initialTowerDiv, discDiv7);
                break;
            case 7:
                initialTower.addBottomDisc(disc8);
                addBottomDiscDiv(initialTowerDiv, discDiv8);
                break;

         }
        
         displayNumberOfGameDiscs(); // Display the number of discs on the initial tower
         displayMinimumMoves();      // Display the minimum number of moves to win 
         
     }
}

/**
 * Update the browser display with a new disc at the bottom of the specified tower
 * 
 * @param {Object} tower The Tower object
 * @param {Object} disc  The Disc object
 */
function addBottomDiscDiv(towerDiv, discDiv) {
    
	let towerDivID = towerDiv.getAttribute("id");
    
	let towerBaseDiv = document.querySelector(`#${towerDivID}-base`);
    
	gameBoard.incrementNumberOfDiscs(); // increment the number of discs 
	
    towerDiv.insertBefore(discDiv, towerBaseDiv); // Insert the disc div before the tower base div
    setTowerDivColumnHeight(towerDiv);               // Set the height of the tower column 
}

/**
 * Update the browser display after removing a disc at the bottom of the specified tower
 * @param {Object} tower The Tower object
 * @param {Object} disc  The Disc object
 */
function removeDiscDiv(towerDiv, discDiv) {

	gameBoard.decrementNumberOfDiscs(); // decrement the number of discs 
	
	towerDiv.removeChild(discDiv);  // Remove the disc div 
    setTowerDivColumnHeight(towerDiv); // Set the height of the tower column
}

/**
 * Update the browser display with a new disc at the top of the specified tower
 * 
 * @param {Object} tower The Tower object
 * @param {Object} disc  The Disc object
 */
function addTopDiscDiv(towerDiv, discDiv) {
    
    let towerID = towerDiv.getAttribute("id");
    
    let towerColumnDiv = document.querySelector(`#${towerID}-column`);
    
    // increment the number of discs 
    
    // Remove the column temporarily
    towerDiv.removeChild(towerColumnDiv);  
    
    // Add the disc div to the top of the tower
    towerDiv.insertAdjacentElement("afterbegin", discDiv); 
    
    // Reinsert the tower column and set it's height
    towerDiv.insertAdjacentElement("afterbegin", towerColumnDiv); 
    setTowerDivColumnHeight(towerDiv);                       
}

/**
 * Set tower column height
 * 
 * @param {Object} tower The tower object
 */
function setTowerDivColumnHeight(towerDiv) {
    
    let towerDivID = towerDiv.getAttribute("id");
    let discCount = 0;
    let towerColumnDivHeight = 0;

    let towerColumnDiv = document.querySelector(`#${towerDivID}-column`);

    // Get the number of disc divs on the tower (subtract column and base)
    discCount = towerDiv.childElementCount - 2;

    // Calculate the necessary height above the last disc
    towerColumnDivHeight = ((MAX_DISCS - discCount) * DISC_HEIGHT) + DISC_HEIGHT;
    towerColumnDiv.setAttribute("style", `height: ${towerColumnDivHeight}px`);
}

/**
 * Display the number of game discs (Disc objects starting on the initial tower)
 * 
 */
function displayNumberOfGameDiscs() {
       
    // Target the number of discs display
    const numberOfDiscsDisplay = document.querySelector("#number-of-discs");

    // Update the display
    numberOfDiscsDisplay.textContent = "Discs: " + getNumberOfGameDiscs();
}

/**
 * Display the Minimum number of moves to win for a given number of game discs
 * 
 */
function displayMinimumMoves() {
    
    // Target the minimum number of moves to win display
    const minNumberOfMovesDisplay = document.querySelector("#minimum-moves");

    // Update the display
    minNumberOfMovesDisplay.textContent = "Minimum Moves To Win: " + 
                                           (Math.pow(2, getNumberOfGameDiscs()) - 1).toString();    
}

/**
 * Return the number of game discs (Disc objects starting on the initial tower)
 * 
 * @return {number}
 */
function getNumberOfGameDiscs(){
    
	if (Object.entries(gameBoard).length > 0) {
    
		for (let tower of gameBoard.getTowers()) 
			if (tower.isInitial()) return tower.getDiscs().length;
	}
	else {
		return 0;
	}
}

/**
 * Reset the game board
 */
function reset() {
    
    let towerDivs = document.querySelectorAll(".towers");
    
    // Log as a "gave up" if user clicks reset after starting a game
    if (getNumberOfGameDiscs() > 0) {
    	
    	if (gameBoard.getStartTime() > 0) {
    	
    		gameBoard.setEndTime(Date.now());
    		gameBoard.setGameLog();					
    		gameLog.push(gameBoard.getGameLog());
    	
    		// Save the log to local storage
    		localStorage.setItem("gameLog", JSON.stringify(gameLog));
    	}
    }
                
    if (getNumberOfGameDiscs() === 0) {
    	numTempDiscs = 3;
    }
    else {
    	numTempDiscs = getNumberOfGameDiscs();
    }
    
    // Remove all the discs objects from the tower objects
    if ( Object.entries(gameBoard).length !== 0) {
    	
    	for (let tower of gameBoard.getTowers()) {   
    		
    		let numDiscs = tower.getDiscs().length;
    		
    		for(let i = numDiscs; i > 0; i--) {
    			tower.removeTopDisc();
    		}
    	}
    }
    
    // Remove all disc divs from the tower divs
    for (let towerDiv of towerDivs) {
        
        let towerDivID = towerDiv.getAttribute("id");
        let discDivs = document.querySelectorAll(`#${towerDivID} .discs`);
        
        for (let discDiv of discDivs) {
            towerDiv.removeChild(discDiv);
        }        
    }
    
    // Target the up/down number of disc buttons
    buttonDown = document.querySelector("#down-button");
    buttonUp = document.querySelector("#up-button");
    buttonReset = document.querySelector("#reset");
    buttonLog = document.querySelector("#log");
    
    // Create the game disc divs  
    discDiv1 = document.createElement("div");
    discDiv1.setAttribute("id", disc1.getID());
    discDiv1.setAttribute("class", "discs");
    discDiv1.setAttribute("style", "width: "            + disc1.getWidth() + "px; " +
                                   "height: "           + DISC_HEIGHT      + "px; " +
                                   "background-color: " + disc1.getColor() + ";"
                         );

    discDiv2 = document.createElement("div");
    discDiv2.setAttribute("id", disc2.getID());
    discDiv2.setAttribute("class", "discs");
    discDiv2.setAttribute("style", "width: "            + disc2.getWidth() + "px; " +
                                   "height: "           + DISC_HEIGHT      + "px; " +
                                   "background-color: " + disc2.getColor() + ";"
                         );

    discDiv3 = document.createElement("div");
    discDiv3.setAttribute("id", disc3.getID());
    discDiv3.setAttribute("class", "discs");
    discDiv3.setAttribute("style", "width: "            + disc3.getWidth() + "px; " +
                                   "height: "           + DISC_HEIGHT      + "px; " +
                                   "background-color: " + disc3.getColor() + ";"
                         );

    discDiv4 = document.createElement("div");
    discDiv4.setAttribute("id", disc4.getID());
    discDiv4.setAttribute("class", "discs");
    discDiv4.setAttribute("style", "width: "            + disc4.getWidth() + "px; " +
                                   "height: "           + DISC_HEIGHT      + "px; " +
                                   "background-color: " + disc4.getColor() + ";"
                         );

    discDiv5 = document.createElement("div");
    discDiv5.setAttribute("id", disc5.getID());
    discDiv5.setAttribute("class", "discs");
    discDiv5.setAttribute("style", "width: "            + disc5.getWidth() + "px; " +
                                   "height: "           + DISC_HEIGHT      + "px; " +
                                   "background-color: " + disc5.getColor() + ";"
                         );

    discDiv6 = document.createElement("div");
    discDiv6.setAttribute("id", disc6.getID());
    discDiv6.setAttribute("class", "discs");
    discDiv6.setAttribute("style", "width: "            + disc6.getWidth() + "px; " +
                                   "height: "           + DISC_HEIGHT      + "px; " +
                                   "background-color: " + disc6.getColor() + ";"
                         );

    discDiv7 = document.createElement("div");
    discDiv7.setAttribute("id", disc7.getID());
    discDiv7.setAttribute("class", "discs");
    discDiv7.setAttribute("style", "width: "            + disc7.getWidth() + "px; " +
                                   "height: "           + DISC_HEIGHT      + "px; " +
                                   "background-color: " + disc7.getColor() + ";"
                         );

    discDiv8 = document.createElement("div");
    discDiv8.setAttribute("id", disc8.getID());
    discDiv8.setAttribute("class", "discs");
    discDiv8.setAttribute("style", "width: "            + disc8.getWidth() + "px; " +
                                   "height: "           + DISC_HEIGHT      + "px; " +
                                   "background-color: " + disc8.getColor() + ";"
                         );
  
    // Target the tower divs
    towerADiv = document.querySelector("#" + towerA.getID());
    towerBDiv = document.querySelector("#" + towerB.getID());
    towerCDiv = document.querySelector("#" + towerC.getID());
    
    // Remove the pulsing if it was enabled
    towerADiv.classList.remove("animated", "pulse", "infinite");
    towerBDiv.classList.remove("animated", "pulse", "infinite");
    towerCDiv.classList.remove("animated", "pulse", "infinite");
    
    //Update the Your moves box
    let yourMoves = document.querySelector("#your-moves");
    yourMoves.textContent = "Your Moves: 0";
    
    let winnerDiv = document.querySelector("#winner");
	winnerDiv.textContent = "";
	
	let statusDiv = document.querySelector("#status");
	statusDiv.textContent = "";
	statusDiv.classList.remove("animated", "flash", "infinite");
    
    // Set the tower column height 
    let towerBcolumn = document.querySelector("#towerB-column");
    towerBcolumn.setAttribute("style", `height: ${TOWER_COLUMN_HEIGHT}px`);
    
    let towerCcolumn = document.querySelector("#towerC-column");
    towerCcolumn.setAttribute("style", `height: ${TOWER_COLUMN_HEIGHT}px`);
  
    // Initialize towerA with the the number of discs currently selected
    switch (numTempDiscs) {
    	case 8:
    		towerA.addTopDisc(disc8); 
    		addTopDiscDiv(towerADiv, discDiv8);
    	case 7:
    		towerA.addTopDisc(disc7); 
    		addTopDiscDiv(towerADiv, discDiv7);
	    case 6:
	    	towerA.addTopDisc(disc6); 
	        addTopDiscDiv(towerADiv, discDiv6);
	    case 5:
	    	towerA.addTopDisc(disc5); 
	        addTopDiscDiv(towerADiv, discDiv5);
	    case 4:
	    	towerA.addTopDisc(disc4); 
	        addTopDiscDiv(towerADiv, discDiv4);
	    default:
	    	towerA.addTopDisc(disc3); 
	        addTopDiscDiv(towerADiv, discDiv3);
	        
	        towerA.addTopDisc(disc2);    
	        addTopDiscDiv(towerADiv, discDiv2);
	        
	        towerA.addTopDisc(disc1); 
	        addTopDiscDiv(towerADiv, discDiv1);   	
    }    

    // Initialize the game board with 
    gameBoard = new Gameboard([towerA, towerB, towerC]);
    
    gameBoard.incrementNumberOfDiscs();
    gameBoard.incrementNumberOfDiscs();
    gameBoard.incrementNumberOfDiscs();

    displayNumberOfGameDiscs(); // Display the number of discs on the initial tower
    displayMinimumMoves();      // Display the minimum number of moves to win
}