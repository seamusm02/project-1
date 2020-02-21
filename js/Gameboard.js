/**
 * The Gameboard class represents all entities on the gameboard: Disc objects, Tower 
 * objects, and user controls
 */
class Gameboard {    

    /**
     * Construct a new Gameboard with all necessary default values for child objects
     * 
     * @constructor
     * @param {Tower[]} towers An array of Tower objects 
     */
    constructor(towers) {
    	
    	this._towers = [];            // Array of Tower objects on the gameboard
    	this.setTowers(towers);
    	
    	this._numberOfDiscs = 0;      // Number of Disc objects on the gameboard
    	this._selectedDisc = {};      // The selected Disc object
    	this._destinationTower = {};  // The destination Tower object
    	this._numMoves = 0;           // Number of moves in the current game
    	this._startTime = 0;          // Time the game started (in ms since Unix Epoch)
    	this._endTime = 0;            // Time the game ended (in ms since Unix Epoch)
    	this._gameLog = {};           // Object of game stats      
    }

    /**
     * Add the array of Tower objects to the game board
     * 
     * @param {Tower[]} towers Array of Tower objects 
     */
    setTowers(towers) {
        
        try {
            
            let errMsg = `In call to ${this.constructor.name}.setTowers(towers)...\n`;
            
            // Throw error if towers is not an array            
            if (!Array.isArray(towers)) {
                errMsg += `\ttowers is not an Array! >> ${towers.constructor.name}' - ` +
                          `'${towers}'\n`;
                throw errMsg;
            } 
            
            // Throw error if any of the elements in towers is not a Towers object
            for (let i = 0; i < towers.length; i++) {
            
                if(towers[i].constructor.name !== 'Tower') {
                    errMsg += `\ttowers[${i}] is not a Tower object! >> ` + 
                            `${towers[i].constructor.name}' - '${towers[i]}'\n`;
                                                        
                    throw errMsg;
                }
            }

            this._towers = towers;
        }
        catch(err) {
            console.log(err);
        }
    }

    /**
     * Return the array of Tower objects 
     * 
     * @return {Tower[]} 
     */
    getTowers() {
        return this._towers;      
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

            toTower.addTopDisc(discToMove); // Add the top disc object to the destination tower
            fromTower.removeTopDisc();   // Remove the top disc object from the source tower            
            
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
     * @param {string} id The ID of the Tower object
     * @return {Object} 
     */
    getTower(id) {
        try {

            let errMsg = `In call to ${this.constructor.name}.getTower(id)...\n`;
     
            // Throw error if id is not a string
            if (typeof id !== "string") {
                errMsg += `\tid not string! >> ` + typeof id + "\n";
                throw errMsg;
            }

            // Throw error if id does not exist in the array of towers
            for (let tower of this.getTowers()) {
                if ( tower.getID() === id) return tower;
            }

            errMsg += `\tid not a valid tower ID! >> id = '${id}'\n`;
            throw errMsg;

        }
        catch(err) {
            console.error(err);
        }        
    }
    
    /**
     * Return true if all the Disc objects have been moved to TowerC. 
     * 
     * @return {boolean}
     */
    isWinner() {  
        // Do the number of discs on tower "C" equal the number of discs in the game?
        return this.getTower("towerC").getNumberOfDiscs() === this._numberOfDiscs ? true : false; 
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
      * @param {Disc[]} discs An array of Disc objects which will start on tower A
      */
     restart(discs) {
         this.constructor(discs);
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
            
            if (hours > 0) {
            	return hours.toString() + " hr " + minutes.toString() + " min " + seconds.toString() + 
                " sec";
            	
            }
            else if (minutes > 0) {
            	return minutes.toString() + " min " + seconds.toString() + " sec";
            }
            else {
            	return seconds.toString() + " sec";
            }
            
        } else {
            return "";
        }
     }
     
     /**
      * Set the number of discs on the game board 
      * 
      * @param {number} numberOfDiscs The number of discs to start with
      */
     setNumberOfDiscs(numberOfDiscs) {
         this._numberOfDiscs = numberOfDiscs;
     }

     /**
      * Return the number of discs on the game board 
      * 
      * @return {number}
      */
     getNumberOfDiscs() {
         return this._numberOfDiscs;
     }
     
     /**
      * Increment the number of discs on the gameboard by one
      */
     incrementNumberOfDiscs() {
    	 this._numberOfDiscs++;
     }
     
     /**
      * Decrement the number of discs on the gameboard by one
      */
     decrementNumberOfDiscs() {
    	 this._numberOfDiscs--;
     }
     
    /**
      * Start the game clock
      * 
      * @param {number} Date.now() to start game clock || 0 to reset game clock 
      */
    setStartTime(time) {
        try {

            let errMsg = `In call to ${this.constructor.name}.setStartTime(time)...\n`;
            
            if (typeof time !== "number") {
                errMsg += `\ttime not typeof number >> typeof time '${time}'`;
                throw errMsg;
            }

            this._startTime = time; // Start the game timer

        }
        catch(err) {
            console.log(err);
        }
    }
    
    /**
      * Return the game start time
      * 
      * @return {number} Returns the number of milliseconds since the Unix Epoch or 0
      */
    getStartTime() {
        return this._startTime;  
    }
    
   /**
     * End the game clock
     * 
     * @param {number} Date.now() to end game clock
     */
   setEndTime(time) {
       try {

           let errMsg = `In call to ${this.constructor.name}.setEndTime(time)...\n`;
           
           if (typeof time !== "number") {
               errMsg += `\ttime not typeof number >> typeof time '${time}'`;
               throw errMsg;
           }

           this._endTime = time; // End the game timer

       }
       catch(err) {
           console.log(err);
       }

   }
   
    /**
     * Return the game end time
     * 
     * @return {number} Returns the number of milliseconds since the Unix Epoch or 0
     */
   getEndTime() {
       return this._endTime;  
   }

    /**
     * Set the selected Disc object
     * 
     * @param {Object} disc The selected disc object
     */
    setSelectedDisc(disc) {

        try {
            
            let errMsg = `In call to ${this.constructor.name}.setSelectedDisc(disc)...\n`;
            
            // Throw error if parameter is not a disc object
           // if (disc.constructor.name !== "Disc") {
            //    errMsg += `\tdisc is not a Disc object! >> disc - ` + typeof disc + "\n";
                                                    
            //    throw errMsg;
          //  }
            
            this._selectedDisc = disc;
            
        }
        catch(err) {
                console.error(err);
        }

    }

    /**
     * Return the selected Disc object
     * 
     * @return {Object}
     */
    getSelectedDisc() {     
        return this._selectedDisc;
    }

    /**
     * Set the destination Tower object
     * 
     * @param {Object} tower The destination Tower object
     */
    setDestinationTower(tower) {

        try {
            
        	let errMsg = `In call to ${this.constructor.name}.setDestinationTower(tower)...\n`;
        	
        	// Throw error if parameter is not a Tower object
            if(tower.constructor.name !== "Tower") {
                errMsg += `\ttower is not a Tower object! >> tower - ` + typeof tower + "\n";
                                                    
                throw (errMsg);
            }
            
            this._destinationTower = tower;
            
        }
        catch(err) {
                console.error(err);
        }

    }

    /**
     * Return the destination Tower object
     * 
     * @return {Object}
     */
    getDestinationTower() {     
        return this._destinationTower;
    }
    
    /**
     * Create the game log after a win or giving up (i.e hitting the reset button)
     */
    setGameLog() {
    // date-time | Number of discs | Moves to win | Your Moves | Elapsed Time | "Won", "Gave up"
    	
    	let logString = "";
    	
    	let dateTime = new Date(this.getStartTime())
    	//dateTime.toLocaleString();
    	dateTime;
    	this._gameLog.dateTime = dateTime;
    	
    	logString += `${dateTime}\t`;

    	logString += this.getNumberOfDiscs().toString() + "\t";
    	
    	let numberOfDiscs = this.getNumberOfDiscs();
    	this._gameLog.numberOfDiscs = numberOfDiscs;
    	
    	let movesToWin = (Math.pow(2, this.getNumberOfDiscs()) - 1).toString();
    	logString += movesToWin + "\t";
    	movesToWin = (Math.pow(2, this.getNumberOfDiscs()) - 1);
    	this._gameLog.movesToWin = movesToWin;    	

        logString += this.getNumberOfMoves().toString() + "\t";
        
        let yourMoves = this.getNumberOfMoves();
        this._gameLog.yourMoves = yourMoves;
        
     // Get the number of elapsed seconds
        let seconds = (this._endTime - this._startTime) / 1000;
        let minutes = 0;
        let hours = 0;

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
    	
    	let elapsedTime = hours.toString() + " hr " + minutes.toString() + " min " + 
    	               seconds.toString() + " sec";
    	
    	logString += `${elapsedTime}\t`;
    	this._gameLog.elapsedTime = elapsedTime;
    	
        logString += this.isWinner() ? "Won" : "Gave Up";
        let status = this.isWinner() ? "Won" : "Gave Up";
        this._gameLog.status = status;
       
        
        //this._gameLog = logString;
    }
    
    /**
     * Return the game log
     * 
     * @return {string}
     */
    getGameLog() {
    	return this._gameLog;
    }
    
}


