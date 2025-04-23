const prompt = require("prompt-sync")();

// Game elements
const GRASS = "░";
const HOLE = "O";
const HAT = "^";
const PLAYER = "*";

const rows = 20;
const cols = 20;

const field = [];                                           // Create an array for the game field

/* 
    populate the game field as a 2D array - using Math.random()
    via nested loops 
    Note: Math.random() generates random numbers ranging from 0 - 0.9999
*/

for(let i=0; i<rows; i++){
    field[i] = [];                                          // same as field = new Array();
    for(let j=0; j<cols; j++){                              // populate the column in each field's row
        field[i][j] = Math.random() > 0.2 ? GRASS : HOLE;   // randomize the field with holes
    }
}

field[0][0] = PLAYER;                                                     // Populate PLAYER at the start of the game

for(let row of field){
console.log(row.join(""));
}

