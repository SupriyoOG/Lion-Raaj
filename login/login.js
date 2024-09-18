// Flip card function
function flipCard() {
  const card = document.querySelector(".card");
  card.classList.toggle("flipped");
}

// Prevent form submission and handle login
function validateLoginForm(event) {
  event.preventDefault(); // Prevent form from reloading the page

  const username = document.querySelector(".front input[type='text']").value;
  const password = document.querySelector(
    ".front input[type='password']"
  ).value;

  if (username === "" || password === "") {
    alert("Please fill out both fields.");
    return false;
  }

  const users = JSON.parse(localStorage.getItem("users")) || [];
  const user = users.find(
    (user) => user.username === username && user.password === password
  );

  if (user) {
    alert("Login successful!");
    localStorage.setItem("isLoggedIn", "true"); // Store login state
    window.location.href = "../index.html"; // Redirect to the home page
    return true;
  } else {
    alert("Invalid username or password.");
    return false;
  }
}

// Prevent form submission and handle registration
function validateRegisterForm(event) {
  event.preventDefault(); // Prevent form from reloading the page

  const username = document.querySelector(".back input[type='text']").value;
  const email = document.querySelector(".back input[type='email']").value;
  const password = document.querySelector(".back input[type='password']").value;

  if (username === "" || email === "" || password === "") {
    alert("Please fill out all fields.");
    return false;
  }

  const users = JSON.parse(localStorage.getItem("users")) || [];
  const userExists = users.some((user) => user.username === username);

  if (userExists) {
    alert("Username already exists.");
    return false;
  }

  // Save new user data to localStorage
  users.push({ username, email, password });
  localStorage.setItem("users", JSON.stringify(users));

  alert("Registration successful!");
  flipCard(); // Flip back to login form after successful registration
  return true;
}

// Prevent pasting into password fields
const pass = document.getElementById("password");
pass.addEventListener("paste", (e) => {
  // e.preventDefault(); // Uncomment to block paste
  alert("Pasting is not allowed in the password field!");
});
