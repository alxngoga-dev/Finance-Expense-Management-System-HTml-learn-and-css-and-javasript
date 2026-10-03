// ========================================
// SETTINGS PAGE
// ========================================


// ========================================
// STORAGE KEYS
// ========================================

const PROFILE_NAME_KEY =
    "financeProfileName";

const CURRENCY_KEY =
    "financeCurrency";

const DARK_MODE_KEY =
    "financeDarkMode";


// ========================================
// ELEMENTS
// ========================================

const profileForm =
    document.getElementById("profileForm");

const profileName =
    document.getElementById("profileName");

const currencyForm =
    document.getElementById("currencyForm");

const currency =
    document.getElementById("currency");

const darkModeToggle =
    document.getElementById("darkModeToggle");

const clearDataButton =
    document.getElementById("clearDataButton");


// ========================================
// LOAD PROFILE
// ========================================

const savedName =
    localStorage.getItem(PROFILE_NAME_KEY);

if (savedName) {

    profileName.value =
        savedName;
}


// ========================================
// SAVE PROFILE
// ========================================

profileForm.addEventListener(
    "submit",
    function (event) {

        event.preventDefault();


        const name =
            profileName.value.trim();


        if (!name) {

            alert("Please enter your name.");

            return;
        }


        localStorage.setItem(
            PROFILE_NAME_KEY,
            name
        );


        alert(
            "Profile saved successfully!"
        );

    }
);


// ========================================
// LOAD CURRENCY
// ========================================

const savedCurrency =
    localStorage.getItem(CURRENCY_KEY);


if (savedCurrency) {

    currency.value =
        savedCurrency;

}


// ========================================
// SAVE CURRENCY
// ========================================

currencyForm.addEventListener(
    "submit",
    function (event) {

        event.preventDefault();


        localStorage.setItem(
            CURRENCY_KEY,
            currency.value
        );


        alert(
            "Currency saved successfully!"
        );

    }
);


// ========================================
// DARK MODE
// ========================================

const savedDarkMode =
    localStorage.getItem(DARK_MODE_KEY);


if (savedDarkMode === "true") {

    document.body.classList.add("dark-mode");

    darkModeToggle.checked = true;

}


// ========================================
// TOGGLE DARK MODE
// ========================================

darkModeToggle.addEventListener(
    "change",
    function () {

        const enabled =
            darkModeToggle.checked;


        document.body.classList.toggle(
            "dark-mode",
            enabled
        );


        localStorage.setItem(
            DARK_MODE_KEY,
            enabled
        );

    }
);


// ========================================
// CLEAR ALL DATA
// ========================================

clearDataButton.addEventListener(
    "click",
    function () {

        const confirmed =
            confirm(
                "Are you sure you want to delete all transactions, budget and categories?"
            );


        if (!confirmed) {
            return;
        }


        const doubleConfirmed =
            confirm(
                "This action cannot be undone. Continue?"
            );


        if (!doubleConfirmed) {
            return;
        }


        // Remove financial data
        localStorage.removeItem(
            TRANSACTIONS_KEY
        );

        localStorage.removeItem(
            BUDGET_KEY
        );

        localStorage.removeItem(
            CATEGORIES_KEY
        );


        alert(
            "All financial data has been cleared."
        );


        // Go to Dashboard
        window.location.href =
            "../index.html";

    }
);