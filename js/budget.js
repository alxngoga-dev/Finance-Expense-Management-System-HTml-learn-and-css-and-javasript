// ========================================
// BUDGET PAGE
// ========================================


// Get elements
const budgetForm =
    document.getElementById("budgetForm");

const budgetAmount =
    document.getElementById("budgetAmount");

const budgetTotal =
    document.getElementById("budgetTotal");

const budgetSpent =
    document.getElementById("budgetSpent");

const budgetRemaining =
    document.getElementById("budgetRemaining");

const budgetPercentage =
    document.getElementById("budgetPercentage");

const budgetProgressBar =
    document.getElementById("budgetProgressBar");

const budgetStatus =
    document.getElementById("budgetStatus");

const progressSpent =
    document.getElementById("progressSpent");

const progressBudget =
    document.getElementById("progressBudget");


// ========================================
// CALCULATE SPENDING
// ========================================

// ========================================
// CALCULATE CURRENT MONTH SPENDING
// ========================================

function calculateSpent() {

    const transactions =
        getTransactions();

    // Only count expenses from the current month
    return getCurrentMonthExpenses(transactions);
}

// ========================================
// DISPLAY BUDGET
// ========================================

function displayBudget() {

    const budget =
        getBudget();

    const spent =
        calculateSpent();


    // Display basic values
    budgetTotal.textContent =
        formatMoney(budget);

    budgetSpent.textContent =
        formatMoney(spent);

    progressSpent.textContent =
        `${formatMoney(spent)} spent`;

    progressBudget.textContent =
        `${formatMoney(budget)} budget`;


    // No budget
    if (budget <= 0) {

        budgetRemaining.textContent =
            "0 RWF";

        budgetPercentage.textContent =
            "0%";

        budgetProgressBar.style.width =
            "0%";

        budgetStatus.textContent =
            "Set a budget to start tracking.";

        return;
    }


    // Calculate remaining
    const remaining =
        budget - spent;


    // Calculate percentage
    let percentage =
        (spent / budget) * 100;


    // Don't show more than 100% on progress bar
    const progressWidth =
        Math.min(percentage, 100);


    // Display values
    budgetRemaining.textContent =
        formatMoney(Math.max(remaining, 0));

    budgetPercentage.textContent =
        `${Math.round(percentage)}%`;


    budgetProgressBar.style.width =
        `${progressWidth}%`;


    // ========================================
    // Budget Status
    // ========================================

    if (percentage >= 100) {

        budgetStatus.textContent =
            "You have reached or exceeded your budget.";

    } else if (percentage >= 80) {

        budgetStatus.textContent =
            "Warning: you are close to your budget limit.";

    } else if (percentage >= 50) {

        budgetStatus.textContent =
            "You have used more than half of your budget.";

    } else {

        budgetStatus.textContent =
            "Your spending is currently within your budget.";

    }
}


// ========================================
// SAVE BUDGET
// ========================================

budgetForm.addEventListener(
    "submit",
    function (event) {

        // Stop page refresh
        event.preventDefault();


        const amount =
            Number(budgetAmount.value);


        if (amount <= 0) {

            alert(
                "Budget must be greater than 0."
            );

            return;
        }


        // Save budget
        saveBudget(amount);


        // Update page
        displayBudget();


        alert(
            "Monthly budget saved successfully!"
        );

    }
);


// ========================================
// LOAD CURRENT BUDGET
// ========================================

const currentBudget =
    getBudget();

if (currentBudget > 0) {

    budgetAmount.value =
        currentBudget;
}


// ========================================
// START
// ========================================

displayBudget();