// ---------- FAQ accordion ----------
document.querySelectorAll(".faq-question").forEach(button => {
  button.addEventListener("click", () => {
    button.parentElement.classList.toggle("open");
  });
});

// ---------- Energy calculator ----------
const form = document.getElementById("energy-form");
const results = document.getElementById("calculator-results");

form.addEventListener("submit", event => {
  event.preventDefault();

  const power = Number(document.getElementById("power").value);
  const hours = Number(document.getElementById("hours").value);
  const price = Number(document.getElementById("price").value);

  if (power <= 0 || hours <= 0 || hours > 24 || price < 0) {
    results.innerHTML = `
      <p><strong>Please enter valid values.</strong></p>
      <p>Power must be positive, hours must be between 0 and 24, and price cannot be negative.</p>
    `;
    return;
  }

  const daily = (power * hours) / 1000;
  const monthly = daily * 30;
  const yearly = daily * 365;
  const monthlyCost = monthly * price / 100;
  const yearlyCost = yearly * price / 100;

  results.innerHTML = `
    <h3>Estimated Energy Use</h3>
    <div class="result-grid">
      <div class="result-item">
        Daily
        <strong>${daily.toFixed(2)} kWh</strong>
      </div>
      <div class="result-item">
        Monthly
        <strong>${monthly.toFixed(2)} kWh</strong>
      </div>
      <div class="result-item">
        Yearly
        <strong>${yearly.toFixed(2)} kWh</strong>
      </div>
      <div class="result-item">
        Monthly Cost
        <strong>$${monthlyCost.toFixed(2)}</strong>
      </div>
      <div class="result-item">
        Yearly Cost
        <strong>$${yearlyCost.toFixed(2)}</strong>
      </div>
    </div>
  `;
});