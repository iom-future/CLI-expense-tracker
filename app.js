//importing all the modules needed
import promptSync from 'prompt-sync'
import boxen from 'boxen';
import chalk from 'chalk';
import clear from 'clear';
import figlet from 'figlet'
import fs from 'fs';
import Table from 'cli-table3'
import {addExpense, loadExpenses,updateExpenses} from "./expenseManager.js";
import {addIncome, loadIncomes,updateIncomes} from "./incomeManager.js";
import {setSaving, loadSavingGoals,updateSaving} from "./savingManager.js";
import {addProfile, readProfile,updateProfile} from "./profile-manager.js";
const prompt = promptSync();
import inquirer from "inquirer";


//TODO:make multi select input style
//TODO:download davinciresolve
//VARIABLES
let userName
let country
let password;
let income = 0.00;
let expense = 0.00;
let totalBalance = income -expense;
//a function that structure the boxes consistently
function terminalBox (text){
    return boxen(text,
        {
            padding: 0,
            borderStyle: "round",
            textAlignment: "center",
            margin:{left:1}
        });
}
//an object that allows you to use different colors in specific situation
const color = {
    banner : (message)=>chalk.cyanBright(message),
    header : (message)=>chalk.yellowBright.bold(message),
    //text: (message)=>chalk.blackBright(message),
    neutralText : (message,message2='')=>chalk.whiteBright(message,message2),
    success : (message)=>chalk.greenBright(message),
    error : (message)=>chalk.redBright(message),
    warning : (message)=>chalk.yellow(message),
    info : (message)=>chalk.blueBright(message),
}
function displayTotalTransactionData() {
    //concat loadExpenses() and loadIncomes() array then sort based on the time entered [sort chronologically]using the ID
/*    let transactionTable = new Table({
        head: ['description','amount'],
        style: {"padding-left":1,"padding-right":1},
        chars:{
            top:'',"top-mid":'',"top-left":'',"top-right":'',
            bottom:'',"bottom-mid":'',"bottom-left":'',"bottom-right":'',
            left:'','left-mid':'',
            mid:'','mid-mid':'',
            right:'','right-mid':'',
            middle:' '
        }
    });*/
    return [...loadExpenses(), ...loadIncomes()].sort((a, b) => a.id - b.id)
//console.log(totalTransactionData);
}

function idChecker(id){
    let idExist = false;
    for(let object of displayTotalTransactionData()){
        if(object.id.toString().slice(10,13)===id){
            idExist = true;
        }
    }
    return idExist;

}
function getTransactionDetails(ID) {
    //object === transaction
    let selectedObject,indexOfSelectedObject;
//get object you want to update vai id
    for(let object of displayTotalTransactionData()){
        if(object.id.toString().slice(10,13)===ID){
            selectedObject=object;
            if(selectedObject.category === 'income')
              indexOfSelectedObject=loadIncomes().indexOf(selectedObject);
            else if(selectedObject.category==='expense')
                indexOfSelectedObject=loadExpenses().indexOf(selectedObject);
            else
                indexOfSelectedObject=loadSavingGoals().indexOf(selectedObject);
        }
    }
    return[selectedObject,indexOfSelectedObject];
}

//A function that gets the time to greet user accordingly
const date = new Date;
function getTime(){

    let hour = date.getHours();
    if(hour<=11 && hour>=0 ){
        return 'Good Morning';
    }else if(hour>11 && hour<=16){
        return 'Good Evening';
    }else{
        return 'Good Evening';
    }
}
//function that returns a date depending on the parameter
function getDate(param){
    switch (param){
        case "year":
            return date.getFullYear();
        case "month":
            return date.getMonth();
        default:
            return date.toDateString()
    }


}



//App features in different functions
function viewTransaction(){
    let displayIncome = terminalBox(color.neutralText(`income: ${income}`));
    let displayExpense = terminalBox(color.neutralText(`Expense: ${expense}`));
    let displayTotalBalance = terminalBox(color.neutralText(`Total Balance: ${totalBalance}`));
    return `    ${color.header("VIEW TRANSACTION")}
         ${
        getDate("month")}th month,${getDate("year")} 
${displayTotalBalance}
${displayIncome}
${displayExpense}
            ========== ${date.toDateString()} =========     
`
}
function addTransaction(){
    let incomeOrExpenses = prompt('add income or expense(I/E/Exit): ').toUpperCase();
//decide if it's adding an income or expense
let isRunning =true;
while(isRunning && incomeOrExpenses!=='EXIT') {
        switch (incomeOrExpenses) {
            case 'I':
                let descriptionForIncome = prompt('How did you earn: ') ||undefined;
                let amountForIncome = Number(prompt("How much did you earn: ")) ||undefined;
                let tagForIncome = prompt('enter tag: ') ||undefined;
                // add an income
                addIncome(descriptionForIncome, amountForIncome,tagForIncome);
                isRunning =false;
                break;
            case 'E':
                let descriptionForExpense = prompt('What did you spend on: ') ||undefined;
                let amountForExpense = Number(prompt("How much did you spend: ")) ||undefined;
                let tagForExpense= prompt('enter tag: ') ||undefined;
                // add an expense
                addExpense(descriptionForExpense, amountForExpense, tagForExpense);
                isRunning =false;
                break;
            default:
                incomeOrExpenses = prompt("INPUT NOT SUPPORTED\ " +
                    "add income or expense(I/E): ").toUpperCase();
                break;
        }
   }
}

function updateTransaction() {
    let ID = prompt('whats the id of the transaction you want to update(or exit): ').toUpperCase();
    let [selectedObject,indexOfSelectedObject] = getTransactionDetails(ID)
    let isRunning =true;
    while(isRunning && ID!=='EXIT') {
                //first if statement checks if there is any data at all
                if(loadIncomes().length !== 0||loadExpenses().length !== 0||loadSavingGoals().length !== 0) {
                    //this second if checks if the selected transaction[chosen by ID ] exists .
                    if(idChecker(ID)){
                        //if the user enters no value its becomes a falsy value therefore the || returns undefined else it returns the first truthy value
                        let newPurpose = prompt('change description(hit enter to leave purpose): ') || undefined;
                        let newAmount = prompt('change amount(hit enter to leave amount): ') || undefined;
                        let newTag = prompt('change tag(hit enter to leave tag): ') || undefined;
                        //this final conditional statement allow you edit specific transaction based on the certain category it belongs
                            if(selectedObject.category === 'income')
                                updateIncomes(selectedObject,indexOfSelectedObject,newPurpose, newAmount, newTag);
                            else if(selectedObject.category==='expense')
                                updateExpenses(selectedObject,indexOfSelectedObject,newPurpose, newAmount, newTag);
                            else
                                updateSaving(selectedObject,indexOfSelectedObject,newPurpose, newAmount, newTag);
                        console.log('transaction updated successfully');
                        isRunning = false;
                        break;
                    }else{console.log('transaction do not exist ');
                        isRunning = false;
                        break}
                }else{console.log('no transaction to edit');
                    isRunning = false;
               }


    }

}


function viewReport(){
    console.log('under construction');
}
function setSavingGoal(){
      let savingPurpose = prompt('what are you saving for: ') ||undefined;
      let savingAmount = Number(prompt('how much do you plan on saving: ')) ||undefined;
      let tag = prompt('enter tag: ') ||undefined;
      setSaving(savingPurpose,savingAmount,tag);
      console.log('saving goal set successfully')
}


//if no profile(entering for the first time) set up  profile
if(readProfile()===null){
    console.log('New to Future Expense Tracker.....lets personalize your app');
   userName = prompt("what's your name: ") || undefined;
   country = prompt('what country are you from: ').toLowerCase() || undefined;
   password = prompt('enter a strong password: ');
   addProfile(userName,country,password);
}else{
    userName = readProfile().name;
    country =readProfile().country;
    let passwordRequirementBeforeLogin = prompt(`welcome back ${userName}, please enter password: `)
    let passwordCheckerLoop = true;
    while(passwordCheckerLoop){
        if(passwordRequirementBeforeLogin===readProfile().password)
            passwordCheckerLoop =false;
        else
            passwordRequirementBeforeLogin=prompt('WRONG PASSWORD try again: ');
    }
}
function profile(){
//view profile details
    let profileDetails = `    ${color.header('YOUR PROFILE')}  
name: ${readProfile().name} 
country: ${readProfile().country}`
    //accessing the username from the json file allows you bypass the need to reload the program before variables can update
    console.log(profileDetails);
    let profileEdit =   prompt('do you want to edit profile(y/n/exit): ').toLowerCase();
    if (profileEdit==='y'){
        let newUserName = prompt('enter new user name(enter to leave the same): ') ||  undefined;
        let newCountry = prompt('enter new country(enter to leave the same): ') ||  undefined;
        updateProfile(newUserName,newCountry);
    }
}

const countryCurrency = {
    "united states": { code: "USD", symbol: "$" },
    "united kingdom": { code: "GBP", symbol: "£" },
    "european union": { code: "EUR", symbol: "€" },
    "japan": { code: "JPY", symbol: "¥" },
    "china": { code: "CNY", symbol: "¥" },
    "india": { code: "INR", symbol: "₹" },
    "nigeria": { code: "NGN", symbol: "₦" },
    "south africa": { code: "ZAR", symbol: "R" },
    "canada": { code: "CAD", symbol: "$" },
    "australia": { code: "AUD", symbol: "$" },
    "switzerland": { code: "CHF", symbol: "CHF" },
    "south korea": { code: "KRW", symbol: "₩" },
    "russia": { code: "RUB", symbol: "₽" },
    "brazil": { code: "BRL", symbol: "R$" },
    "mexico": { code: "MXN", symbol: "$" },
    "none": { code: "none", symbol: "" }
};


//welcome message below
console.log(`${color.neutralText(getTime(),userName)}
        ${figlet.textSync("Future Expense Tracker", {
    font: "Big",
    horizontalLayout: "fitted",
    verticalLayout: "default",
  //  width: 100,
    //whitespaceBreak: true,
})}
    ${color.banner(`Welcome to ${color.neutralText('Future Expense Tracker')}
 A place to budget,save and track income`)}
 
   ${color.header('What Would you Like to do Today')}
📃view transaction  🖋add transaction ✏ Edit Transaction 📊View report  💰Set saving goals  👩Profile  ❌ Exit App
${terminalBox(color.info('tip: 1-view transaction,2-add transaction,3-view report......'))}
 `)
//user input to navigate through app features
let userAction = Number(prompt("what do you want to do(enter in numbers): "));
clear();

//Main Menu

while(!(userAction===7)) {
    switch (userAction) {
        case 1:
            console.log(viewTransaction());
           displayTotalTransactionData().forEach(obj=> {if (obj.category==='income'){
                 console.log(`${color.neutralText(obj.description)}:${countryCurrency[country].symbol}${color.success(obj.amount)} with id ${obj.id.toString().slice(10,13)}`);
            }else{
                console.log(`${color.neutralText(obj.description)}: ${countryCurrency[country].symbol}${color.error(obj.amount)}  with id ${obj.id.toString().slice(10,13)}`);
            }});
            break;
        case 2:
            addTransaction()
            break;
        case 3:
            updateTransaction();
            break;
        case 4:
            viewReport();
            break;
        case 5:
            setSavingGoal();
            break;
        case 6:
            profile();
            break;
        default:
            userAction = Number(prompt("INPUT NOT SUPPORTED\ " +
                "What do you want to do(enter in numbers): "));
            break;

    }
    userAction = Number(prompt("what do you want to do(enter in numbers): "));
}

