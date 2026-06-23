const fs = require('fs');
const FILE_PATH = './data.json';

function readData() {
    const fileContent = fs.readFileSync(FILE_PATH, 'utf-8');
    return JSON.parse(fileContent);
}

function writeData(data) {
    fs.writeFileSync(FILE_PATH, JSON.stringify(data, null, 2));
}

function addExpense(title, amount, category) {
    const data = readData();

    const maxId = data.expenses.length > 0 
    ? Math.max(...data.expenses.map(expense => expense.id))
    : 0

    const newExpense = {
        id: maxId + 1,
        title: title,
        amount: amount,
        category: category
    }
    data.expenses.push(newExpense);
    writeData(data);
    console.log(`Expense: '${title}' added successfully`);
}

function viewExpenses() {
    const data = readData();
    if(data.expenses.length === 0) {
        console.log('No expense found');
        return;
    }

    data.expenses.forEach(expense => {
        console.log(`ID: ${expense.id} | Title: ${expense.title} | Amount: ${expense.amount} | Category: ${expense.category}`);
    });
}

function deleteExpense(id) {
    const data = readData();
    const index = data.expenses.findIndex(expense => expense.id === id);

    if(index === -1) {
        console.log(`Expense with ID: ${id} not found`);
        return;
    }
    const deletedExpense = data.expenses[index];
    data.expenses.splice(index, 1);
    writeData(data);
    console.log(`Expense: '${deletedExpense.title}' deleted successfully`);
}

function totalSpent() {
    const data = readData();
    let spent = 0;
    data.expenses.forEach(expense => spent += expense.amount);
    console.log(`Total amount spent: ${spent}`);
}

module.exports = { addExpense, viewExpenses, deleteExpense, totalSpent };