
// ========================================
// LOAD CATEGORIES
// ========================================

const categorySelect =
    document.getElementById("category");


// Get categories
const categories =
    getCategories();


// Add categories to dropdown
categories.forEach(category => {

    const option =
        document.createElement("option");

    option.value = category;

    option.textContent = category;

    categorySelect.appendChild(option);

});


// ========================================
// ADD TRANSACTION JAVASCRIPT
// ========================================


// Get the form
const transactionForm =
    document.getElementById("transactionForm");


// Get today's date
const dateInput =
    document.getElementById("date");


// Automatically put today's date
const today =
    new Date().toISOString().split("T")[0];

dateInput.value = today;


// ========================================
// FORM SUBMIT
// ========================================

transactionForm.addEventListener("submit", function (event) {

    // Stop page from refreshing
    event.preventDefault();


    // Get values from the form
    const type =
        document.getElementById("type").value;

    const description =
        document.getElementById("description").value.trim();

    const amount =
        Number(document.getElementById("amount").value);

    const category =
        document.getElementById("category").value;

    const date =
        document.getElementById("date").value;


    // ========================================
    // Validate
    // ========================================

    if (
        !type ||
        !description ||
        !amount ||
        !category ||
        !date
    ) {

        alert("Please fill in all fields.");

        return;
    }


    if (amount <= 0) {

        alert("Amount must be greater than 0.");

        return;
    }


    // ========================================
    // Create Transaction
    // ========================================

    const transaction = {

        id: createTransactionId(),

        type: type,

        description: description,

        amount: amount,

        category: category,

        date: date

    };


    // ========================================
    // Get Existing Transactions
    // ========================================

    const transactions =
        getTransactions();


    // Add new transaction
    transactions.push(transaction);


    // Save transactions
    saveTransactions(transactions);


    // ========================================
    // Success
    // ========================================

    alert("Transaction saved successfully!");


    // Go back to Dashboard
    window.location.href = "../index.html";

});