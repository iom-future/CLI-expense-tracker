// 📦 import the file system module
import fs from "fs";
import {loadExpenses, saveExpenses} from "./expenseManager.js";

// 🏷 name of our file
const FILE = "incomes.json";

// 📖 read all expenses from the file
export function loadIncomes() {
    // if there is no file yet, return an empty list
    if (!fs.existsSync(FILE)) {
        return [];
    }

    // read the file
    const data = fs.readFileSync(FILE);

    // turn the string into JavaScript (like magic)
    return JSON.parse(data);
}

// 💾 save expenses back to the file
export function saveIncomes(incomes) {
    // write(save) expenses into file, nice and pretty
    //FILE(param)-- where you want to write into
    //JSON.stringify(expenses, null, 2)-- what you want to write
    fs.writeFileSync(FILE, JSON.stringify(incomes, null, 2));
}

// ➕ add a new expense
export function addIncome(description, amount,tag) {
    let incomes = loadIncomes();
    const income = {
        id: Date.now(),               // unique ID
        description,                  // what we spent on
        amount, // how much
        tag,
        category:'income',
        date: new Date().toISOString() // when
    };

    // put this new block in the box
    incomes.push(income);

    // save the box again
    saveIncomes(incomes);
}

export function updateIncomes(id,...thingsToUpdate) {
    let incomes = loadIncomes();
    let selectedObject;
    let indexOfSelectedObject;
    //get object you want to update vai id
    for(let object of incomes){
        if(object.id.toString().slice(10,13)===id){
            selectedObject=object;
            indexOfSelectedObject=incomes.indexOf(object);
        }
    }
    //destructure things to update and set default value incase they didnt change a 'particular property'
    let [newPurpose=selectedObject.purpose,newAmount=selectedObject.amount,newTag=selectedObject.tag] = thingsToUpdate;
    //begin update with provided change
    selectedObject.description=newPurpose;
    selectedObject.amount=newAmount;
    selectedObject.tag=newTag;
    //replace old object with updated one
   incomes.splice(indexOfSelectedObject,1,selectedObject);
    saveExpenses(incomes);
}