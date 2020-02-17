/**
 * @file This is the entry point into the application
 */

// Include class files and test file
include("./js/Disc.js");
include("./js/Tower.js");
include("./js/Gameboard.js");
include("./js/test.js");

















/**
 * Include external files into the main file in order to reference only one src in index.html 
 * <br><br> 
 * Reference: [How to include a JavaScript file in another JavaScript file]{@link https://www.geeksforgeeks.org/how-to-include-a-javascript-file-in-another-javascript-file/}
 * 
 * @param {string} file Path to include file 
*/
function include(file) { 
  
    let script  = document.createElement('script'); 
    script.src  = file; 
    script.defer = true; 
        
    document.querySelector("body").appendChild(script);
}