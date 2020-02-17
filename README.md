## Project 1 - Build a Game with HTML, CSS and JavaScript 

### Description   
The goal is to move all discs from tower A to tower C in the fewest possible moves.  The discs 
must be moved one at a time, stacking smaller discs on top of larger discs.

### Tower of Hanoi
![Towers of Hanoi - flatironschool](https://images.ctfassets.net/hkpf2qd2vxgx/56lxeRTnPTeYI4q3UqNnMu/5953458a408f7eb83cea26c9475e25d2/tumblr_inline_mutp1vmLcY1rtan47.jpg) 

* #### Bronze Plan  
  * MVP (Minimum Viable Product): Working game logic (no UI)
    * Game board starts with three towers and a variable number of discs, between 3 and 8 inclusive, on tower A - **TESTED and COMPLETE** 
    * Discs begin on tower A, stacked in increasing width from bottom to top - **TESTED and COMPLETE**       
    * Player can move a disc to any tower, provided there are no discs on the destination tower, or the top most disc on the destination tower is larger in width than the disc to move - 
      **TESTED and COMPLETE** 
    * When all discs have been moved from tower A to tower C, the game is over - **TESTED and COMPLETE**
    * Number of moves to achieve a winning game is calculated - **TESTED and COMPLETE**
    * Number of minimum moves for a given number of discs is calculated - **TODO**

* #### Silver Plan
  * Add time-based scoring to MVP, which calculates the duration of a winning game - **TESTED and COMPLETE**
  * Track scores across games (even if the page is reloaded) - **TODO**
  * Basic UI as shown above, with click-based events to transfer discs between towers - **TODO**

* #### Gold Plan
  * Polished UI with animations like the UI shown below
     
 ![Towers of Hanoi - animated](https://seamusm02.github.io/project-1/resource/animated_tower_of_hanoi.gif)

### Features   
* Class-based design
  * Classes for Disc, Tower, and Gameboard
  * Strict Encapsulation - Private properties ONLY!  Getters and Setters employed exclusively for the main 
    application's consumption.
  * Extensive error checking with TRY / THROW / CATCH
* Main js file acts as an entry point into the application and includes all class files
* Test js file for testing game logic without a UI
* JSDoc documentation for the source files located [here](https://seamusm02.github.io/project-1/jsdoc/)

### Technologies Used
* JavaScript
* HTML
* CSS

**[Towers of Hanoi - Link to Application on Github Pages](https://seamusm02.github.io/project-1/)**
