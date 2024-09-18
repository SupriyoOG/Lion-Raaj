document.addEventListener("DOMContentLoaded", function () {
  const isLoggedIn = localStorage.getItem("isLoggedIn");
  const loginLink = document.querySelector('nav a[href="/login/login.html"]');
  const popupOverlay = document.getElementById("popup");
  const confirmBtn = document.getElementById("confirm-btn");
  const cancelBtn = document.getElementById("cancel-btn");

  if (isLoggedIn === "true") {
    loginLink.textContent = "Logged In";
    loginLink.href = "#"; // Disable the link

    // Add a double-click event listener for logging out
    loginLink.addEventListener("click", function () {
      // Show the custom popup for logout confirmation
      popupOverlay.style.display = "block";
      document.body.style.overflow = "hidden";
    });

    // When the user clicks "Yes" (confirm logout)
    confirmBtn.addEventListener("click", function () {
      localStorage.setItem("isLoggedIn", "false"); // Clear the login state
      popupOverlay.style.display = "none"; // Hide the popup
      document.body.style.overflow = "visible";
      location.reload(); // Reload the page to reflect the logged-out state
    });

    // When the user clicks "No" (cancel logout)
    cancelBtn.addEventListener("click", function () {
      popupOverlay.style.display = "none"; // Just hide the popup
      document.body.style.overflow = "visible";
    });
  }
});
