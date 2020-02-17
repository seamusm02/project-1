/**
 * The Disc class represents a Disc object which can be added and removed from a Tower 
 * object
 */
class Disc {
    
    // Private properties
    _width = 0;   // Width of a disc in px
    _height = 0;  // Height of a disc in px
    _color = '';  // String representation of disc color: rgb, hex, or named color
        
    /**
     * Construct a new Disc object with specified width and color
     * 
     * @constructor
     * 
     * @param {number} width Width of the disc in px
     * @param {string} color Color of the disc in hex, rgb, or name
     */
    constructor(width, color) {
        this._setWidth(width);
        this._setColor(color);
    }
    
    /**
     * Set the width of the Disc object
     *
     * @ignore
     * @param {number} width
     */
    _setWidth(width) {
        try {
            
            let isErr = false;
            let errMsg = `In call to ${this.constructor.name}.setWidth(width)...\n`;
            
            if (isNaN(width))  {errMsg += `\twidth not numeric! >> '${width}'`; isErr = true;}
            if (isErr) throw errMsg;
            
            this._width = width;
        }
        catch (err) {
            console.error(err);     
        }
    }

    /**
     * Get the width of a Disc object
     * 
     * @return {number}
     */
    getWidth() {
        return this._width;
    }
    
    /**
     * Set the color of the Disc object
     *
     * @ignore
     * @param {string} color
     */
    _setColor(color) {
        try {
            
            let isErr = false;
            let errMsg = `In call to ${this.constructor.name}.setColor(color)...\n`;
            
            if (typeof color !== "string")  {errMsg += `\tcolor not string type! >> ` + 
                                                       `'${color}'`; isErr = true;}
            if (isErr) throw errMsg;
            
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