/**
 * The Tower class represents a Tower object where Disc objects are added to the top
 */
class Tower {
           
    /**
     * Create a new Tower object
     * @constructor
     * 
     * @param {string}  id        The Tower object's id on the gameboard
     * @param {boolean} isInitial Flag which marks the tower as the initial tower where discs start
     * @param {number}  width     Width of the tower in px
     * @param {number}  height    Height of the tower in px
     * @param {string}  color     String representation of color: rgb, hex, or named color
     * @param {Disc[]}  discs     Array of Disc objects on tower
     */
    constructor(id, isInitial, width, height, color) {
    	
    	this._id = "";           // ID of the tower              
    	this.setID(id);
    	
    	this._isInitial = false; // Flag which marks the tower as the initial tower where discs start  
        this.setInitial(isInitial);
        
        this._width = 0;          // Width of the tower in px
        this.setWidth(width);
        
        this._height = 50;       // Height of the tower in px
        this.setHeight(height);
        
        this._color = "";        // String representation of disc color: rgb, hex, or named color
        this.setColor(color);
        
        this._discs = [];        // Array of Disc objects on tower
    }
    
    /**
     * Set the ID of the Tower object
     * 
     * @ignore
     * @param {string} id The Tower object's id on the gameboard
     */
    setID(id) {
        
        try {
            
            let errMsg = `In call to ${this.constructor.name}.setID(id)...\n`;

            if (typeof id !== "string") {
                errMsg+= `\tid not string! >> '${id}'`;
                throw errMsg;
            }

            this._id = id;
        }
        catch(err){
            console.error(err);
        }
    }
    
    /**
     * Return the Tower object's ID
     * 
     * @return {string} 
     */
    getID() {
        return this._id;
    }

    /**
     * Set the Tower object's isInitial flag which marks the tower where discs start
     * 
     * @param {boolean} isInitial The Tower object's isInitial flag
     */
    setInitial(isInitial) {
        
        try {
            
            let errMsg = `In call to ${this.constructor.name}.setInitial(isInitial)...\n`;

            if (typeof isInitial !== "boolean") {
                errMsg+= `\tisInitial not boolean! >> '${isInitial}'`;
                throw errMsg;
            }

            this._isInitial = isInitial;
        }
        catch(err){
            console.error(err);
        }
    }

    /**
     * Return the Tower object's isInitial flag which marks the tower where discs start
     * 
     * @return {boolean} 
     */
    isInitial() {
       return this._isInitial;
    }
    
    /**
     * Set the width of the Tower object
     *
     * @param {number} width Width of the tower in px
     */
    setWidth(width) {
        try {
            
            let errMsg = `In call to ${this.constructor.name}.setWidth(width)...\n`;
            
            if (isNaN(width))  {
                errMsg += `\twidth not numeric! >> '${width}'`; 
                throw errMsg;
            }
            
            this._width = width;
        }
        catch (err) {
            console.error(err);     
        }
    }

    /**
     * Get the width of the Tower object
     * 
     * @return {number}
     */
    getWidth() {
        return this._width;
    }
    
    /**
     * Set the height of the Tower object
     *
     * @param {number} height Height of the tower in px
     */
    setHeight(height) {
        try {
            
            let errMsg = `In call to ${this.constructor.name}.setHeight(height)...\n`;
            
            if (isNaN(height))  {
                errMsg += `\theight not numeric! >> '${height}'`; 
                throw errMsg;
            }
            
            this._height = height;
        }
        catch (err) {
            console.error(err);     
        }
    }

    /**
     * Get the height of the Tower object
     * 
     * @return {number}
     */
    getHeight() {
        return this._height;
    }

    /**
     * Set the color of the Tower object
     *
     * @param {string} color String representation of color: rgb, hex, or named color
     */
    setColor(color) {
        try {
            
            let errMsg = `In call to ${this.constructor.name}.setColor(color)...\n`;
            
            if (typeof color !== "string")  {
                errMsg += `\tcolor not string type! >> '${color}'`;
            
                throw errMsg;
            }
            
            this._color = color;
        }
        catch (err) {
            console.error(err);     
        }
    }
    
    /**
     * Get the color of the Disc object
     *
     * @return {string} 
     */
    getColor() {
        return this._color;
    }
    
    /**
     * Add a Disc object to the top of the tower
     *
     * @param {Object} disc Disc object with width > width of the top Disc object, if it exists
     */
    addTopDisc(disc) {
        
        try {
            
            let bottomDiscWidth = 0;
            let isErr = false;
            let errMsg = `In call to ${this.constructor.name}.addTopDisc(disc)...\n`;
            
            // Throw error if parameter is not a Disc object
            if(disc.constructor.name !== 'Disc') {
                errMsg += `\tdisc is not a Disc object! >> ` + 
                          `${disc.constructor.name}' - '${disc}'\n`;
                                                    
                isErr = true;
            }   
            
            // Throw error if disc is equal to or larger than the last disc in the collection
            // (i.e. the disc below it on the tower)
            if (this._discs.length >= 1) {
                
                bottomDiscWidth = this._discs[this._discs.length -1].getWidth();

                if (disc.getWidth() >= bottomDiscWidth) {
                    errMsg += `\tdisc width must be < the width of the disc below it! >> ` + 
                              `'${disc.getWidth()}' > '${bottomDiscWidth}'\n`;

                    isErr = true;
                }
            } 
          
            if (isErr) throw errMsg;
            
            this._discs.push(disc); // Add a disc to the top of the tower      
        }
        catch(err) {
            console.error(err);
        }   
    }

    /**
     * Add a Disc object to the bottom of the tower
     *
     * @param {Object} disc Added Disc object's width must be greater than the width of the top Disc 
     * object's width, if it exists
     */
    addBottomDisc(disc) {
        
        try {
            
            let topDiscWidth = 0;
            let isErr = false;
            let errMsg = `In call to ${this.constructor.name}.addBottomDisc(disc)...\n`;
            
            // Throw error if parameter is not a Disc object
            if(disc.constructor.name !== 'Disc') {
                errMsg += `\tdisc is not a Disc object! >> ` + 
                          `${disc.constructor.name}' - '${disc}'\n`;
                                                    
                isErr = true;
            }   
            
            // Throw error if disc is equal to or less than the last disc in the collection
            // (i.e. the disc above it on the tower)
            if (this._discs.length >= 1) {
                
                topDiscWidth = this._discs[0].getWidth();

                if (disc.getWidth() <= topDiscWidth) {
                    errMsg += `\tdisc width must be > the width of the disc above it! >> ` + 
                              `'${disc.getWidth()}' > '${topDiscWidth}'\n`;

                    isErr = true;
                }
            } 
          
            if (isErr) throw errMsg;
            
            this._discs.unshift(disc); // Add a disc to the bottom of the tower      
        }
        catch(err) {
            console.error(err);
        }   
    }
    
    /**
     * Remove a Disc object from the top of the tower
     * 
     */
    removeTopDisc() {  
        this._discs.pop(); // Remove a disc from the top of the tower      
    }

    /**
     * Remove a Disc object from the bottom of the tower
     * 
     */
    removeBottomDisc() {  
        this._discs.shift(); // Remove a disc from the bottom of the tower      
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

    /**
     * Return the array of disc objects on the tower
     * 
     * @return {Disc[]}
     */
    getDiscs() {
        return this._discs;
    }
}