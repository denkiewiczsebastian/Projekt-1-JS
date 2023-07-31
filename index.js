const incomeForm = document.getElementById('incomeForm');
const incomeNameInput = document.getElementById('incomeName');
const incomeAmountInput = document.getElementById('incomeAmount');
const incomeList = document.querySelector('.incomeList');

const expenseForm = document.getElementById('expenseForm');
const expenseNameInput = document.getElementById('expenseName');
const expenseAmountInput = document.getElementById('expenseAmount');
const expenseList = document.querySelector('.expenseList');

const balanceDiv = document.querySelector('.balance');

let incomes = [];
let expenses = [];

function updateBalance() {
  const totalIncome = incomes.reduce((acc, income) => acc + income.amount, 0);
  const totalExpense = expenses.reduce((acc, expense) => acc + expense.amount, 0);
  const balance = totalIncome - totalExpense;

  if (balance > 0) {
    balanceDiv.textContent = `Możesz jeszcze wydać ${balance} złotych`;
    balanceDiv.style.color = 'green';
  } else if (balance === 0) {
    balanceDiv.textContent = 'Bilans wynosi zero';
    balanceDiv.style.color = 'black';
  } else {
    balanceDiv.textContent = `Bilans jest ujemny. Jesteś na minusie ${Math.abs(balance)} złotych`;
    balanceDiv.style.color = 'red';
  }
}

function addIncome(e) {
  e.preventDefault();
  const name = incomeNameInput.value.trim();
  const amount = parseFloat(incomeAmountInput.value);

  if (name === '' || isNaN(amount)) {
    return;
  }

  const income = { name, amount };
  incomes.push(income);
  incomeList.appendChild(createListItem(income, 'income'));
  incomeNameInput.value = '';
  incomeAmountInput.value = '';
  updateBalance();
}

function addExpense(e) {
  e.preventDefault();
  const name = expenseNameInput.value.trim();
  const amount = parseFloat(expenseAmountInput.value);

  if (name === '' || isNaN(amount)) {
    return;
  }

  const expense = { name, amount };
  expenses.push(expense);
  expenseList.appendChild(createListItem(expense, 'expense'));
  expenseNameInput.value = '';
  expenseAmountInput.value = '';
  updateBalance();
}

function createListItem(item, type) {
  const li = document.createElement('li');
  li.textContent = `${item.name}: ${item.amount} zł`;
  li.style.color = type === 'income' ? 'green' : 'red';

  const deleteButton = document.createElement('button');
  deleteButton.textContent = 'Usuń';
  deleteButton.addEventListener('click', () => deleteItem(item, type));
  li.appendChild(deleteButton);

  return li;
}

function deleteItem(item, type) {
  if (type === 'income') {
    incomes = incomes.filter(income => income !== item);
    incomeList.removeChild(item.parentNode);
  } else {
    expenses = expenses.filter(expense => expense !== item);
    expenseList.removeChild(item.parentNode);
  }
  updateBalance();
}
// ... (wcześniejsza część skryptu)

function editItem(item, type) {
    const newName = prompt('Podaj nową nazwę:', item.name);
    const newAmount = parseFloat(prompt('Podaj nową kwotę:', item.amount));
  
    if (newName === null || newName.trim() === '' || isNaN(newAmount)) {
      return;
    }
  
    const newItem = { name: newName, amount: newAmount };
  
    if (type === 'income') {
      incomes = incomes.map(income => (income === item ? newItem : income));
      const incomeListItem = item.parentNode;
      incomeListItem.textContent = `${newName}: ${newAmount} zł`;
      incomeListItem.appendChild(createEditButton(newItem, 'income'));
    } else {
      expenses = expenses.map(expense => (expense === item ? newItem : expense));
      const expenseListItem = item.parentNode;
      expenseListItem.textContent = `${newName}: ${newAmount} zł`;
      expenseListItem.appendChild(createEditButton(newItem, 'expense'));
    }
    updateBalance();
  }
  
  function createEditButton(item, type) {
    const editButton = document.createElement('button');
    editButton.textContent = 'Edytuj';
    editButton.addEventListener('click', () => editItem(item, type));
    return editButton;
  }
  
  function createListItem(item, type) {
    const li = document.createElement('li');
    li.textContent = `${item.name}: ${item.amount} zł`;
    li.style.color = type === 'income' ? 'green' : 'red';
  
    li.appendChild(createEditButton(item, type));
  
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Usuń';
    deleteButton.addEventListener('click', () => deleteItem(item, type));
    li.appendChild(deleteButton);
  
    return li;
  }
  
  // ... (wcześniejsza część skryptu)
  
  

incomeForm.addEventListener('submit', addIncome);
expenseForm.addEventListener('submit', addExpense);
