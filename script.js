const balance = document.getElementById('balance');
const incomeList = document.getElementById('income-list');
const expenseList = document.getElementById('expense-list');
const addTransactionForm = document.getElementById('add-transaction-form');
const transactionType = document.getElementById('transaction-type');
const transactionAmount = document.getElementById('transaction-amount');

let transactions = [];

function updateBalance() {
    const totalIncome = transactions
        .filter(tx => tx.type === 'income')
        .reduce((acc, tx) => acc + tx.amount, 0);
    const totalExpense = transactions
        .filter(tx => tx.type === 'expense')
        .reduce((acc, tx) => acc + tx.amount, 0);
    const balanceAmount = totalIncome - totalExpense;
    balance.textContent = `Balance: $${balanceAmount.toFixed(2)}`;
}
function renderTransactions() {
    incomeList.innerHTML = '';
    expenseList.innerHTML = '';
    transactions.forEach(tx => {
        const listItem = document.createElement('li');
        listItem.textContent = `${tx.type === 'income' ? '+' : '-'} $${tx.amount.toFixed(2)}`;
        if (tx.type === 'income') {
            incomeList.appendChild(listItem);
        } else {
            expenseList.appendChild(listItem);
        }
    });
}
function addTransaction(event) {
    event.preventDefault();
    const type = transactionType.value;
    const amount = parseFloat(transactionAmount.value);
    if (!amount || amount <= 0) {
        alert('Please enter a valid amount.');
        return;
    }
    transactions.push({ type, amount });
    updateBalance();
    renderTransactions();
    addTransactionForm.reset();
}
addTransactionForm.addEventListener('submit', addTransaction);
updateBalance();
renderTransactions();  
 