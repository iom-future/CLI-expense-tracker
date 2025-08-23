//importing all the modules needed
import promptSync from 'prompt-sync'
import boxen from 'boxen';
import chalk from 'chalk';
import clear from 'clear';
import figlet from 'figlet'
import Table from 'cli-table3'
import {addExpense, loadExpenses} from "./expenseManager.js";
import {addIncome, loadIncomes} from "./incomeManager.js";
import {setSaving, loadSavingGoals} from "./savingManager.js";
const prompt = promptSync();

//TODO:make multi select input style
//TODO:download davinciresolve
//VARIABLES
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
                let descriptionForIncome = prompt('How did you earn: ');
                let amountForIncome = Number(prompt("How much did you earn: "));
                let tagForIncome = prompt('enter tag: ');
                // add an income
                addIncome(descriptionForIncome, amountForIncome);
                isRunning =false;
                break;
            case 'E':
                let descriptionForExpense = prompt('What did you spend on: ');
                let amountForExpense = Number(prompt("How much did you spend: "));
                // add an expense
                addExpense(descriptionForExpense, amountForExpense);
                isRunning =false;
                break
            default:
                incomeOrExpenses = prompt("INPUT NOT SUPPORTED\ " +
                    "add income or expense(I/E): ").toUpperCase();
                break;
        }
   }
}


function viewReport(){
    console.log('under construction');
}
function setSavingGoal(){
      let savingPurpose = prompt('what are you saving for: ');
      let savingAmount = Number(prompt('how much do you plan on saving'));
      let tag = prompt('enter tag: ');
      setSaving(savingPurpose,savingAmount,tag);
      console.log('saving goal set successfully')
}
function profile(){

}
console.log('lets personalize your app');
//set up  profile
let userName = prompt("what's your name: ");
//TODO:get an object that has lots of country and their currency (key:value pair)
let countryCurrency = prompt('what country are you from: ');
//take some time before displaying to make it look real
/*setTimeout(()=>{console.log('preparing app◽◽◽◽◽◽◽')},2000);
setTimeout(()=>{console.log('setting theme◽◽◽◽◽◽◽')},5000);*/

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
📃view transaction  🖋add transaction  📊View report  💰Set saving goals  👩Profile  ❌ Exit App
${terminalBox(color.info('tip: 1-view transaction,2-add transaction,3-view report......'))}
 `)
//user input to navigate through app features
let userAction = Number(prompt("what do you want to do(enter in numbers): "));
clear();
while(!(userAction===6)) {
    switch (userAction) {
        case 1:
            console.log(viewTransaction());
           displayTotalTransactionData().forEach(obj=> {if (obj.category==='income'){
                 console.log(`${color.neutralText(obj.description)}: ${color.success(obj.amount)}`);

            }else{
                console.log(`${color.neutralText(obj.description)}: ${color.error(obj.amount)}`);
            }})
            break;
        case 2:
            addTransaction()
            break;
        case 3:
            viewReport()
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

    }
    userAction = Number(prompt("what do you want to do(enter in numbers): "));
}
