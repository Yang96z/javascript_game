import promptSync from "prompt-sync"

let prompt = new promptSync();

// Constants for the game
const WIN = "Congratulations. You found the hat ";
const LOSE = "You lost.";
const OUT_BOUND = "You are out of the field";
const INTO_HOLE = "You fell into a hole";
const WELCOME = "Welcome to Find Your Hat Game";
const DIRECTION = "(w)up, (s)down, (a)left, (d)right?";
const QUIT = "Press q or Q to quit.";
const END_GAME = "Game Ended. Thank you";
const NOT_RECOGNISED = "Input not recognised.";

// Constants for game elements;
//ANSI Color Codes
const HAT = "\x1b[35m^\x1b[0m"; 
const HOLE = "\x1b[33mO\x1b[0m";
const GRASS = "\x1b[32m░\x1b[0m";
const PLAYER = "\x1b[34m*\x1b[0m";

// Create the class for the game 
class Field{

    //constructor, initialise the game 
    constructor(rows, cols){
        this.rows = rows;
        this.cols = cols;
        this.field = new Array();
        this.gamePlay = false;
        this.playerRow = 0;                                          //track player position within the field
        this.playerCol = 0;
        // this.startTime = 0;                 
        // this.timeInterval = null;
    }

    //methods for the game
    static welcomeMessage(msg){
        console.log(
            "\x1b[31m\n*****************************\n\x1b[0m"
            + msg +
            "\x1b[31m\n*****************************\n\x1b[0m"

            +  "\x1b[36mYou as a player (blue)\x1b[0m are searching for your " + 
            "\x1b[35mhat (purple)\x1b[0m" + 
            " in the land of " + "\x1b[32mgrassfield (green)\x1b[0m" + "but\nbeware there are some " + "\x1b[33mholes\x1b[0m" + " laying around waiting to trap you in... see how fast you can get to your lovely hat!\x1b[0m"
            );
    }

    // method to generate game field
    generateField(){
        for(let i =0; i<this.rows; i++){
            this.field[i] = new Array();
            for(let j =0; j<this.cols; j++){
            this.field[i][j] = Math.random() > 0.07 ? GRASS : HOLE;   // randomize the field with holes

        }
    }
    // generate new placement for hat untill its different pos from player [0][0]
        let hatRow, hatCol;
        do{
            hatRow = Math.floor(Math.random()* this.rows);
            hatCol = Math.floor(Math.random()* this.cols);
        } while(hatRow === 0 && hatCol === 0);

        this.field[hatRow][hatCol] = HAT;

}

        //method to print the game field
        printField(){
            this.field.forEach(row=>console.log(row.join("")));
        }
        
        //end the game
        endGame(){
            console.log(END_GAME);
            this.gamePlay = false;
            // clearInterval(this.timeInterval);
            process.exit();
        }

        // startTimer(){
        //     this.timeInterval = setInterval(() =>{
        //         this.startTime++;
        //     }, 1000);
        // }


         updatePlayer(position){
            //assign a different row/col to track player movement inside the field
            let newRow = this.playerRow;
            let newCol = this.playerCol;

            //for rows -- means shift up since minus one index from current pos, for col -- means shift left
            switch(position){
                case "w": newRow --; break;
                case "s": newRow ++; break;
                case "a": newCol --; break;
                case "d": newCol ++; break;
            }
            

            //check for rows,col max and min index and if the player step through the limit imposed
            //this.rows=10 index is from 0-9, newRow would need >= to cover from 0-10
            if(newRow < 0 || newRow >= this.rows || newCol <0 || newCol >= this.cols){   
                console.log(OUT_BOUND);
                this.endGame();
                return;
            }

            const nextMove = this.field[newRow][newCol];

            if(nextMove === HOLE){
                console.log(INTO_HOLE);
                this.endGame();
                return;
            }
            else if(nextMove === HAT){
                const timeTaken = Math.floor((Date.now() - this.startTime) / 1000);
                console.log(WIN + `and took ${timeTaken} seconds!`); 
                this.endGame();
                return;
            }


            //reset the previous position to grass after the player move
            this.field[this.playerRow][this.playerCol] = GRASS;

            //set player position to gamefield and update accordingly once player move
            this.playerRow = newRow;
            this.playerCol = newCol;
            this.field[this.playerRow][this.playerCol] = PLAYER;

         }

        //method to update the game
        updateGame(){
            let userInput = "";                         //obtain user input
            do{
                console.log(DIRECTION.concat(" ", QUIT));
                userInput = prompt();
                switch (userInput.toLowerCase()) {                          //validate user input
                    case "w": 
                        console.log("You moved up \n");
                        this.updatePlayer(userInput.toLowerCase());
                        break;
                    case "s":
                        console.log("You moved down \n");
                        this.updatePlayer(userInput.toLowerCase());
                        break;
                    case "a":
                        console.log("You moved left \n");
                        this.updatePlayer(userInput.toLowerCase());
                        break;
                    case "d":
                        console.log("You moved right \n");
                        this.updatePlayer(userInput.toLowerCase());
                        break;
                    
                      
                    case "q":   
                        this.endGame();
                        break;
                    default:
                        console.log(NOT_RECOGNISED);
                        break;
                }

                this.printField();                       // update the field

            }while(userInput.toLowerCase() !== "q")     // while the player did not quit (q)
        }

        //method to start the game
        startGame(){
            this.gamePlay = true;                       // set gamePlay to true
            this.generateField();                       // populate the game's field
            this.field[this.playerRow][this.playerCol] = PLAYER;                  //set the player start pos
            this.printField();
            this.startTime = Date.now();
            this.updateGame();                          
        }

}

// Call the static method in class field (no instantiation needed)
Field.welcomeMessage(WELCOME);

const ROWS = 8;
const COLS = 20;


const gameField = new Field(ROWS,COLS);

gameField.startGame();