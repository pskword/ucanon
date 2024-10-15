// readLine-sync Module 설치
// npm install readLine-sync


const readLine = require('readline-sync');

function showPrompt() {
    console.clear();
    let name = readLine.question('What is your name? ');
    console.log(`Hello ${name}!`);
};

showPrompt();
