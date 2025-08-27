
import {loadExpenses} from "./expenseManager.js";
import {loadIncomes} from "./incomeManager.js";
import {loadSavingGoals} from "./savingManager.js";


export let allTransaction=[...loadExpenses(), ...loadIncomes(),...loadSavingGoals()];
export function idChecker(id){
    let idExist = false;
    for(let object of allTransaction){
        if(object.id.toString().slice(10,13)===id){
            idExist = true;
        }
    }
    return idExist;
}