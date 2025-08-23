// 📦 import the file system module
import fs from "fs";

// 🏷 name of our file
const FILE = "expenses.json";

// 📖 read all expenses from the file
export function loadExpenses() {
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
export function saveExpenses(expenses) {
    // write(save) expenses into file, nice and pretty
    //FILE(param)-- where you want to write into
    //JSON.stringify(expenses, null, 2)-- what you want to write
    fs.writeFileSync(FILE, JSON.stringify(expenses, null, 2));
}

// ➕ add a new expense
export function addExpense(description, amount) {
    let expenses = loadExpenses(); //array of transaction [{transaction 1,transaction2,ets...}]
    //create a new object of transaction
    const expense = {
        id: Date.now(),               // unique ID
        description,                  // what we spent on
        amount,
        category:'expense',// how much
        date: new Date().toISOString() // when
    };

    // put this new object into the array of object
    expenses.push(expense);

    // save the box again
    saveExpenses(expenses);
}
