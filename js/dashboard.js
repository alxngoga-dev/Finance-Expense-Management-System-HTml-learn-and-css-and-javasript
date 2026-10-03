// ========================================
// DASHBOARD JAVASCRIPT
// ========================================

// Get all transactions
const transactions = getTransactions();

// ----------------------------------------
// Get Dashboard Elements
// ----------------------------------------

const totalBalanceElement =
    document.getElementById("totalBalance");

const totalIncomeElement =
    document.getElementById("totalIncome");

const totalExpensesElement =
    document.getElementById("totalExpenses");

const totalBudgetElement =
    document.getElementById("totalBudget");

const recentTransactionsElement =
    document.getElementById("recentTransactions");

// ----------------------------------------
// Calculate Dashboard Values
// ----------------------------------------

const totalIncome = getTotalIncome(transactions);

const totalExpenses = getTotalExpenses(transactions);

const balance = getBalance(transactions);

const budget = getBudget();

// ----------------------------------------
// Display Summary Cards
// ----------------------------------------

totalBalanceElement.textContent =
    formatMoney(balance);

totalIncomeElement.textContent =
    formatMoney(totalIncome);

totalExpensesElement.textContent =
    formatMoney(totalExpenses);

totalBudgetElement.textContent =
    formatMoney(budget);

// ----------------------------------------
// Display Recent Transactions
// ----------------------------------------

function displayRecentTransactions() {

    // Show only the latest 5 transactions
    const recentTransactions =
        [...transactions]
            .sort((a, b) => new Date(b.date) - new Date(a.date))
            .slice(0, 5);

    // No transactions
    if (recentTransactions.length === 0) {

        recentTransactionsElement.innerHTML = `
            <div class="empty-state">
                <h3>No transactions yet</h3>
                <p>
                    Start by adding your first income or expense.
                </p>

                <a
                    href="pages/add-transaction.html"
                    class="btn btn-primary"
                >
                    Add Transaction
                </a>
            </div>
        `;

        return;
    }

    // Display transactions
    recentTransactionsElement.innerHTML =
        recentTransactions.map(transaction => {

            const isIncome =
                transaction.type === "income";

            return `
                <div class="transaction-row">

                    <div>
                        <strong>
                            ${escapeHTML(transaction.description)}
                        </strong>

                        <span>
                            ${escapeHTML(transaction.category)}
                        </span>
                    </div>

                    <div>
                        <strong class="${isIncome ? "income" : "expense"}">
                            ${isIncome ? "+" : "-"}
                            ${formatMoney(transaction.amount)}
                        </strong>

                        <span>
                            ${formatDate(transaction.date)}
                        </span>
                    </div>

                </div>
            `;
        }).join("");
}

// ----------------------------------------
// Basic HTML Safety
// ----------------------------------------

function escapeHTML(value) {

    const div = document.createElement("div");

    div.textContent = value;

    return div.innerHTML;
}

// ----------------------------------------
// Start Dashboard
// ----------------------------------------

displayRecentTransactions();