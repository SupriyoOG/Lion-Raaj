let productsData = [];

// Fetch products from the JSON file
fetch("data/products.json")
  .then((response) => response.json())
  .then((data) => {
    productsData = data;
    displayProducts(data);
  })
  .catch((error) => console.error("Error loading products:", error));

// Function to display products dynamically
const displayProducts = (products) => {
  const catalogContainer = document.getElementById("catalog-container");
  catalogContainer.innerHTML = ""; // Clear the container

  products.forEach(({ image, name, description, price }) => {
    const productDiv = document.createElement("div");
    productDiv.classList.add("catalog-item");

    productDiv.innerHTML = `
      <img src="${image}" alt="${name}" loading="lazy">
      <h3>${name}</h3>
      <p>${description}</p>
      <p><strong>${price}</strong></p>
    `;
    catalogContainer.appendChild(productDiv);
  });
};

// // Filter products based on search input
// document.getElementById('search-bar').addEventListener('input', event => {
//   const searchTerm = event.target.value.toLowerCase();
//   const filteredProducts = productsData.filter(({ name }) =>
//     name.toLowerCase().includes(searchTerm)
//   );
//   displayProducts(filteredProducts);
// });

const small = document.getElementById("small");
const medium = document.getElementById("medium");
const large = document.getElementById("large");

const catalog = document.getElementById("catalog-container");

large.addEventListener("click", () => {
  catalog.style.gridTemplateColumns = "repeat(auto-fill,minmax(600px, 1fr))";
});

medium.addEventListener("click", () => {
  catalog.style.gridTemplateColumns = "repeat(auto-fill,minmax(400px, 1fr))";
});

small.addEventListener("click", () => {
  catalog.style.gridTemplateColumns = "repeat(auto-fill,minmax(200px, 1fr))";
});

window.onload = function () {
  const loadingContainer = document.getElementById("loading-container");
  const loadingBar = document.getElementById("loading-bar");

  // Show loading bar
  loadingContainer.style.display = "block";

  // Get all images on the page
  const images = document.querySelectorAll("img");
  let loadedImagesCount = 0;
  const totalImages = images.length;

  // Function to check if all images are loaded
  function imageLoaded() {
    loadedImagesCount++;
    if (loadedImagesCount === totalImages) {
      loadingBar.style.width = "100%"; // Fill the loading bar

      // Hide loading bar after a short delay
      setTimeout(() => {
        loadingContainer.style.display = "none"; // Hide loading bar
        loadingBar.style.width = "0"; // Reset width
      }, 500); // Delay for visual effect
    }
  }

  // Add event listeners to each image
  images.forEach((img) => {
    if (img.complete) {
      imageLoaded(); // If already loaded
    } else {
      img.addEventListener("load", imageLoaded);
      img.addEventListener("error", imageLoaded); // Count errors as well
    }
  });

  // If there are no images, just hide the loading bar immediately
  if (totalImages === 0) {
    loadingContainer.style.display = "none";
  }
};
