
const balanceTag = document.querySelector('#balance');
const incomeTag = document.querySelector('#income');
const expenseTag = document.querySelector('#expense');
const transactionAmount = document.querySelector('#transactionAmount');
const transactionTitle = document.querySelector('#transactionTitle');
const transactionType = document.querySelector('#transactionType');

const form = document.querySelector('form')

let balance = 0;
let income = 0;
let expense = 0;

loadTracker();

form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    if(transactionType.value === 'income') {
        income += Number(transactionAmount.value);
        balance += Number(transactionAmount.value);
        
    } else {
        expense += Number(transactionAmount.value);
        balance -= Number(transactionAmount.value);;
    }

    saveTracker();
    
})

function saveTracker() {
    localStorage.setItem('balance', JSON.stringify(balance));
    localStorage.setItem('income', JSON.stringify(income));
    localStorage.setItem('expense', JSON.stringify(expense));
}


function loadTracker() {
    balance = JSON.parse(localStorage.getItem('balance')) || 0
    income = JSON.parse(localStorage.getItem('income')) || 0
    expense = JSON.parse(localStorage.getItem('expense')) || 0

    balanceTag.textContent = balance;
    incomeTag.textContent = income;
    expenseTag.textContent = expense;
}
