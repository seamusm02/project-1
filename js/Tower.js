/**
 * The Tower class represents a Tower object where Disc objects are added to the top
 */
class Tower {
    
    // Private properties
    _width = 0;     // Width of the tower's base (must be larger than largest disc width)
    _height = 50;   // Height of the tower's 'disc collector' in px
    _position = ''; // Tower position: "A", "B", or "C"
    _discs = [];    // Array of Disc objects on tower
        
    /**
     * Create a new Tower object
     * @constructor
     * @param {string} position Set the Tower object's position on the gameboard: "A", "B", or "C"
     */
    constructor(position) {
        this._setPosition(position);
    }
    
    /**
     * Set the position of the tower
     * 
     * @ignore
     * @param {string} position Tower's position on the board: "A", "B", or "C"
     */
    _setPosition(position) {
        
        try {
            
            let isErr = false;
            let errMsg = `In call to ${this.constructor.name}.setPosition(position)...\n`;
            
            position = position.toUpperCase();
            
            // Throw error if position is not 'A', 'B', or 'C'
            if(! position.match(/^[ABC]$/)) {errMsg += `\tposition <> 'A'|'B'|'C'! >> ` +
                                                       `'${position}'`; isErr = true;}
            if (isErr) throw errMsg;
            
            this._position = position;

        }
        catch(err){
            console.error(err);
        }
    }
    
    /**
     * Return the postion of the tower: "A", "B", or "C"
     * 
     * @return {string} 
     */
    getPosition() {
        return this._position;
    }
    
    /**
     * Add a Disc object to the top of the tower
     *
     * @param {Object} disc Added Disc object's width must be less than the width of the top Disc 
     * object's width, if it exists
     */
    addDisc(disc) {
        
        try {
            
            let previousDiscWidth = 0;
            let isErr = false;
            let errMsg = `In call to ${this.constructor.name}.addDisc(disc)...\n`;
            
            // Throw error if parameter is not a Disc object
            if(disc.constructor.name !== 'Disc') {
                errMsg += `\tdisc is not a Disc object! >> ` + 
                          `${disc.constructor.name}' - '${disc}'\n`;
                                                    
                isErr = true;
            }   
            
            // Throw error if disc is equal to or larger than the last disc in the collection
            // (i.e. the disc below it on the tower)
            if (this._discs.length >= 1) {
                
                previousDiscWidth = this._discs[this._discs.length -1].getWidth();

                if (disc.getWidth() >= previousDiscWidth) {
                    errMsg += `\tdisc width must be < previous disc width! >> ` + 
                              `'${disc.getWidth()}' > '${previousDiscWidth}'\n`;

                    isErr = true;
                }
            } 
          
            if (isErr) throw errMsg;
            
            this._discs.push(disc); // Add a disc to the tower      
        }
        catch(err) {
            console.error(err);
        }   
    }
    
    /**
     * Remove a Disc object from the top of the tower
     * 
     */
    removeDisc() {  
        this._discs.pop(); // Remove a disc from the tower      
    }
    
    /**
     * Return the top Disc object on the tower
     * 
     * @return {Disc[]}
     */
    getTopDisc() {        
        return this._discs[this._discs.length - 1];
    }
    
    /**
     * Return true if Tower object contains at least one Disc object
     * 
     * @return {boolean}
     */
    hasDisc() {        
        return (this._discs.length > 0 )? true : false;
    }

    /**
     * Return the number of Disc objects on the tower
     * 
     * @return {number}
     */
    getNumberOfDiscs() {
        return this._discs.length;
    }
}