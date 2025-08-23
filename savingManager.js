//import the file reading module
import fs from 'fs';
import {loadExpenses} from "./expenseManager.js";

//name of file to be read and written into
const FILE = 'saving.json'; //why in qoutes

//read all the expense from the file and convert them to object
export function savingGoals() {
    // if there is no file yet, return an empty array
     if (!fs.existsSync(FILE)){
         return [];
     }
     //else -- no need for else statement cause if the 'if statement 'evaluate to falsy
    // the one down get executed, else the 'if statement' get executed then the function return a value i.e no need to go further than if statement
    //read the file
    const data = fs.readFileSync(FILE);
    // turn the string into a JavaScript object,we can work with
    return JSON.parse(data);
}

//save expense back to the json file
export function saveSavingGoal(savings){
    //each parameter explained
    //FILE --- the json file you are writing(saving) to
    //JSON.stringify(savings, null, 2)-- what you want to write --- the json file you want to write and how
    //saving - the json file to be saved
    //null - replacer;replace nothing.
    //2 - indentation space i.e format of saving
    fs.writeFileSync(FILE,JSON.stringify(savings,null,2))
}

//add a saving goal
export function setSaving(purpose='none',amount=0,tag='none') {
    let savings =savingGoals(); //array of transaction [{transaction 1,transaction2,ets...}]
    //create a new object of transaction
    const saving={
        id:Date.now(),
        purpose,
        amount,
        tag,
        date: new Date.toDate()
    }
    //put the new saving object into the array of object
    savings.push(saving);

    //write(save) the edited array back into the json file
    saveSavingGoal(savings);//rewrite the old json file with the new one(that has the edits)
}