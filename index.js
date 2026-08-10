/* =========================================================
   BMI CALCULATOR
   JavaScript
========================================================= */


/* =========================
   GET ELEMENTS
========================= */

const heightInput = document.getElementById("height");
const weightInput = document.getElementById("weight");

const calculateBtn = document.getElementById("calculateBtn");
const resetBtn = document.getElementById("resetBtn");

const bmiValue = document.getElementById("bmiValue");
const bmiCategory = document.getElementById("bmiCategory");

const resultMessage = document.getElementById("resultMessage");

const scaleMarker = document.getElementById("scaleMarker");

const resultIcon = document.getElementById("resultIcon");
const categoryStatus = document.getElementById("categoryStatus");

const heightError = document.getElementById("height-error");
const weightError = document.getElementById("weight-error");


/* =========================
   CALCULATE BMI
========================= */

function calculateBMI() {

    const height = parseFloat(heightInput.value);
    const weight = parseFloat(weightInput.value);


    /* Clear previous errors */

    heightError.textContent = "";
    weightError.textContent = "";


    /* =========================
       VALIDATION
    ========================= */

    let isValid = true;


    if (
        isNaN(height) ||
        height <= 0 ||
        height > 300
    ) {

        heightError.textContent =
            "Please enter a valid height.";

        isValid = false;
    }


    if (
        isNaN(weight) ||
        weight <= 0 ||
        weight > 500
    ) {

        weightError.textContent =
            "Please enter a valid weight.";

        isValid = false;
    }


    if (!isValid) {

        return;
    }


    /* =========================
       BMI FORMULA
    ========================= */

    const heightInMeters = height / 100;

    const bmi =
        weight / (heightInMeters * heightInMeters);

    const roundedBMI = bmi.toFixed(1);


    /* Display BMI */

    bmiValue.textContent = roundedBMI;


    /* =========================
       DETERMINE CATEGORY
    ========================= */

    let category;
    let message;
    let icon;
    let iconColor;


    if (bmi < 18.5) {

        category = "Underweight";

        message =
            "Your BMI is below the normal range. Consider maintaining a balanced and nutritious diet.";

        icon = "fa-arrow-down";
        iconColor = "#38bdf8";

    }

    else if (bmi < 25) {

        category = "Normal Weight";

        message =
            "Great! Your BMI is within the normal range. Keep maintaining a balanced lifestyle.";

        icon = "fa-heart-pulse";
        iconColor = "#34d399";

    }

    else if (bmi < 30) {

        category = "Overweight";

        message =
            "Your BMI is above the normal range. A balanced diet and regular physical activity can help.";

        icon = "fa-arrow-up";
        iconColor = "#fbbf24";

    }

    else {

        category = "Obesity";

        message =
            "Your BMI is in the obesity range. Consider speaking with a healthcare professional for personalized guidance.";

        icon = "fa-heart-circle-exclamation";
        iconColor = "#fb7185";
    }


    /* =========================
       UPDATE RESULT
    ========================= */

    bmiCategory.textContent = category;

    resultMessage.textContent = message;


    /* =========================
       RESULT ICON
    ========================= */

    resultIcon.innerHTML =
        `<i class="fa-solid ${icon}"></i>`;

    resultIcon.style.color = iconColor;

    resultIcon.style.background =
        `${iconColor}18`;


    /* =========================
       CATEGORY STATUS ICON
    ========================= */

    categoryStatus.innerHTML =
        `<i class="fa-solid ${icon}"></i>`;

    categoryStatus.style.color = iconColor;

    categoryStatus.style.background =
        `${iconColor}18`;


    /* =========================
       UPDATE BMI SCALE
    ========================= */

    updateScaleMarker(bmi);


    /* =========================
       RESULT ANIMATION
    ========================= */

    const resultSection =
        document.getElementById("resultSection");

    resultSection.style.animation = "none";

    resultSection.offsetHeight;

    resultSection.style.animation =
        "resultAppear 0.5s ease";


    /* =========================
       SCROLL TO RESULT
    ========================= */

    setTimeout(() => {

        resultSection.scrollIntoView({
            behavior: "smooth",
            block: "nearest"
        });

    }, 100);

}


/* =========================
   BMI SCALE MARKER
========================= */

function updateScaleMarker(bmi) {

    let position;


    if (bmi < 15) {

        position = 0;

    }

    else if (bmi >= 15 && bmi < 18.5) {

        position =
            ((bmi - 15) / 3.5) * 25;

    }

    else if (bmi >= 18.5 && bmi < 25) {

        position =
            25 +
            ((bmi - 18.5) / 6.5) * 25;

    }

    else if (bmi >= 25 && bmi < 30) {

        position =
            50 +
            ((bmi - 25) / 5) * 25;

    }

    else {

        position =
            75 +
            Math.min(
                ((bmi - 30) / 15) * 25,
                25
            );
    }


    scaleMarker.style.left =
        `${position}%`;
}


/* =========================
   RESET CALCULATOR
========================= */

function resetCalculator() {

    /* Clear inputs */

    heightInput.value = "";
    weightInput.value = "";


    /* Clear errors */

    heightError.textContent = "";
    weightError.textContent = "";


    /* Reset BMI */

    bmiValue.textContent = "--";


    /* Reset category */

    bmiCategory.textContent =
        "Enter your details";


    /* Reset message */

    resultMessage.textContent =
        "Enter your height and weight to see your BMI result.";


    /* Reset icon */

    resultIcon.innerHTML =
        `<i class="fa-solid fa-heart"></i>`;

    resultIcon.style.color =
        "var(--primary-light)";

    resultIcon.style.background =
        "rgba(124, 92, 252, 0.12)";


    /* Reset category icon */

    categoryStatus.innerHTML =
        `<i class="fa-solid fa-minus"></i>`;

    categoryStatus.style.color =
        "var(--primary-light)";

    categoryStatus.style.background =
        "rgba(124, 92, 252, 0.12)";


    /* Reset marker */

    scaleMarker.style.left = "0%";


    /* Focus height */

    heightInput.focus();
}


/* =========================
   BUTTON EVENTS
========================= */

calculateBtn.addEventListener(
    "click",
    calculateBMI
);


resetBtn.addEventListener(
    "click",
    resetCalculator
);


/* =========================
   ENTER KEY SUPPORT
========================= */

heightInput.addEventListener(
    "keydown",
    function (event) {

        if (event.key === "Enter") {

            weightInput.focus();
        }
    }
);


weightInput.addEventListener(
    "keydown",
    function (event) {

        if (event.key === "Enter") {

            calculateBMI();
        }
    }
);


/* =========================
   REAL-TIME ERROR CLEARING
========================= */

heightInput.addEventListener(
    "input",
    function () {

        heightError.textContent = "";

    }
);


weightInput.addEventListener(
    "input",
    function () {

        weightError.textContent = "";

    }
);


/* =========================
   PREVENT NEGATIVE VALUES
========================= */

heightInput.addEventListener(
    "input",
    function () {

        if (this.value < 0) {

            this.value = "";
        }

    }
);


weightInput.addEventListener(
    "input",
    function () {

        if (this.value < 0) {

            this.value = "";
        }

    }
);