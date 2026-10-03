 // ========================================
 // REPORTS PAGE
 // ========================================


// Get all transactions
const transactions = getTransactions();


// ========================================
// ELEMENTS
// ========================================

const reportIncome =
    document.getElementById("reportIncome");

const reportExpenses =
    document.getElementById("reportExpenses");

const reportBalance =
    document.getElementById("reportBalance");

const incomeChartValue =
    document.getElementById("incomeChartValue");

const expenseChartValue =
    document.getElementById("expenseChartValue");

const incomeBar =
    document.getElementById("incomeBar");

const expenseBar =
    document.getElementById("expenseBar");

const categoryReport =
    document.getElementById("categoryReport");

const monthlyIncome =
    document.getElementById("monthlyIncome");

const monthlyExpenses =
    document.getElementById("monthlyExpenses");

const monthlyBalance =
    document.getElementById("monthlyBalance");


// ========================================
// TOTAL REPORT
// ========================================

const totalIncome =
    getTotalIncome(transactions);

const totalExpenses =
    getTotalExpenses(transactions);

const balance =
    getBalance(transactions);


// Display totals
reportIncome.textContent =
    formatMoney(totalIncome);

reportExpenses.textContent =
    formatMoney(totalExpenses);

reportBalance.textContent =
    formatMoney(balance);


// ========================================
// INCOME VS EXPENSES
// ========================================

incomeChartValue.textContent =
    formatMoney(totalIncome);

expenseChartValue.textContent =
    formatMoney(totalExpenses);


// Find largest value
const largestValue =
    Math.max(totalIncome, totalExpenses);


// Prevent division by zero
if (largestValue > 0) {

    incomeBar.style.width =
        `${(totalIncome / largestValue) * 100}%`;

    expenseBar.style.width =
        `${(totalExpenses / largestValue) * 100}%`;

}


// ========================================
// EXPENSES BY CATEGORY
// ========================================

function displayCategoryReport() {

    const expenses =
        transactions.filter(
            transaction =>
                transaction.type === "expense"
        );


    // No expenses
    if (expenses.length === 0) {

        categoryReport.innerHTML = `
            <div class="empty-state">

                <h3>No expense data</h3>

                <p>
                    Add some expenses to see
                    your spending categories.
                </p>

            </div>
        `;

        return;
    }


    // Create category totals
    const categoryTotals = {};


    expenses.forEach(transaction => {

        const category =
            transaction.category;

        if (!categoryTotals[category]) {

            categoryTotals[category] = 0;

        }

        categoryTotals[category] +=
            Number(transaction.amount);

    });


    // Calculate total expenses
    const total =
        getTotalExpenses(expenses);


    // Display categories
    categoryReport.innerHTML =
        Object.entries(categoryTotals)

            .sort((a, b) => b[1] - a[1])

            .map(([category, amount]) => {

                const percentage =
                    total > 0
                        ? (amount / total) * 100
                        : 0;


                return `
                    <div class="category-report-item">

                        <div class="category-report-header">

                            <span>
                                ${escapeHTML(category)}
                            </span>

                            <strong>
                                ${formatMoney(amount)}
                            </strong>

                        </div>

                        <div class="category-track">

                            <div
                                class="category-bar"
                                style="width: ${percentage}%"
                            ></div>

                        </div>

                        <small>
                            ${Math.round(percentage)}%
                            of total expenses
                        </small>

                    </div>
                `;

            })

            .join("");
}


// ========================================
// MONTHLY ANALYSIS
// ========================================

function displayMonthlyAnalysis() {

    const now =
        new Date();

    const currentMonth =
        now.getMonth();

    const currentYear =
        now.getFullYear();


    // Only current month's transactions
    const monthlyTransactions =
        transactions.filter(transaction => {

            const date =
                new Date(transaction.date);

            return (
                date.getMonth() === currentMonth &&
                date.getFullYear() === currentYear
            );

        });


    const income =
        getTotalIncome(monthlyTransactions);

    const expenses =
        getTotalExpenses(monthlyTransactions);

    const balance =
        income - expenses;


    monthlyIncome.textContent =
        formatMoney(income);

    monthlyExpenses.textContent =
        formatMoney(expenses);

    monthlyBalance.textContent =
        formatMoney(balance);

}


// ========================================
// START REPORTS
// ========================================

displayCategoryReport();

displayMonthlyAnalysis();