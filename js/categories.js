// ========================================
// CATEGORIES PAGE
// ========================================


// Get elements
const categoryForm =
    document.getElementById("categoryForm");

const categoryName =
    document.getElementById("categoryName");

const categoriesList =
    document.getElementById("categoriesList");

const categoryCount =
    document.getElementById("categoryCount");


// Get saved categories
let categories =
    getCategories();


// Get transactions
const transactions =
    getTransactions();


// ========================================
// DISPLAY CATEGORIES
// ========================================

function displayCategories() {

    categoryCount.textContent =
        `${categories.length} categor${
            categories.length === 1
                ? "y"
                : "ies"
        }`;


    categoriesList.innerHTML =
        categories.map(category => {

            // Count transactions
            const categoryTransactions =
                transactions.filter(
                    transaction =>
                        transaction.category === category
                );


            // Calculate total spent
            const totalSpent =
                categoryTransactions
                    .filter(
                        transaction =>
                            transaction.type === "expense"
                    )
                    .reduce(
                        (total, transaction) =>
                            total +
                            Number(transaction.amount),
                        0
                    );


            return `
                <div class="category-card">

                    <div class="category-card-top">

                        <div class="category-icon">
                            ${getCategoryIcon(category)}
                        </div>

                        <button
                            class="category-delete"
                            onclick="deleteCategory('${escapeHTML(category)}')"
                        >
                            Delete
                        </button>

                    </div>


                    <h3>
                        ${escapeHTML(category)}
                    </h3>


                    <p>
                        ${categoryTransactions.length}
                        transaction${
                            categoryTransactions.length !== 1
                                ? "s"
                                : ""
                        }
                    </p>


                    <strong>
                        ${formatMoney(totalSpent)}
                    </strong>

                </div>
            `;

        }).join("");
}


// ========================================
// CATEGORY ICON
// ========================================

function getCategoryIcon(category) {

    const icons = {

        Food: "🍔",

        Transport: "🚗",

        Education: "📚",

        Rent: "🏠",

        Shopping: "🛍️",

        Health: "❤️",

        Entertainment: "🎮",

        Bills: "🧾",

        Salary: "💰",

        Other: "📦"

    };


    return icons[category] || "📁";
}


// ========================================
// ADD CATEGORY
// ========================================

categoryForm.addEventListener(
    "submit",
    function (event) {

        event.preventDefault();


        const name =
            categoryName.value.trim();


        if (!name) {

            alert("Please enter a category name.");

            return;
        }


        // Check duplicate
        const exists =
            categories.some(
                category =>
                    category.toLowerCase() ===
                    name.toLowerCase()
            );


        if (exists) {

            alert(
                "This category already exists."
            );

            return;
        }


        // Add category
        categories.push(name);


        // Save
        saveCategories(categories);


        // Clear input
        categoryName.value = "";


        // Refresh
        displayCategories();


        alert(
            "Category added successfully!"
        );

    }
);


// ========================================
// DELETE CATEGORY
// ========================================

function deleteCategory(category) {

    // Check whether category is being used
    const used =
        transactions.some(
            transaction =>
                transaction.category === category
        );


    if (used) {

        alert(
            "This category is being used by a transaction and cannot be deleted."
        );

        return;
    }


    const confirmed =
        confirm(
            `Delete "${category}"?`
        );


    if (!confirmed) {
        return;
    }


    categories =
        categories.filter(
            item => item !== category
        );


    saveCategories(categories);


    displayCategories();

}


// ========================================
// START
// ========================================

displayCategories();