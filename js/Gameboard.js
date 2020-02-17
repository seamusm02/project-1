/**
 * The Gameboard class represents all entities on the gameboard: Disc objects, Tower 
 * objects, and user controls
 */
class Gameboard {

    // Private properties
    _numberOfDiscs = 0;  // Number of Disc objects on the gameboard
    _numMoves = 0;       // Number of moves in the current game
    _startTime = 0;      // Time the game started (in ms since Unix Epoch)
    _endTime = 0;        // Time the game ended (in ms since Unix Epoch)
    _towers = [];        // Array of Tower objects on the gameboard

    /**
     * Construct a new Gameboard with all necessary default values for child objects
     * 
     * @constructor
     * @param {number} numberOfDiscs The number of discs which start on tower A
     */
    constructor(numberOfDiscs) {
        this._initialize(numberOfDiscs);
    }

    /**
    * Initialize the gameboard with three towers and a variable number of discs on tower A between 3
    * and 8 inclusive, and start the game clock.
    * 
    * @ignore
    * @param {number} numberOfDiscs Number of discs between 3 and 8 inclusive
    */
    _initialize(numberOfDiscs) {
    
        // Defined colors for our variable number of discs
        let discColors = [        
            '#3236a8', // blueish
            '#32a890', // auqa greenish
            '#a83244', // redish
            '#a4a832', // dirty yellowish
            '#a032a8', // purpleish
            '#a87932', // brownish
            '#fc0339', // redish
            '#0398fc', // blueish 
        ];       
        
        try {
            
            let errMsg = `In call to ${this.constructor.name}.constructor(numberOfDiscs)...\n`;
            
             // Create the three towers
            let towerA = new Tower('A');
            let towerB = new Tower('B');
            let towerC = new Tower('C');

            let largestDiscWidth = 100;

            // Make sure numberOfDiscs is an integer value between 3 and 8
            if (!Number.isInteger(numberOfDiscs) || (numberOfDiscs < 3 || numberOfDiscs > 8)) {
                
                    errMsg += `\tnumber of discs not integer between 3 and 8 inclusive! >> ` +
                               typeof numberOfDiscs + ` '${numberOfDiscs}'`;      
                    throw errMsg;
            }            

            this._numberOfDiscs = numberOfDiscs; // Store the number of Disc objects
            
            // Add disc objects to tower A with the number of discs specified and defined color
            for (let i = 0; i < numberOfDiscs; i++) {
                let discWidth = largestDiscWidth - (i * 10);
                let disc = new Disc(discWidth, discColors[i]);
                towerA.addDisc(disc); // Add the disc to tower A
            }
            
            // Add the three towers to the towers collection
            this._towers.push(towerA, towerB, towerC);

            // Start the timer
            this._startTime = Date.now();
        }
        catch (err) {
            console.error(err);
        }
    }

    /**
     * Move a Disc object from a source Tower object to a destination Tower object
     * 
     * @param {Object} fromTower The source Tower object
     * @param {Object} toTower   The destination Tower object 
     */
    moveDisc(fromTower, toTower) {
        try {
            
            let isErr = false;
            let errMsg = `In call to ${this.constructor.name}.moveDisc(fromTower, toTower)...\n`;
            
            let discToMove = {}; // The top disc from the source tower
            
            let fromTowerTopDiscWidth = 0; // Source tower's top disc width
            let toTowerTopDiscWidth = 0;   // Destination tower's top disc width
                        
            // Throw error if parameters are not Tower objects
            if(typeof fromTower === "undefined" || typeof toTower === "undefined") {
                errMsg += `\tfromTower and toTower are not both Tower objects! >> ` + 
                          "fromTower - " + typeof fromTower + ", "+
                          "toTower - "   + typeof toTower   + "\n";
                                                    
                throw (errMsg);
            }

            // Throw error if source tower does not contain a disc
            if (fromTower.hasDisc() === false) {
                errMsg += `\tfromTower does not contain a DISC object!\n`;
                                                        
                isErr = true;
            }
            
            // Throw error if destination tower has a top disc width which is less than the top 
            // disc width of the source tower
            fromTowerTopDiscWidth = fromTower.getTopDisc().getWidth();
                            
            toTowerTopDiscWidth = toTower.hasDisc() 
            ? toTowerTopDiscWidth = toTower.getTopDisc().getWidth() 
            : 0; // if the width is zero, the destination tower has no discs - OK
                
            if (toTowerTopDiscWidth > 0) {
            
                if (toTowerTopDiscWidth < fromTowerTopDiscWidth) {
                    errMsg += `\tfromTower top disc has a larger width than toTower top disc! >> ` + 
                            `fromTower '${fromTower.getPosition()}' - '${fromTowerTopDiscWidth}',` +
                            ` toTower '${toTower.getPosition()}' - '${toTowerTopDiscWidth}'\n`;
                    isErr = true;   
                }
            }

            if (isErr) throw errMsg;
            
            // Get the top disc object from the source tower
            discToMove = fromTower.getTopDisc();

            toTower.addDisc(discToMove); // Add the top disc object to the destination tower
            fromTower.removeDisc();      // Remove the top disc object from the source tower            
            
            if (this.isWinner()) this._endTime = Date.now(); // Stop game clock if the user has won

            this._numMoves++;            // Increment the number of moves in the current game
            
        }
        catch (err) {
            console.error(err);
        }

    }

    /**
     * Return a of Tower object from the Gameboard object
     * 
     * @param {string} position The position of the Tower object: "A", "B", or "C"
     * @return {Object} 
     */
    getTower(position) {
        try {

            let isErr = false;
            let errMsg = `In call to ${this.constructor.name}.getTower(position)...\n`;

            position = position.toUpperCase();
            
            // Throw error if position is not "A", "B", or "C"
            if(! (position === 'A' || position === 'B' || position === 'C')) {
                errMsg += `\tposition not "A", "B", or "C" >> ` +
                           typeof position + ` '${position}'`;
                isErr = true;
            }

            if (isErr) throw errMsg;

            // Return the tower cooresponding to the lettered position
            switch (position) {
                case "A": return this._towers[0];  
                case "B": return this._towers[1]; 
                case "C": return this._towers[2]; 
            }

        }
        catch(err) {
            console.error(err);
        }        
    }
    
    /**
     * Return true if all the Disc objects have been moved to Tower object "C".  This method also
     * stops the game clock.
     * 
     * @return {boolean}
     */
    isWinner() {  
        // Do the number of discs on tower "C" equal the number of discs in the game?
        return (this.getTower("C").getNumberOfDiscs() === this._numberOfDiscs) ? true : false;
    }

    /**
     * Return the number of moves in the current game
     * 
     * @return {number}
     */

     /**
      * Return the number of moves in the current game
      * 
      * @return {boolean}
      */
     getNumberOfMoves() {
        return this._numMoves;
     }

     /**
      * Restart the game by initializing the Gameboard object
      * 
      * @param {number} numberOfDiscs The number of discs which start on tower A
      */
     restartGame(numberOfDiscs) {
         this.constructor(numberOfDiscs);
     }
     
     /**
      * Return the elapsed time of the winning game in "HH hr MM min SS sec" format
      * 
      * @return {string}
      */
     getWinningTime() {
        
        let seconds = 0;
        let minutes = 0;
        let hours = 0;
        
        if (this.isWinner()) {
                 
            // Get the number of elapsed seconds
            seconds = (this._endTime - this._startTime) / 1000;

            // Is winning time > than one minute?
            if (seconds >= 60) {
                minutes = seconds / 60;
                
                // Convert the fractional minutes portion into seconds 
                seconds = (minutes - Math.floor(minutes)) * 60; 

                // Is winning time > than one hour?
                if (minutes >= 60) {
                   // hours = Math.floor(Math.floor(minutes) / 60);
                   hours = minutes / 60;                   
                   minutes = minutes / 60;
                }
            }            
            
            // Round seconds to the thousandth place and fix decimal to three places
            seconds = (Math.round(seconds * 1000) / 1000).toFixed(3); 
            
            // Get the integer portion of minutes
            minutes = Math.floor(minutes);

            // Get the integer portion of hours
            hours = Math.floor(hours);
            
            return hours.toString() + " hr " + minutes.toString() + " min " + seconds.toString() + 
            " sec";
            
        } else {
            return "";
        }
     }
}



