// Import the 'sync-input' package for reading user input from the console
const input = require('sync-input');

// Define an object 'currency' that holds the conversion rates of various currencies relative to USD
const currency = {
    USD: 1,        // US Dollar
    JPY: 113.5,    // Japanese Yen
    EUR: 0.89,     // Euro
    RUB: 74.36,    // Russian Ruble
    GBP: 0.75      // British Pound
};

// Convert the 'currency' object into an array of [key, value] pairs for easier access during conversion
const items = Object.entries(currency);

// Main function to handle currency conversion
function calculateResult() {
    // Display a welcome message to the user
    console.log("Welcome to Currency Converter!");

    // Display conversion rates for each currency relative to USD
    items.forEach(([key, value]) => {
        console.log(`1 USD equals ${value} ${key}`);
    })

    let activity = 0;

    // Prompt user to either convert currencies or exit the program
    do {
        activity = input("What do you want to do?\n1-Convert currencies 2-Exit program\n");
        // If user chooses to exit
        if (activity === '2') {
            console.log("Have a nice day!");  // Exit message
            return;
        }
    } while (!continueProgram(activity));  // Continue prompting until a valid option is chosen

    // Prompt the user for currency conversion details
    console.log("What do you want to convert?");

    // Get the 'from' currency from the user and convert it to uppercase to match currency keys
    let fromCurrency;
    do {
        fromCurrency = input('From: ').toUpperCase();  // Ask for input until a valid currency is provided
    } while (!isValidCurrency(fromCurrency));

    // Get the 'to' currency from the user and convert it to uppercase
    let toCurrency;
    do {
        toCurrency = input('To: ').toUpperCase();  // Ask for input until a valid currency is provided
    } while (!isValidCurrency(toCurrency));

    // Get the amount to convert from the user
    let userAmount;
    do {
        userAmount = input(`Amount: `);  // Ask for input until a valid number is provided
    } while (!isAmountCorrect(userAmount));

    // Perform the currency conversion and round the result to 4 decimal places
    let result = (userAmount * currency[toCurrency] / currency[fromCurrency]).toFixed(4);

    // Display the conversion result
    console.log(`Result: ${userAmount} ${fromCurrency} equals ${result} ${toCurrency}`);
}

// Function to check if the entered currency is valid
function isValidCurrency(checkedCurrency) {
    // Verify if the currency exists in our currency object
    if (Object.keys(currency).includes(checkedCurrency)) {
        return true;  // Return true if the currency is valid
    } else {
        console.log("Unknown currency");  // Display error message for invalid currency
        return false;
    }
}

// Function to validate if the entered amount is a valid number and meets the required criteria
function isAmountCorrect(userAmount) {
    // Check if the input is a valid number
    if (!Number(userAmount)) {
        console.log("The amount has to be a number");  // Display error if not a number
        return false;
    }
    // Check if the entered amount is positive and greater than or equal to 1
    if (Number(userAmount) <= 0) {
        console.log("The amount cannot be less than 1");  // Display error if the amount is non-positive
        return false;
    }
    return true;  // Return true if all checks pass
}

// Function to validate user's choice (whether to convert currencies or exit)
function continueProgram(whatToDo) {
    // Check if user chose option '1' to continue with currency conversion
    if (whatToDo === "1") {
        return true;
    }
    // Display error message for unknown input
    console.log(`Unknown input`);
    return false;
}

// Call the main function to start the currency converter
calculateResult();

