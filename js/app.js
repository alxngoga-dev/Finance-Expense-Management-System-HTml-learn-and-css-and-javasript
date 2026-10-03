// ========================================
// FINANCE EXPENSE MANAGER
// Shared Application JavaScript
// ========================================

// ----------------------------------------
// LocalStorage Keys
// ----------------------------------------

const TRANSACTIONS_KEY = "financeTransactions";
const BUDGET_KEY = "financeBudget";
// Settings keys
const CURRENCY_KEY = "financeCurrency";
const DARK_MODE_KEY = "financeDarkMode";
// ----------------------------------------
// Default Categories
// ----------------------------------------

const defaultCategories = [
    "Food",
    "Transport",
    "Education",
    "Rent",
    "Shopping",
    "Health",
    "Entertainment",
    "Bills",
    "Salary",
    "Other"
];

// ----------------------------------------
// Get Transactions
// ----------------------------------------

function getTransactions() {
    const transactions = localStorage.getItem(TRANSACTIONS_KEY);

    if (!transactions) {
        return [];
    }

    return JSON.parse(transactions);
}

// ----------------------------------------
// Save Transactions
// ----------------------------------------

function saveTransactions(transactions) {
    localStorage.setItem(
        TRANSACTIONS_KEY,
        JSON.stringify(transactions)
    );
}

// ----------------------------------------
// Get Budget
// ----------------------------------------

function getBudget() {
    const budget = localStorage.getItem(BUDGET_KEY);

    if (!budget) {
        return 0;
    }

    return Number(budget);
}

// ----------------------------------------
// Save Budget
// ----------------------------------------

function saveBudget(amount) {
    localStorage.setItem(
        BUDGET_KEY,
        Number(amount)
    );
}

// ----------------------------------------
// Calculate Total Income
// ----------------------------------------

function getTotalIncome(transactions) {
    return transactions
        .filter(transaction => transaction.type === "income")
        .reduce((total, transaction) => {
            return total + Number(transaction.amount);
        }, 0);
}

// ----------------------------------------
// Calculate Total Expenses
// ----------------------------------------

function getTotalExpenses(transactions) {
    return transactions
        .filter(transaction => transaction.type === "expense")
        .reduce((total, transaction) => {
            return total + Number(transaction.amount);
        }, 0);
}

// Get expenses for the current month
function getCurrentMonthExpenses(transactions) {
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();

    return transactions
        .filter(transaction => {
            if (transaction.type !== "expense") return false;

            const transactionDate = new Date(transaction.date);

            return (
                transactionDate.getMonth() === currentMonth &&
                transactionDate.getFullYear() === currentYear
            );
        })
        .reduce((total, transaction) => {
            return total + Number(transaction.amount);
        }, 0);
}

// ----------------------------------------
// Calculate Balance
// ----------------------------------------

function getBalance(transactions) {
    const income = getTotalIncome(transactions);
    const expenses = getTotalExpenses(transactions);

    return income - expenses;
}



// ----------------------------------------
// Format Money
// ----------------------------------------

// Get the currency selected in Settings
function getCurrency() {
    return localStorage.getItem(CURRENCY_KEY) || "RWF";
}

// Format money based on the selected currency
function formatMoney(amount) {
    const currency = getCurrency();

    const currencyLabels = {
        RWF: "RWF",
        USD: "USD",
        EUR: "EUR",
        GBP: "GBP"
    };

    const formattedAmount = new Intl.NumberFormat("en-US").format(amount);

    return `${formattedAmount} ${currencyLabels[currency]}`;
}

// ----------------------------------------
// Format Date
// ----------------------------------------

function formatDate(date) {
    return new Date(date).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric"
    });
}

// ----------------------------------------
// Create Transaction ID
// ----------------------------------------

function createTransactionId() {
    return Date.now().toString();
}

// ========================================
// CATEGORIES
// ========================================

const CATEGORIES_KEY = "financeCategories";


// Get categories
function getCategories() {

    const savedCategories =
        localStorage.getItem(CATEGORIES_KEY);


    // If no categories exist,
    // use the default categories.
    if (!savedCategories) {

        saveCategories(defaultCategories);

        return defaultCategories;
    }


    return JSON.parse(savedCategories);
}


// Save categories
function saveCategories(categories) {

    localStorage.setItem(
        CATEGORIES_KEY,
        JSON.stringify(categories)
    );
}

// Apply saved dark mode on every page
function applySavedTheme() {
    const darkModeEnabled = localStorage.getItem(DARK_MODE_KEY) === "true";

    document.body.classList.toggle("dark-mode", darkModeEnabled);
}

// Run theme when the page loads
applySavedTheme();