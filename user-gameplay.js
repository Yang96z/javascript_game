const prompt = require("prompt-sync")({sigint:true});

let input = null;

while(input !== "q"){
    console.log("(w)p, (s)own, (a)eft, (d)ight, (q)uit.");
    input = prompt("which way would you like to move?");
    console.log(input);

    switch(input.toLowerCase()){
        case "w":
            console.log("You moved up.\n");
            break;
        case "s":
            console.log("You moved down.\n");
            break;
        case "a":
            console.log("You moved left.\n");
            break;
        case "d":
            console.log("You moved right.\n");
            break;
        case "q":
            console.log("Thank you for playing");
            process.exit();
            break;
        default:
            console.log("Unrecognised Input!\n")
            break;
    }
}