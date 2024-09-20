const defaultColor = "#fff"; // Default color when not hovered

// List of neon colors
const neonColors = [
  "linear-gradient(to right, red, hotpink)",
  "linear-gradient(to right, blue, cyan)",
  "linear-gradient(to right, green, yellow)",
  "linear-gradient(to right, purple, pink)",
  "linear-gradient(to right, hotpink, yellow)",
];

const intensity = 100; // Reduced intensity for smoother rotation

document.querySelectorAll(".card").forEach((card) => {
  let currentColorIndex = -1;

  card.addEventListener("mousemove", (e) => {
    const { left, top, width, height } = card.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    const mouseX = e.clientX;
    const mouseY = e.clientY;

    const deltaX = (mouseX - centerX) / width;
    const deltaY = (mouseY - centerY) / height;

    const rotateX = -deltaY * intensity;
    const rotateY = deltaX * intensity;

    // Apply rotation and scale
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.1)`;
    card.style.zIndex = 100;
  });

  card.addEventListener("mouseenter", () => {
    // Set a random gradient color from the list
    let randomIndex;
    do {
      randomIndex = Math.floor(Math.random() * neonColors.length);
    } while (randomIndex === currentColorIndex); // Ensure the color is different from the previous one

    currentColorIndex = randomIndex;
    card.style.background = neonColors[currentColorIndex];
  });

  card.addEventListener("mouseleave", () => {
    // Reset transform and color when mouse leaves
    card.style.transform =
      "perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)";
    card.style.zIndex = 0;
    card.style.background = defaultColor; // Reset to default color
  });
});
document.addEventListener("DOMContentLoaded", function () {
  const headerPlaceholder = document.getElementById("header-placeholder");

  // Try fetching from the current directory first
  fetch("header.html")
    .then((response) => {
      if (!response.ok) {
        // If fetching from the current directory fails, try the parent directory
        return fetch("../header.html");
      }
      return response;
    })
    .then((response) => response.text())
    .then((data) => {
      headerPlaceholder.innerHTML = data;
    })
    .catch((error) => console.error("Error loading header:", error));
});
