/**
 * The Disc class represents a Disc object which can be added and removed from a Tower 
 * object
 */
class Disc {
        
    /**
     * Construct a new Disc object with specified width and color
     * 
     * @constructor
     * 
     * @param {string} id     ID of the disc
     * @param {number} width  Width of the disc in px
     * @param {number} height Height of the disc in px
     * @param {string} color  Color of the disc in hex, rgb, or name
     */
    constructor(id, width, height, color) {
    	
    	this._id = "";          // ID of disc (string value)
    	this.setID(id);
    	
    	this._width = 0;        // Width of a disc in px
        this.setWidth(width);
        
        this._height = 0;       // Height of a disc in px
        this.setHeight(height);
          
        this._color = "";       // String representation of color: rgb, hex, or named color
        this.setColor(color);
    }
    
    /**
     * Set the disc ID
     *
     * @param {string} id The string ID of the Disc object 
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
        catch (err) {
            console.error(err);
        }    
    }

    /**
     * Return the Disc object's ID
     * 
     * @return {string}
     */
    getID() {
        return this._id;
    }
    
    /**
     * Set the width of the Disc object
     *
     * @param {number} width
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
     * Get the width of the Disc object
     * 
     * @return {number}
     */
    getWidth() {
        return this._width;
    }

    /**
     * Set the height of the Disc object
     *
     * @param {number} height
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
     * Return the height of the Disc object
     * @return {number}
     */
    getHeight() {
        return this._height;
    }
    
    /**
     * Set the color of the Disc object
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
}