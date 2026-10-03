// ========================================
// LOGIN PAGE
// ========================================

const loginForm =
    document.getElementById("loginForm");

const loginMessage =
    document.getElementById("loginMessage");


// ========================================
// LOGIN
// ========================================

loginForm.addEventListener(
    "submit",
    function (event) {

        event.preventDefault();

        const email =
            document.getElementById("loginEmail")
                .value
                .trim();

        const password =
            document.getElementById("loginPassword")
                .value
                .trim();


        // Basic validation

        if (!email || !password) {

            showLoginMessage(
                "Please enter your email and password."
            );

            return;
        }


        // Demo login

        showLoginMessage(
            "Login successful!",
            true
        );


        // Open dashboard

        setTimeout(function () {

            window.location.href =
                "index.html";

        }, 700);

    }
);


// ========================================
// LOGIN MESSAGE
// ========================================

function showLoginMessage(
    message,
    success = false
) {

    loginMessage.textContent =
        message;

    loginMessage.style.display =
        "block";


    if (success) {

        loginMessage.style.background =
            "#f0fdf4";

        loginMessage.style.color =
            "#15803d";

    } else {

        loginMessage.style.background =
            "#fef2f2";

        loginMessage.style.color =
            "#dc2626";

    }

}