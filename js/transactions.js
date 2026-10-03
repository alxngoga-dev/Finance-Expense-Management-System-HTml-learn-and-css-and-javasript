// ========================================
// TRANSACTIONS PAGE
// ========================================


// Get elements
const searchInput =
    document.getElementById("searchInput");

const typeFilter =
    document.getElementById("typeFilter");

// ========================================
// LOAD CATEGORIES INTO FILTER
// ========================================

function loadCategoryFilter() {

    const categories = getCategories();

    categoryFilter.innerHTML =
        `<option value="all">All Categories</option>`;

    categories.forEach(category => {

        const option =
            document.createElement("option");

        option.value = category;
        option.textContent = category;

        categoryFilter.appendChild(option);
    });
}

const tableBody =
    document.getElementById("transactionsTableBody");

const transactionCount =
    document.getElementById("transactionCount");


// Get transactions from localStorage
let transactions = getTransactions();


// ========================================
// DISPLAY TRANSACTIONS
// ========================================

function displayTransactions() {

    const searchValue =
        searchInput.value.toLowerCase().trim();

    const selectedType =
        typeFilter.value;

    const selectedCategory =
        categoryFilter.value;


    // Filter transactions
    const filteredTransactions =
        transactions.filter(transaction => {

            const matchesSearch =
                transaction.description
                    .toLowerCase()
                    .includes(searchValue) ||

                transaction.category
                    .toLowerCase()
                    .includes(searchValue);


            const matchesType =
                selectedType === "all" ||
                transaction.type === selectedType;


            const matchesCategory =
                selectedCategory === "all" ||
                transaction.category === selectedCategory;


            return (
                matchesSearch &&
                matchesType &&
                matchesCategory
            );
        });


    // Update count
    transactionCount.textContent =
        `${filteredTransactions.length} transaction${
            filteredTransactions.length !== 1
                ? "s"
                : ""
        }`;


    // Empty state
    if (filteredTransactions.length === 0) {

        tableBody.innerHTML = `
            <tr>
                <td colspan="6" class="table-empty">
                    No transactions found.
                </td>
            </tr>
        `;

        return;
    }


    // Display rows
    tableBody.innerHTML =
        filteredTransactions
            .sort((a, b) => new Date(b.date) - new Date(a.date))
            .map(transaction => {

                const isIncome =
                    transaction.type === "income";


                return `
                    <tr>

                        <td>
                            <strong>
                                ${escapeHTML(transaction.description)}
                            </strong>
                        </td>

                        <td>

                            <span class="type-badge ${
                                isIncome
                                    ? "income-badge"
                                    : "expense-badge"
                            }">
                                ${
                                    isIncome
                                        ? "Income"
                                        : "Expense"
                                }
                            </span>

                        </td>

                        <td>
                            ${escapeHTML(transaction.category)}
                        </td>

                        <td class="${
                            isIncome
                                ? "income"
                                : "expense"
                        }">

                            ${
                                isIncome
                                    ? "+"
                                    : "-"
                            }

                            ${formatMoney(transaction.amount)}

                        </td>

                        <td>
                            ${formatDate(transaction.date)}
                        </td>

                        <td>

                            <div class="action-buttons">

                                <button
                                    class="edit-btn"
                                    onclick="editTransaction('${transaction.id}')"
                                >
                                    Edit
                                </button>

                                <button
                                    class="delete-btn"
                                    onclick="deleteTransaction('${transaction.id}')"
                                >
                                    Delete
                                </button>

                            </div>

                        </td>

                    </tr>
                `;

            })
            .join("");
}


// ========================================
// DELETE TRANSACTION
// ========================================

function deleteTransaction(id) {

    const transaction =
        transactions.find(item => item.id === id);


    if (!transaction) {
        return;
    }


    const confirmed =
        confirm(
            `Delete "${transaction.description}"?`
        );


    if (!confirmed) {
        return;
    }


    transactions =
        transactions.filter(item => item.id !== id);


    saveTransactions(transactions);


    displayTransactions();
}


// ========================================
// EDIT TRANSACTION
// ========================================

function editTransaction(id) {

    const transaction =
        transactions.find(item => item.id === id);


    if (!transaction) {
        return;
    }


    const newDescription =
        prompt(
            "Enter new description:",
            transaction.description
        );


    if (
        newDescription === null ||
        newDescription.trim() === ""
    ) {
        return;
    }


    const newAmount =
        prompt(
            "Enter new amount:",
            transaction.amount
        );


    if (
        newAmount === null ||
        Number(newAmount) <= 0
    ) {
        alert("Invalid amount.");

        return;
    }


    transaction.description =
        newDescription.trim();

    transaction.amount =
        Number(newAmount);


    saveTransactions(transactions);


    displayTransactions();


    alert("Transaction updated successfully.");
}


// ========================================
// SEARCH
// ========================================

searchInput.addEventListener(
    "input",
    displayTransactions
);


// ========================================
// TYPE FILTER
// ========================================

typeFilter.addEventListener(
    "change",
    displayTransactions
);


// ========================================
// CATEGORY FILTER
// ========================================

categoryFilter.addEventListener(
    "change",
    displayTransactions
);


// ========================================
// START PAGE
// ========================================

// ========================================
// START PAGE
// ========================================

loadCategoryFilter();
displayTransactions();
