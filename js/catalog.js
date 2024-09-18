let productsData = [];

// Fetch products from the JSON file
fetch('data/products.json')
  .then(response => response.json())
  .then(data => {
    productsData = data;
    displayProducts(data);
  })
  .catch(error => console.error('Error loading products:', error));

// Function to display products dynamically
const displayProducts = products => {
  const catalogContainer = document.getElementById('catalog-container');
  catalogContainer.innerHTML = ''; // Clear the container

  products.forEach(({ image, name, description, price }) => {
    const productDiv = document.createElement('div');
    productDiv.classList.add('catalog-item');
    
    productDiv.innerHTML = `
      <img src="${image}" alt="${name}" loading="lazy">
      <h3>${name}</h3>
      <p>${description}</p>
      <p><strong>${price}</strong></p>
    `;
    catalogContainer.appendChild(productDiv);
  });
};

// Filter products based on search input
document.getElementById('search-bar').addEventListener('input', event => {
  const searchTerm = event.target.value.toLowerCase();
  const filteredProducts = productsData.filter(({ name }) => 
    name.toLowerCase().includes(searchTerm)
  );
  displayProducts(filteredProducts);
});