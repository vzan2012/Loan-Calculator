// Custom Scripts - Start

document.querySelector("#loan-form").addEventListener("submit", function(e) {
  // Show the Loader
  document.querySelector("#loading").style.display = "block";

  // Hide the results
  document.querySelector("#results").style.display = "none";

  setTimeout(calculateResults, 2000);

  e.preventDefault();
});

function calculateResults() {
  console.log("Calculating...");

  // Define the UI vars
  const amount = document.querySelector("#amount");
  const interest = document.querySelector("#interest");
  const years = document.querySelector("#years");

  const monthlyPayment = document.querySelector("#monthly-payment");
  const totalPayment = document.querySelector("#total-payment");
  const totalInterest = document.querySelector("#total-interest");

  const principal = parseFloat(amount.value);
  const calculatedInterest = parseFloat(interest.value) / 100 / 12;
  const calculatedPayments = parseFloat(years.value) * 12;

  // Compute monthly payment
  const x = Math.pow(1 + calculatedInterest, calculatedPayments);
  const monthly = (principal * x * calculatedInterest) / (x - 1);

  if (isFinite(monthly)) {
    monthlyPayment.value = monthly.toFixed(2);
    totalPayment.value = (monthly * calculatedPayments).toFixed(2);
    totalInterest.value = (monthly * calculatedPayments - principal).toFixed(2);

    // Show the results
    document.querySelector("#results").style.display = "block";

    // Hide the Loader
    document.querySelector("#loading").style.display = "none";
  } else {
    // Custom Error Function
    showError("Please check your numbers");
  }

  // e.preventDefault();
}

// showError function
function showError(error) {
  // Hide the Loader
  document.querySelector("#loading").style.display = "none";

  // Show Results
  document.querySelector("#results").style.display = "none";

  // Create element
  const errorDiv = document.createElement("div");

  // Add the alert classes (bootstrap)
  errorDiv.className = "alert alert-danger";

  // Create a text node and append to the div
  errorDiv.appendChild(document.createTextNode(error));

  // Get the elements
  const card = document.querySelector(".card");
  const heading = document.querySelector(".heading");

  // Inserting the error above the heading
  card.insertBefore(errorDiv, heading);

  // Clear the error after 3 seconds
  setTimeout(clearError, 3000);
}

function clearError() {
  document.querySelector(".alert").remove();
}
// Custom Scripts - End
