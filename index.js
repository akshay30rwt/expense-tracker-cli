const { addExpense, viewExpenses, deleteExpense, totalSpent } = require('./expenses/expense-manager');

const command = process.argv[2];
const arg1 = process.argv[3];
const arg2 = process.argv[4];
const arg3 = process.argv[5];

if(command === 'add') {
    addExpense(arg1, Number(arg2), arg3);
} else if(command === 'view') {
    viewExpenses();
} else if(command === 'delete') {
    deleteExpense(Number(arg1));
} else if(command === 'total') {
    totalSpent();
} else {
    console.log('Unknown command. Use: add, view, delete, total');
}