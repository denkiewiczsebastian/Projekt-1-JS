const incomeForm = document.getElementById("incomeForm");
const incomeNameInput = document.getElementById("incomeName");
const incomeAmountInput = document.getElementById("incomeAmount");
const incomeList = document.querySelector(".incomeList");

const expenseForm = document.getElementById("expenseForm");
const expenseNameInput = document.getElementById("expenseName");
const expenseAmountInput = document.getElementById("expenseAmount");
const expenseList = document.querySelector(".expenseList");

const balanceDiv = document.querySelector(".balance");

let incomes = [];
let expenses = [];

function updateBalance() {
  const totalIncome = incomes.reduce((acc, income) => acc + income.amount, 0);
  const totalExpense = expenses.reduce(
    (acc, expense) => acc + expense.amount,
    0
  );
  const balance = totalIncome - totalExpense;

  if (balance > 0) {
    balanceDiv.textContent = `Możesz jeszcze wydać ${balance} złotych`;
    balanceDiv.style.color = "green";
  } else if (balance === 0) {
    balanceDiv.textContent = "Bilans wynosi zero";
    balanceDiv.style.color = "black";
  } else {
    balanceDiv.textContent = `Bilans jest ujemny. Jesteś na minusie ${Math.abs(
      balance
    )} złotych`;
    balanceDiv.style.color = "red";
  }
}

function addIncome(e) {
  e.preventDefault();
  const name = incomeNameInput.value.trim();
  const amount = parseFloat(incomeAmountInput.value);

  if (name === "" || isNaN(amount)) {
    return;
  }

  const income = { name, amount };
  incomes.push(income);
  incomeList.appendChild(createListItem(income, "income", incomes.length - 1));
  incomeNameInput.value = "";
  incomeAmountInput.value = "";
  updateBalance();
}

function addExpense(e) {
  e.preventDefault();
  const name = expenseNameInput.value.trim();
  const amount = parseFloat(expenseAmountInput.value);

  if (name === "" || isNaN(amount)) {
    return;
  }

  const expense = { name, amount };
  expenses.push(expense);
  expenseList.appendChild(
    createListItem(expense, "expense", expenses.length - 1)
  );
  expenseNameInput.value = "";
  expenseAmountInput.value = "";
  updateBalance();
}

function createListItem(item, type, id) {
  const li = document.createElement("li");
  li.textContent = `${item.name}: ${item.amount} zł`;
  li.style.color = type === "income" ? "green" : "red";
  li.setAttribute("data-id", id);

  li.appendChild(createEditButton(id, type));

  const deleteButton = document.createElement("button");
  deleteButton.textContent = "Usuń";
  deleteButton.addEventListener("click", () => deleteItem(id, type));
  li.appendChild(deleteButton);

  return li;
}

function deleteItem(id, type) {
  if (type === "income") {
    incomes.splice(id, 1);
  } else {
    expenses.splice(id, 1);
  }

  updateList();
}

function editItem(id, type) {
  const newName = prompt("Podaj nową nazwę:");

  if (newName === null || newName.trim() === "") {
    return;
  }

  let newAmount;
  do {
    newAmount = parseFloat(prompt("Podaj nową kwotę:"));

    if (isNaN(newAmount) || newAmount <= 0) {
      alert("Kwota musi być liczbą większą od zera!");
    }
  } while (isNaN(newAmount) || newAmount <= 0);

  if (type === "income") {
    incomes[id].name = newName;
    incomes[id].amount = newAmount;
  } else {
    expenses[id].name = newName;
    expenses[id].amount = newAmount;
  }

  updateList();
}

function createEditButton(id, type) {
  const editButton = document.createElement("button");
  editButton.textContent = "Edytuj";
  editButton.addEventListener("click", () => editItem(id, type));
  return editButton;
}

function updateList() {
  incomeList.innerHTML = "";
  expenseList.innerHTML = "";

  for (let i = 0; i < incomes.length; i++) {
    incomeList.appendChild(createListItem(incomes[i], "income", i));
  }

  for (let i = 0; i < expenses.length; i++) {
    expenseList.appendChild(createListItem(expenses[i], "expense", i));
  }

  updateBalance();
}

incomeForm.addEventListener("submit", addIncome);
expenseForm.addEventListener("submit", addExpense);
