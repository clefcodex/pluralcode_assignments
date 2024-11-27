
const balanceTag = document.querySelector('#balance');
const incomeTag = document.querySelector('#income');
const expenseTag = document.querySelector('#expense');
const transactionAmount = document.querySelector('#transactionAmount');
const transactionTtitle = document.querySelector('#transactionTtitle');
const transactionType = document.querySelector('#transactionType');
const displayHistory = document.querySelector('#displayHistory');
const showHistory = document.querySelector('#showHistory');
const contentTable = document.querySelector('.content-table');


const form = document.querySelector('form')

let balance = 0;
let income = 0;
let expense = 0;
let transactions = [];


loadTracker();

form.addEventListener('submit', (e) => {
    // e.preventDefault();

    
    if(transactionType.value === 'income') {
        income += Number(transactionAmount.value);
        balance += Number(transactionAmount.value);
        
    } else {
        expense += Number(transactionAmount.value);
        balance -= Number(transactionAmount.value);;
    }

    const transactionItem = {
        title: transactionTtitle.value,
        amount: transactionAmount.value,
        type: transactionType.value,
        date: formattedDate()
    };

    transactions.push(transactionItem);

    saveTracker();


})

function saveTracker() {

    localStorage.setItem('balance', JSON.stringify(balance));
    localStorage.setItem('income', JSON.stringify(income));
    localStorage.setItem('expense', JSON.stringify(expense));
    localStorage.setItem('transactions', JSON.stringify(transactions));
}

function formattedDate() {
    const date = new Date();
    return `${date.toDateString()} | ${date.toLocaleString().split(',')[1].trim()}`;
} 

function loadTracker() {
    balance = JSON.parse(localStorage.getItem('balance')) || 0
    income = JSON.parse(localStorage.getItem('income')) || 0
    expense = JSON.parse(localStorage.getItem('expense')) || 0
    transactions = JSON.parse(localStorage.getItem('transactions')) || []

    balanceTag.textContent = balance;
    incomeTag.textContent = income;
    expenseTag.textContent = expense;

    transactions.map((item) => {
        const titleTag = document.createElement('td');
        const amountTag = document.createElement('td');
        const typeTag = document.createElement('td');
        const dateTag = document.createElement('td');
        const itemRow = document.createElement('tr');
    
        titleTag.textContent = item.title;
        amountTag.textContent = item.amount;
        typeTag.textContent = item.type;
        dateTag.textContent = item.date;
    
        itemRow.appendChild(titleTag);
        itemRow.appendChild(amountTag);
        itemRow.appendChild(typeTag);
        itemRow.appendChild(dateTag);
    
        displayHistory.appendChild(itemRow)
    })
}


showHistory.addEventListener('click', () => {

    if(contentTable.style.display == "none") {
        contentTable.style.display = "table";
        showHistory.textContent = 'Hide Transaction History';
    } else {
        contentTable.style.display = "none";
        showHistory.textContent = 'Show Transaction History';
    }
    
})