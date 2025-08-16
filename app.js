//importing all the modules needed
import promptSync from 'prompt-sync'
import boxen from 'boxen';
import chalk from 'chalk';
import clear from 'clear';
const prompt = promptSync();
//VARIABLES
let income = 0.00;
let expense = 0.00;
let totalBalance = income -expense;
//a function that structure the boxes in a consistent manner
function terminalBox (text){
    return boxen(text,
        {
            padding: 0,
            borderStyle: "round",
            textAlignment: "center",
            margin:{left:1}
        });
}

//an object that allows you use different colors in specific situation
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
//A function that gets the time in order to greet user accordingly
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
         ${getDate("month")}th month,${getDate("year")} 
${displayTotalBalance}
${displayIncome}
${displayExpense}
            ========== ${date.toDateString()} =========
${color.neutralText('no transaction for now')} 
`
}
function addTransaction() {

}
console.log('lets personalize your app');
let userName = prompt("what's your name: ");
//welcome message below
console.log(`${color.neutralText(getTime(),userName)}
    ${color.banner(`Welcome to ${color.neutralText('Future Expense Tracker')}
 A place to budget,save and track income`)}
 
   ${color.header('What Would you Like to do Today')}
📃view transaction  🖋add transaction  📊View report  💰Set saving goals  👩Profile  ❌ Exit App
${terminalBox(color.info('tip: 1-view transaction,2-add transaction,3-view report......'))}
 `)
//user input in order to navigate through app features
let userAction = Number(prompt("what do you want to do(enter in numbers): "));
clear();
while(!(userAction===6))
switch(userAction){
    case 1:
       console.log(viewTransaction());
       userAction = Number(prompt("what do you want to do(enter in numbers): "));
        break;
    case 2:
        addTransaction()
        break;
}
